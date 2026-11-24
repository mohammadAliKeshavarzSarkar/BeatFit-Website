# Persian SEO Copy Optimization — Wave 1

**Date:** 2026-11-24
**Scope:** Existing marketing content and metadata. Based on integrated repair PR #46, not the currently defective main build. Separate strategy PR #47 contains the ranking targets. No new routes, device specifications, sale claims or medical claims.

## Copy decisions

| Route | Primary intent | Natural supporting search terms | Visible changes |
|---|---|---|---|
| / | BeatFit brand identity | بیت فیت، بیت‌فیت، بیتفیت، BeatFit، سیستم هوشمند پایش ضربان قلب | Hero introduction, session flow, product descriptions, article discovery and existing FAQ questions/answers; preserve the original hero slogan |
| /gym | سیستم پایش ضربان قلب باشگاه | مانیتورینگ ضربان قلب در تمرین گروهی، نمایش زنده ضربان قلب، سنسور ضربان قلب ورزشی | Hero description, equipment heading/description, ecosystem explanation and SEO title |
| /coach | پایش ضربان قلب ورزشکاران | پنل مربی، زون و شدت تمرین | Hero description and panel tool headings/description; retain distinct coach SEO title |
| /athlete | اپلیکیشن پایش ضربان قلب | ضربان قلب هنگام ورزش، تاریخچه تمرین، پیشرفت تمرین | Hero description, live section heading, history introduction and SEO title |
| /resources | آموزش پایش ضربان قلب و تمرین | محاسبه زون‌های ضربان قلب، انتخاب حسگر پوشیدنی | Hub heading and introduction; retain educational SEO title |
| /demo | آشنایی با دموی بیت‌فیت | سیستم پایش ضربان قلب | Inherit truthful metadata from PR #46; do not promise active online submission |

## Exact approved-for-review text examples

**Homepage visible hero:** با سیستم هوشمند پایش ضربان قلب بیت‌فیت (BeatFit)، شدت تمرینت رو لحظه‌ای ببین و مسیر پیشرفتت رو دنبال کن.

**Homepage FAQ:** بیت فیت چیست و چگونه کار می‌کند؟

**Gym title:** سیستم پایش ضربان قلب باشگاه و تمرین گروهی | بیت‌فیت

**Athlete title:** اپلیکیشن پایش ضربان قلب و پیشرفت تمرین | بیت‌فیت

The 13-page [metadata inventory](../inventory/2026-11-24-persian-copy-meta-keyword-inventory.csv) records the exact resulting titles, descriptions, H1s and source blob IDs. Its 13 titles and 13 descriptions were checked for uniqueness. The existing v4 keyword map retains its 113 candidate rows and page owners. The seven existing educational articles were not rewritten: their established topical headings and descriptions remain appropriate pending measured GSC performance and separate editorial review.

## Editorial boundaries

- Preserve the original home hero slogan and commercial hero headings; no layout, imagery or CSS changes. Text lengths and wrapping still require actual UI review, particularly at mobile widths.
- Brand variants are already defined in structured data; introduce Persian and Latin names naturally, without repeating unrelated fragments بیت or فیت. No artificial spelling-variant landing pages or keyword density quotas.
- Existing FAQ answers are updated in their original source, so visible content and derived structured data use the same text. Correct imprecise zone and training load explanations and remove the unsupported claim that online demo submission is available.
- Device copy is restricted to sports monitoring. No invented device specs, diagnosis, ECG, medical certification, guarantee of accuracy, lead capture or ranking.
- The exact broad terms ضربان قلب and دستگاه هوشمند پایش قلب have mixed medical/retail intent. Expand coverage in a dedicated sports-device page and monitoring guide after product facts and content scope are reviewed, rather than diluting existing pages.
- No GSC performance data available. Copy choices are qualitative search-intent improvements, not validated volume estimates or evidence of ranking improvement.

## Integration and release

This branch is built on PR #46's tested integrated repair, with its code and documentation inherited. The draft targets main for existing CI coverage; it must not be released independently of the underlying repair review. Review the copy-only commits after ab20ec3522702657d90f54fcd606916413b894e5; merge/rebase sequencing must avoid duplicating the repair. Verify source/production build, browser journeys, and visual wrapping; inspect the live page and GSC after approved deployment. No deployment or Search Console actions performed.

