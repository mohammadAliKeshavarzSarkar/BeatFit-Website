# BeatFit — All-Page Persian SEO Keyword Readiness Review

**Record:** BF-SEO-ONPAGE-2026-11-24  
**Date:** 2026-11-24  
**Scope:** Current GitHub `main` source of six marketing routes and seven published articles; 113 previously researched phrase candidates; public search terminology samples.  
**Documentation language:** English. Website text and target queries: Persian (`fa-IR`).  
**Status:** SOURCE REVIEW COMPLETE; live production and first-party Search Console keyword effectiveness NOT VERIFIED in this review.  
**Supporting evidence:** [Current 13-page metadata, descriptions and H1s](../inventory/2026-11-24-current-13-page-meta-keyword-inventory.csv), [113 keyword candidates mapped to current public URLs](../research/2026-11-24-canonical-keyword-map-v3.csv), [original 2026-11-21 intent research](../research/2026-11-21-persian-keyword-architecture-v2.md), [historical source review](../research/2026-11-21-current-page-onpage-optimization-review.md), and [2026-11-23 URL-identity decision](2026-11-23-article-url-identity-and-gym-intent-review.md).

## Executive finding

Current source defines **13 distinct indexable page destinations** with **13 distinct SEO titles** and **13 distinct meta descriptions**, including the branded commercial hierarchy, informational hub and seven substantial educational guides. Page owners are separated by searcher task. Current title/header copy is mainly suitable; broad title rewrites, artificial exact-match frequency targets and extra pages for synonyms are **not warranted by current evidence**. The research map created before the ASCII public URL transition is historically valid but no longer a deployable public-path map; the new v3 fixes the mapping without losing the original keyword rows.

This is **not a 13/13 Google indexing pass, ranking audit, search-volume validation or proof that Google renders all article bodies**. User reported adding Search Console and successfully fetching a sitemap, but this review had no connected first-party query/page export, URL Inspection output, approved live production HTML evidence or verified Google-selected canonicals. A remote public retrieval attempt in this review also did not return usable BeatFit page bytes; do not infer Googlebot failure or site-wide downtime from this vantage.

## Page-by-page owned keyword and decision

| Current canonical source path | Principal candidate / search intent | Current source title quality | Decision |
|---|---|---|---|
| `/` | `بیت‌فیت` — brand and category discovery; group live HR | Explicit category and brand; human H1 intentionally aspirational | **KEEP**. Distinguish this BeatFit from unrelated name matches; check branded query landing pages |
| `/gym` | `سیستم پایش ضربان قلب باشگاه` — gym purchasing/evaluation | Good commercial wording; sensors, live screen, coach panel and saved sessions in body | **KEEP**. Confirm true product capabilities, monitor overlap with the informational gym guide |
| `/coach` | `پایش زنده ضربان قلب ورزشکاران برای مربی` — coach panel | Product/persona-specific, not a generic class-programming article | **KEEP**. Verify live panel, alert wording and use-case facts |
| `/athlete` | `پایش ضربان قلب و پیشرفت تمرین ورزشکار` — athlete app/session | Own live zones and session-history/product intent | **KEEP**. Check accuracy of featured screenshot alt text and representative data fields |
| `/resources` | `آموزش پایش ضربان قلب و تمرین` — informational browsing hub | Distinct hub title, seven article discovery cards, reader-audience filters | **KEEP**. Avoid creating indexed thin filter URLs just for keyword variants |
| `/demo` | `دمو بیت‌فیت برای باشگاه` — branded product inquiry | Brand repeated in current title `درخواست دمو بیت‌فیت برای باشگاه \| بیت‌فیت`; copy suggests a demo journey | **REVIEW / OWNER GATE**. The onsite request form is intentionally disabled. Do not optimize as a working conversion service or promise submission; owner to choose accurate title/description and active contact flow |
| `/blog/heart-rate-zones` | `زون ضربان قلب چیست` — five zones and calculations | Clear question, examples, distinctions and limitations | **KEEP**. Do not promise a calculator that does not exist; maintain scientific Zone 2 caveats |
| `/blog/live-class-monitoring` | `کنترل شدت تمرین در کلاس گروهی` — HR, RPE and talk-test method | Well differentiated from `/coach` product use | **KEEP**. Preserve complementary-method and individualized-intensity cautions |
| `/blog/connected-training-system` | `پایش ضربان قلب در باشگاه چیست` — definition, components, evaluation | Explanatory title differentiated from commercial `/gym` | **KEEP**. Use GSC query-page pairs before making a cannibalization claim |
| `/blog/workout-history-progress` | `تاریخچه تمرین و پیشرفت ورزشی` — interpreting HR sessions | Clear, specific session comparisons; not strength logging | **KEEP**. Verify product-specific metrics vs available UI |
| `/blog/live-tv-group-training` | `بار تمرینی چیست` — training-load basics/sRPE | **Title/body strong, public slug semantically wrong** (Live TV vs training load) | **P1 REVIEW**, [URL migration plan](2026-11-23-article-url-identity-and-gym-intent-review.md). Retain existing URL until canonical/301/indexing decision |
| `/blog/heart-rate-sensor-comparison` | `مقایسه سنسور ضربان قلب بازویی مچی سینه ای` — wearables comparison | Strong descriptive title and useful multi-device distinctions | **KEEP**, ensure no universal accuracy/diagnostic promises; review model-specific sources |
| `/blog/group-class-design` | `طراحی تمرین گروهی برای سطوح مختلف` — mixed-level class design | Specific coach learning goal and 45-minute worked example | **KEEP**. Preserve accurate timings, link naturally to coach capability |

The full *current exact* title, meta description, visible H1, characters and source-file SHA per page appear in the [inventory CSV](../inventory/2026-11-24-current-13-page-meta-keyword-inventory.csv). Do not confuse these source observations with Google's chosen search-result snippets or live titles.

## Keyword architecture review

- **Brand category:** `بیت‌فیت`, `بیت فیت`, `بیتفیت`, `BeatFit`; use accurate brand/entity signals rather than stuffing lexical variants into every paragraph.
- **Commercial gym solution:** `سیستم پایش ضربان قلب باشگاه`, `نمایش زنده ضربان قلب اعضای باشگاه`, `مانیتورینگ تمرین گروهی` — primary home in `/gym`. A user's *what/how/which components* question belongs to the gym guide, not the solution landing page.
- **Coach workflow:** `پنل مربی برای پایش شدت تمرین`, `مشاهده ضربان قلب ورزشکاران در لحظه` — `/coach` is a product page; `/blog/live-class-monitoring` is the methodological how-to.
- **Athlete experience:** `زون ضربان قلب هنگام تمرین`, `دیدن نتیجه هر جلسه در اپلیکیشن` — `/athlete` owns app-specific features; concepts/history interpretation belong to relevant article pages.
- **Education:** definitions, worked calculations and sensor comparisons are assigned individually to the seven articles; `/resources` only owns discovery and navigation.
- **Demo:** product inquiry remains a brand task, but any active submission or appointment claim is **blocked** by missing backend, notice and verified receipt. Do not infer availability from `/demo` being indexable.
- **Out of scope:** clinical diagnosis, unverified heart-strap universal superiority, guaranteed calorie accuracy, generic billing/gym ERP, retail sensor shopping, standalone custom training plans, claims of guaranteed retention/revenue or an unbuilt calculator.

The v3 map preserves the complete **113** phrase rows and **13** distinct page owners from v2. It switches the key to the **current source public ASCII URL**, records each old Persian research path explicitly and flags **GSC verification as NOT_VERIFIED** for every row. It does **not** claim that all 113 phrases occur verbatim on the page or have measurable searches; use them as candidate semantics and questions, not a stuffing checklist.

## Headings, snippets, internal links and science

- Each page has a source-defined SEO title and inherited page summary/description; all 13 source titles and descriptions are unique. Article SEO titles are produced by article metadata, not by editing only `src/seo/marketing.ts`. Don't add a `meta keywords` tag.
- Existing marketing H1s are editorial and, by design, not necessarily exact keyword strings. This is acceptable when title, body and page meaning remain aligned. Google's displayed result title is not guaranteed to equal our `<title>`.
- Current marketing descriptions range from about **99–171 Unicode characters**, and article descriptions about **131–148**. There is no fixed Google character requirement; inspect actual mobile snippets before clipping or adding irrelevant synonyms.
- Seven articles have substantial structured sections, FAQs and references, plus editorial links to product pages or related topics. Existing source link tests and prior PR #41 supply useful validation, but crawlable rendered text and production link behavior need independent live/Google inspection.
- The generated initial article SEO HTML shell contains the article H1/summary while the full body renders with JavaScript. **Priority risk to investigate:** obtain Search Console URL Inspection's rendered HTML and Google-selected canonical for one representative article (e.g., `/blog/heart-rate-zones`). Do not claim Google failed indexing simply because the no-JS shell is shorter.
- Keep evidence caveats around scientific Zone 2 terminology, sensor variability and session-RPE/training-load estimates; don't rewrite educational copy for phrase density alone.
- Secondary trust/UX review: `src/content/home.ts` contains `#` placeholder links for some social/legal destinations; only publish real approved destinations/notices. `src/content/athlete.ts` has a progress image alt describing a ten-day body-composition card; verify against actual media before modifying it.

## Priority decisions — evidence-first

| Priority | Next action | Release criterion |
|---|---|---|
| **P0 — Search Console** | Obtain first-party Performance export by **query + page** for `https://beatfit.ir`, past 28/90 days where available, and URL Inspection for homepage plus at least one article | Distinguish indexed vs discovered/crawled, Google-selected vs declared canonical, query/page overlap; report real impressions/clicks/CTR/average position and source date |
| **P1 — URL/topic identity** | Decide whether to preserve `/blog/live-tv-group-training` or approve redirect-safe `/blog/training-load` migration | Check indexed URL/backlinks first. If migrating: one-hop HTTPS 301, final canonical and Sitemap, no chains, build/CI and post-deploy verification |
| **P1 — Demo search promise** | Decide truthful branded demo metadata and whether there is an approved contact path | Form currently inactive; no fabricated booking, form submission, or lead-receipt claim |
| **P1 — Article Google rendering** | Sample rendered/HTML body via GSC and live page when accessible | Validate actual article H2/body and internal `<a href>` navigation, not just source CI |
| **P2 — Quality polishing** | Review athlete progress image alt, homepage placeholder social/legal destinations, long mobile snippets, example claims | Only fact-supported targeted changes, separately reviewed |
| **P2 — Research expansion** | Compare query opportunities after GSC accumulates impressions; prioritize existing pages before new posts | Evidence of underserved user task, product and science signoff |

### First-party GSC handoff fields

Export Search Console **Search results** filtered to the verified property. Use `Date`, `Search type`, `Country`, `Query`, `Page`, `Clicks`, `Impressions`, `CTR`, and `Average position` when available, making sure to retain the *query + landing page relationship* rather than only totals. Include `Page indexing` outcomes and URL Inspection statuses for submitted canonical URLs. For the commercial gym page and the gym guide, compare overlapping queries specifically before changing either title. A newly connected property may legitimately have little/no performance data yet.

## External guidelines / evidence boundary

- [Google Search Central — SEO starter guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide): descriptive useful titles, snippets, user-first content.
- [Google — title link best practices](https://developers.google.com/search/docs/appearance/title-link): search result titles can be generated from multiple signals and may differ from HTML titles.
- [Google — link crawlability](https://developers.google.com/search/docs/crawling-indexing/links-crawlable): descriptive real `<a href>` anchors matter.
- [Google — creating helpful content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content): value and trust over formulaic keyword targeting.
- Sample Persian results on heart-rate zones, devices and workout tracking are **qualitative search-intent illustrations only**, not an Iran-specific ranking sample or keyword-volume source. No speculative rankings, keyword difficulty or future traffic are recorded.

## Final verdict

**SOURCE KEYWORD ARCHITECTURE: READY FOR TARGETED GSC VALIDATION.** Strong enough to keep current titles and avoid disruptive cross-site copy rewrites. **NOT COMPLETE:** demo service/wording owner gate; training-load topic/URL decision; Google-rendered article evidence; production live HTTP index validation; actual GSC impressions, keyword overlap and search performance. No website copy, robots, canonical, source URL, redirect, or deployment changes are approved by this report.
