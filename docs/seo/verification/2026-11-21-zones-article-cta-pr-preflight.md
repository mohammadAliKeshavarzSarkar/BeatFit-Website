# Heart-Rate Zones Article CTA — Audience-Intent Alignment Proposal

**ID:** BF-SEO-CTA-001  
**Date:** 2026-11-21  
**Review-only source baseline:** `7d5dddbb5636647fe66b7294a8ec890bbb9c508e`  
**Article:** `/blog/زون-های-ضربان-قلب`  
**Proposed branch:** `seo/align-zones-article-cta-2026-11-21`  
**Status:** Draft; no merge or deployment.

## Source evidence

- The existing article targets an **athlete learning about personal heart-rate intensity**: eyebrow `برای ورزشکار`, a second-person athlete learning path, and article CTA `تمرینت را دقیق‌تر ببین`.
- That article-specific CTA currently has label `آشنایی با بیت‌فیت` but points to `/demo`.
- In `src/content/demo.ts`, `/demo` asks for **club information**, a meeting to see live group classes and an explanation of club setup. It serves the gym owner/manager conversion task, not an introductory athlete task.
- `/athlete`, populated by `src/content/athlete.ts`, contains athlete-facing live HR/intensity, session history and app journey content that more directly matches this article.
- The other six articles already target `/coach`, `/athlete` or `/demo` according to their contextual audiences. The zones article is the sole athlete-oriented article-specific CTA leading to the club demo page.

## Exactly one proposed source edit

| Source file | Field | Before | After |
|---|---|---|---|
| `src/content/blog/heartRateZones.ts` | article-level `cta.href` | `"/demo"` | `"/athlete"` |

Keep **unchanged**: CTA Persian title/body/label, article text, SEO title, FAQ, source list, image, published date, slug, canonical, route renderer and other articles.

## Decision boundaries

- This is a **qualitative information architecture and audience-fit hypothesis**, not a measured conversion or ranking improvement. There is no verified GA4/GSC funnel attribution.
- `BlogArticle.tsx` also renders a **separate common footer CTA** `درخواست دمو` to `/demo` on all articles. That remains unchanged in this PR so gym buyers still have a clear demo path. A future template-level CTA redesign needs its own audience/routing decision and measurements.
- The parallel scientific note **Draft PR #8** modifies different lines of the same article. The two changes should be reviewed and integration-tested together after the product/editorial owner decides whether to accept both. Passing an isolated PR build does **not** imply combined released behavior has been tested.
- Do not alter `/demo` form or its submission workflow under this small editorial CTA patch.

## Evidence and tests

- **PASS source:** Exact original CTA snippet found once; only `href` replaced; new target `/athlete` is a registered route.
- **PENDING:** CI build and independent generated SEO tests on the exact PR revision.
- **PENDING:** Chromium click test: article CTA opens `/athlete` and the separate common footer `/demo` remains available.
- **NOT RUN:** Production HTTP, user funnel tracking, Google search/URL Inspection, attribution, owner editorial approval.

## Rollback

Restore the single original `href: "/demo"` on the article CTA. No migration, redirects or data changes are required.

## Related reading

- [Article-specific intent audit](../audits/2026-11-21-page-intent-and-conversion-review.md)
- [Zone/sensor scientific review](../audits/2026-11-21-zones-and-sensors-claim-review.md)
- [2017 wearable comparative study](https://pubmed.ncbi.nlm.nih.gov/28709155/)
