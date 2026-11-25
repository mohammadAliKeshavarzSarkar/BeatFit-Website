# Phase 10 — Keyword clustering

**Date:** 2026-11-25. **Status:** Initial editorial clustering complete; empirical SERP verification and page assignment pending. Research only.

## Deliverables

- [clusters.csv](clusters.csv): 41 populated topic clusters, stable IDs, Persian/English labels, member and intent-track counts, curated representative seed IDs, target restrictions and pending page status.
- [cluster-membership.csv](cluster-membership.csv): 1,024 exact strings; all 904 Phase 06/07 IDs and all 120 Phase 09 candidate IDs preserved. Includes original provenance, intent, secondary intent, confidence, relevance, ambiguity, brand relationship, usage boundaries, topic, cluster, intent track, normalization keys, review state and missing metric statuses. No source keyword deleted.
- [intent-tracks.csv](intent-tracks.csv): 91 cluster-specific intent tracks. Utility queries distinguish zone, maximum HR, target HR, energy and other calculation tasks. Purchase versus price evaluation, branded access versus product discovery, and setup versus troubleshooting are distinguishable.
- [orthographic-variants.csv](orthographic-variants.csv): 24 potential lexical-variant groups containing 60 records. These are review groups, not deduplication decisions.

## Method

1. Join Phase 06 exact IDs and provenance to Phase 07 intent hypotheses and Phase 09 coarse concept mappings. Add 120 Phase 09 candidates under their existing BF-SK IDs. New candidate intent and relevance are provisional, marked not reviewed/analyst derived, with no inherited empirical evidence.
2. Assign primary topic using curated concept-to-cluster mapping and query-wording rules. Keep separate clusters for wrist devices, comparisons, purchase/price, support, connectivity, clinical/electronic/administrative boundaries and proprietary concepts. Refine with an editorial pass: 38 assignments changed, including general group-training education versus commercial gym monitoring, and monitoring definitions versus general heart-rate education.
3. Preserve exact query text. Create separate comparison keys with NFC, Arabic yeh/kaf normalization, Persian/Arabic digits converted to ASCII, Arabic diacritic/tatweel removal, lower case, ZWNJ to space and whitespace collapse. The compact review key also removes spaces and common hyphens. Group only where cluster, intent track, primary intent, brand relationship and compact key coincide. This is conservative lexical candidate grouping, not proof of identical Google results; review collisions before any use. No semantic or English/Persian translation collapse.
4. Use a curated representative phrase per cluster, not a measured highest-volume term. MONITOR, BOUNDARY and VOCABULARY clusters have NO_PRIMARY_TARGET status. Other representatives are editorial seeds, not final primary keywords. Roles are single display labels; a representative can still belong to an orthographic group. Supporting vocabulary has precedence over variant role. The long-tail candidate label uses four or more whitespace-separated tokens as a coarse heuristic only, not a measured low-frequency definition. Retain other related query candidates.
5. Preserve all source intent hypotheses and original usage boundaries. A cluster is a research topic, not a proposed URL. A cluster boundary can impose further restrictions even when prior relevance suggested CORE. In particular, broad gym-administration and wrist-device queries are not proof of BeatFit features.

## Findings

- 1,024 exact strings across 41 clusters and 91 intent tracks; 298 review-required records (ambiguity, low confidence, boundary, broad/vocabulary or additional editorial review).
- Largest commercial/system topic groups: gym system 84, wearables 80, coach workflow 64, monitoring 42, athlete software 41, live display 31. These are corpus counts, not demand or ranking potential.
- Educational topics include intensity (39), zones (37), HR parameters (30), training-load/recovery/energy concepts and calculators (35). Calculation tracks should be evaluated separately from articles.
- 85 entries are in the contextual vocabulary cluster. Role counts: 41 representatives, 369 related candidates, 43 orthographic-variant candidates, 493 long-tail candidates and 78 supporting vocabulary. These sum to 1,024; 60 lexical-group members overlap the role categories.
- Brand identity and branded product/access are distinct clusters. Ambiguous fragments بیت and فیت remain monitor-only; Fitbit and other-brand terms remain boundary records.

## Phase 11 handoff

Read the current main source route registry, marketing content, article registry and SEO metadata before assigning pages. Reconcile existing canonical keyword map v4 as a historical source, not an automatically current page assignment. Map individual intent tracks or selected members to existing canonical URLs or documented gaps; group related terms on useful pages and do not create a page for every spelling, cluster or question. Distinguish educational and commercial intent, identify overlapping pages and proposed consolidation only after evidence. Record an explicit no-target/monitor/support-vocabulary disposition where appropriate. Device availability/specifications, demo and app access, proprietary scoring, scientific guidance and medical boundaries remain implementation gates.

## Acceptance and limitations

Validate every original ID/raw string, Phase 07 intent/secondary/confidence/relevance/brand/boundary values, Phase 09 candidate IDs, source references, 41 cluster counts, 91 track counts, 24 lexical groups, and all unmeasured metrics. This is structural validation of a provisional editorial classification, not SERP-based clustering. Phase 03 suggestions, Phase 06 demand and Phase 08 localized ranks are still incomplete. No page ownership, code, marketing copy, routes, deployment or Search Console changes.

## Repository integration

Phase 09 was merged into its predecessor branch, not directly into main. Main's research ledger was observed at the Phase 04 snapshot. The Phase 10 working branch starts from the verified Phase 09 head (43e8a8247343aa6081d4773e6af958e84b19f9f3). Open a documentation integration PR against main to bring forward the missing historical phase files and this phase. Do not assume a closed stacked PR means its contents are present on main. The initially created main-based phase-10 branch was not used for edits. Review the integration diff before merging; do not overwrite unrelated changes.
