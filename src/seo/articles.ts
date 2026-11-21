import { absoluteAsset, absoluteUrl } from "../config/site";
import {
  blogPublicSlugByContentSlug,
  getPublishedBlogPosts,
  type BlogPost,
  type BlogSlug,
} from "../content/blog";
import { articleJsonLd } from "./schema";
import type { SeoDocument } from "./types";

const INDEX_ROBOTS = "index, follow, max-image-preview:large";

function articleDocument(post: BlogPost): SeoDocument {
  const contentSlug = post.slug as BlogSlug;
  const fileId = blogPublicSlugByContentSlug[contentSlug];
  if (!fileId) {
    throw new Error(`Add a public ASCII slug for blog content: ${post.slug}`);
  }

  // Public/canonical path is ASCII so copied links stay readable in every browser.
  const path = `/blog/${fileId}`;
  const canonical = absoluteUrl(path);
  const description = post.metaDescription ?? post.summary;
  const image = absoluteAsset(post.image);

  return {
    id: `blog:${contentSlug}`,
    path,
    fileId,
    title: post.seoTitle ?? `${post.title} | بیت‌فیت`,
    description,
    robots: INDEX_ROBOTS,
    ogType: "article",
    imagePath: post.image,
    imageAlt: post.imageAlt,
    h1: post.title,
    summary: post.summary,
    publishedTime: post.datePublished,
    canonical,
    jsonLd: articleJsonLd(post, canonical, description, image),
    indexable: true,
    // datePublished is the known significant-change date until a real dateModified exists.
    lastmod: post.datePublished,
  };
}

export const articleDocuments: SeoDocument[] = getPublishedBlogPosts()
  .map(articleDocument)
  .sort((a, b) => (b.lastmod ?? "").localeCompare(a.lastmod ?? "") || a.path.localeCompare(b.path));

const byPublicSlug = new Map(
  articleDocuments.map((doc) => [doc.fileId!, doc]),
);
const byContentSlug = new Map(
  articleDocuments.map((doc) => [doc.id.replace(/^blog:/, ""), doc]),
);

/** Lookup by public ASCII slug or legacy Persian content slug. */
export function articleDocumentBySlug(slug: string): SeoDocument | undefined {
  return byPublicSlug.get(slug) ?? byContentSlug.get(slug);
}
