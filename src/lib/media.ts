/**
 * Build a site-relative media URL from an R2 object key.
 * The Worker serves `/media/<key>`. Optional `w` requests a resized
 * thumbnail when the Images binding is configured.
 */
export function mediaUrl(key: string, opts?: { w?: number }): string {
  const clean = key.replace(/^\/+/, "");
  const base = `/media/${clean}`;
  if (opts?.w && opts.w > 0) return `${base}?w=${Math.round(opts.w)}`;
  return base;
}

/** Grid/card thumbnail — smaller than the lightbox original. */
export function mediaThumbUrl(key: string): string {
  return mediaUrl(key, { w: 800 });
}

export function isPlaceholder(item: { placeholder?: boolean }): boolean {
  return item.placeholder === true;
}

export function videoMime(key: string): string {
  const lower = key.toLowerCase();
  if (lower.endsWith(".webm")) return "video/webm";
  if (lower.endsWith(".mov")) return "video/quicktime";
  return "video/mp4";
}
