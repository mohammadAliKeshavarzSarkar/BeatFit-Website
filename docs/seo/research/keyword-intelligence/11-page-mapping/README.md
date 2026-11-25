# Phase 11 — Keyword gap and page mapping

**Date:** 2026-11-25. **Status:** Initial editorial mapping complete; actual deployed pages, localized SERPs, demand and keyword/page ownership remain unverified. Research only.

## Evidence and deliverables

- [page-inventory.csv](page-inventory.csv): 13 current source-indexable destinations, six marketing pages and seven published articles. Exact SEO titles, H1s, descriptions, paths, source blob IDs and coverage notes. Canonicals reflect default production origin in code, not a verified live HTTP response. The fallback 404 is nonindexable; legacy blog aliases are not separate targets. The app link is not a new marketing route.
- [source-snapshot.csv](source-snapshot.csv): 19 source path/blob references reviewed from the Phase 11 branch created from main after integration of PR #59. Metadata derived from the source, not browser render or live crawl.
- [keyword-page-map.csv](keyword-page-map.csv): all 1,024 existing research IDs and exact strings, with one provisional disposition each. Existing page IDs and proposed gap IDs are mutually exclusive. Original intent, usage boundary, evidence and missing metrics retained.
- [gap-register.csv](gap-register.csv): 11 coverage gaps, including four proposed routes and seven hold-only topics; none approved for implementation.
- [legacy-reconciliation.csv](legacy-reconciliation.csv): all 113 historical canonical map v4 rows preserved and compared, including legacy exclusions. 91 retain their existing owner, 22 require review. Historical file remains unchanged; differences are proposals, not silent replacements.
- [mapping-summary.csv](mapping-summary.csv): destination counts.
- [overlap-review.csv](overlap-review.csv): nine topic-level overlap hypotheses, not observed cannibalization.

## Method and review

Read App routing, source metadata registry, article content registry, seven individual published articles, six marketing content files, default site origin and demo form. Use Phase 10 membership and intent to generate provisional destination candidates, applying product, sales, medical, brand and scientific gates. Refine 22 assignments after comparing existing article headings and the legacy map. For example, general educational navigation belongs to resources; sRPE explanation and training pressure remain in the load guide; table lookup belongs to the zone guide; core category phrases remain on home; gym-specific equipment selection belongs to the connected system guide. These overrides do not change the original intent labels. Keyword variants are preserved; individual keyword assignments and semantic equivalence still need review. A mapping is an editorial candidate, not a statement that an exact phrase already appears on a page or that a search engine associates it with that page.

## Distribution

| Disposition | Count |
|---|---:|
| Existing page candidate | 516 |
| Proposed gap candidate | 218 |
| Hold pending evidence | 134 |
| Monitor only | 71 |
| Context only | 85 |
| Total | 1,024 |

Proposed route candidates: /devices 107; /blog/heart-rate-monitoring 35; /blog/heart-rate-during-exercise 55; /tools/heart-rate-zones 21. Counts are research inventory assignments, not search volume or final priority. No URL is created, approved or published by this document.

## Gap approval gates

Hardware page requires approved model specifications, photos, wearing location, compatibility, sale model and availability. Do not infer wrist product or medical certification from current wording, images or competitor material. General HR guides require scientific review and useful coverage distinct from the existing articles. Interactive calculator requires reviewed formula choices, validated inputs/outputs, accessibility, error handling and edge cases. Do not claim precise calories or a universally appropriate HR range.

The seven hold topics are device support, purchase/price/lead conversion, energy education, recovery education, gamification/proprietary metrics, sport-specific content, and other calculators. They have no proposed route yet. Confirm supported workflows, owner definitions/release status, appropriate scientific content and commercial conditions before assigning implementation work. The demo form is explicitly disabled and source shows a notice not to enter contact details. The source header links to app.beatfit.ir; that alone does not verify downloads, login availability or distribution. Preserve actual product wording and review inconsistent wristband terminology against owner-approved device naming.

## Ownership and overlap

The homepage owns official identity and broad category positioning. /gym owns commercial connected-gym solutions, /coach coach-specific software, /athlete athlete application features, /resources navigation, and /demo informational orientation only. Articles own distinct educational tasks. Do not make a page for each cluster, spelling or long-tail phrase. Do not change titles, slugs, internal links, canonicals, redirects or sitemap yet. Overlap register identifies scope distinctions; it does not prove actual ranking cannibalization. No automated keyword stuffing or false product/clinical positioning. Raw brand fragments and unrelated terms remain retained for monitoring, not assigned as standalone pages.

## Outstanding verification

Independent attempts to open https://beatfit.ir/, https://beatfit.ir/gym and https://beatfit.ir/sitemap.xml on 2026-11-25 were inaccessible through the available web retrieval surface. This is not evidence of outage, Googlebot blocking, missing sitemap or deindexing. Source verification is not deploy verification. Current GSC, local SERPs, numeric search demand, live canonical/indexation and actual page-by-query overlap are not established. All metric statuses remain NOT_MEASURED. Phase 03, 06 and 08 blockers retained.

## Phase 12 handoff

Prioritize existing-page optimization and potential gaps using explicit business relevance, intent fit, evidence confidence, existing coverage, implementation readiness and risk. Keep numeric demand/difficulty fields unknown; do not treat missing as zero or use keyword count as traffic. Give separate readiness and research-priority labels. Carry the 22 legacy differences, 134 held entries, and all proposed routes as review items. Require owner approval before implementation.

## Acceptance

Verify 1,024 unique exact keyword IDs against Phase 10; no missing or extra records; page/gap references resolve; dispositions and summary counts agree; all 113 legacy rows represented; no observed rank or demand invented. All outputs documentation only.
