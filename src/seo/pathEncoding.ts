/**
 * Decode percent-encoded path segments for history/location state.
 * Public blog URLs are ASCII; this still helps legacy Persian paths and any
 * non-ASCII asset segments before IIS 301s them to the public slug.
 */
export function decodePathname(pathname: string): string {
  if (!pathname) return pathname;
  return pathname
    .split("/")
    .map((segment) => {
      if (!segment) return segment;
      try {
        return decodeURIComponent(segment);
      } catch {
        return segment;
      }
    })
    .join("/");
}

export function decodeMaybeUriComponent(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}
