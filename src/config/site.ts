/**
 * Public origin for beatfit.ir.
 * Production serves HTTPS and permanently redirects HTTP → HTTPS (verified 2026-11-21).
 * Override with VITE_SITE_ORIGIN only for non-production builds.
 */
const configuredOrigin = (
  import.meta as ImportMeta & { env?: { VITE_SITE_ORIGIN?: string } }
).env?.VITE_SITE_ORIGIN;

export const SITE_ORIGIN = configuredOrigin?.replace(/\/$/, "") || "https://beatfit.ir";

export const SITE_URL = `${SITE_ORIGIN}/`;

export function absoluteUrl(pathname: string): string {
  if (/^https?:\/\//i.test(pathname)) return pathname;
  const withSlash = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const trimmed = withSlash.length > 1 ? withSlash.replace(/\/+$/, "") : withSlash;
  return `${SITE_ORIGIN}${trimmed}`;
}

export function absoluteAsset(assetPath: string): string {
  if (/^https?:\/\//i.test(assetPath)) return assetPath;
  return new URL(assetPath, `${SITE_ORIGIN}/`).href;
}
