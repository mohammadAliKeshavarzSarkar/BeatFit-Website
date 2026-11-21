import { absoluteAsset, absoluteUrl } from "../config/site";
import { getPublishedBlogPosts, type BlogPost } from "../content/blog";
import { articleJsonLd } from "./schema";
import type { SeoDocument } from "./types";

const INDEX_ROBOTS = "index, follow, max-image-preview:large";

/** ASCII shells for IIS. Public URLs stay on the Persian slug. */
const ARTICLE_FILE_IDS: Record<string, string> = {
  "زون-های-ضربان-قلب": "heart-rate-zones",
  "کنترل-شدت-تمرین-در-کلاس-گروهی": "live-class-monitoring",
  "پایش-ضربان-قلب-در-باشگاه": "connected-training-system",
  "تاریخچه-تمرین": "workout-history-progress",
  "بار-تمرینی-چیست": "live-tv-group-training",
  "مقایسه-سنسور-ضربان-قلب": "heart-rate-sensor-comparison",
  "طراحی-تمرین-گروهی": "group-class-design",
};

function articleDocument(post: BlogPost): SeoDocument {
  const fileId = ARTICLE_FILE_IDS[post.slug];
  if (!fileId) {
    throw new Error(`Add an ASCII file id for blog slug: ${post.slug}`);
  }

  const path = `/blog/${post.slug}`;
  const canonical = absoluteUrl(path);
  const description = post.metaDescription ?? post.summary;
  const image = absoluteAsset(post.image);

  return {
    id: `blog:${post.slug}`,
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
    lastmod: post.datePublished,
    changefreq: "monthly",
    priority: "0.8",
  };
}

export const articleDocuments: SeoDocument[] = getPublishedBlogPosts()
  .map(articleDocument)
  .sort((a, b) => (b.lastmod ?? "").localeCompare(a.lastmod ?? "") || a.path.localeCompare(b.path, "fa"));

const bySlug = new Map(articleDocuments.map((doc) => [doc.path.slice("/blog/".length), doc]));

export function articleDocumentBySlug(slug: string): SeoDocument | undefined {
  return bySlug.get(slug);
}
