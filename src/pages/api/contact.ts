/**
 * POST /api/contact
 *
 * 1. Validate fields
 * 2. Verify Cloudflare Turnstile token (env.TURNSTILE_SECRET_KEY)
 * 3. Send email via Resend (env.RESEND_API_KEY)
 *
 * Secrets are set in the Cloudflare dashboard / `wrangler secret put` —
 * never hardcode them. Locally, use `.dev.vars` (see .dev.vars.example).
 */
export const prerender = false;

import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";

type ContactBody = {
  name?: string;
  email?: string;
  message?: string;
  turnstileToken?: string;
};

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function verifyTurnstile(
  token: string,
  secret: string,
  ip: string | null,
): Promise<{ success: boolean; errorCodes?: string[] }> {
  const body = new URLSearchParams();
  body.set("secret", secret);
  body.set("response", token);
  if (ip) body.set("remoteip", ip);

  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    },
  );

  if (!res.ok) {
    return { success: false, errorCodes: [`siteverify_http_${res.status}`] };
  }

  const data = (await res.json()) as {
    success?: boolean;
    "error-codes"?: string[];
  };

  return {
    success: Boolean(data.success),
    errorCodes: data["error-codes"],
  };
}

export const POST: APIRoute = async ({ request }) => {
  let body: ContactBody;

  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return json({ ok: false, error: "Invalid JSON body." }, 400);
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const message = (body.message ?? "").trim();
  const turnstileToken = (body.turnstileToken ?? "").trim();

  if (!name || !email || !message) {
    return json(
      { ok: false, error: "Name, email, and message are required." },
      400,
    );
  }

  if (name.length > 120 || email.length > 200 || message.length > 5000) {
    return json({ ok: false, error: "One or more fields are too long." }, 400);
  }

  if (!isValidEmail(email)) {
    return json(
      { ok: false, error: "Please provide a valid email address." },
      400,
    );
  }

  if (!turnstileToken) {
    return json(
      {
        ok: false,
        error: "Turnstile verification is missing. Please try again.",
      },
      400,
    );
  }

  const turnstileSecret = env.TURNSTILE_SECRET_KEY as string | undefined;
  const resendKey = env.RESEND_API_KEY as string | undefined;
  const fromEmail =
    (env.CONTACT_FROM_EMAIL as string | undefined) ?? "onboarding@resend.dev";
  const toEmail =
    (env.CONTACT_TO_EMAIL as string | undefined) ?? "delivered@resend.dev";

  if (!turnstileSecret) {
    console.error("TURNSTILE_SECRET_KEY is not configured");
    return json(
      {
        ok: false,
        error:
          "Server is missing TURNSTILE_SECRET_KEY. Set it via the Cloudflare dashboard or .dev.vars.",
      },
      503,
    );
  }

  if (!resendKey) {
    console.error("RESEND_API_KEY is not configured");
    return json(
      {
        ok: false,
        error:
          "Server is missing RESEND_API_KEY. Set it via the Cloudflare dashboard or .dev.vars.",
      },
      503,
    );
  }

  const ip =
    request.headers.get("CF-Connecting-IP") ??
    request.headers.get("X-Forwarded-For")?.split(",")[0]?.trim() ??
    null;

  let turnstile: { success: boolean; errorCodes?: string[] };
  try {
    turnstile = await verifyTurnstile(turnstileToken, turnstileSecret, ip);
  } catch (err) {
    console.error("Turnstile verification request failed", err);
    return json(
      {
        ok: false,
        error: "Could not verify Turnstile. Please try again shortly.",
      },
      502,
    );
  }

  if (!turnstile.success) {
    console.warn("Turnstile failed", turnstile.errorCodes);
    return json(
      {
        ok: false,
        error: "Turnstile verification failed. Please refresh and try again.",
        details: turnstile.errorCodes,
      },
      403,
    );
  }

  const safeName = name.replace(/[\r\n]/g, " ");
  const subject = `Portfolio contact from ${safeName}`;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `IP: ${ip ?? "unknown"}`,
    "",
    message,
  ].join("\n");

  let resendRes: Response;
  try {
    resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject,
        text,
      }),
    });
  } catch (err) {
    console.error("Resend request failed", err);
    return json(
      {
        ok: false,
        error: "Could not reach the mail service. Please try again later.",
      },
      502,
    );
  }

  if (!resendRes.ok) {
    const errText = await resendRes.text().catch(() => "");
    console.error("Resend error", resendRes.status, errText);
    return json(
      {
        ok: false,
        error:
          "The message could not be sent (mail provider error). Please try again later.",
      },
      502,
    );
  }

  return json({ ok: true });
};
