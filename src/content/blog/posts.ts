import type { BlogPost } from "./types";
import { groupClassDesignPost } from "./groupClassDesign";
import { groupClassIntensityPost } from "./groupClassIntensity";
import { heartRateSensorComparisonPost } from "./heartRateSensorComparison";
import { gymHeartRateMonitoringPost } from "./gymHeartRateMonitoring";
import { heartRateZonesPost } from "./heartRateZones";
import { trainingHistoryPost } from "./trainingHistory";
import { trainingLoadPost } from "./trainingLoad";

const posts = {
  "زون-های-ضربان-قلب": heartRateZonesPost,
  "کنترل-شدت-تمرین-در-کلاس-گروهی": groupClassIntensityPost,
  "پایش-ضربان-قلب-در-باشگاه": gymHeartRateMonitoringPost,
  "تاریخچه-تمرین": trainingHistoryPost,
  "بار-تمرینی-چیست": trainingLoadPost,
  "مقایسه-سنسور-ضربان-قلب": heartRateSensorComparisonPost,
  "طراحی-تمرین-گروهی": groupClassDesignPost,
} as const satisfies Record<string, BlogPost>;

export type BlogSlug = keyof typeof posts;

/** ASCII public URL segment for each content slug (copy/paste-safe). */
export const blogPublicSlugByContentSlug = {
  "زون-های-ضربان-قلب": "heart-rate-zones",
  "کنترل-شدت-تمرین-در-کلاس-گروهی": "live-class-monitoring",
  "پایش-ضربان-قلب-در-باشگاه": "connected-training-system",
  "تاریخچه-تمرین": "workout-history-progress",
  "بار-تمرینی-چیست": "training-load",
  "مقایسه-سنسور-ضربان-قلب": "heart-rate-sensor-comparison",
  "طراحی-تمرین-گروهی": "group-class-design",
} as const satisfies Record<BlogSlug, string>;

export type BlogPublicSlug =
  (typeof blogPublicSlugByContentSlug)[BlogSlug];

/** English public slug → Persian content slug. */
export const blogContentSlugByPublicSlug = {
  "heart-rate-zones": "زون-های-ضربان-قلب",
  "live-class-monitoring": "کنترل-شدت-تمرین-در-کلاس-گروهی",
  "connected-training-system": "پایش-ضربان-قلب-در-باشگاه",
  "workout-history-progress": "تاریخچه-تمرین",
  "training-load": "بار-تمرینی-چیست",
  "heart-rate-sensor-comparison": "مقایسه-سنسور-ضربان-قلب",
  "group-class-design": "طراحی-تمرین-گروهی",
} as const satisfies Record<BlogPublicSlug, BlogSlug>;

/** Legacy English URLs must resolve in the app but not appear as indexed pages. */
export const legacyEnglishBlogAliases = {
  "live-tv-group-training": "بار-تمرینی-چیست",
} as const;

/** @deprecated Includes both current and historical aliases for older imports. */
export const blogAliases = {
  ...blogContentSlugByPublicSlug,
  ...legacyEnglishBlogAliases,
} as const;

export const blogPosts = posts;

export function getBlogPublicSlug(contentSlug: BlogSlug): BlogPublicSlug {
  return blogPublicSlugByContentSlug[contentSlug];
}

/** Public path for internal links — always ASCII. */
export function blogPath(slug: string): string {
  const contentSlug = resolveBlogSlug(slug);
  if (!contentSlug) return `/blog/${slug}`;
  return `/blog/${blogPublicSlugByContentSlug[contentSlug]}`;
}

export function getBlogPost(slug: string): BlogPost | undefined {
  const canonicalSlug = resolveBlogSlug(slug);
  if (!canonicalSlug) return undefined;
  return posts[canonicalSlug] as BlogPost;
}

export function resolveBlogSlug(slug: string): BlogSlug | undefined {
  let normalized = slug;
  try {
    normalized = decodeURIComponent(slug);
  } catch {
    normalized = slug;
  }
  if (normalized in posts) return normalized as BlogSlug;
  if (normalized in blogContentSlugByPublicSlug) {
    return blogContentSlugByPublicSlug[
      normalized as keyof typeof blogContentSlugByPublicSlug
    ];
  }
  if (normalized in legacyEnglishBlogAliases) {
    return legacyEnglishBlogAliases[
      normalized as keyof typeof legacyEnglishBlogAliases
    ];
  }
  if (slug in blogContentSlugByPublicSlug) {
    return blogContentSlugByPublicSlug[
      slug as keyof typeof blogContentSlugByPublicSlug
    ];
  }
  return undefined;
}

export function getPublishedBlogPosts(): BlogPost[] {
  return Object.values(posts).filter((post) => post.published) as BlogPost[];
}

export type { BlogPost } from "./types";
