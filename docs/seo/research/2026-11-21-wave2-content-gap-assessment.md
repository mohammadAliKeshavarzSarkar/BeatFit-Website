# BeatFit Persian SEO — Editorial Gap Discovery, Wave 2

**Date:** 2026-11-21  
**Status:** Editorial research backlog for review, not publication approval  
**Source baseline:** 13 existing public-facing routes, including seven published article slugs in `src/content/blog/posts.ts` and seven cards in `src/content/resources.ts`.  
**Language:** English documentation, Persian query hypotheses and editorial headline samples.

## Current workstream state

- Page-by-page article optimization has reached completion in the repository; PRs #27–#34 were merged. SEO Build Verification ran successfully for PR #34 (run `44888198050`). Source integrity checks run in CI.
- **Production accessibility remains an unresolved hosting diagnostic**, not an established global outage or Googlebot block. The documentation-only PR #35 remains open at this review.
- No Google Search Console page/query exports, keyword volumes, impressions or verified ranking snapshots are available. The candidate phrases below are editorial hypotheses based on BeatFit source capabilities and sampled public-search patterns. They are not demand forecasts.

## Existing URL ownership to protect

| URL | Search task | Exclude from overlapping new article |
|---|---|---|
| `/blog/زون-های-ضربان-قلب` | Zone definitions, five-range example and limitations | Generic zone definition or the identical five-zone calculator example |
| `/blog/کنترل-شدت-تمرین-در-کلاس-گروهی` | Coach method using RPE, talk test and HR | General class intensity method without a distinct task |
| `/blog/پایش-ضربان-قلب-در-باشگاه` | What group HR monitoring is and system components | Duplicate procurement/system overview |
| `/blog/تاریخچه-تمرین` | Comparing sessions and performance patterns | Generic workout history definition |
| `/blog/بار-تمرینی-چیست` | Internal/external load and sRPE examples | Duplicate calculation article with identical method |
| `/blog/مقایسه-سنسور-ضربان-قلب` | Arm/wrist/chest tradeoffs | Generic device comparison |
| `/blog/طراحی-تمرین-گروهی` | Mixed-ability class programming, illustrative 45-minute session | Another generic 45-minute class design article |

## Wave 2 opportunities — ranked qualitatively

### W2-01: How workout calorie estimates work

**Candidate Persian title:** `کالری مصرفی هنگام ورزش چطور تخمین زده می‌شود؟`  
**Primary working phrase:** `محاسبه کالری مصرفی هنگام ورزش`  
**Long-tail candidates:** `کالری ورزش با ضربان قلب چگونه محاسبه می‌شود`; `چرا کالری ساعت هوشمند با دستگاه دیگر فرق دارد`; `آیا ضربان قلب بالاتر همیشه کالری بیشتری می‌سوزاند`; `تفاوت کالری مصرفی و شدت تمرین`.

**Distinct user task:** interpret calorie estimates in workout feedback rather than equating a high calorie number with quality, health improvement or weight loss. BeatFit UI already refers to workout calories in its home proof card and product experiences; actual estimation algorithm, input fields, testing and supported sensor data still require owner verification.

**Proposed structure:** what calories measure; what an estimate depends on; why devices can disagree; why heart rate is not a direct calorimeter; useful interpretation across comparable sessions; cautious non-medical answer to FAQs. Do not disclose or invent a proprietary formula, device accuracy, or individual calorie expenditure.

**Dependencies:** confirm real BeatFit calorie calculation/product screens, qualified exercise-science review, genuinely distinct searcher intent and privacy-safe examples. **Priority P2, approval gated.**

### W2-02: Heart-rate monitoring during HIIT intervals

**Candidate Persian title:** `در تمرین HIIT ضربان قلب را چطور تفسیر کنیم؟`  
**Primary working phrase:** `ضربان قلب در تمرین HIIT`  
**Long-tail candidates:** `چرا ضربان قلب در اینتروال با تأخیر بالا می‌رود`; `زون ضربان قلب در تمرین تناوبی`; `نحوه بررسی ضربان قلب بین ست‌های HIIT`; `چرا ساعت هوشمند در HIIT عدد متفاوتی نشان می‌دهد`.

**Distinct user task:** interpret changes and delays over brief work/recovery intervals. Existing zones and sensor-comparison articles already contain background explanations. A standalone article should be created only if practical interval timeline examples and actual query differentiation justify more than expanding an existing section.

**Proposed structure:** HR response lag versus device processing delay, exercise intervals, perceived exertion, interpretation limits and coach context. Avoid fixed target-HR prescriptions for every athlete. **Priority P2 but duplicate-intent risk HIGH.**

### W2-03: Pre-class monitoring setup checklist

**Candidate Persian title:** `قبل از شروع کلاس گروهی، پایش ضربان قلب را چطور آماده کنیم؟`  
**Primary working phrase:** `آماده سازی حسگر ضربان قلب قبل از کلاس گروهی`  
**Long-tail candidates:** `نحوه بررسی اتصال حسگر در کلاس گروهی`; `چک لیست شروع کلاس با پایش ضربان قلب`; `پایش ضربان قلب چند ورزشکار در کلاس`; `آماده سازی پنل مربی قبل از تمرین`.

**Distinct user task:** operational checklist for coaches and gyms preparing real sensors and class screens, not a generic description of monitoring hardware or class programming.

**Proposed structure:** verify compatibility, device assignment, fit/placement per product instructions, permission and privacy expectations on shared display, observable signals, plan for missing readings, post-class review. **Requires BeatFit-specific actual pairing and privacy workflow evidence**; do not invent device counts or automatic recovery behavior. Consider enhancing the existing gym-system explainer before proposing a standalone page. **Priority P2, product-evidence gated.**

## Illustrative public-search evidence

These sources show that comparable **topics** exist; none supplies BeatFit keyword volume, search rankings or hardware validation:

- Persian fat-burning/heart-rate discussion: https://greensport.ir/heartbeat/ — this is a community/explanatory page, not authority for a BeatFit calorie model or a universal fat-loss zone.
- Persian Zone 2 discussion: https://feelgoodpal.com/fa/blog/zone-2-heart-rate — reinforces why zone definitions require model-specific caveats.
- Iranian exercise-science material on HRmax: https://sjh.umsha.ac.ir/files/site1/user_files_f466af/jalili-A-12-1963-3-32f6d6f.pdf — background only; a medical/exercise reviewer is still required before physiological claims.
- The project evidence register `docs/seo/research/2026-11-21-keyword-discovery-v2-evidence.csv` already documents other product, zone, coach and sensor sources.

Public retrieval was exploratory, not Iran-device-specific Google SERP measurement. Results were mixed and some low-authority sites appeared, so **no demand priority is attributed to a source result alone**.

## Editorial acceptance before any new URL

1. Confirm the intended audience, unique query task and product facts, including whether any actual tracking metrics are reliably available.
2. Get GSC page-query data or a reproducible Persian-region SERP comparison and note potential overlap with existing articles.
3. Have a qualified reviewer check calibration/estimation, exercise safety, terminology and unsupported medical conclusions.
4. Produce a substantial, unique outline and examples; prefer improving the existing article if it answers the same task.
5. Establish canonical slug, article registry entry, sitemap inclusion, homepage/resources navigation and meaningful related contextual links only when publication is approved.
6. Run the SEO build checker, the source link gate, browser QA and production deployment checks; do not conflate a passing build with live availability.
7. Measure first-party post-publication signals without claiming guaranteed rankings, impressions or conversions.

## Recommended next internal action

Start W2-01 **product fact validation** (what calorie number BeatFit actually presents, data inputs and whether its algorithm is approved for public explanation), while the hosting owner resolves the separate public reachability issue. Do not publish any of these new pages as-is.
