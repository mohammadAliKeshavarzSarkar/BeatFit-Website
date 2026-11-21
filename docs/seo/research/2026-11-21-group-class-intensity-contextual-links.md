# Group-Class Intensity Article — Contextual Link SEO Review

**Date:** 2026-11-21
**Status:** Proposed on a review branch; not deployed
**Canonical article:** `/blog/کنترل-شدت-تمرین-در-کلاس-گروهی`
**Language:** English documentation; Persian public-facing article text

## Existing source assessment

The article already has a descriptive SEO title and H1, an RPE explainer, talk-test guidance, HR zone links, a comparison table, a hypothetical two-athlete illustration and practical coaching phases. It discusses equipment/data limitations and safeguards. The current closing CTA already points to `/coach`. Additional headings or repeated exact-match keywords are not justified merely to raise term frequency.

## Search intent ownership

- This article: **`کنترل شدت تمرین در کلاس گروهی`**, an informational task for coaches seeking practical intensity guidance.
- `/coach`: BeatFit's commercial coach-panel and live group-monitoring product experience.
- `/blog/طراحی-تمرین-گروهی`: practical group-class programming for mixed ability.
- `/blog/زون-های-ضربان-قلب`: HR zone definitions and calculation, already linked in the body.

Secondary qualitative candidates (not volume measured): `اندازه گیری شدت تمرین`, `RPE تمرین گروهی`, `آزمون صحبت برای تشخیص شدت تمرین`, `پایش ضربان قلب در کلاس گروهی برای مربی`, `راهنمای تنظیم شدت تمرین برای اعضای کلاس`.

## Controlled changes

1. In the pre-class planning section, retain the existing paragraph and append one natural link to **`راهنمای طراحی کلاس گروهی برای سطوح مختلف آمادگی`** targeting `/blog/طراحی-تمرین-گروهی`.
2. In the BeatFit coach-panel section, retain the explanation and append a contextual link to **`پایش زنده ضربان قلب در پنل مربی بیت‌فیت`** targeting `/coach`.
3. Preserve the existing article H1, SEO title, description, slug, date, relatedSlugs, FAQ, RPE comparison, scientific caveats, images, sources, and closing CTA.

These links support relevant user journeys without converting the informational guide into a competing commercial landing page.

## Quality and release gates

- Confirm only two body paragraphs were transformed to rich-paragraph segments, with no changes to their original factual claims.
- Build with `npm ci && npm run build`; inspect generated article title, description, canonical, OG, schema, and H1.
- Verify in a JS-enabled browser that both links render as accessible anchors with correct Persian RTL presentation and target routes.
- Maintain medical caution: HR is not a complete measure of muscular load; RPE and talk test are complementary, not diagnostic.
- Rebase if main changes, request editorial review, and verify deployment independently.
- Evaluate GSC query/page overlap and clicks only after first-party data access. No ranking lift, SERP position, search volume, or deployed indexing is claimed.

**Completed:** GitHub source review and targeted edits. **Pending:** build, browser QA, merge approval and production verification.
