/**
 * GET /media/<r2-object-key>
 *
 * Serves objects from the MEDIA_BUCKET R2 binding with aggressive cache headers.
 * Not part of the static build — Cloudflare falls through to the Worker for this path.
 */
export const prerender = false;

import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";

const CACHE_CONTROL = "public, max-age=31536000, immutable";

function guessContentType(key: string): string {
  const lower = key.toLowerCase();
  if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "image/jpeg";
  if (lower.endsWith(".png")) return "image/png";
  if (lower.endsWith(".webp")) return "image/webp";
  if (lower.endsWith(".gif")) return "image/gif";
  if (lower.endsWith(".svg")) return "image/svg+xml";
  if (lower.endsWith(".avif")) return "image/avif";
  if (lower.endsWith(".mp4")) return "video/mp4";
  if (lower.endsWith(".webm")) return "video/webm";
  if (lower.endsWith(".mov")) return "video/quicktime";
  return "application/octet-stream";
}

export const GET: APIRoute = async ({ params }) => {
  const keyParam = params.key;
  if (!keyParam) {
    return new Response("Not found", { status: 404 });
  }

  // Normalize: strip leading slashes, block path traversal
  const key = decodeURIComponent(keyParam)
    .replace(/^\/+/, "")
    .replace(/\\/g, "/");

  if (!key || key.includes("..")) {
    return new Response("Invalid key", { status: 400 });
  }

  const bucket = env.MEDIA_BUCKET as R2Bucket | undefined;
  if (!bucket) {
    console.error("MEDIA_BUCKET binding is not configured");
    return new Response("Media storage is not configured", { status: 503 });
  }

  const object = await bucket.get(key);

  if (object === null) {
    return new Response("Not found", {
      status: 404,
      headers: { "Cache-Control": "public, max-age=60" },
    });
  }

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("etag", object.httpEtag);
  headers.set("Cache-Control", CACHE_CONTROL);
  headers.set("X-Content-Type-Options", "nosniff");

  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", guessContentType(key));
  }

  return new Response(object.body, { status: 200, headers });
};
