# Sensor Comparison Guide — Search Intent and Contextual Navigation

**Date:** 2026-11-21
**Status:** Proposed on a GitHub review branch, not deployed
**Canonical route:** `/blog/مقایسه-سنسور-ضربان-قلب`
**Documentation:** English; user-facing text and candidate queries: Persian

## Current source findings

The guide already compares wrist, upper-arm and chest devices, explains PPG and electrical measurement, and has sections for HIIT, strength training, steady-state activity and group classes. It has an existing device comparison table, FAQ, several cited studies and caution that research on third-party arm sensors does not prove BeatFit device accuracy. Review `docs/seo/verification/2026-11-21-sensor-2017-claim-resolution.md` before revising the Gillinov evidence claim.

No material rewrite, medical accuracy claim, ranking-based title revision or new equipment sale page is supported by the available evidence.

## Keyword ownership — unmeasured qualitative hypotheses

**Primary:** `مقایسه سنسور ضربان قلب بازویی مچی سینه ای`, owned by this comparison article.

**Related:** `سنسور ضربان قلب بازویی`, `بند سینه ای ضربان قلب`, `ساعت هوشمند ضربان قلب`, `مقایسه دقت سنسور ضربان قلب مچی و بازویی`, `تفاوت سنسور PPG و بند سینه ای هنگام ورزش`.

**Long-tail user tasks:** `سنسور بازویی یا بند سینه ای کدام بهتر است` and `بهترین نوع حسگر ضربان قلب برای تمرین گروهی`; answer conditionally and do not imply one universal winner.

**Excluded purchase intent:** `خرید سنسور ضربان قلب ارزان`. This route is educational, not a retail listing.

## Controlled source changes

1. Preserve the existing HIIT paragraph about tested chest-strap behavior and model-specific arm-sensor limitations; follow it with a natural contextual link on `راهنمای کنترل شدت تمرین در کلاس گروهی` to `/blog/کنترل-شدت-تمرین-در-کلاس-گروهی`.
2. Preserve the existing group-class device-compatibility paragraph and add a link on `پایش زنده ضربان قلب در باشگاه با بیت‌فیت` to `/gym`. This complements the already linked informational article on gym HR-system technology and distinguishes commercial system evaluation from conceptual education.
3. Keep SEO title, H1, meta description, article path, datePublished, images, tables, FAQ, relatedSlugs, existing citations, existing /athlete CTA, and medical cautions unchanged.

## Source evidence and limitations

- `src/content/blog/heartRateSensorComparison.ts`
- `docs/seo/audits/2026-11-21-zones-and-sensors-claim-review.md`
- `docs/seo/verification/2026-11-21-sensor-2017-claim-resolution.md`
- `docs/seo/research/2026-11-21-page-keyword-map-v2.csv`
- Original cited research includes https://pubmed.ncbi.nlm.nih.gov/39508366/ and https://pubmed.ncbi.nlm.nih.gov/28709155/.

This is source-level editorial and link-intent review. We did not measure search demand, run a current Google country/device-specific ranking snapshot, independently validate BeatFit hardware, or establish changes in search visibility.

## Required release checks

1. Review the exact two body paragraph replacements and unchanged factual sentences.
2. Run `npm ci && npm run build` and repository SEO validation. Check generated title, description, H1, OG, canonical, schema, and valid article hrefs.
3. Test rendered RTL body links on desktop/mobile and verify routes `/gym` and `/blog/کنترل-شدت-تمرین-در-کلاس-گروهی` resolve in the actual app.
4. Rebase against main if it has advanced. Request editorial and product-claim review. Production deployment is separate.
5. Use genuine GSC page/query impressions and clicks to evaluate outcomes after deployment rather than claiming ranking impact.

**Completed:** exact GitHub source inspection and targeted changes. **Not completed:** build/browser QA, merging, deployed checks and performance measurement.
