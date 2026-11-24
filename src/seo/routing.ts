import { SITE_ORIGIN } from "../config/site";
import {
  blogContentSlugByPublicSlug,
  blogPublicSlugByContentSlug,
  legacyEnglishBlogAliases,
  type BlogSlug,
} from "../content/blog";
import { articleDocumentBySlug, articleDocuments } from "./articles";
import { marketingDocuments } from "./marketing";
import type { SeoDocument } from "./types";

export type AppRoute =
  | { kind: "home" }
  | { kind: "rewrite"; url: string }
  | { kind: "redirect"; url: string }
  | { kind: "not-found" };

const marketingByPath = new Map(
  marketingDocuments.filter((doc) => doc.path !== "/").map((doc) => [doc.path, doc]),
);

export function encodedPath(pathname: string): string {
  return new URL(pathname, `${SITE_ORIGIN}/`).pathname;
}

export function distHtmlPath(doc: SeoDocument): string {
  if (doc.id === "home") return "index.html";
  if (doc.id === "not-found") return "404.html";
  if (!doc.fileId) throw new Error(`Missing file id for ${doc.path}`);
  if (doc.path.startsWith("/blog/")) return `route-html/blog/${doc.fileId}.html`;
  return `route-html/${doc.fileId}.html`;
}

export function indexableDocuments(): SeoDocument[] {
  return [...marketingDocuments, ...articleDocuments];
}

export function rewriteMapEntries(): { key: string; value: string }[] {
  return indexableDocuments()
    .filter((doc) => doc.path !== "/")
    .map((doc) => ({
      key: doc.path.replace(/^\//, ""),
      value: `/${distHtmlPath(doc)}`,
    }));
}

export function splitRequestUrl(url: string): { pathname: string; search: string } {
  const queryAt = url.indexOf("?");
  const rawPath = queryAt === -1 ? url : url.slice(0, queryAt);
  const search = queryAt === -1 ? "" : url.slice(queryAt);
  let pathname = rawPath || "/";
  try {
    pathname = decodeURIComponent(rawPath || "/");
  } catch {
    pathname = rawPath || "/";
  }
  if (!pathname.startsWith("/")) pathname = `/${pathname}`;
  return { pathname, search };
}

export function classifyAppPath(pathname: string): AppRoute | null {
  if (pathname === "/") return { kind: "home" };

  const marketing = marketingByPath.get(pathname);
  if (marketing) return { kind: "rewrite", url: `/${distHtmlPath(marketing)}` };

  if (pathname === "/blog") return { kind: "redirect", url: "/resources" };

  if (pathname.startsWith("/blog/")) {
    const slug = pathname.slice("/blog/".length);
    if (!slug || slug.includes("/")) return { kind: "not-found" };

    // Legacy Persian paths permanently redirect to ASCII public slugs.
    if (slug in blogPublicSlugByContentSlug) {
      const publicSlug =
        blogPublicSlugByContentSlug[slug as BlogSlug];
      return { kind: "redirect", url: `/blog/${publicSlug}` };
    }

    // Historical English slug: a single permanent hop to its topical canonical.
    if (slug in legacyEnglishBlogAliases) {
      const contentSlug =
        legacyEnglishBlogAliases[slug as keyof typeof legacyEnglishBlogAliases];
      return {
        kind: "redirect",
        url: `/blog/${blogPublicSlugByContentSlug[contentSlug]}`,
      };
    }

    if (slug in blogContentSlugByPublicSlug) {
      const article = articleDocumentBySlug(slug);
      if (article) return { kind: "rewrite", url: `/${distHtmlPath(article)}` };
    }

    return { kind: "not-found" };
  }

  return null;
}
