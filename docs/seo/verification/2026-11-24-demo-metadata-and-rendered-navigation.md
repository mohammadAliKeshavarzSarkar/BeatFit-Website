# Demo Search Snippet Truthfulness and Mobile Rendered Navigation

**Date:** 2026-11-24  
**Scope:** Marketing metadata only for `/demo` and new review-only browser QA. Does not activate the form or change any published article or canonical URL.  
**Review branch:** `seo/2026-11-24-demo-truthful-metadata`

## SEO motivation

Current source intentionally disables `/demo` fields because an approved lead receiver/privacy flow does not exist. The previous `<title>` was `درخواست دمو بیت‌فیت برای باشگاه | بیت‌فیت` (brand duplication), with a meta description describing an arranged demo without conveying that online requests are unavailable.

The revised source metadata is:
- Title: `آشنایی با دموی سیستم پایش ضربان قلب | بیت‌فیت`.
- Description: `با قابلیت‌های پایش زنده ضربان قلب، نمایشگر کلاس و پنل مربی بیت‌فیت برای باشگاه آشنا شوید. ثبت آنلاین درخواست دمو فعلاً فعال نیست.`

It stays aligned with the source's intended category, but does **not** claim the form works. H1, visual body, CTA destination, robots, canonical and privacy status are unchanged. The existing rendered pre-entry warning still explains unavailability.

## Browser quality gate

New read-only Chromium script `scripts/verify-seo-browser-journeys.mjs`, run through `.github/workflows/seo-rendered-navigation.yml` on the changed PR:
1. Build with locked dependencies, verify all output canonical/metadata files and public artifact drift.
2. Open `/gym`, click its primary product CTA, verify URL `/demo`, visible destination H1, correct canonical and removed hydration shell.
3. Repeat coach → demo, athlete → resources, using Persian locale and 390px viewport.
4. On `/demo`, assert exact changed title, disclosure in meta description and visible note, disabled six fields and submit, zero non-GET requests.
5. On `/resources`, assert seven unique ASCII article anchors; click one and verify full rendered article body (greater than 500 characters), canonical path and hydrated shell removal.
6. With JS disabled, inspect `/blog/heart-rate-zones` SEO shell and document absent full article body as a rendering-risk observation—not automatic evidence of Google indexing failure.

No production domain, Google bot, real user data, CRM, live form submission, live Google canonical/indexing, or actual search result snippet is covered. Google may write its own search-result title/description. Approval of a lead receiver, privacy notice and test evidence remains required before activating request submission.

## Exact successful CI

**Tested source SHA:** `95832be4c308084ac8ff27dcedb8c37739b485fc`.  
- [SEO Build Verification 45383503214](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/actions/runs/45383503214): **SUCCESS** (real locked build, fixtures, source links and SEO artifacts).
- [SEO Rendered Navigation QA 45383503232](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/actions/runs/45383503232), job `138408356926`: **SUCCESS** (390px Chromium, Persian locale, Vite production preview).
- **Observed browser PASS:** `/gym → /demo`; `/coach → /demo`; `/athlete → /resources`; `/resources → article`. CTA navigation, rendered H1, canonical, seven resource anchors, article body and absence of unhandled JavaScript exceptions were checked.
- `/demo` visibly warns about unavailable submission; all six form fields and submit remain disabled; no non-GET requests were made. Corrected regression test checks the disabled input and button rather than assuming Playwright reports fieldset disability on the fieldset node itself.
- **Observed no-JavaScript limitation:** article HTML supplies the SEO heading shell, *not* its full educational body. This is an observation from the preview, **not a claim about Googlebot**. Google URL Inspection rendered HTML remains an essential live validation.

The initial browser workflow [45382894144](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/actions/runs/45382894144) failed on the test's fieldset-state assertion after all three initial CTA clicks passed. The site already had a disabled fieldset; the test semantics were corrected, then independently re-run and passed as above. No user-facing form state was changed.

## Integration note

The above results are historical, from the isolated PR #43. The merged static article implementation supersedes the earlier no-JS observation. The integrated repair carries forward the demo metadata and navigation tests, leaving full no-JS coverage to the independent static article workflow. No live Google or lead receiver verification is implied.

## Evidence ledger

| Item | State | Meaning |
|---|---|---|
| Exact changed metadata | Proposed | Review code diff |
| Source SEO build and metadata integrity | PASS — 45383503214 | Verify SEO Build Verification workflow |
| JS-enabled CTA/Article browser test | PASS — 45383503232 | SEO Rendered Navigation QA workflow |
| JS-disabled shell diagnostic | PASS (risk observed) — 45383503232 | Preview-only behavior |
| Public deploy and Google indexing | Not performed | Needs owner-provided evidence |

**Separate work:** Training-load URL identity and new canonical migration require an independent review-only PR and first-party GSC canonical/backlink checks before deployment.
