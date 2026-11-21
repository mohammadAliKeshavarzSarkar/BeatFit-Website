# Persian Audience and Search Intent — Source-Derived Seed Map

**Record:** BF-SEO-R01-SEED-001
**Date:** 2026-11-21
**Language:** Persian (`fa-IR`) only
**Status:** DRAFT — source-derived hypotheses, not completed SERP or keyword demand research.
**Evidence:** Actual six marketing page descriptions, seven published article titles, catalog categories, headings and features at `d11130cef8f941f54b06362bb9bd124f89853adb`.

## 1. Research boundary

These are candidate ways prospective users may express needs in Persian. They are **not observed queries, search-volume estimates, keyword difficulty scores or asserted rankings**. The available public domain lookup did not provide reliable site visibility evidence. Complete R01–R10 research and Search Console validation are future work.

## 2. Initial audience × need × page map

| Segment | Search task hypothesis | Sample Persian candidate queries (unverified) | Current suitable landing page | Supporting articles |
|---|---|---|---|---|
| Gym owner/manager | Choose a real-time class monitoring solution | `سیستم پایش ضربان قلب باشگاه`; `مانیتورینگ ضربان قلب کلاس گروهی`; `نمایش ضربان قلب ورزشکاران در باشگاه` | `/gym` | `/blog/پایش-ضربان-قلب-در-باشگاه`; `/blog/مقایسه-سنسور-ضربان-قلب` |
| Coach | Track and interpret group workout intensity | `کنترل شدت تمرین گروهی`; `زون ضربان قلب در کلاس`; `پایش ورزشکاران هنگام تمرین` | `/coach` | `/blog/کنترل-شدت-تمرین-در-کلاس-گروهی`; `/blog/طراحی-تمرین-گروهی` |
| Athlete | Understand pulse and exercise zones | `زون ضربان قلب چیست`; `زون های ضربان قلب`; `محاسبه زون تمرینی` | `/athlete` for product; relevant article for educational query | `/blog/زون-های-ضربان-قلب` |
| Athlete | Review training progress | `تاریخچه تمرین`; `تحلیل پیشرفت ورزشی`; `بررسی شدت تمرین` | `/athlete` | `/blog/تاریخچه-تمرین`; `/blog/بار-تمرینی-چیست` |
| Athlete/coach | Compare heart-rate sensors | `مقایسه سنسور ضربان قلب`; `بند سینه ای یا سنسور بازویی`; `ساعت هوشمند یا بند سینه ای` | Informational comparison article | `/blog/مقایسه-سنسور-ضربان-قلب` |
| Brand-aware visitor | Understand BeatFit and request product information | `بیت فیت`; `بیت‌فیت باشگاه`; `دمو بیت فیت` | `/`, `/gym`, `/demo` | Product pages, qualified demo path |

## 3. Localization / R09 rules

Preserve literal raw query text before normalization. Explicitly group variants involving `ی/ي`, `ک/ك`, half-space/ZWNJ (e.g., `بیت فیت` vs `بیت‌فیت`), Persian/Arabic numerals and `سنسور` vs `حسگر`. Do not assume such variants have equal demand or different intent until actual SERP review. Keep current Persian canonical URLs stable and avoid near-duplicate landing pages for spelling variants.

## 4. Open research questions

1. Which commercial audience generates qualified paying leads: gym owners, coaches or both?
2. Do Persian SERPs for gym-monitoring terms favor vendors, gyms, educational explainers or marketplaces?
3. Are `سیستم پایش ضربان قلب`, `مانیتورینگ تمرین` and `نمایش زنده ضربان قلب` the same intent cluster?
4. What query language do Persian gym buyers use for live screens vs wearable devices vs coaching analytics?
5. How much current demand is branded vs unbranded in Search Console?
6. Which of the seven existing article pages get impressions and clicks, and which need differentiated supporting content?
7. What legal/scientific review and product-claim evidence is required for fitness/heart-rate guidance?

## 5. Required next observations

- Log exact source URLs, collection date, query spelling, location/device configuration, observed top results and result page types.
- Use first-party GSC impressions and query/page pairs when authorized; do not fabricate volumes from organic rankings.
- Normalize query variants for comparison only. Use distinct underlying user intents to drive page architecture.
- Match each validated intent to one primary destination; identify overlap and internal links before creating content.
- Evaluate informational-to-commercial transitions for each audience, especially athlete-to-gym-demo mismatches.

## Source inputs

- `src/content/{home,gym,coach,athlete,resources,demo}.ts`
- `src/content/blog/{posts,heartRateZones,groupClassIntensity,gymHeartRateMonitoring,trainingHistory,trainingLoad,heartRateSensorComparison,groupClassDesign}.ts`
- `src/seo/marketing.ts`
