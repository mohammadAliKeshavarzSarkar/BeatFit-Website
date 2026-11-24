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

## Evidence ledger

| Item | State | Meaning |
|---|---|---|
| Exact changed metadata | Proposed | Review code diff |
| Source SEO build and metadata integrity | CI pending | Verify SEO Build Verification workflow |
| JS-enabled CTA/Article browser test | CI pending | SEO Rendered Navigation QA workflow |
| JS-disabled shell diagnostic | CI pending | Preview-only behavior |
| Public deploy and Google indexing | Not performed | Needs owner-provided evidence |

**Separate work:** Training-load URL identity and new canonical migration require an independent review-only PR and first-party GSC canonical/backlink checks before deployment.
