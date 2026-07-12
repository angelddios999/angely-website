/**
 * Build a site-relative media URL from an R2 object key.
 * The Worker serves `/media/*` from the MEDIA_BUCKET binding.
 */
export function mediaUrl(key: string): string {
  const clean = key.replace(/^\/+/, "");
  return `/media/${clean}`;
}

export function isPlaceholder(item: { placeholder?: boolean }): boolean {
  return item.placeholder === true;
}
