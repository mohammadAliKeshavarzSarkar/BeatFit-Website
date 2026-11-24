# BeatFit — Persian Search Visibility and Ranking Program

**Date:** 2026-11-24
**Target:** Persian searchers in Iran, with device-specific reporting.
**Primary business goal:** Make beatfit.ir the leading organic destination for distinctive BeatFit brand searches and relevant sports heart-rate monitoring queries.
**Status:** Strategy/implementation brief; no rank guarantee, production change, measured search volume, or first-party ranking baseline.

## Why this is a different workstream

The owner reports that BeatFit is not visible when searching for بیت, بیت فیت, بیتفیت, فیت, ضربان قلب, پایش ضربان قلب, دستگاه هوشمند پایش قلب and related phrases. Prior work audited 13 source page identities and 113 phrase candidates. Technical readiness and keyword ownership are necessary, not sufficient for visibility.

The current source already includes Persian and Latin brand spelling variants in WebSite and Organization alternateName. Do not add generic fragments (بیت or فیت) as entity aliases solely to influence rankings. Do not create separate spelling-variant landing pages or repeat variants unnaturally.

## Observations from exploratory public web searches (not Google Iran rank tracking)

- Exploratory exact-brand and site searches did not produce a verified BeatFit first-party result in the returned sample. Independent requests to https://beatfit.ir/ and https://beatfit.ir/sitemap.xml did not return usable page bytes. This does not prove a universal outage, deindexing, or Googlebot failure. Owner reports sitemap successfully fetched in GSC; obtain actual URL Inspection.
- Fitbit (فیت‌بیت) is a distinct established brand appearing in Iranian technology content: https://digiato.com/gadgets/google-announced-fitbit-charge-6 and https://www.technolife.com/blog/%D8%A8%D9%87%D8%AA%D8%B1%DB%8C%D9%86-%D9%81%DB%8C%D8%AA-%D8%A8%DB%8C%D8%AA/
- A third-party directory describes bfit.ir as بیت‌فیت, indicating potential name collision (ownership, operation and relationship not independently verified): https://www.sitelike.org/similar/bfit.ir/
- Broad device queries return medical and retail pages, e.g. https://honammed.ir/shop/health-monitoring/heart-rate-ecg-monitors and https://www.technolife.com/category/health-beauty/health/health-measurement/heart-rate-monitors
- Commercial group monitoring examples: https://www.prismgym.com/fa and https://www.chileaf.com/fa/news/what-makes-an-ideal-heart-rate-monitor/
- Educational search examples: https://life.axon.me/articles/normal-heart-rate-in-exercise and https://varzeshcast.ir/article/sports-smartwatch-buying-guide. These are intent examples, not measured rankings, traffic, authority scores or a complete competitor list.

## Ranked goal hierarchy

1. **Brand ownership:** بیت فیت, بیت‌فیت, بیتفیت, BeatFit, Beat Fit. Aim for position 1 for relevant brand-intent searches, with home as the preferred destination. Document the spelling variants in the same entity, not multiple pages.
2. **Commercial sports monitoring:** سیستم پایش ضربان قلب باشگاه, پایش زنده ضربان قلب ورزشکاران, مانیتورینگ ضربان قلب در تمرین گروهی, دستگاه پایش ضربان قلب ورزشی, سنسور ضربان قلب ورزشی. Establish a top-10 foothold, progress to top 3, then compete for 1. Proposed targets are goals, not forecasts.
3. **Educational sports authority:** پایش ضربان قلب در ورزش, ضربان قلب هنگام ورزش, محاسبه زون ضربان قلب, کنترل شدت تمرین, سنسور بازویی and بند سینه‌ای. Build useful explanatory pages and tools with clear links to product pages.
4. **Broad ambiguous/head queries:** بیت, فیت, ضربان قلب, پایش ضربان قلب, دستگاه هوشمند پایش قلب. These mix music/crypto/data units, generic fitness, medical intent and consumer devices. Track, but do not assign a guaranteed top rank or optimize for unrelated intent. BeatFit is a sports training product, not a diagnostic medical device unless such a claim is actually supported.

## Phase 0 — establish visibility and access (release blocker)

- Integrated source repair PR #46 has successful build and two browser workflows at ab20ec3522702657d90f54fcd606916413b894e5, as inspected today. It remains open and unmerged. Review and deploy approved repair before new source SEO experiments.
- In verified Search Console property inspect https://beatfit.ir/ and collect indexed result, last crawl, crawl allowed, fetch success, indexing allowed, user-declared and Google-selected canonical, and tested live rendered HTML. Inspect /gym, /resources, and /blog/training-load after the correct deployment. Check Page Indexing, Manual Actions and Security Issues.
- Export Performance, Web, country Iran where data permits, latest 28 and 90 days, query + page relationships and device. Also retain an unfiltered baseline when volume is low. Include clicks, impressions, CTR, average position and dates. Missing query rows can reflect anonymization, low demand or lack of impressions; never treat missing as position 100.
- Use a consistent Persian Iran-oriented SERP measurement source and record query, date, region, language, device, observed organic positions, matched landing page and SERP features. Exploratory web search is not that measurement. Check bfit.ir relationship before asserting it is an unrelated company.
- After approved deployment verify actual public HTTPS 200, canonical, full initial article HTML, sitemap, robots and redirects. A sitemap fetch is not indexing proof.

## Phase 1 — brand landing and identity

Homepage owns brand variants. Preserve the existing hero slogan and visual design, but make the category clear in the visible introductory text.

**Proposed visible hero lede (review UX before editing):**

بیت‌فیت (BeatFit) سیستم پایش زنده ضربان قلب در ورزش است؛ ضربان قلب و شدت تمرینت را لحظه‌ای ببین و مسیر پیشرفتت را دنبال کن.

**Proposed first FAQ question:** بیت فیت چیست و چگونه کار می‌کند؟

**Proposed answer:** بیت‌فیت (BeatFit) یک سیستم هوشمند پایش ضربان قلب ورزشی برای ورزشکاران، مربیان و باشگاه‌هاست. حسگرهای پوشیدنی، نمایشگر کلاس و پنل مربی به دنبال‌کردن ضربان قلب و شدت تمرین در لحظه کمک می‌کنند و نتایج جلسات در تاریخچه تمرین قابل بررسی هستند.

Do not force a different title solely for spelling variants: current home title already uses بیت‌فیت | سیستم پایش زنده ضربان قلب و تمرین گروهی. Use one recognized Persian brand name and its genuine alternatives in WebSite/Organization; add verified official profile URLs via sameAs only once owner supplies them. Add a real About/company identity section or page after checking actual legal/brand facts. Do not invent founder credentials, address, corporate name, customer count or reviews.

Fix the homepage FAQ that currently promises form submission while the dedicated demo form is disabled. Keep all public claims accurate; do not invent a working contact channel. Verify any real official contact path before publishing.

## Phase 2 — content opportunities and page ownership

| Proposed owner | Primary topic | Distinct user task / required evidence |
|---|---|---|
| / | بیت فیت / بیتفیت / BeatFit | Official brand identity, product category, clear audience and links |
| /gym | سیستم پایش ضربان قلب باشگاه | Evaluate the real gym solution; class display, coach panel and supported sensors |
| /coach | پایش ضربان قلب ورزشکاران | Coach workflow; live intensity, zones, real UI and verified capabilities |
| /athlete | پایش ضربان قلب هنگام تمرین با اپلیکیشن | Athlete workflow; recorded sessions and verified app capabilities |
| /devices (proposal) | دستگاه پایش ضربان قلب ورزشی / سنسور ضربان قلب بیت فیت | Real hardware specifications, photos, placement, compatibility, instructions; only verified specs, availability and sale conditions |
| /blog/heart-rate-monitoring (proposal) | پایش ضربان قلب چیست / پایش ضربان قلب در ورزش | Definition and methods, limits, sports use, links to gym and devices; no medical diagnosis |
| /blog/heart-rate-during-exercise (proposal) | ضربان قلب هنگام ورزش | Educational guide: individual differences, measurement and intensity, appropriate expert review and sources |
| /blog/heart-rate-zones (existing) | زون ضربان قلب / محاسبه زون ضربان قلب | Improve existing page before adding duplicate; actual calculator only after scientific/UX review |
| /blog/heart-rate-sensor-comparison (existing) | مقایسه سنسور بازویی و بند سینه‌ای | Neutral comparison; no unsupported accuracy claims |
| /blog/connected-training-system (existing) | سیستم پایش ضربان قلب در باشگاه چیست | Educational evaluation distinct from /gym |
| /blog/live-class-monitoring (existing) | کنترل شدت تمرین در کلاس گروهی | Methodology for coaches distinct from /coach |
| /tools/heart-rate-zones (proposal) | محاسبه آنلاین زون ضربان قلب | Real working tool with transparent equations and limits; avoid duplicating existing article's full text; publish only when implemented |

New URLs are proposed, not approved or published. Confirm genuine demand and SERP intent, product evidence and editorial differentiation before each release. Publish first the device/product and sports monitoring pillar if those requirements are satisfied. Review health-adjacent articles with a qualified subject-matter reviewer and link to reliable sources. Add original product photography, verified screenshots, and real examples rather than generic articles.

## Phase 3 — earn authority

- Build accurate, consistent official brand profiles and links to beatfit.ir. Avoid unverified sameAs and listing claims.
- Seek voluntary links from actual partner gyms/coaches, real demonstrations, documented case studies and relevant sports technology publications. Obtain permission before naming partners or sharing data.
- Publish a useful shareable heart-rate zone tool and practical guides only if genuine value and evidence support them.
- No paid link schemes, fake reviews, bulk doorway pages, autogenerated keyword variants or manufactured search traffic.

## Measurement and release gates

Use the accompanying ranking register as a target set, not observed metrics. Review exact brand query impression/position and intended homepage match, nonbrand impressions, relevant top-10/top-3 coverage, qualified organic clicks and conversion availability. Compare like-for-like periods, device and country. GSC average position is not a fixed individual Google rank. Weekly review once there is enough data; avoid repeatedly rewriting titles or requesting indexing when nothing changed.

Priority checkpoints: indexed canonical homepage and verified live access; first-party branded impressions; top-10 brand then top-3 then position 1; nonbrand visibility and eventual competitive ranking. Track exceptions (ambiguous/mixed intent) without rank guarantees. For specific queries with impressions but weak CTR, inspect snippets and search intent before a title change. For relevant queries with no useful destination, prioritize content gap. No search volume, ranking date or traffic increase forecast is asserted.

## Official guidance

- Google Search: https://developers.google.com/search/docs/fundamentals/how-search-works
- Site names and alternate names: https://developers.google.com/search/docs/appearance/site-names
- Organization identity: https://developers.google.com/search/docs/appearance/structured-data/organization
- Crawling/indexing FAQ: https://developers.google.com/search/help/crawling-index-faq
- Helpful content: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Spam policies: https://developers.google.com/search/docs/essentials/spam-policies

**Decision:** no further blind metadata churn. Treat indexing/access and branded identity as the first milestones, followed by actual product/educational search coverage and earned authority. No deploy, rank tracking, external outreach or GSC access completed by this documentation change.
