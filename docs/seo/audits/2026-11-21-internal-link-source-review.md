# Persian Article Internal-Link Source Review

**Record:** BF-SEO-LINK-001
**Date:** 2026-11-21
**Site:** BeatFit (fa-IR)
**Source commit:** `d11130cef8f941f54b06362bb9bd124f89853adb`; application source on current `main` was unchanged by previous SEO documentation commits.
**Scope:** Declared article link relationships from `src/content/blog/*.ts`, the homepage and resources catalog, and the React article renderer.
**Method:** Read-only GitHub source inspection and deterministic target-set checks. **Not a deployed crawl or rendered-DOM accessibility test.**

## Confirmed source-level inventory

- **Seven published Persian articles** registered in `src/content/blog/posts.ts`.
- **Seven article URLs** referenced from the `/resources` catalog in `src/content/resources.ts`.
- **Seven article URLs** referenced from the homepage's blog content registry in `src/content/home.ts`.
- **Fourteen** `relatedSlugs` references among the seven articles, exactly two per article, all pointing to registered published slugs with no self-links.
- `src/components/BlogArticle.tsx` renders the first **two** resolved related articles using React Router `Link`, with a breadcrumb and footer path to `/resources`; it also includes an article-footer CTA targeting `/demo`.
- Article bodies may declare additional contextual links through `BlogContentBlocks`. The graph below captures the two-card `relatedSlugs` network and homepage/catalog declarations, not every rendered anchor or external citation.

## Related-article in-degree (source-declared cards only)

| Article slug | Incoming from other articles' related lists | Assessment |
|---|---:|---|
| `زون-های-ضربان-قلب` | 6 | Highly represented in related cards |
| `کنترل-شدت-تمرین-در-کلاس-گروهی` | 3 | Has one or more related-card sources |
| `پایش-ضربان-قلب-در-باشگاه` | 2 | Has one or more related-card sources |
| `تاریخچه-تمرین` | 2 | Has one or more related-card sources |
| `بار-تمرینی-چیست` | 0 | No inbound RELATED cards; still linked by homepage and resources |
| `مقایسه-سنسور-ضربان-قلب` | 0 | No inbound RELATED cards; still linked by homepage and resources |
| `طراحی-تمرین-گروهی` | 1 | Has one or more related-card sources |

**Interpretation:** `بار-تمرینی-چیست` and `مقایسه-سنسور-ضربان-قلب` have **zero related-card inbound links**, but **neither is an orphan page in the source graph**, because the homepage and resources catalog reference all seven. Do not interpret related-card counts as Google-discovered links, crawl depth, PageRank, impressions or ranking outcomes. The homepage and catalog content themselves may still depend on client-side React rendering.

## Provisional editorial improvements

The two changes below rebalance *existing* related-card destinations while preserving the two-card limit and every URL:

1. From `/blog/تاریخچه-تمرین`: replace related link to `پایش-ضربان-قلب-در-باشگاه` with `بار-تمرینی-چیست`. Session history and training load share an athlete task: interpreting exertion over multiple workouts.
2. From `/blog/پایش-ضربان-قلب-در-باشگاه`: replace related link to `زون-های-ضربان-قلب` with `مقایسه-سنسور-ضربان-قلب`. A gym buyer assessing a monitoring system may need wearable-device comparisons.

The original `پایش-ضربان-قلب-در-باشگاه` article contains contextual links to zone and intensity education in its body, so the recommended swap does not remove every route to those topics. The existing two-card UI remains unchanged.

**Predicted source-only related-card in-degree after proposed changes:**

| Article slug | Before | After |
|---|---:|---:|
| `زون-های-ضربان-قلب` | 6 | 5 |
| `کنترل-شدت-تمرین-در-کلاس-گروهی` | 3 | 3 |
| `پایش-ضربان-قلب-در-باشگاه` | 2 | 1 |
| `تاریخچه-تمرین` | 2 | 2 |
| `بار-تمرینی-چیست` | 0 | 1 |
| `مقایسه-سنسور-ضربان-قلب` | 0 | 1 |
| `طراحی-تمرین-گروهی` | 1 | 1 |

The total remains 14, and all seven article nodes have at least one incoming related-card reference if these changes are applied. **This is a source graph property, not a guarantee of SEO benefit.**

## Acceptance criteria for a small editorial-only draft PR

1. Change only the two `relatedSlugs` fields above, preserving other article copy, images, slugs, FAQ, schema and meta tags.
2. All seven published articles have valid target slugs, two related links each and no self-link.
3. Confirm on a real browser that `مطالب مرتبط` shows valid links with clear Persian labels on the two affected articles.
4. Once the generated SEO verifier is available to that branch, run the real build and regression tests. Do not rely on another PR's CI result as coverage for this change.
5. Do not edit canonical URLs or redirect rules as part of this link proposal.
6. Preserve the original source graph in [the CSV inventory](../inventory/2026-11-21-article-link-graph.csv); do not overwrite history.

## Additional technical limitation

The main body, resource cards, related article cards and their internal anchors are created by React after JavaScript runs; the current generated SEO initial HTML shell contains only an H1 and summary paragraph. This remains the separate full-content rendering investigation BF-SEO-F02. No evidence was collected here to claim Google cannot render these links.

**Status:** Observations verified in source; two editorial changes proposed; browser/crawler behavior NOT RUN.
