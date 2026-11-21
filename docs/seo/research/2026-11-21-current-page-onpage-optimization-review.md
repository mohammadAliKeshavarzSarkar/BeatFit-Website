# Current 13-Page SEO Titles, H1s and Keyword Placement — Review 002

**Date:** 2026-11-21  
**Source revision:** `90e16c2f14de65131615bb4d4397380bf16546a4`  
**Coverage:** All 6 marketing pages and all 7 published articles. The exact current titles/H1s are in [machine-readable inventory](2026-11-21-current-page-keyword-audit.csv). Current article metadata is generated from each `RichBlogPost.seoTitle` / `metaDescription`, not necessarily from `src/seo/marketing.ts`. Marketing pages derive from `marketingDocuments`, with homepage title also coming from `src/content/home.ts` `site.title`.

## Recommended page-by-page decisions

| Page | What is already strong | Highest-value adjustment | Gate |
|---|---|---|---|
| `/` | Brand H1, HR + history themes | Replace broader `مدیریت تمرین` metadata with group monitoring category; retain hero | Draft PR; source QA |
| `/gym` | Recent body already names sensors, class screen, coach panel and history | Maintain distinct commercial H1/title and reinforce product proof, not vague club administration | Owner product claims |
| `/coach` | H1/lede clear about monitoring class | Candidate more explicit title for HR monitoring and coach panel | Editorial review |
| `/athlete` | App/history/progress coherent | Candidate title emphasizing live HR and progress | Avoid standalone medical app claims |
| `/resources` | Search/discovery categories separate from articles | Better topical groupings and descriptive category anchor labels, no keyword stuffing | Existing catalog UX |
| `/demo` | Brand-specific intent and gym qualification | Do not promise functioning request: current form disabled. Prioritize backend/privacy | **BLOCKED** |
| Heart-zone article | Clear 5-zone title, worked examples, scientific caveat | Keep H1 and canonical; calculator intent is separate | Medical/scientific review |
| Class-intensity article | Coach how-to, HR/RPE talk test | Link to coach product with descriptive anchor | No medical prescriptions |
| Gym HR technology guide | Explains components/benefits | Distinguish title from `/gym` solution title: use "what is/how it works" instead of duplicate transactional terms | GSC page-query overlap |
| Training-history article | Clear session-progress intent | Emphasize HR/zone session comparisons over strength-set logging | Actual data fields |
| Training-load article | Definition, internal vs external, examples | Maintain a carefully qualified sRPE calculation, avoid injury prediction | Science QA |
| Sensor comparison | Accurate comparisons, study caveats | Keep informational comparison, not retail purchase intent | Device-specific verification |
| Group-class design | Clear coaching format + 45-minute sample | Add meaningful class-level examples/anchors | Coach editorial |

## Proposed content/metadata variants (review only except homepage PR)

- **Homepage `title`:** `بیت‌فیت | سیستم پایش زنده ضربان قلب و تمرین گروهی`.
- **Homepage `meta description`:** `بیت‌فیت سیستم پایش زنده ضربان قلب در تمرین‌های گروهی است؛ با حسگرهای پوشیدنی، نمایشگر کلاس، پنل مربی و تاریخچه جلسات، روند تمرین را بهتر دنبال کنید.`.
- **Homepage H1:** Keep `با بیت فیت ضربان به ضربان، بدنت رو بساز.` unchanged; it is a brand tagline, not a keyword list.
- **Gym title:** Keep current `پایش زنده ضربان قلب در باشگاه‌ها | بیت‌فیت`, supported by specific current body.
- **Coach alternative title:** `پایش زنده ضربان قلب ورزشکاران برای مربی | بیت‌فیت` (pending editorial).
- **Athlete alternative title:** `پایش ضربان قلب و پیشرفت تمرین ورزشکار | بیت‌فیت` (pending editorial).
- **Resources title:** Keep `منابع تمرین و پایش ضربان قلب | بیت‌فیت`.
- **Demo title:** Keep current branded demo title, but do not claim requests can be received.
- **Gym informational article alternative:** `پایش ضربان قلب در باشگاه چیست و چگونه کار می‌کند؟` (pending evidence-based page-intent review; avoids a near-duplicate product title).

No blanket replacement of all page titles, H1s or slugs is approved. Focus on relevance per page, not an arbitrary target count of exact-match mentions.

## Search evidence scope

See [new query assignments](2026-11-21-page-keyword-map-v2.csv) and [external representative samples](2026-11-21-keyword-discovery-v2-evidence.csv), plus [earlier 36-query baseline](2026-11-21-keyword-to-page-map.csv). All priorities are **qualitative hypotheses**. There is no first-party impressions/click query report or controlled Iran-localized mobile Google SERP rank capture.
