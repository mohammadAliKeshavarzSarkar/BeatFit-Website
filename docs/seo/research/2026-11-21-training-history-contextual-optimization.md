# Training History Article — Intent and Contextual Link Optimization

**Date:** 2026-11-21
**Status:** Proposed source edit on review branch, not deployed
**Canonical URL:** `/blog/تاریخچه-تمرین`
**Documentation language:** English; article text and search phrases in Persian

## Source findings and intent ownership

The current guide explains how to interpret saved exercise sessions: duration, heart-rate average/peak, time spent in HR zones, and training-load estimates. It already includes a four-session illustrative comparison, conditions for meaningful comparisons, common interpretation errors, cautious FAQ, and an athlete-oriented CTA.

The searcher task owned by this article is **`تاریخچه تمرین و پیشرفت ورزشی`**: how to use comparable sessions to interpret patterns. This is distinct from:
- `/athlete`: product-focused session results and personal activity experience;
- `/blog/بار-تمرینی-چیست`: meaning and methods of training-load estimation;
- `/blog/زون-های-ضربان-قلب`: HR zone definitions and calculation, already linked in this article;
- unrelated gym payment/member-management systems, and strength-set logging applications.

## Qualitative keyword targets

- Primary: `تاریخچه تمرین`
- Secondary: `پیگیری پیشرفت تمرین`, `ثبت نتایج جلسات تمرینی`
- Long-tail: `چطور پیشرفت ورزشی خود را پیگیری کنیم`, `مقایسه ضربان قلب بین جلسات تمرین`, `تحلیل تاریخچه تمرین با زون ضربان قلب`, `چگونه روند شدت تمرین را در طول زمان ببینیم`
- Brand/product context: `تاریخچه تمرین بیت‌فیت`, `بیت‌فیت برای ورزشکاران`

These are source-aligned candidate phrases, not independently measured search volume, ranks or GSC impressions.

## Controlled implementation

1. In the training-load section, retain the explanation that cross-device load scores may differ by method. Append a natural contextual link **`راهنمای بار تمرینی و تفسیر فشار تمرین`** to `/blog/بار-تمرینی-چیست`.
2. In the BeatFit history section, retain the explanation of recorded past sessions. Append a natural contextual link **`صفحه بیت‌فیت برای ورزشکاران`** to `/athlete`.
3. Preserve the existing H1, SEO title, meta description, slug, datePublished, example chart, values, related articles, FAQ, images, bibliography, and existing /athlete CTA.

These two links help the reader move from interpretation to a closely related concept and then to the actual BeatFit athlete experience. They are not claims of ranking improvement.

## Evidence boundaries

- Current source: `src/content/blog/trainingHistory.ts`
- Existing keyword map: `docs/seo/research/2026-11-21-page-keyword-map-v2.csv`
- Existing page review: `docs/seo/research/2026-11-21-current-page-onpage-optimization-review.md`
- Article's already listed external scientific/technology references remain unchanged.

The source explains that a lower or higher HR, a bigger load score, and the number of sessions alone cannot establish individual fitness progress or a medical conclusion. Avoid promising causal fitness gains, individualized recovery readiness or injury prediction.

## QA and release criteria

1. Compare the exact source diff: only two passages should become rich paragraphs with descriptive internal links.
2. Run `npm ci && npm run build` and repository SEO integrity checks, confirming original article title, description, H1, canonical, schema, OG tags and published date.
3. Inspect the rendered Persian article at narrow mobile widths and desktop: verify readable links and correct navigation to both destinations.
4. Obtain editorial/product review, then merge under repository review policy; deployment and production HTTP checks remain separate.
5. Monitor genuine page/query GSC metrics only after access and deployment; no search-performance outcome is asserted here.

**Verified:** GitHub source inspection and exact two targeted source edits. **Not verified:** build, browser/mobile testing, production deployment or search performance.
