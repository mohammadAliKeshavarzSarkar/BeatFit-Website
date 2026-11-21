import { SITE_ORIGIN } from "../config/site";
import { escapeHtml } from "./html";
import { indexableDocuments } from "./routing";

function sitemapLoc(pathname: string): string {
  const url = new URL(pathname, `${SITE_ORIGIN}/`);
  return escapeHtml(url.href);
}

export function renderSitemap(): string {
  const urls = indexableDocuments().map((doc) => {
    const lastmod = doc.lastmod ? `\n    <lastmod>${doc.lastmod}</lastmod>` : "";
    const changefreq = doc.changefreq ? `\n    <changefreq>${doc.changefreq}</changefreq>` : "";
    const priority = doc.priority ? `\n    <priority>${doc.priority}</priority>` : "";
    return `  <url>\n    <loc>${sitemapLoc(doc.path)}</loc>${lastmod}${changefreq}${priority}\n  </url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;
}

export function renderRobots(): string {
  return `User-agent: *\nAllow: /\nDisallow: /route-html/\n\nSitemap: ${SITE_ORIGIN}/sitemap.xml\n`;
}
