# BeatFit Persian keyword intelligence — developer handoff

**Start:** 2026-11-25. **Scope:** Research artifacts only, English documentation and raw Persian/English queries. **Goal:** competitive organic visibility; rank #1 is a target, not a guarantee.

## Phase ledger

| Phase | Deliverable | State |
|---|---|---|
| 01 Master discovery | [Report](01-master-discovery/README.md), [462 raw keywords](01-master-discovery/keywords.csv) | Initial pass complete |
| 02 Language expansion | [Report](02-language-expansion/README.md), [253 variant mappings](02-language-expansion/variants.csv) | Initial pass complete |
| 03 Search behavior | [Report](03-search-behavior/README.md), [66 candidates](03-search-behavior/queries.csv), [15 sources](03-search-behavior/sources.csv), [22-seed capture queue](03-search-behavior/capture-queue.csv), [Google observations](03-search-behavior/google-observations.csv) | Partial; direct Google evidence blocked/pending |
| 04 Competitor discovery | [Report](04-competitor-discovery/README.md), [27 competitor cases](04-competitor-discovery/competitors.csv), [34 evidence records](04-competitor-discovery/evidence.csv) | Initial pass complete |
| 05 Competitor keyword research | [Report](05-competitor-keyword-research/README.md), [27 page attempts](05-competitor-keyword-research/pages.csv), [183 phrase rows](05-competitor-keyword-research/phrases.csv), [110 derived candidates](05-competitor-keyword-research/candidate-delta.csv), [12-topic matrix](05-competitor-keyword-research/topic-matrix.csv) | Initial pass complete; one blocked and eight excerpt-only cases |
| 06 Search demand | [Report](06-search-demand/README.md), [904 exact queries](06-search-demand/demand-queue.csv), [14 comparison groups](06-search-demand/trends-comparison-plan.csv), [sources](06-search-demand/sources.csv), [attempts](06-search-demand/measurement-attempts.csv) | Partial; no numeric observations; Trends blocked and owner exports required |
| 07 Search intent | [Report](07-search-intent/README.md), [904 classifications](07-search-intent/intent-classification.csv), [summary](07-search-intent/intent-summary.csv), [334 review records](07-search-intent/intent-review-queue.csv) | Initial qualitative pass complete; SERP validation pending |
| 08 SERP and competition | [Report](08-serp-competition/README.md), [28 public evidence records](08-serp-competition/public-result-evidence.csv), [eight topic assessments](08-serp-competition/competition-assessment.csv), [capture queue](08-serp-competition/serp-capture-queue.csv) | Partial; localized Google capture blocked/pending |
| 09 Semantic research | [Report](09-semantic-research/README.md), [41 concepts](09-semantic-research/concepts.csv), [60 relationships](09-semantic-research/relationships.csv), [120 candidates](09-semantic-research/semantic-candidates.csv), [904 mappings](09-semantic-research/existing-keyword-concept-map.csv) | Initial pass complete; empirical verification pending |
| 10 Clustering | [Report](10-keyword-clustering/README.md), [41 clusters](10-keyword-clustering/clusters.csv), [1,024 memberships](10-keyword-clustering/cluster-membership.csv), [91 intent tracks](10-keyword-clustering/intent-tracks.csv), [24 lexical groups](10-keyword-clustering/orthographic-variants.csv) | Initial editorial pass complete; empirical validation pending |
| 11 Keyword gap and page mapping | Current page inventory, gap decisions | Next |
| 12 Prioritization | Transparent scoring, missing-data handling | Pending |
| 13 Master database | Deduplicated inventory, provenance and schema validation | Pending |
| 14 Ranking measurement | Query-page baseline, monitoring protocol | Pending |

## Handoff contract

Each phase gets its own numbered directory, README with scope, method, evidence and limitations, UTF-8 CSV data files and explicit acceptance conditions. Keep raw text and stable IDs, and retain historical snapshots. Files across phases overlap; their counts must not be added to infer a unique master total. Use evidence types to distinguish existing source assignments, published phrases, generated candidates, actual Google observations and measured GSC/volume data. Missing data is not zero. The target country is Iran and language Persian; actual capture location must be recorded separately.

No rank, volume, difficulty or feature parity may be fabricated. Keep broad and ambiguous keywords in the bank. Only after research and owner approval should the developer team receive implementation tasks; this directory does not authorize content, code, new URLs or deployment.

## Existing baseline

- [Canonical keyword map v4](../2026-11-24-canonical-keyword-map-v4.csv)
- [Priority ranking query register](../2026-11-24-priority-ranking-query-register.csv)
- [Persian search visibility ranking program](../../strategy/2026-11-24-persian-search-visibility-ranking-program.md)

These are historical research records, not live rank verification. The new phase files supplement them.
