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

type ImagesBinding = {
  input: (stream: ReadableStream) => {
    transform: (opts: { width: number; fit?: string }) => {
      output: (opts: { format: string }) => Promise<{
        response: (init?: { headers?: Record<string, string> }) => Response;
      }>;
    };
  };
};

export const GET: APIRoute = async ({ params, url }) => {
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

  const filename = key.split("/").pop() || key;
  const width = Number(url.searchParams.get("w") ?? "");
  const images = (env as { IMAGES?: ImagesBinding }).IMAGES;
  const type = object.httpMetadata?.contentType || guessContentType(key);
  const isRaster =
    type.startsWith("image/") && !type.includes("svg") && !type.includes("gif");

  let served = object;

  if (images && object.body && isRaster && width >= 32 && width <= 2000) {
    try {
      const transformed = await images
        .input(object.body)
        .transform({ width, fit: "scale-down" })
        .output({ format: "image/webp" });
      return transformed.response({
        headers: {
          "Cache-Control": CACHE_CONTROL,
          "X-Content-Type-Options": "nosniff",
          "Content-Disposition": `inline; filename="${filename.replace(/"/g, "")}"`,
        },
      });
    } catch (err) {
      console.error("Image transform failed; serving original", err);
      const retry = await bucket.get(key);
      if (!retry) {
        return new Response("Not found", { status: 404 });
      }
      served = retry;
    }
  }

  const headers = new Headers();
  served.writeHttpMetadata(headers);
  headers.set("etag", served.httpEtag);
  headers.set("Cache-Control", CACHE_CONTROL);
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("Content-Disposition", `inline; filename="${filename.replace(/"/g, "")}"`);

  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", guessContentType(key));
  }

  return new Response(served.body, { status: 200, headers });
};
