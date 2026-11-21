# Gym Landing Page — Focused Persian Search-Intent Qualification

**Record:** BF-SEO-INTENT-GYM-002  
**Date:** 2026-11-21  
**Target page:** `/gym`  
**Target audience:** Gym owner/manager researching an in-class live heart-rate monitoring solution  
**Source revision inspected:** `d11130cef8f941f54b06362bb9bd124f89853adb`  
**Status:** Exploratory public-web page-type comparison; **NOT** a localized, ranked Google SERP, keyword-volume study, or Search Console export.

## Working question

Does BeatFit's existing gym page communicate a distinct **live class heart-rate monitoring system**, rather than the unrelated broader category of **gym member/payment/attendance management software**?

## Queries submitted (source string retained)

| Query group | Exact Persian search phrase | Purpose |
|---|---|---|
| Monitoring 1 | `سیستم پایش ضربان قلب گروهی باشگاه نمایش زنده مربی ایران` | Test whether specialist class monitoring solutions are surfaced |
| Monitoring 2 | `مانیتورینگ ضربان قلب در باشگاه سیستم ورزشی کلاس گروهی` | Check class/screen language |
| Monitoring 3 | `سیستم نمایش ضربان قلب ورزشکاران روی نمایشگر باشگاه` | Check large-display language |
| Monitoring 4 | `نرم افزار پایش ضربان قلب کلاس گروهی باشگاه` | Compare software versus system descriptors |
| Monitoring 5 | `پایش ضربان قلب باشگاه گروهی نرم افزار مانیتورینگ زنده` | Broaden exact group-monitoring pool |
| Monitoring 6 | `سیستم ضربان قلب اعضا باشگاه نمایشگر گروهی حسگر باشگاهی` | Compare sensor and display descriptors |
| Monitoring 7 | `مدیریت کلاس گروهی باشگاه کنترل ضربان قلب مربی پنل` | Coach workflow wording |
| Broad management | `نرم افزار مدیریت باشگاه ورزشی کلاس ها حضور غیاب شهریه` | Negative-control query: detect unrelated membership/finance intent |

These samples were pooled using a general search/discovery provider. **No stable ranking positions, full result-page snapshots, Iran-specific geotargeting, device control, impressions or volumes were obtained.** Do not claim any number of competitors or positions based on this list.

## Representative results actually retrieved

| Evidence ID | URL | Page category observed | Relevance |
|---|---|---|---|
| BF-GYM-SERP-01 | https://www.fitmao.com/web/application-areas/fitness-area?lang=fa | Persian-language monitoring solution description | Heart-rate monitoring, screen devices and group application; some unrelated broad fitness claims |
| BF-GYM-SERP-02 | https://www.fitmao.com/web/heart-rate-training-system?lang=fa | Persian-language HR training system, snippet only | Heart-rate large-display / gym system terms |
| BF-GYM-SERP-03 | https://www.chileaf.com/fa/group-training-wireless-system-data-receiver-product/ | Persian equipment/receiver product | Group reception, real-time HR sensor data |
| BF-GYM-SERP-04 | https://www.getpulsesapp.com/gym-group-training-heart-rate?url_source=BlogLeaderboard | English specialist group-monitoring solution | Clear connect → monitor → analyze journey; **not** evidence of Persian ranking |
| BF-GYM-SERP-05 | https://www.pulsemonitor.net/ | English group HR product | Live group intensity, large-screen coaching; not a local ranking competitor |
| BF-GYM-SERP-06 | https://gymona.ir/ | Persian gym-management software | Membership, payments, attendance and classes; **not the same product** |
| BF-GYM-SERP-07 | https://pakoobapp.ir/ | Persian gym-management software | Membership, tuition, accounting, attendance and scheduling; **not the same product** |
| BF-GYM-SERP-08 | https://parsesport.ir/ | Persian gym-management software | Broader management rather than group HR monitoring |

**Evidence quality:** Mixed search snippets and fetched public pages. We have not independently verified every supplier claim, pricing, system capacity or feature. Competitor descriptions are examples of positioning and page type, not endorsements or head-to-head functional comparisons.

## Source-derived BeatFit capability coverage

The pinned BeatFit source in `src/content/gym.ts` describes:

- Wearable HR sensors;
- live class screen / live training display;
- trainer/coach overview;
- post-session training data and athlete history;
- app plus gym panel;
- gym setup and introductory support.

The current `gymHero.title` is emotionally led: `تجربه‌ای بسازید که اعضا ارزشش را در هر جلسه ببینند.`

The current `gymHero.body` also focuses on visibility and motivational benefit, without identifying **heart rate** or the components of the system. SEO title in `src/seo/marketing.ts` reads `پایش زنده تمرین برای باشگاه‌ها | بیت‌فیت`, which does not state **heart-rate** explicitly.

## Conclusion — limited to a content clarity hypothesis

**Moderate confidence:** Improving the gym hero paragraph and SEO title to explicitly describe group HR monitoring is semantically aligned with the existing BeatFit source and with observable specialist solutions. This is a reader-clarity and positioning experiment, **not evidence of a ranking gap or expected traffic lift**.

**High confidence:** Do not optimize the page as generic `نرم‌افزار مدیریت باشگاه` promising financial accounting, memberships or attendance. The public examples of that category clearly differ from BeatFit's sensor-led class-monitoring offer.

**Missing:** Search Console impressions, query-to-page pairs, target-market Google SERP snapshots, paid/organic distinction, user interviews and deployed rendering/HTTP checks. These remain separate verification gates.

## Proposed controlled change

Retain existing H1, images, navigation, URL and product sections. Make **two short textual edits only**: the gym hero paragraph in `src/content/gym.ts` (also used as SEO description/summary) and the SEO title in `src/seo/marketing.ts`. Changes should be reviewed and merged only after the defined gate.

See [reviewable copy proposal](../strategy/2026-11-21-gym-copy-proposal.md).

## External reference

- Google Search Central: https://developers.google.com/search/docs/appearance/title-link
- Google Search Essentials: https://developers.google.com/search/docs/essentials
