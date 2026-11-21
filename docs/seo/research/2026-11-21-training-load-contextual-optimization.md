# Training Load Guide — Search Intent and Contextual Linking

**Date:** 2026-11-21
**Status:** Proposed source change on review branch; not merged or deployed
**Target route:** `/blog/بار-تمرینی-چیست`
**Language:** English documentation, Persian article and keyword strings

## Existing source review

The article already addresses the primary educational task **`بار تمرینی چیست`** with internal/external load, volume versus intensity, three estimation approaches, a Session RPE worked example, and cautious interpretation. The sRPE table computes `40 × 4 = 160 AU` and `30 × 7 = 210 AU`; these are educational examples in arbitrary units, **not the BeatFit proprietary load formula**. The source warns that load is not synonymous with individual recovery, fitness progress or medical injury prediction.

Retain existing title/H1, SEO metadata, publication date, canonical path, figures, chart calculations, seven-question FAQ and citations rather than introduce thin keyword variants.

## Search intent ownership

- This article: `بار تمرینی چیست`, `بار داخلی و خارجی تمرین`, `چطور بار تمرینی را محاسبه کنیم`, `محاسبه بار تمرینی با sRPE`, `تفاوت بار داخلی و بار خارجی تمرین`, `تفسیر فشار تمرین در هر جلسه ورزشی`.
- `/blog/کنترل-شدت-تمرین-در-کلاس-گروهی`: how a coach uses RPE, observation, talk test and HR during group exercise; not a training-load formula article.
- `/blog/تاریخچه-تمرین`: comparisons of saved sessions, already linked in this article.
- `/blog/زون-های-ضربان-قلب`: HR zone calculation/interpretation, already linked.
- `/athlete`: BeatFit's athlete-facing session history and live feedback product experience.

Candidate keywords are qualitative and source-aligned, **not measured Google ranks, keyword volumes or Search Console impressions**.

## Controlled source edits

1. After the sRPE worked example's warning that it is not the BeatFit formula, add a contextual link on `راهنمای کنترل شدت تمرین در کلاس گروهی` to `/blog/کنترل-شدت-تمرین-در-کلاس-گروهی`.
2. In the BeatFit session-history discussion, add a contextual link on `صفحه بیت‌فیت برای ورزشکاران` to `/athlete`.
3. Preserve all prior factual statements, numeric examples, SEO title, H1, description, slug, published date, images, external references, FAQ and existing `/athlete` CTA.

## Risk and acceptance gates

- Product-specific load calculation is **not** disclosed by this sRPE illustration; do not label it as BeatFit's internal scoring method.
- Do not claim that one load score proves recovery, predicts injury, is interchangeable across devices, or equates to caloric expenditure.
- Verify only two paragraph replacements in the diff, keeping the old factual text.
- Run `npm ci && npm run build` and SEO output checks for exact title, meta description, canonical, schema, H1 and links.
- Test Persian RTL layout, link accessibility and valid destinations at mobile and desktop widths.
- Secure editorial and product-claim review before merging. Confirm production deployment separately.
- Evaluate page/query overlap only when first-party Google Search Console access is available.

**Completed:** GitHub source inspection and precisely targeted source changes. **Not confirmed:** build, browser QA, editorial approval, merge, deployment or search visibility.
