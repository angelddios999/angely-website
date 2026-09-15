/**
 * Build a site-relative media URL from an R2 object key.
 * The Worker serves `/media/<key>` from the MEDIA_BUCKET binding.
 */
export function mediaUrl(key: string): string {
  const clean = key.replace(/^\/+/, "");
  return `/media/${clean}`;
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
