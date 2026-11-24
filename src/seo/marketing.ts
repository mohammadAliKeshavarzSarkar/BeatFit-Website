import { absoluteUrl } from "../config/site";
import { athleteHero } from "../content/athlete";
import { coachHero } from "../content/coach";
import { demoPage } from "../content/demo";
import { gymHero } from "../content/gym";
import { faq, hero, site } from "../content/home";
import { resourcesHero } from "../content/resources";
import { marketingJsonLd } from "./schema";
import type { SeoDocument } from "./types";

const INDEX_ROBOTS = "index, follow, max-image-preview:large";
const OG_IMAGE = "/images/seo/beatfit-og.webp";
const OG_IMAGE_ALT = "بیت‌فیت، پایش زنده ضربان قلب و تمرین";

/**
 * Marketing titles/descriptions follow:
 * - docs/seo/research/2026-11-21-page-keyword-map-v2.csv (113 phrases)
 * - docs/seo/research/2026-11-21-current-page-onpage-optimization-review.md
 * - docs/seo/strategy/2026-11-21-beatfit-brand-search-language.md
 * Qualitative priorities only — no fabricated GSC demand.
 */
const HOME_DESCRIPTION =
  "بیت‌فیت سیستم پایش زنده ضربان قلب در تمرین‌های گروهی است؛ با حسگرهای پوشیدنی، نمایشگر کلاس، پنل مربی و تاریخچه جلسات، روند تمرین را بهتر دنبال کنید.";

function page(input: {
  id: string;
  path: string;
  fileId?: string;
  title: string;
  description: string;
  h1: string;
  summary: string;
  indexable: boolean;
  robots?: string;
  breadcrumbName?: string;
  primaryDestinations?: readonly { path: string; name: string }[];
  faq?: readonly { question: string; answer: string }[];
}): SeoDocument {
  const canonical = input.indexable ? absoluteUrl(input.path) : null;
  return {
    id: input.id,
    path: input.path,
    fileId: input.fileId,
    title: input.title,
    description: input.description,
    robots: input.robots ?? (input.indexable ? INDEX_ROBOTS : "noindex, follow"),
    ogType: "website",
    imagePath: OG_IMAGE,
    imageAlt: OG_IMAGE_ALT,
    h1: input.h1,
    summary: input.summary,
    canonical,
    primaryDestinations: input.primaryDestinations,
    jsonLd: canonical
      ? marketingJsonLd({
          canonical,
          title: input.title,
          description: input.description,
          breadcrumbName: input.breadcrumbName,
          primaryDestinations: input.primaryDestinations,
          faq: input.faq,
        })
      : null,
    indexable: input.indexable,
  };
}

/** Brand sitelink destination set (home shell + SiteNavigationElement). */
export const BRAND_SITELINK_DESTINATIONS = [
  { path: "/gym", name: "باشگاه‌ها" },
  { path: "/coach", name: "مربیان" },
  { path: "/athlete", name: "ورزشکاران" },
  { path: "/resources", name: "منابع" },
  { path: "/demo", name: "درخواست دمو" },
] as const;

export const homeDocument = page({
  id: "home",
  path: "/",
  title: site.title,
  description: HOME_DESCRIPTION,
  h1: hero.title,
  summary: hero.lede,
  primaryDestinations: BRAND_SITELINK_DESTINATIONS,
  indexable: true,
  faq: faq.items.map((item) => ({ question: item.question, answer: item.answer })),
});

export const gymDocument = page({
  id: "gym",
  path: "/gym",
  fileId: "gym",
  // Commercial landing title (on-page review + gym-copy-proposal); distinct from gym guide article.
  title: "پایش زنده ضربان قلب در باشگاه‌ها | بیت‌فیت",
  description: gymHero.body,
  h1: gymHero.title,
  summary: gymHero.body,
  breadcrumbName: "باشگاه",
  indexable: true,
});

export const coachDocument = page({
  id: "coach",
  path: "/coach",
  fileId: "coach",
  title: "پایش زنده ضربان قلب ورزشکاران برای مربی | بیت‌فیت",
  description: coachHero.body,
  h1: coachHero.title,
  summary: coachHero.body,
  breadcrumbName: "مربیان",
  indexable: true,
});

export const athleteDocument = page({
  id: "athlete",
  path: "/athlete",
  fileId: "athlete",
  title: "پایش ضربان قلب و پیشرفت تمرین ورزشکار | بیت‌فیت",
  description: athleteHero.body,
  h1: athleteHero.title,
  summary: athleteHero.body,
  breadcrumbName: "ورزشکاران",
  indexable: true,
});

export const resourcesDocument = page({
  id: "resources",
  path: "/resources",
  fileId: "resources",
  // Educational-hub purpose explicit (keyword map v2 + SEO team PR #25).
  title: "آموزش پایش ضربان قلب و تمرین | بیت‌فیت",
  description: resourcesHero.lede,
  h1: resourcesHero.title,
  summary: resourcesHero.lede,
  breadcrumbName: "منابع",
  indexable: true,
});

export const demoDocument = page({
  id: "demo",
  path: "/demo",
  fileId: "demo",
  // Informational while the lead form is intentionally inactive; don't promise submission.
  title: "آشنایی با دموی سیستم پایش ضربان قلب | بیت‌فیت",
  description:
    "با قابلیت‌های پایش زنده ضربان قلب، نمایشگر کلاس و پنل مربی بیت‌فیت برای باشگاه آشنا شوید. ثبت آنلاین درخواست دمو فعلاً فعال نیست.",
  h1: demoPage.contentTitle,
  summary: demoPage.contentBody,
  breadcrumbName: "درخواست دمو",
  indexable: true,
});

export const notFoundDocument = page({
  id: "not-found",
  path: "/404",
  title: "صفحه پیدا نشد | بیت‌فیت",
  description: "این آدرس در بیت‌فیت وجود ندارد.",
  h1: "این صفحه پیدا نشد",
  summary: "آدرسی که وارد کردید در بیت‌فیت وجود ندارد. می‌توانید به صفحه اصلی برگردید.",
  indexable: false,
});

export const marketingDocuments = [
  homeDocument,
  gymDocument,
  coachDocument,
  athleteDocument,
  resourcesDocument,
  demoDocument,
] as const;
