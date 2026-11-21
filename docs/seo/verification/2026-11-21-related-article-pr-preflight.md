# Related-Article PR Preflight — Source Assertions

**Record:** BF-SEO-LINK-PR-001
**Date:** 2026-11-21
**Branch:** `seo/rebalance-related-articles-2026-11-21`
**Base revision:** `518cf62bd402b489deac819531f2d599e3e9e9a3`
**Scope:** Exact two `relatedSlugs` string replacements in two existing published article modules, plus this verification note.
**Build and deployed status:** NOT RUN. **Code remains in a review branch**, not merged/deployed.

## Exact changes

1. `src/content/blog/trainingHistory.ts` now links to `بار-تمرینی-چیست` as its second related article, replacing the less-direct gym equipment article. The `زون-های-ضربان-قلب` related link remains unchanged.
2. `src/content/blog/gymHeartRateMonitoring.ts` now links to `مقایسه-سنسور-ضربان-قلب` as its first related article, replacing the zone overview link. Its group-intensity related link remains unchanged. The body still includes contextual links to the zone article.

## Completed exact source checks

| Check | Observation | Result |
|---|---|---|
| Existing two related arrays each matched exactly once in base | TRUE | PASS (static) |
| New arrays each matched exactly once after edit | TRUE | PASS (static) |
| Old arrays no longer appear | TRUE | PASS (static) |
| Exactly two blog data files changed | Pending independent PR diff fetch | NOT RUN |
| Each new target is a published slug in `src/content/blog/posts.ts` | TRUE at source snapshot | PASS (static) |
| Two related cards remain per affected source | TRUE (2 each) | PASS (static) |
| Related article in-degree after proposal | zones 5; group-intensity 3; gym-monitoring 1; history 2; training-load 1; sensor comparison 1; class design 1 | PASS (source graph) |
| Visible desktop/mobile related cards and navigation | No browser execution | NOT RUN |
| Actual Vite build and output SEO verifier | No CI workflow on this branch; PR #2 test is separate | NOT RUN |
| Production crawl/index effects | No deployment/Google evidence | NOT RUN |

The code uses `getBlogPost` and `related.slice(0,2)` in `BlogArticle.tsx`; this PR preserves the existing renderer and display count.

**No SEO ranking improvement is asserted.** No canonical, URL slug, sitemap, schema, publication date, article body, graphics, app routing or layout changed. Editorial relevance and mobile usability still require human review. Rollback: restore the original two arrays.

[Source graph audit on main](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/blob/main/docs/seo/audits/2026-11-21-internal-link-source-review.md)
