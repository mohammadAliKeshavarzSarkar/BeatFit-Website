# Group-Class Design Guide — Final On-Page Intent Review

**Date:** 2026-11-21  
**Status:** Proposed GitHub branch change; not verified on production  
**URL:** `/blog/طراحی-تمرین-گروهی`  
**Editorial copy:** Persian; **documentation:** English.

## Source assessment

The existing guide answers the practical mixed-ability group-class programming task. Its SEO title and H1 distinguish this educational guide from BeatFit's commercial coach panel. It already includes movement substitutions, activity/rest choices, limitations, seven helpful FAQ questions, and a full hypothetical 45-minute class.

The example totals **8 + 5 + 14 + 12 + 6 = 45 minutes**, and carries explicit contextual limitations. Preserve the table, values, warnings, publication date, canonical slug and original meta description. Do not make the illustrative prescription universal or imply heart rate alone proves movement quality.

Current related links already cover the zones guide, group-intensity method, and training-history interpretation; original article CTA links to `/coach`.

## Qualitative keyword map (not GSC-measured)

**Primary**: `طراحی تمرین گروهی برای سطوح مختلف`

**Supporting**: `برنامه تمرین گروهی`, `مربیگری کلاس گروهی`, `حرکات جایگزین در کلاس تمرین گروهی`

**Long-tail**: `نمونه برنامه تمرین گروهی ۴۵ دقیقه ای`, `چگونه کلاس گروهی برای آمادگی های متفاوت طراحی کنیم`, `چطور شدت تمرین افراد مبتدی و حرفه ای را تنظیم کنیم`.

These terms describe the existing article. They are not a signal to repeat phrases artificially or create new similar URLs. Avoid claiming measured search difficulty, rankings, traffic, or click-through results.

## Intended change

- In the section `بیت‌فیت چطور به مربی در اجرای کلاس کمک می‌کند؟`, preserve the original paragraph about live group HR and zones, and append the descriptive inline anchor **`پنل مربی و پایش زنده تمرین در بیت‌فیت`** to `/coach`.
- This connects a reader evaluating real product capabilities directly from the relevant explanation, while retaining the existing CTA.
- Keep SEO metadata, H1, 45-minute model, FAQ, sources, all other article links and text unchanged.

## Acceptance criteria

1. Diff review: one rich-paragraph replacement, all original factual content preserved.
2. Run `npm ci && npm run build` and SEO route-output checks on the exact branch.
3. Inspect generated title, description, H1, canonical, JSON-LD, and OG tags.
4. Browser test: verify inline link is a real, accessible anchor on narrow Persian RTL displays and its `/coach` destination resolves.
5. Confirm all five timed blocks still total 45 minutes and the hypothetical limitations remain visible.
6. Obtain editorial/product owner review before merge; verify production HTTP and actual Google Search Console data separately.

**Verified here:** code review, exact source substitution and committed branch changes. **Not verified:** build, browser QA, merge, deploy or search performance.
