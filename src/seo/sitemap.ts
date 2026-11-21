import { absoluteUrl, SITE_ORIGIN } from "../config/site";
import { escapeHtml } from "./html";
import { indexableDocuments } from "./routing";

/**
 * Sitemap = discovery of preferred canonical URLs only.
 * BeatFit playbook + Google: emit HTTPS <loc>, and accurate <lastmod> when known.
 * Do not emit <changefreq>/<priority> — Google ignores them; playbook does not require them.
 */
function sitemapLoc(pathname: string): string {
  return escapeHtml(absoluteUrl(pathname));
}

export function renderSitemap(): string {
  const urls = indexableDocuments().map((doc) => {
    const lastmod = doc.lastmod ? `\n    <lastmod>${doc.lastmod}</lastmod>` : "";
    return `  <url>\n    <loc>${sitemapLoc(doc.path)}</loc>${lastmod}\n  </url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;
}

export function renderRobots(): string {
  return `User-agent: *\nAllow: /\nDisallow: /route-html/\n\nSitemap: ${SITE_ORIGIN}/sitemap.xml\n`;
}
