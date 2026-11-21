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

export const blogAliases = {
  "heart-rate-zones": "زون-های-ضربان-قلب",
  "live-class-monitoring": "کنترل-شدت-تمرین-در-کلاس-گروهی",
  "connected-training-system": "پایش-ضربان-قلب-در-باشگاه",
  "workout-history-progress": "تاریخچه-تمرین",
  "live-tv-group-training": "بار-تمرینی-چیست",
} as const;

export const blogPosts = posts;

export function getBlogPost(slug: string): BlogPost | undefined {
  const canonicalSlug = resolveBlogSlug(slug);
  if (!canonicalSlug) return undefined;
  return posts[canonicalSlug] as BlogPost;
}

export function resolveBlogSlug(slug: string): BlogSlug | undefined {
  if (slug in posts) return slug as BlogSlug;
  if (slug in blogAliases) {
    return blogAliases[slug as keyof typeof blogAliases];
  }
  return undefined;
}

export function getPublishedBlogPosts(): BlogPost[] {
  return Object.values(posts).filter((post) => post.published) as BlogPost[];
}

export type { BlogPost } from "./types";
