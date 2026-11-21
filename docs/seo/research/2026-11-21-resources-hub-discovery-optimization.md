# Resources Hub — Educational Search Intent and Discovery Optimization

**Date:** 2026-11-21
**Status:** Draft review branch only; no merge/deployment asserted
**Page:** `/resources`
**Scope:** English documentation, Persian public content.

## Source review

- `src/content/resources.ts` already lists seven linked articles and offers `all`, `gym`, `coach`, and `athlete` audience filters. No need to add new categories just to repeat keywords.
- `src/components/ResourcesCatalog.tsx` renders card-title anchors to each article, plus a CTA link per article. Client-side audience filters are buttons, not separate canonical category pages.
- `src/components/ResourcesHero.tsx` keeps its human H1 `برای بهتر تمرین‌کردن، بیشتر بدانید.`, a featured zones guide and a real link.
- `src/seo/marketing.ts` uses `resourcesHero.lede` for the page description and summary.

## Searcher task and phrase ownership

`/resources` owns the broad educational navigation task: **`آموزش پایش ضربان قلب و تمرین`**. Supporting candidates include `مقالات تمرین ورزشی`, `راهنمای تمرین برای مربیان و ورزشکاران`, `مقالات زون ضربان قلب و شدت تمرین` and `آموزش تحلیل تاریخچه و بار تمرینی`. These are **qualitative candidate phrases**, not measured query volume, position or traffic.

Specific questions remain owned by the corresponding canonical articles:
- `/blog/زون-های-ضربان-قلب`: what zones mean, practical estimates.
- `/blog/تاریخچه-تمرین`: how to interpret saved sessions.
- `/blog/بار-تمرینی-چیست`: training-load concepts.
- `/blog/مقایسه-سنسور-ضربان-قلب`: chest, arm and wrist comparison.
- `/blog/کنترل-شدت-تمرین-در-کلاس-گروهی`: coach training-intensity method.
- `/blog/طراحی-تمرین-گروهی`: group-class programming.
- `/blog/پایش-ضربان-قلب-در-باشگاه`: what group HR systems are and how to evaluate them.

## Controlled changes

1. SEO title: `منابع تمرین و پایش ضربان قلب | بیت‌فیت` → `آموزش پایش ضربان قلب و تمرین | بیت‌فیت`.
2. Intro and inherited meta description: `در منابع بیت‌فیت، راهنماهایی درباره زون ضربان قلب، شدت و تاریخچه تمرین، حسگرهای پوشیدنی و کلاس‌های گروهی برای ورزشکاران، مربیان و باشگاه‌ها بخوانید.`
3. Typographic correction of filter label: `برای باشگاه ها` → `برای باشگاه‌ها`. Filter IDs and filtering behavior remain unchanged.
4. More descriptive screen-reader-only catalog H2: `مقالات و راهنماهای تمرین و پایش ضربان قلب` instead of `فهرست مطالب`. No visible redesign.
5. Preserve H1, featured article, seven card links, their exact URLs, search UI behavior, canonicals, robots, schemas and layout.

## Risks and acceptance

- The audience filter controls are JavaScript buttons rather than crawlable category URLs. Do not assume Google can index filtered categories as standalone pages. Existing permanent article anchors provide discovery.
- Do not create new category URLs until information architecture, content scale, crawlability and actual first-party query demand justify them.
- On the PR branch, run `npm ci && npm run build` and generated route HTML checks: unique title/description, unchanged H1, canonical, OG and seven article hrefs.
- Test Persian UI: filter, search, empty state, 320–390px width, keyboard navigation and readable RTL labels.
- This PR and prior coach/athlete draft PRs touch `src/seo/marketing.ts`; rebase/reconcile the proposed titles before merging to avoid accidental overwrites.
- Confirm first-party GSC and production HTTP status only after authorized deployment. No positive SEO outcome is implied by copy changes.

**Evidence scope:** code and project docs inspected; source changes are proposed. Build, browser QA, GSC measurements and deployment are not yet verified.
