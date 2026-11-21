# /gym Page — Controlled Copy Proposal and Release Gate

**Work item:** BF-CONT-001  
**Date:** 2026-11-21  
**Status:** DRAFT / PROPOSED — not deployed  
**Page:** `/gym`  
**Evidence:** [Gym intent qualification](../research/2026-11-21-gym-focused-intent-check.md) and pinned source `d11130cef8f941f54b06362bb9bd124f89853adb`.  
**Implementation mode:** Small source edit in a GitHub feature branch, submitted as a pull request for review. No direct production deployment.

## Problem and objective

The current hero communicates benefit but does not clearly define the actual product category in the opening paragraph. Commercial monitoring results use sensors, group display and coach workflows; separate broad gym-management products deal primarily with memberships, payments and attendance. Avoid misleading feature expansion.

Keep the existing warm BeatFit headline and design; give decision-makers a precise, plain-Persian description of what they are evaluating.

## Exact before / proposed after

| Element | Before (from source) | Proposed after |
|---|---|---|
| URL | `/gym` | Unchanged |
| SEO title | `پایش زنده تمرین برای باشگاه‌ها \| بیت‌فیت` | `پایش زنده ضربان قلب در باشگاه‌ها \| بیت‌فیت` |
| H1 | `تجربه‌ای بسازید که اعضا ارزشش را در هر جلسه ببینند.` | **Unchanged** |
| Visible hero paragraph | `با بیت‌فیت، اعضا تمرینشان را زنده می‌بینند و مربی وضعیت کلاس را دنبال می‌کند؛ تجربه‌ای که انگیزه و تداوم حضور را تقویت می‌کند.` | `با بیت‌فیت، ضربان قلب و شدت تمرین اعضای کلاس را با حسگرهای پوشیدنی به‌صورت زنده روی نمایشگر باشگاه و پنل مربی ببینید؛ نتیجه هر جلسه هم برای پیگیری بعدی ثبت می‌شود.` |
| Meta description | Inherits `gymHero.body` | Inherits revised hero paragraph |
| Page summary | Inherits `gymHero.body` | Inherits revised hero paragraph |
| Canonical / robots / schema type | Existing | Unchanged |
| Components, layout and other claims | Existing | Unchanged |

## Why these exact edits

- The revised title names the observable product category, while preserving the existing brand suffix.
- The new paragraph describes the sensor → group screen / coach panel → saved session experience already claimed in other gym sections. It avoids claiming unknown sensor capacity, safety guarantees, precise medical accuracy or higher member retention.
- Keeping the original H1 respects the established BeatFit voice and avoids redesigning the hero to chase keywords.
- The existing data model intentionally reuses `gymHero.body` for the visible hero, meta description and SEO static summary; this creates consistent wording without duplicative edits.

## Risk assessment

| Risk | Mitigation |
|---|---|
| Product capability overclaim | Validate actual available device, class display and session history features with owner |
| Title link rewritten by search engine | Google may use on-page headings and visible copy; monitor in GSC, do not promise that the displayed title is controllable |
| Description snippet not displayed verbatim | Google may generate snippets; metadata consistency is not an appearance guarantee |
| Render/layout overflow | Review 320–390 px mobile and desktop hero with real Persian typography |
| Meta description uniqueness drift | Run build and uniqueness assertions before merge |
| Site-generated files change after build | Run build on isolated checkout and inspect git diff; do not silently commit artifacts |
| HTTP vs HTTPS canonical disagreement | Unchanged by this PR; source-wide SSL decision remains blocked |

## Definition of done (merge criteria)

1. **Source diff check:** only the two intended string values change in two product files.
2. **Static binding:** `GymHero.tsx` displays `gymHero.body` and `src/seo/marketing.ts` uses it for `gymDocument.description` and `gymDocument.summary`.
3. **Build check:** trusted checkout `npm ci && npm run build`, exit 0 and generated route shell `dist/route-html/gym.html` has unique revised title/description (NOT RUN in this environment).
4. **Browser check:** `/gym` page visually intact, Persian text wraps, H1 unchanged, no GSAP regressions, semantic main present (NOT RUN).
5. **Product fact check:** owner confirms described sensor/screen/panel/history capabilities are currently offered.
6. **Monitoring:** record a pre-release GSC query/page baseline when available; compare after deployment without inferring causality from short-term fluctuations.
7. **Release authority:** merge/deployment only after applicable review and permission; this document is not approval to release.

## Test / rollback plan

Run a focused source diff and build, preview generated HTML and responsive rendered page, then inspect real deployed page before recording verification. Rollback requires reverting the two string edits; do not alter URL, robots, sitemap or redirects as part of this test.

## Documentation evidence classification

- Confirmed: existing and proposed exact source text, component reuse paths, current content data model.
- Observed external: generic management systems are distinct from group HR systems in surfaced pages.
- Hypothesis: clarified product definition may help users and search engines interpret the page.
- Unknown: actual impressions, positions, title-link presentation, conversion uplift and deployed behavior.
