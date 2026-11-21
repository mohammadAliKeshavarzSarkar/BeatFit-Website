# Persian Search Discovery and Intent Research — Evidence Sample 001

**Record ID:** BF-SEO-R01-R08-001  
**Date:** 2026-11-21  
**Website / market hypothesis:** beatfit.ir / Persian-speaking fitness audiences (initial Iran focus, not independently confirmed)  
**Website source snapshot:** `d11130cef8f941f54b06362bb9bd124f89853adb`  
**Target language:** fa-IR; documentation language: English  
**Status:** Completed **exploratory public-web discovery sample**; not a geographic Google SERP capture, GSC query export or search-volume study.

## Executive finding

The observed public search-result samples reveal **at least three distinct page-type contexts**:

1. **Gym / group-monitoring solution:** specialist vendor / platform / equipment descriptions, often in English or translated Persian. Commercial query classification remains **low-confidence** because the tool returned relatively few exact-match local vendor pages.
2. **Heart-rate zones and practical training:** explanatory articles **and interactive calculators** coexist in the sample. A purely explanatory page may not address every calculator-seeking user.
3. **Sensor types and buying:** retailer category/product listings coexist with independent comparison/explanatory pages. Mixed product-buying versus research intent needs a deliberate primary URL choice.

Additional source discovery shows workout-history articles, group-training planning material and training-load guides, but sampled result sets are narrower and should not be interpreted as market-wide demand.

**Primary implication:** Refresh and test existing BeatFit pages before multiplying URLs for variants. Prefer direct answers, relevant comparisons, accurate product demonstrations and appropriate next steps over template volume.

## Method and limits

On **2026-11-21**, submitted groups of Persian-language informational, commercial and comparison queries to a general web discovery/search service, using both broad and focused samples. Reviewed titles, excerpts and, where possible, fetched page content. Results are **pooled across batched queries**, and the tool is **not an instrumented Google Search results page**. Thus:

- The sample does **not** support position/rank claims, exact top-10 ordering, search volumes, keyword difficulty, paid-vs-organic separation or exhaustive SERP coverage.
- Geographic localization, user personalization and mobile/desktop differences are uncontrolled. A missing direct result for `site:beatfit.ir` is **inconclusive** for Google indexation.
- All described competitive patterns are **observations from available result pages only**. Query variants in the working map are hypotheses, not validated demand.
- Source files below are pinned to a commit; live deployment, accessible page content and actual product capabilities were not independently verified.
- Published dates are as displayed by the retrieval provider and may differ from original publication or significant update dates. No traffic data was collected.

The exact query samples and representative result URLs are in [discovery evidence register](2026-11-21-search-evidence-register.csv). The map of candidate variants to existing pages is [keyword-to-page matrix](2026-11-21-keyword-to-page-map.csv).

## Discovery findings by search task

### C01 — Gym: group heart-rate monitoring solution

**Queries sampled:**
- `سیستم پایش ضربان قلب باشگاه کلاس گروهی نمایش زنده`
- `مانیتورینگ ضربان قلب در باشگاه ورزشی سیستم نمایشگر`
- `سیستم پایش ضربان قلب گروهی باشگاه myzone فارسی`
- `پایش ضربان قلب باشگاه سیستم نرم افزار سنسور گروهی نمایشگر`

**Observed page types:**
- [FitMao fitness application area, Persian](https://www.fitmao.com/web/application-areas/fitness-area?lang=fa): product/solution exposition with live HR and group-class examples.
- [Chileaf group training system, Persian](https://www.chileaf.com/fa/soccer-athletic-heart-rate-monitor-group-training-system-product/): device/system product page; result excerpt seen but opening failed.
- [FitCollab group HR solution](https://www.fitcollab.net/en/): English-language vendor describing live group displays and class reports.
- [Pulse Monitor](https://pulsemonitor.net/): English-language group-monitoring product.

**Interpretation (low to medium confidence):** The discovery pool contains genuine group-monitoring solution pages, but the exact Persian gym-buyer query space is under-observed and mixes equipment vendors with complete systems and non-Persian pages. Do not claim low competition or a guaranteed opportunity.

**BeatFit existing destinations:** `/gym` as the commercial primary; `/blog/پایش-ضربان-قلب-در-باشگاه` as educational support.

**Testable content hypothesis:** The current benefit-led gym H1 could be supported by an easily scannable Persian description of the **complete system**: sensor → live class screen → coach panel → session history; clear intended customer, onboarding constraints and defensible available capabilities. Do not invent pricing, simultaneous-sensor limits, medical capabilities or retention percentages.

### C02 — Athlete: five heart-rate zones and calculation

**Queries sampled:**
- `زون ضربان قلب چیست ۵ زون تمرینی`
- `زون 2 ضربان قلب چیست محاسبه`

**Observed page types:**
- [CaloNote Persian heart-rate-zone calculator](https://calonote.com/fa/heart-rate-zone/) — age-based zone calculator.
- [Fitova Karvonen zone calculator](https://fitova.ir/tools/heart-rate-zones) — age and optional resting HR for five zones.
- [Cycling training-zone guide](https://docharkhehmag.ir/training-zones-cycling/) — educational explainer.
- [Zone 2 explainer](https://feelgoodpal.com/fa/blog/zone-2-heart-rate) — specific zone educational page.
- [Zone 2 training article](https://mojekooh.com/zone-2-training-guide-what-is-it-benefits/) — topic-specific explainer.

**Interpretation (medium confidence for mixed informational/tool page types):** One semantic cluster has **both reading and calculation tasks**; a calculator is a possible useful supplement, not proof that an entire new tool must be built or that it ranks better.

**Existing destination:** `/blog/زون-های-ضربان-قلب`, linked from `/resources` and `/athlete`.

**Recommended next step:** QA existing five-zone explanations and formulas, show a clearly labeled **illustrative** calculation with limitations, link to sensor explanation, and optionally prototype a useful accessible calculator only after scope and safety/content review. Avoid hard-coded personalized exercise prescriptions or claims that any universal formula is medically precise.

### C03 — Coach: class intensity control

**Queries sampled:**
- `کنترل شدت تمرین در کلاس گروهی مربی`
- `پایش ضربان قلب ورزشکاران کلاس گروهی نرم افزار`

**Observed page types:**
- [Iranian clinical research context on heart-rate intensity](https://sjh.umsha.ac.ir/) was surfaced via an associated journal PDF, not a directly verified coaching SERP landing page.
- [ACE practical class-intensity guidance](https://www.acefitness.org/continuing-education/prosource/april-2016/5856/how-to-monitor-participants-intensity-in-group-fitness-classes/) — English authoritative practical reference covering HR, RPE and talk test.
- Commercial group-monitoring vendors appeared in mixed discovery batches.

**Interpretation (low confidence for Persian organic competition):** Public-web evidence is **insufficient to describe the exact Persian SERP mix**. ACE provides **content accuracy context**, not evidence of where BeatFit ranks against Persian coaches.

**Existing destination:** `/blog/کنترل-شدت-تمرین-در-کلاس-گروهی`; product bridge `/coach`.

**Content hypothesis:** Explain when live HR supports coaching decisions and why coach observation, perceived effort and participant-specific variation remain important. Validate product-specific dashboard examples against actual application behavior.

### C04 — Athlete / buyer: armband vs watch vs chest strap

**Queries sampled:**
- `سنسور ضربان قلب بازویی یا بند سینه ای ساعت هوشمند`
- `مقایسه دقت سنسور ضربان قلب بازویی مچی سینه‌ای`

**Observed page types:**
- [Kiyan Darya HR armband category](https://kiyandaria.com/cat/heart-rate-monitor-armband) — retail category and product guide.
- [Technolife HR sensor model page](https://www.technolife.com/product-71876/) — retail product.
- [Varzeshcast smartwatch buying guide](https://varzeshcast.ir/article/sports-smartwatch-buying-guide) — buying/explanatory editorial.
- [Peer-reviewed device-accuracy comparison](https://pmc.ncbi.nlm.nih.gov/articles/PMC13358589/) — evidence for device-specific variability (reference and clinical/source reliability should be verified).

**Interpretation (medium confidence):** Transactional queries may prefer retailer/product pages while "which is better" questions support comparisons. Mixing those in one page can be useful only if it serves user intent clearly.

**Existing destination:** `/blog/مقایسه-سنسور-ضربان-قلب`; link to `/gym` only for purchasers evaluating a group system.

**Content caution:** No blanket assertion that armband, wrist or chest sensors are **always** most accurate; measurement accuracy varies by sensor technology, device, placement and motion. Do not claim BeatFit's specific sensor accuracy without own validation.

### C05 — Athlete: session history and progress

**Query sampled:** `تاریخچه تمرین پیشرفت ورزشی ثبت جلسات تمرین تحلیل`

**Observed examples:**
- [ProGym workout progress tracking](https://www.progym.ir/mag/%DA%86%D8%B7%D9%88%D8%B1-%D9%BE%DB%8C%D8%B4%D8%B1%D9%81%D8%AA-%D8%AA%D9%85%D8%B1%DB%8C%D9%86-%D8%B1%D8%A7-%D8%A7%D9%86%D8%AF%D8%A7%D8%B2%D9%87-%D8%A8%DA%AF%DB%8C%D8%B1%DB%8C%D9%85-%D8%B1%DA%A9%D9%88%D8%B1%D8%AF%D9%87%D8%A7-%D8%A7%D9%86%D8%AF%D8%A7%D8%B2%D9%87-%D9%87%D8%A7-%D9%88-%D8%B9%DA%A9%D8%B3) — general training-record methods.
- [ParsinDade training records and progress](https://parsindade.com/blog/strength-training-tracking-and-progressive-overload) — app-linked record keeping.

**Interpretation (medium confidence):** Generic workout logs, strength-training sets and progress tracking are competing interpretations; BeatFit's HR/session-history differentiator must be explicit, but do not pretend it replaces full workout programming.

**Existing destination:** `/blog/تاریخچه-تمرین`; `/athlete` for product.

**Hypothesis:** Add a **realistic annotated session comparison** with what BeatFit actually records, including limits of drawing conclusions from a single session.

### C06 — Coach: design a mixed-ability class

**Queries sampled:**
- `طراحی کلاس تمرین گروهی مربی سطوح مختلف آمادگی`
- `طراحی تمرین گروهی برای افراد با آمادگی متفاوت مربی`

**Observed examples:**
- [WorkoutInGym group training design](https://workoutingym.com/fa/articles/group-training-program-design-balance-scalability) — practical instructor guide, different fitness levels.
- [EL Yoga multilevel class design](https://elyoga.ir/multilevel-yoga-class-sequencing/) — sport-specific instructional guide.
- [Taaghche group-training design book listing](https://taaghche.com/book/138460/) — book catalog, not software vendor.

**Interpretation (medium confidence for practical educational intent):** Page types are guides and coursework; a solution landing page should not be the only answer to these questions.

**Existing destination:** `/blog/طراحی-تمرین-گروهی`. Keep a clear method and exercise substitutions; connect to `/coach` only after helping readers complete the instructional task.

### C07 — Athlete / coach: training load

**Queries sampled:**
- `بار تمرینی چیست محاسبه فشار تمرین`
- `بار تمرینی چیست محاسبه بار تمرینی sRPE`

**Observed examples:**
- [Specialized training-load explanation](https://fa.icehockeyman.com/2026/08/27/what-is-internal-training-load-in-hockey/) — sport-specific content.
- [Iranian literature review listing](https://www.magiran.com/paper/2689658/) — scientific context on workload and injury, not a direct product competitor.
- [SportPrompt training-load skill](https://sportprompt.ir/skills/training-load-recovery-skill/) — a workflow, not an editorial competitor.

**Interpretation (low confidence for SEO opportunity):** Mixed scientific, sport-specific and workflow content; not enough evidence to assign search volume or infer a preferred Google format.

**Existing destination:** `/blog/بار-تمرینی-چیست`.

**Hypothesis:** Keep definitions of internal/external load and sRPE distinct; clarify that particular training-load measures are not interchangeable with raw BeatFit points or an injury predictor.

### C08 — Brand and indexability

**Discovery sample:** `site:beatfit.ir` and `site:beatfit.ir/blog` returned no dependable BeatFit site entries from the available tool.

**Interpretation:** **INCONCLUSIVE**. This is *not* an indexing test. No conclusion about whether Google indexed BeatFit can be made without first-party Search Console evidence or a properly captured search environment. Preserve the existing technical gate.

## Competitive content patterns (not market-share or ranking claims)

| Pattern | Representative source | Observed useful format | BeatFit response |
|---|---|---|---|
| Full gym monitoring systems | FitMao, FitCollab, Pulse Monitor | Hardware + group screen + coach workflow + reporting | Make `/gym` explicit about real system components and use-case scenarios |
| Practical zone calculators | Fitova, CaloNote | Inputs, outputs, contextual explanations | Improve zone guide and consider optional tool prototype |
| Exercise-intensity coaching | ACE and group-training sources | RPE, talk test, HR, scaled exercises | Distinguish HR feedback from clinical diagnosis, explain coaching application |
| Sensor buying/research | Kiyan Darya, Technolife, Varzeshcast | Product filters and comparison attributes | Keep BeatFit educational comparison objective; describe relevant group-system advantages with verified claims |
| Session progression | ProGym, ParsinDade | Repeatable records, examples and comparisons | Add realistic HR/session-history example and limits |
| Group class design | WorkoutInGym, EL Yoga | Step-by-step practical class design | Enhance current mixed-ability 45-minute example rather than create duplicate content |

## Recommended prioritization — proposed, not approved implementation

**Priority P1 — Existing page clarity and commercial conversion:**
- `/gym`: clearly explain actual system components, supported use cases and implementation steps; do not rely only on value-led headline.
- `/demo`: previously confirmed submit handler is nonfunctional in reviewed source (BF-SEO-F01); fixing requires backend/privacy plan and separate authorization.
- `/athlete` and article CTAs: align next actions with audience instead of directing all informational visits into a gym-only form (BF-SEO-F07/08).

**Priority P2 — Editorial improvement of published pages:**
- `/blog/زون-های-ضربان-قلب`: worked example, interpretation and important limitations; validate safety; optional calculator feasibility.
- `/blog/مقایسه-سنسور-ضربان-قلب`: evidence-limited comparison matrix, placement/technology/accuracy caveats.
- `/blog/تاریخچه-تمرین`: realistic example using genuine tracked dimensions.
- `/blog/کنترل-شدت-تمرین-در-کلاس-گروهی`: complementary HR/RPE/talk-test guidance and practical coaching flow.

**Priority P3 — Subsequent research before new URLs:**
- Confirm genuine unserved intent for `زون ۲` as a distinct page vs subsection.
- Determine whether any gym-buyer subtopic deserves a separate landing page; do not infer from a small discovery sample.
- Evaluate Search Console impressions, clicks, query/page pairs and stakeholder interviews before assigning volume or forecast.

## Reproducibility / next evidence gate

To advance from exploratory discovery to verified SERP opportunity, capture **exact Google Search results in a chosen target market** with search date, locale, language, device, page-type coding and the first-page results (and personalization caveats). Obtain first-party GSC data where authorized; compare impressions/clicks and canonical landing pages. This phase cannot claim actual ranking positions.

**Google principles consulted:**
- [Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Influencing title links](https://developers.google.com/search/docs/appearance/title-link)
- [JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
- [Internal links and sitelinks](https://developers.google.com/search/docs/appearance/sitelinks)

**Related BeatFit documents:** [seed map](2026-11-21-persian-intent-seed-map.md), [page-intent audit](../audits/2026-11-21-page-intent-and-conversion-review.md), [technical gate](../verification/2026-11-21-production-access-and-test-plan.md).
