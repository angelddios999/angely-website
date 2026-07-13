# Angely — Art & Animation Portfolio

A visual portfolio site for physical drawings, digital art, and short animations.

Built with **Astro** and **Tailwind CSS**, deployed as a **Cloudflare Worker** using **Workers Static Assets** (not Cloudflare Pages / Workers Sites). Photos and videos live in **Cloudflare R2** and are served by a Worker route — nothing media-heavy is stored in git.

---

## Stack

| Piece | Choice |
| --- | --- |
| Framework | [Astro](https://astro.build/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Deploy | Cloudflare Workers + Static Assets (`@astrojs/cloudflare`) |
| Media | R2 bucket bound as `MEDIA_BUCKET` |
| Contact form | Worker route + Turnstile + [Resend](https://resend.com/) |

---

## Project structure

```
├── public/                 # Static files copied as-is (favicon, .assetsignore)
├── src/
│   ├── components/         # UI pieces (Header, PhotoGrid, ContactForm, …)
│   ├── data/
│   │   ├── portfolio.ts    # ★ Artwork / animation catalog (R2 keys + copy)
│   │   └── site.ts         # Site name, nav, contact email
│   ├── layouts/            # BaseLayout
│   ├── lib/media.ts        # mediaUrl(key) → /media/<key>
│   ├── pages/
│   │   ├── index.astro     # Home
│   │   ├── physical.astro  # Physical art gallery
│   │   ├── digital.astro   # Digital art gallery
│   │   ├── animations.astro
│   │   ├── about.astro
│   │   ├── contact.astro
│   │   ├── 404.astro
│   │   ├── api/contact.ts  # POST /api/contact (Turnstile + Resend)
│   │   └── media/[...key].ts  # GET /media/* → R2
│   └── styles/global.css   # Tailwind + design tokens (theme-friendly)
├── wrangler.jsonc          # Worker name, assets, R2 binding, compat date
├── .env.example            # PUBLIC_TURNSTILE_SITE_KEY
└── .dev.vars.example       # Local secrets for the Worker
```

### Content workflow (no code changes for new media)

1. Upload a file to the R2 bucket under a clear key, e.g. `physical/charcoal-01.jpg`.
2. Add (or update) an entry in `src/data/portfolio.ts` with that key.
3. Set `placeholder: false` (or remove `placeholder`) so the real `/media/<key>` URL is used.
4. Redeploy (or refresh in local dev with the bucket populated).

Placeholders are marked with a visible **TODO: replace** badge and amber highlights in copy.

### Design / theming

Design tokens live in `src/styles/global.css` under `@theme` (`--color-*`, `--font-*`). Swap those values to recolor or re-font the site without hunting through components. Layouts and components avoid hard-coded brand colors so an Astro theme or token pass is straightforward.

---

## Prerequisites

- Node.js **22.12+**
- npm (or pnpm / yarn)
- A Cloudflare account with:
  - A Worker (this project)
  - An R2 bucket bound as `MEDIA_BUCKET` (name configured in `wrangler.jsonc`)
  - Turnstile site + secret keys (when enabling the contact form)
  - A Resend API key (when enabling the contact form)

This repo does **not** create Cloudflare resources for you — configure bindings and secrets in the dashboard (or Wrangler CLI) separately.

---

## Local development

```bash
# Install
npm install

# Optional: public Turnstile site key for the contact widget
cp .env.example .env
# edit .env → PUBLIC_TURNSTILE_SITE_KEY=...

# Optional: Worker secrets for contact form / local R2 simulation
cp .dev.vars.example .dev.vars
# edit .dev.vars → TURNSTILE_SECRET_KEY, RESEND_API_KEY, …

# Dev server (workerd via @astrojs/cloudflare)
npm run dev
```

Open the URL Astro prints (usually `http://localhost:4321`).

### Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Local dev with Cloudflare runtime |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run deploy` | Build + `wrangler deploy` |
| `npm run generate-types` | Regenerate Worker binding types |

### Local R2 media

With the R2 binding in `wrangler.jsonc`, `astro dev` / `wrangler dev` can talk to a local or remote bucket depending on your Wrangler setup. Until objects exist, leave `placeholder: true` on content entries so the UI stays polished.

---

## Environment variables

### Public (browser)

| Variable | Where | Purpose |
| --- | --- | --- |
| `PUBLIC_TURNSTILE_SITE_KEY` | `.env` (local) · Worker **Variables** (production) | Turnstile widget site key |

The contact page is server-rendered so the site key can be read from Worker vars at runtime (no rebuild needed when you change it in the dashboard).

### Secrets (Worker only — never commit)

| Variable | Where | Purpose |
| --- | --- | --- |
| `TURNSTILE_SECRET_KEY` | `.dev.vars` / `wrangler secret put` | Turnstile Siteverify |
| `RESEND_API_KEY` | `.dev.vars` / `wrangler secret put` | Send contact emails |
| `CONTACT_FROM_EMAIL` | optional secret/var | Resend “from” address |
| `CONTACT_TO_EMAIL` | optional secret/var | Inbox that receives form messages |

### Turnstile setup checklist

1. Create a widget in [Cloudflare Turnstile](https://dash.cloudflare.com/?to=/:account/turnstile).
2. Add hostnames to the widget (at least):
   - `localhost` (local dev)
   - your `*.workers.dev` host (e.g. `angely-website.<subdomain>.workers.dev`)
   - any custom domain later
3. **Local:** copy examples and fill in keys:
   ```bash
   cp .env.example .env
   cp .dev.vars.example .dev.vars
   # edit both files with your real site key + secret key
   ```
4. **Production (public site key):** Cloudflare dashboard → Workers & Pages → `angely-website` → Settings → Variables → add  
   `PUBLIC_TURNSTILE_SITE_KEY` = your site key (plain text variable, not a secret).
5. **Production (secret):**
   ```bash
   npx wrangler secret put TURNSTILE_SECRET_KEY
   npx wrangler secret put RESEND_API_KEY   # when you have Resend ready
   ```
6. Redeploy if the Worker was already live: `npm run deploy`

---

## Deployment (Workers Static Assets)

`wrangler.jsonc` is already set up for Workers Static Assets:

- `assets.directory` → `./dist` (Astro build output)
- `assets.not_found_handling` → `404-page` (multi-page site, **not** SPA fallback)
- `assets.run_worker_first` → SSR/API paths (`/contact`, `/api/*`, `/media/*`) so they are not swallowed by the static 404 handler
- `main` → `@astrojs/cloudflare/entrypoints/server`
- `compatibility_date` → set at scaffold time; bump intentionally when you want newer runtime behavior
- `r2_buckets` → `MEDIA_BUCKET` binding

```bash
# Confirm bucket_name in wrangler.jsonc matches your R2 bucket
npm run deploy
```

Static HTML/CSS/JS is served from assets. Paths that are not static files — including `/media/*` and `/api/contact` — fall through to the Worker automatically. No special route list is required for those endpoints.

---

## Contact form flow

1. Browser posts JSON to `POST /api/contact` (name, email, message, Turnstile token).
2. Worker verifies the token with Cloudflare’s Siteverify API using `TURNSTILE_SECRET_KEY`.
3. On success, Worker sends mail via Resend using `RESEND_API_KEY`.
4. Failures (missing fields, Turnstile, Resend, missing secrets) return clear JSON errors — nothing fails silently.

---

## License

See [LICENSE](./LICENSE).
