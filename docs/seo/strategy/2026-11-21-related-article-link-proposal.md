# Related-Article Link Balancing — Editorial Proposal

**ID:** BF-SEO-LINK-PROP-001
**Date:** 2026-11-21
**Status:** PROPOSED for a review-only PR; no production content change approved.
**Source of truth:** [Internal-link source review](../audits/2026-11-21-internal-link-source-review.md).

## Exact two-string diff

| Source file | Field | Existing related slugs | Proposed related slugs |
|---|---|---|---|
| `src/content/blog/trainingHistory.ts` | `relatedSlugs` | `["زون-های-ضربان-قلب", "پایش-ضربان-قلب-در-باشگاه"]` | `["زون-های-ضربان-قلب", "بار-تمرینی-چیست"]` |
| `src/content/blog/gymHeartRateMonitoring.ts` | `relatedSlugs` | `["زون-های-ضربان-قلب", "کنترل-شدت-تمرین-در-کلاس-گروهی"]` | `["مقایسه-سنسور-ضربان-قلب", "کنترل-شدت-تمرین-در-کلاس-گروهی"]` |

## Rationale

- Improve conceptual next steps for workout history (training-load interpretation) and a gym monitoring buying guide (wearable sensor comparison).
- Distribute related-card inbound links to the two existing articles that currently have none from peers, without adding thin new URLs.
- Retain the current two-card design and all seven existing source-catalog and homepage links.

## Boundaries and release gate

This is editorial link architecture, not an SEO performance experiment with ranking evidence. Actual rendered related links and crawlability require browser/site verification. The existing React-only content risk is unchanged.

Require valid published targets, source-diff review, real build/SEO artifacts when available, and mobile/browser link tests before approving merge. No redirects, indexing directives, HTML shell generators, website design or tracking changes are in scope.

**Backout:** Restore the two original `relatedSlugs` arrays.
