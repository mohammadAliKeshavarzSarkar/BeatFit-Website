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
  changefreq?: "weekly" | "monthly";
  priority?: string;
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
    jsonLd: canonical
      ? marketingJsonLd({
          canonical,
          title: input.title,
          description: input.description,
          faq: input.faq,
        })
      : null,
    indexable: input.indexable,
    changefreq: input.changefreq,
    priority: input.priority,
  };
}

export const homeDocument = page({
  id: "home",
  path: "/",
  title: site.title,
  description: HOME_DESCRIPTION,
  h1: hero.title,
  summary: hero.lede,
  indexable: true,
  changefreq: "weekly",
  priority: "1.0",
  faq: faq.items.map((item) => ({ question: item.question, answer: item.answer })),
});

export const gymDocument = page({
  id: "gym",
  path: "/gym",
  fileId: "gym",
  title: "پایش زنده ضربان قلب در باشگاه‌ها | بیت‌فیت",
  description: gymHero.body,
  h1: gymHero.title,
  summary: gymHero.body,
  indexable: true,
  changefreq: "monthly",
  priority: "0.9",
});

export const coachDocument = page({
  id: "coach",
  path: "/coach",
  fileId: "coach",
  title: "دید زنده از کلاس برای مربی | بیت‌فیت",
  description: coachHero.body,
  h1: coachHero.title,
  summary: coachHero.body,
  indexable: true,
  changefreq: "monthly",
  priority: "0.9",
});

export const athleteDocument = page({
  id: "athlete",
  path: "/athlete",
  fileId: "athlete",
  title: "پایش ضربان قلب و پیشرفت تمرین ورزشکار | بیت‌فیت",
  description: athleteHero.body,
  h1: athleteHero.title,
  summary: athleteHero.body,
  indexable: true,
  changefreq: "monthly",
  priority: "0.9",
});

export const resourcesDocument = page({
  id: "resources",
  path: "/resources",
  fileId: "resources",
  title: "منابع تمرین و پایش ضربان قلب | بیت‌فیت",
  description: resourcesHero.lede,
  h1: resourcesHero.title,
  summary: resourcesHero.lede,
  indexable: true,
  changefreq: "weekly",
  priority: "0.8",
});

export const demoDocument = page({
  id: "demo",
  path: "/demo",
  fileId: "demo",
  title: "درخواست دمو بیت‌فیت برای باشگاه | بیت‌فیت",
  description: demoPage.contentBody,
  h1: demoPage.contentTitle,
  summary: demoPage.contentBody,
  indexable: true,
  changefreq: "monthly",
  priority: "0.7",
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
