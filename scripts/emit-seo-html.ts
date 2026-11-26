import fs from "node:fs";
import path from "node:path";

import {
  blogPublicSlugByContentSlug,
  getPublishedBlogPosts,
  legacyEnglishBlogAliases,
} from "../src/content/blog/posts.ts";
import { renderStaticArticle } from "../src/seo/article-static.ts";
import { applySeoBlocks, escapeHtml, replaceMarkedBlock } from "../src/seo/html.ts";
import { notFoundDocument } from "../src/seo/marketing.ts";
import { distHtmlPath, encodedPath, indexableDocuments, rewriteMapEntries } from "../src/seo/routing.ts";
import { renderRobots, renderSitemap } from "../src/seo/sitemap.ts";

function assertUnique(docs: ReturnType<typeof indexableDocuments>): void {
  const titles = new Set<string>();
  const descriptions = new Set<string>();
  const fileIds = new Set<string>();

  for (const doc of docs) {
    if (titles.has(doc.title)) throw new Error(`Duplicate SEO title: ${doc.title}`);
    if (descriptions.has(doc.description)) throw new Error(`Duplicate meta description: ${doc.path}`);
    titles.add(doc.title);
    descriptions.add(doc.description);
    if (!doc.canonical) throw new Error(`Indexable page is missing a canonical: ${doc.path}`);
    if (doc.fileId) {
      if (fileIds.has(doc.fileId)) throw new Error(`Duplicate SEO file id: ${doc.fileId}`);
      fileIds.add(doc.fileId);
    }
  }
}

function assertAliasRedirects(webConfig: string): void {
  for (const [contentSlug, publicSlug] of Object.entries(blogPublicSlugByContentSlug)) {
    const legacyPath = encodedPath(`/blog/${contentSlug}`).replace(/^\//, "");
    const absolute = `url="https://beatfit.ir/blog/${publicSlug}"`;
    if (!webConfig.includes(legacyPath) || !webConfig.includes(absolute)) {
      throw new Error(
        `web.config is missing the HTTPS 301 for /${legacyPath} -> https://beatfit.ir/blog/${publicSlug}`,
      );
    }
  }
  // This historical English URL must permanently redirect instead of emitting a
  // second indexable article. IIS rule must be before generic slash normalization.
  for (const [legacySlug, contentSlug] of Object.entries(legacyEnglishBlogAliases)) {
    const publicSlug = blogPublicSlugByContentSlug[
      contentSlug as keyof typeof blogPublicSlugByContentSlug
    ];
    const start = webConfig.indexOf('<rule name="Legacy ASCII training-load path"');
    const end = start >= 0 ? webConfig.indexOf("</rule>", start) : -1;
    const rule = end > start ? webConfig.slice(start, end + "</rule>".length) : "";
    if (
      !rule.includes(`<match url="^blog/${legacySlug}/?$" />`) ||
      !rule.includes(`url="https://beatfit.ir/blog/${publicSlug}"`) ||
      !rule.includes('redirectType="Permanent"') ||
      !rule.includes('appendQueryString="true"')
    ) {
      throw new Error(`Missing one-hop HTTPS 301 for historical ASCII blog URL: ${legacySlug}`);
    }
  }
}

export function emitSeoFiles(outDir: string, projectRoot: string): void {
  const template = fs.readFileSync(path.join(outDir, "index.html"), "utf8");
  const docs = indexableDocuments();
  assertUnique(docs);
  const articles = new Map(getPublishedBlogPosts().map(post => [`blog:${post.slug}`, post]));

  for (const doc of [...docs, notFoundDocument]) {
    const post = articles.get(doc.id);
    if (doc.path.startsWith("/blog/") && !post) {
      throw new Error(`Missing source content for article SEO shell: ${doc.id}`);
    }
    const html = applySeoBlocks(template, doc, post ? renderStaticArticle(post) : "");
    if (!html.includes(`<title>${escapeHtml(doc.title)}</title>`)) {
      throw new Error(`Built HTML is missing the title for ${doc.path}`);
    }
    if (doc.canonical && !html.includes(`href="${escapeHtml(doc.canonical)}"`)) {
      throw new Error(`Built HTML is missing the canonical for ${doc.path}`);
    }
    if (!doc.indexable && html.includes('rel="canonical"')) {
      throw new Error("The 404 shell must not publish a canonical");
    }
    if (!doc.indexable && !html.includes("noindex")) {
      throw new Error("The 404 shell must be noindex");
    }

    const destination = path.join(outDir, distHtmlPath(doc));
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.writeFileSync(destination, html);
  }

  const sitemap = renderSitemap();
  const robots = renderRobots();
  fs.writeFileSync(path.join(outDir, "sitemap.xml"), sitemap);
  fs.writeFileSync(path.join(projectRoot, "public", "sitemap.xml"), sitemap);
  fs.writeFileSync(path.join(outDir, "robots.txt"), robots);
  fs.writeFileSync(path.join(projectRoot, "public", "robots.txt"), robots);

  const map = rewriteMapEntries()
    .map((entry) => `          <add key="${escapeHtml(entry.key)}" value="${escapeHtml(entry.value)}" />`)
    .join("\n");

  for (const configPath of [
    path.join(projectRoot, "public", "web.config"),
    path.join(outDir, "web.config"),
  ]) {
    const current = fs.readFileSync(configPath, "utf8");
    assertAliasRedirects(current);
    fs.writeFileSync(configPath, replaceMarkedBlock(current, "routes", map));
  }
}
