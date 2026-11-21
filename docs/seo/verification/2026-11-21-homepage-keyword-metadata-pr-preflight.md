# Homepage — Exact Keyword and Metadata Optimization Draft PR

**Date:** 2026-11-21
**Source baseline:** `0fe1ee55945ca2c4d24e4d628f051149f8f3f610`
**Change status:** REVIEW ONLY; draft application PR, no deployment.
**Canonical URL:** `https://beatfit.ir/`
**Primary intent:** Branded navigational and category introduction for BeatFit's group heart-rate training ecosystem.

## Why this exact update

The previous homepage title used `مدیریت تمرین`, a broad phrase that may evoke generic workout programming or gym-management software rather than the actual differentiating product. The new title uses the more exact product concept: a system for **live heart-rate monitoring and group training**. The revised meta description names current source-supported components: wearable sensors, live group screen, coach panel, recorded session history.

This is **qualitative intent alignment**, not a measured SEO result, Google ranking guarantee or claim of search volume. Google may select its own title/snippet.

## Exact source changes

| File and field | Existing | Proposed |
|---|---|---|
| `src/content/home.ts` → `site.title` | `بیت‌فیت \| مانیتورینگ زنده ضربان قلب و مدیریت تمرین` | `بیت‌فیت \| سیستم پایش زنده ضربان قلب و تمرین گروهی` |
| `src/seo/marketing.ts` → `HOME_DESCRIPTION` | `بیت‌فیت پلتفرم مانیتورینگ زنده ضربان قلب، زون و شدت تمرین برای ورزشکار، مربی و باشگاه است؛ از تمرین زنده تا تاریخچه و پیشرفت.` | `بیت‌فیت سیستم پایش زنده ضربان قلب در تمرین‌های گروهی است؛ با حسگرهای پوشیدنی، نمایشگر کلاس، پنل مربی و تاریخچه جلسات، روند تمرین را بهتر دنبال کنید.` |

## What remains unchanged

- The H1/hero tagline: `با بیت فیت ضربان به ضربان، بدنت رو بساز.`
- The short visible athlete-oriented hero lede and all existing visible prose.
- All layouts, styles, components, routes, 13 URL slugs, FAQ content, images and publishing metadata.
- Canonical URL, JSON-LD entity mapping, OG image and intended robots policy.
- `/gym` retains a separate, more commercial keyword owner: `سیستم پایش ضربان قلب باشگاه`.
- No `meta keywords` field: Google Search does not use it.
- No fabricated product accuracy, sensor counts, live conversion counts or claims of deployed content.

## Expected source-to-output relationships

`homeDocument.title` references `site.title`; the proposed change will affect the home HTML `<title>`, configured title links and matching homepage title source. `homeDocument.description` references `HOME_DESCRIPTION`; the description should flow to home meta description/OG metadata and generated SEO HTML. There must be no accidental change to other page titles or social cards.

## Acceptance gate

1. Confirm GitHub diff changes exactly these **two string values** plus this review-only English documentation.
2. Run actual `npm ci`, TypeScript/Vite `npm run build`, and the **254 generated SEO checks** on the exact draft commit.
3. Assert the new home title and description appear in generated `dist/index.html` and that `dist/route-html/gym.html` retains its own title.
4. Confirm current homepage H1 and canonical unchanged.
5. Check tracked generated `public/robots.txt`, `public/sitemap.xml` and `public/web.config` do not drift.
6. In 390px mobile Chromium, confirm home head/canonical and visible brand hero remain unchanged in user-facing copy.
7. **Editorial/brand owner** accepts terminology before merger.
8. Only after legitimate release, inspect deployed HTML and first-party GSC page/query performance (not available in this task).

**Rollback:** Restore the two original string literals. No redirects, content removal, migrations or new assets.

## Supporting research

- [Source-aware 13-page keyword architecture](../research/2026-11-21-persian-keyword-architecture-v2.md)
- [113 candidate keyword rows by destination](../research/2026-11-21-page-keyword-map-v2.csv)
- [Current 13-page title/H1 review](../research/2026-11-21-current-page-onpage-optimization-review.md)
- [Brand spelling and disambiguation](../strategy/2026-11-21-beatfit-brand-search-language.md)
- [Google title-link guidance](https://developers.google.com/search/docs/appearance/title-link)
- [Google snippet guidance](https://developers.google.com/search/docs/appearance/snippet)

**Open constraint:** Prior live HTTP/TLS probes could not verify production reachability; source preview is not production SEO success.
