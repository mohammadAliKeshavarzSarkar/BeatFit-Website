# Persian Keyword Architecture — BeatFit, Source-Aware Revision 002

**Date:** 2026-11-21
**Record:** BF-SEO-KW-R002
**Source commit:** `90e16c2f14de65131615bb4d4397380bf16546a4`
**Pages:** 6 marketing URLs + 7 published Persian article URLs (13 indexed-route candidates)
**Language of content/queries:** fa-IR; **documentation:** English.
**Input:** Current `src/content/`, `src/seo/marketing.ts`, 7 `src/content/blog/*.ts`, legacy 36-query matrix and public-web research samples.
**Status:** Keyword ownership and qualitative content recommendations COMPLETE. **Not GSC-driven**, no exact Google ranking positions, monthly volume, click/impression count, CPC, SERP-feature probability or measured keyword difficulty. Public deployment reachability remained unverified during earlier live audits.

## Executive decision

**One intent → one primary URL.** The homepage owns BeatFit's brand/entity and system overview. `/gym` owns conversion-oriented group HR monitoring. `/coach` owns the coach-facing live panel workflow; `/athlete` owns the athlete app and personal session story; `/resources` owns exploration, not individual question answers; `/demo` owns branded demo inquiries only after functionality is approved. Each of the seven articles owns its distinct educational definition, how-to, method, or comparison intent.

This revision maps **113 source-qualified keyword candidate records to 13 existing pages** (not new URLs), with a separate 13-row current-title/H1 review and a 17-source external evidence register.

## Page-to-primary-intent matrix

| Canonical path | Distinct owner intent | Primary keyword | Priority |
|---|---|---|---|
| `/` | `branded_navigational_category` | بیت‌فیت | P1 |
| `/gym` | `commercial_group_hr_system` | سیستم پایش ضربان قلب باشگاه | P1 |
| `/coach` | `commercial_coach_live_monitoring` | پایش زنده ضربان قلب ورزشکاران برای مربی | P1 |
| `/athlete` | `athlete_product_experience` | پایش ضربان قلب و پیشرفت تمرین ورزشکار | P2 |
| `/resources` | `educational_hub` | آموزش پایش ضربان قلب و تمرین | P2 |
| `/demo` | `branded_demo_request` | دمو بیت‌فیت برای باشگاه | P1_BLOCKED |
| `/blog/زون-های-ضربان-قلب` | `informational_zone_definition_calculation` | زون ضربان قلب چیست | P2 |
| `/blog/کنترل-شدت-تمرین-در-کلاس-گروهی` | `informational_coaching_method` | کنترل شدت تمرین در کلاس گروهی | P2 |
| `/blog/پایش-ضربان-قلب-در-باشگاه` | `informational_group_hr_buying_guide` | پایش ضربان قلب در باشگاه چیست | P2 |
| `/blog/تاریخچه-تمرین` | `informational_session_progress` | تاریخچه تمرین و پیشرفت ورزشی | P2 |
| `/blog/بار-تمرینی-چیست` | `informational_load_definition` | بار تمرینی چیست | P2 |
| `/blog/مقایسه-سنسور-ضربان-قلب` | `informational_sensor_comparison` | مقایسه سنسور ضربان قلب بازویی مچی سینه ای | P2 |
| `/blog/طراحی-تمرین-گروهی` | `informational_group_class_design` | طراحی تمرین گروهی برای سطوح مختلف | P2 |

### Branded taxonomy and collisions

**Primary display brand:** `بیت‌فیت`. Search/query variants: `بیت فیت`, `بیتفیت`, `BeatFit`. Treat those as *semantic variants*, not four literal strings to stuff into one H1 or list of hidden keywords. Prefer a consistent branded text in the website identity, title links, navigation and structured data; naturally use only where readable.

Public search samples for English `BeatFit` returned distinct unrelated businesses at `beatfit.ch`, `beatfit.co.uk` and `beatfit.jp`. These are evidence that the romanized name alone is ambiguous; **not** proof of a trademark dispute, brand confusion for BeatFit.ir customers or Google ranking. Make the homepage's category descriptor specific to group HR training and link to uniquely branded product pages; keep only canonical `https://beatfit.ir/` for this site's identity.

### Synonym policy

| Meaning | Preferred Persian | Alternate natural variant | Caution |
|---|---|---|---|
| Monitoring | `پایش` | `مانیتورینگ` | Both natural: don't repeat both in every heading |
| Live | `زنده`, `لحظه‌ای` | `بلادرنگ` | Avoid unverifiable latency claims |
| HR | `ضربان قلب` | `HR` in technical sections | Not medical diagnosis/arrhythmia detection |
| Group | `تمرین گروهی`, `کلاس گروهی` | `گروهی` | Differentiate team sport and gym group class |
| Sensor | `حسگر پوشیدنی` | `سنسور ضربان قلب` | No BeatFit-specific lab accuracy without validation |
| Tracking | `تاریخچه جلسات` | `پیگیری پیشرفت تمرین` | Do not promise medical or causal outcomes |
| Intensity | `شدت تمرین` | `زون ضربان قلب` | Zones only as model/estimate, not personalized safe prescriptions |
| App | `اپلیکیشن ورزشکار` | `اپ ورزشکار` | Do not claim mobile platform availability not verified |

## Source-derived intent and keyword collision guardrails

1. **`/` vs `/gym`:** Homepage's `سیستم پایش ضربان قلب` is a brand/category overview; `/gym` owns `سیستم پایش ضربان قلب باشگاه` and detailed purchase/deployment fit. Do not give both an identical commercial title.
2. **`/gym` vs `/blog/پایش-ضربان-قلب-در-باشگاه`:** The two URLs are close. `/gym` answers *what BeatFit offers a gym*, the article answers *what the technology is, what components it needs and what a buyer should evaluate*. The article's current SEO title starts `سیستم پایش ضربان قلب در باشگاه`, close to the /gym title; consider future differentiation based on GSC page/query overlap and a specific how-it-works H1.
3. **`/coach` vs class-intensity article:** Product panel/real-time use case vs instructional HR/RPE/talk-test methods.
4. **`/athlete` vs training-history article:** Product features vs educational method to compare recorded sessions.
5. **`/athlete` vs heart-zone guide:** Product shows training intensity; guide explains physiology, zones and estimates.
6. **`/resources` vs articles:** Hub owns discovery/navigation; articles own informational answers and topic-specific title terms.
7. **`/demo`:** The source form is intentionally disabled. The page may still be indexable but must not promise that a lead request is successfully received. Owner approval and secure backend are separate prerequisites.

## What current sampled public results imply — no SEO-volume inference

- Specialist group-monitoring product pages exist: FitMao's Persian HR training system, Pulse Monitor and Chileaf page variants emphasize screens, wearable devices and class summaries. This supports system/monitoring/product wording for `/gym` and the homepage. Do **not** import their unverified accuracy, simultaneous sensor counts or ROI statistics.
- Heart-zone results mix educational guides and calculators. Keep the BeatFit article on definitions and examples, and consider a medically cautious *separate tool design* only after demand/UX and expert validation.
- Sensor comparisons appear next to online retail product listings. The existing BeatFit sensor comparison page owns **educational evaluation**, not `خرید سنسور ضربان قلب`; don't create transactional purchase content unless BeatFit actually sells and supports a device offer.
- `BeatFit` English brand queries surfaced distinct worldwide businesses; prefer Persian brand plus accurate category descriptors rather than a claim of exclusive generic English name ownership.
- General `تاریخچه تمرین`, `نرم‌افزار مدیریت باشگاه` and `برنامه تمرینی` results may refer to rep tracking, memberships, payments and personalized program writing. This is **not** the documented BeatFit primary value proposition.

[Evidence register](2026-11-21-keyword-discovery-v2-evidence.csv) includes exact external URLs and observations. This is an exploratory, not rank-ordered, pooled public-web sample.

## Explicit negative-keyword / claim exclusions

Avoid using these as **target pages or primary claims** absent real verified functionality: `نرم افزار حسابداری باشگاه`, `مدیریت شهریه باشگاه`, `خرید سنسور ضربان قلب ارزان`, `ثبت نام باشگاه رایگان`, `برنامه بدنسازی خودکار`, `دستگاه تشخیص آریتمی`, `دقت پزشکی ضربان قلب بیت فیت`, `بهترین سنسور ضربان قلب جهان`. Terms may be mentioned in educational comparisons when genuinely relevant; exclusion means **do not target their user task**.

## Content surfaces to optimize (in order)

1. **SEO title:** unique category/intent + BeatFit; avoid mechanical repetition.
2. **Meta description:** accurate one/two-sentence explanation of distinctive value and what page actually offers. Google may derive its own snippet; descriptions do not guarantee rankings or display.
3. **H1/hero:** preserve human brand tone unless confusing; one readable intro paragraph can carry category context without rewriting the campaign slogan.
4. **Section subheadings and examples:** match actual searcher questions, especially real gym system workflow, coach session tools, athlete history.
5. **Internal links:** descriptive, non-stuffed anchor text to next relevant page and educational support (e.g. `/gym` ↔ gym monitoring article; `/athlete` ↔ zones/history articles).
6. **FAQ/helpful media:** answer genuinely distinct reader questions; avoid using FAQ markup as a rich-results promise.
7. **Proof and verification:** only real product screenshots, documented system capabilities, and approved evidence; no fake leads, accuracy, keyword density or keyword volume.

Google documentation: 
- https://developers.google.com/search/docs/appearance/title-link
- https://developers.google.com/search/docs/appearance/snippet
- https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- https://developers.google.com/search/docs/crawling-indexing/links-crawlable

Google's documentation says the `meta keywords` tag is **not used** by Google Search. Do not add one. There is no required keyword density and stuffing is not an optimization strategy.

## Release and analytics gates

**Do not claim** any query ranks, is indexed, yields traffic or has a specific volume without first-party GSC or audited third-party keyword metrics. If Search Console access is established, record 3-month/16-month query-page data (clicks, impressions, CTR, position and country/device) and distinguish query-index discovery from page performance before reprioritizing.

Earlier external HTTPS probes did not reliably retrieve `beatfit.ir`; changes made in source/preview CI are not proof of deployed live HTML or crawler access. A future deployed SEO release must pass real HTTPS, robots, Sitemap, canonical, page HTML and Search Console inspection independently.

**Next source action:** One small homepage SEO title + meta description Draft PR, leaving hero, URL, site visual copy and schema entity IDs unchanged. Followed by the more commercially valuable `/gym` vs gym-guide conflict review, coach/product title and athlete title as separate editorial choices.
