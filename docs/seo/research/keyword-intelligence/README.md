# BeatFit Persian keyword intelligence — developer handoff

**Start:** 2026-11-25. **Scope:** Research artifacts only, English documentation and raw Persian/English queries. **Goal:** competitive organic visibility; rank #1 is a target, not a guarantee.

## Phase ledger

| Phase | Deliverable | State |
|---|---|---|
| 01 Master discovery | [Report](01-master-discovery/README.md), [462 raw keywords](01-master-discovery/keywords.csv) | Initial pass complete |
| 02 Language expansion | [Report](02-language-expansion/README.md), [253 variant mappings](02-language-expansion/variants.csv) | Initial pass complete |
| 03 Search behavior | [Report](03-search-behavior/README.md), [66 candidates](03-search-behavior/queries.csv), [15 sources](03-search-behavior/sources.csv), [22-seed capture queue](03-search-behavior/capture-queue.csv), [Google observations](03-search-behavior/google-observations.csv) | Partial; direct Google evidence blocked/pending |
| 04 Competitor discovery | Competitor register, source evidence, relationship categories | Next |
| 05 Competitor keyword research | Page/phrase evidence and competitor topic matrix | Pending |
| 06 Search demand | Location/date-scoped metrics and data-source limits | Pending |
| 07 Search intent | Intent labels and mixed-intent flags | Pending |
| 08 SERP and competition | Localized SERP captures and competitive assessment | Pending |
| 09 Semantic research | Concept/relationship inventory and evidence | Pending |
| 10 Clustering | Stable topic IDs, exact-variant membership | Pending |
| 11 Keyword gap and page mapping | Current page inventory, gap decisions | Pending |
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
