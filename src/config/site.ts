/**
 * Public origin for beatfit.ir.
 * Stays HTTP while the IIS "HTTPS Redirect" rule is disabled.
 * After SSL is installed, set VITE_SITE_ORIGIN=https://beatfit.ir and enable that rule.
 */
const configuredOrigin = (
  import.meta as ImportMeta & { env?: { VITE_SITE_ORIGIN?: string } }
).env?.VITE_SITE_ORIGIN;

export const SITE_ORIGIN = configuredOrigin?.replace(/\/$/, "") || "http://beatfit.ir";

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
