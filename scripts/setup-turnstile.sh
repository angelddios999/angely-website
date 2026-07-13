#!/usr/bin/env bash
# Interactive Turnstile setup — writes local env files and optionally
# pushes keys to the deployed Worker. Values are never committed
# (.env and .dev.vars are gitignored).
set -euo pipefail
cd "$(dirname "$0")/.."

echo "=== Turnstile setup for angely-website ==="
echo
echo "Paste values from the Cloudflare Turnstile dashboard."
echo "The secret key is not echoed to the terminal."
echo

read -r -p "Site key (public): " SITE_KEY
if [[ -z "${SITE_KEY}" ]]; then
  echo "Site key is required." >&2
  exit 1
fi

read -r -s -p "Secret key: " SECRET_KEY
echo
if [[ -z "${SECRET_KEY}" ]]; then
  echo "Secret key is required." >&2
  exit 1
fi

# --- Local: .env (Vite/Astro PUBLIC_*) ---
if [[ -f .env ]]; then
  grep -vE '^PUBLIC_TURNSTILE_SITE_KEY=' .env > .env.tmp || true
  mv .env.tmp .env
else
  : > .env
fi
echo "PUBLIC_TURNSTILE_SITE_KEY=${SITE_KEY}" >> .env

# --- Local: .dev.vars (Worker secrets in astro dev) ---
if [[ -f .dev.vars ]]; then
  grep -vE '^(TURNSTILE_SECRET_KEY|PUBLIC_TURNSTILE_SITE_KEY)=' .dev.vars > .dev.vars.tmp || true
  mv .dev.vars.tmp .dev.vars
else
  : > .dev.vars
fi
{
  echo "TURNSTILE_SECRET_KEY=${SECRET_KEY}"
  # Also available to SSR contact page during local workerd dev
  echo "PUBLIC_TURNSTILE_SITE_KEY=${SITE_KEY}"
} >> .dev.vars

echo
echo "Wrote local (gitignored):"
echo "  .env       → PUBLIC_TURNSTILE_SITE_KEY"
echo "  .dev.vars  → TURNSTILE_SECRET_KEY + PUBLIC_TURNSTILE_SITE_KEY"
echo

read -r -p "Push keys to the Cloudflare Worker now? [y/N] " PUSH
if [[ "${PUSH}" =~ ^[Yy]$ ]]; then
  echo
  echo "Uploading TURNSTILE_SECRET_KEY…"
  printf '%s' "${SECRET_KEY}" | npx wrangler secret put TURNSTILE_SECRET_KEY

  echo "Uploading PUBLIC_TURNSTILE_SITE_KEY…"
  # Stored as a Worker secret so CLI can set it; runtime still exposes it as env.*
  # (site keys are public by design — this is only about transport to Cloudflare)
  printf '%s' "${SITE_KEY}" | npx wrangler secret put PUBLIC_TURNSTILE_SITE_KEY

  echo
  echo "Production secrets are set. Redeploy so the latest Worker code is live:"
  echo "  npm run deploy"
else
  echo "Skipped Cloudflare upload. Local files are ready for:"
  echo "  npm run dev"
fi

echo
echo "Turnstile widget hostname allowlist should include:"
echo "  • localhost"
echo "  • angely-website.<your-subdomain>.workers.dev"
echo "  • any custom domain you attach later"
echo
echo "Done."
