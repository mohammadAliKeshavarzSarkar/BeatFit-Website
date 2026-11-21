# Page Intent and Conversion Alignment — Source Review

**Record:** BF-SEO-AUDIT-002
**Date:** 2026-11-21
**Source revision:** `d11130cef8f941f54b06362bb9bd124f89853adb`
**Target:** BeatFit, beatfit.ir; Persian-only SEO
**Evidence:** `src/seo/marketing.ts`, `src/content/{home,gym,coach,athlete,resources,demo}.ts`, `src/content/blog/*.ts`, `src/components/{DemoForm,ResourcesCatalog,BlogArticle}.tsx`.
**Method:** Direct source reading; no deployed/browser test, actual query demand or live ranking assertion.

## 1. Six marketing pages

| Route | Existing page title / SEO position | Existing on-page H1 | Intended audience / intent (analyst interpretation) | Source review |
|---|---|---|---|---|
| `/` | `بیت‌فیت \| مانیتورینگ زنده ضربان قلب و مدیریت تمرین` | `با بیت فیت ضربان به ضربان، بدنت رو بساز.` | Brand and cross-audience product discovery | Hero emotional story differs from specific technical SEO title; evaluate whether a crawlable visible product explainer sufficiently joins them |
| `/gym` | `پایش زنده تمرین برای باشگاه‌ها \| بیت‌فیت` | `تجربه‌ای بسازید که اعضا ارزشش را در هر جلسه ببینند.` | Gym decision-maker commercial evaluation | SEO title strongly names the audience; the H1 is benefit-led but doesn't identify gyms or the product itself |
| `/coach` | `دید زنده از کلاس برای مربی \| بیت‌فیت` | `دید زنده از وضعیت کلاس، برای تصمیم‌های روشن‌تر مربی` | Coach evaluation/use cases | Title and H1 aligned in concept; validate query language in Persian SERPs |
| `/athlete` | `شدت تمرین، تاریخچه و پیشرفت ورزشکار \| بیت‌فیت` | `از لحظه تمرین تا مسیر پیشرفت، همراهت هستیم.` | Athlete product understanding | Page content is athlete-focused; conversion CTA routes to the gym-only demo form |
| `/resources` | `منابع تمرین و پایش ضربان قلب \| بیت‌فیت` | `برای بهتر تمرین‌کردن، بیشتر بدانید.` | Educational discovery across three groups | Seven catalog articles; grouping in source is 1 gym, 2 coach and 4 athlete. The catalog/search is React-rendered (initial SEO shell contains only headline and summary) |
| `/demo` | `درخواست دمو بیت‌فیت برای باشگاه \| بیت‌فیت` | `تجربه بیت فیت را در باشگاه خود ببینید.` | Gym lead conversion | Content and form are explicitly gym-specific; submission code prevents default without sending data (already BF-SEO-F01) |

**Interpretation:** Distinct titles and page metadata already exist. No claim is made about Google choosing these titles or ranking them. Title length, CTR and query fit should be evaluated with first-party and real search evidence, not arbitrary character-count rules. Google may consider visible main headings when producing title links.

## 2. Source-confirmed conversion mismatches

### BF-SEO-F07 — Athlete-to-demo destination mismatch

**Severity:** P2 UX/conversion hypothesis (subject to approved user journeys).
**Source evidence:** `src/content/athlete.ts` defines `athleteBanner.ctaHref="/demo"`; `src/content/demo.ts` asks for gym name, gym type and city, and says `اطلاعات باشگاه خود را ثبت کنید`.
**Observed source behavior:** An athlete-facing call to action opens a gym-oriented form.
**Potential issue:** Individual athletes who are not gym owners may abandon or enter irrelevant business data.
**No live metric:** Bounce, completion and abandonment impact NOT VERIFIED.
**Proposal:** Define a distinct athlete path or segment-specific guidance before changing the CTA; do not invent a new landing URL or lead endpoint until approved.
**Acceptance:** Product owner confirms audience journey, labels match destination, and controlled navigation/form usability tests are recorded.

### BF-SEO-F08 — Educational article CTA defaults to gym demo

**Severity:** P2 conversion relevance candidate.
**Source evidence:** `src/components/BlogArticle.tsx` links the general article-footer CTA to `/demo`; published topics include athlete-oriented education and comparisons.
**Observed source behavior:** All seven article templates use the same bottom demo CTA while the receiving form is gym-specific.
**Proposal:** Define an audience-aware conversion matrix and preserve educational trust. Consider related-content or relevant feature CTA for informational intent, and commercial demo CTA for relevant gym intent; no automatic content changes.
**Acceptance:** CTA coverage map approved and validated on articles in each intent segment.

### BF-SEO-F09 — Homepage wording and commercial terminology require SERP validation

**Severity:** P3 content opportunity; not a technical failure.
**Source evidence:** `src/content/home.ts` H1 and `src/seo/marketing.ts` title target different levels of product specificity; `src/content/gym.ts` uses aspirational H1 with direct SEO title.
**Hypothesis:** A clear, human-written product definition adjacent to emotive hero copy could improve understanding for unbranded visitors.
**No claim:** Search demand, click-through effect or title-link rewriting have not been measured.
**Proposal:** Validate user questions and actual Persian results before recommending copy changes. Preserve established BeatFit brand tone.

## 3. Seven published article topics and link evidence

| Current slug | Core observed article topic | Primary provisional audience |
|---|---|---|
| `زون-های-ضربان-قلب` | Understanding five heart-rate training zones | Athlete; coach |
| `کنترل-شدت-تمرین-در-کلاس-گروهی` | Controlling effort in group classes | Coach |
| `پایش-ضربان-قلب-در-باشگاه` | Live heart-rate system in a gym | Gym manager |
| `تاریخچه-تمرین` | Using workout history to understand progress | Athlete |
| `بار-تمرینی-چیست` | Training-load concepts and interpretation | Athlete; coach |
| `مقایسه-سنسور-ضربان-قلب` | Armband, watch and chest-strap comparison | Athlete; gym purchaser |
| `طراحی-تمرین-گروهی` | Designing mixed-ability group classes | Coach |

All seven observed article modules define `relatedSlugs`, and contain `faq` and `sources` blocks. This **confirms existence in source only**, not evidence quality, link correctness, exact visual rendering or supported rich-result eligibility.

The seven articles already form useful source-content clusters; do not create duplicate pages without an evidence-backed intent gap.

## 4. Proposed page/CTA ownership (not approved)

| Audience | Initial landing candidate | Supporting topics | Conversion direction to validate |
|---|---|---|---|
| Gym operator | `/gym` | Gym HR monitoring; sensor comparison | Qualified demo with actual submission |
| Coach | `/coach` | Group intensity and class design; training load | Demo or coach-specific inquiry after product decision |
| Athlete | `/athlete` | Zones, history, training load, sensor comparison | App/onboarding or club discovery instead of unqualified gym form |
| General education | `/resources` | Seven existing articles | Related article / audience-specific next step |

This table is a **source-derived working hypothesis**. No volume, keyword difficulty, SERP authority, conversion rate or rankings have been fabricated.

## 5. Recommended verification

1. Record which user types the product currently accepts and the actual approved destination for each audience.
2. In a rendered browser, trace CTA links from `/`, `/gym`, `/coach`, `/athlete`, `/resources` and the seven articles.
3. Check the receiving form labels, required/optional fields, real submission, accessible errors and privacy notices.
4. Use real Persian query and Search Console data to review page title/H1 alignment before changing copy.
5. Keep all SEO implementation suggestions separate from approved changes; site code was not modified.

## Google references

- [Title links and visible headings](https://developers.google.com/search/docs/appearance/title-link)
- [JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
