# Phase 07 — Search intent classification

**Date:** 2026-11-25. **Scope:** All 904 exact research strings in the Phase 06 demand queue. **Status:** Initial qualitative classification complete; empirical SERP validation pending.

## Deliverables

- [intent-classification.csv](intent-classification.csv): 904 one-to-one records keyed by existing demand ID, preserving exact raw query, collection band and all four unmeasured metric statuses. Adds topic hint, primary and secondary intent, search task, audience, brand relation, relevance, ambiguity, confidence, rule, usage boundary and review state.
- [intent-summary.csv](intent-summary.csv): 45 distribution rows across seven independent dimensions. Counts describe the research corpus, not actual market demand.
- [intent-review-queue.csv](intent-review-queue.csv): 334 selected records, consisting of the union of the 83 A/B collection-band entries and 279 review-priority entries. 83 initial SERP sample, 175 expanded SERP/editorial reviews, 76 contextual-vocabulary reviews. None has been empirically verified.

## Methodology

Use the Phase 06 exact-string inventory and source topic/provenance fields, apply curated topic and task groups, inspect Persian modifiers and explicit brand, device, education and clinical boundaries, then apply an editorial refinement pass (203 rows marked EDITORIAL_REVIEW_OVERRIDE). This is a qualitative, rule-assisted classification rather than an observed query-intent dataset. Topic hints are coarse working categories, not final clusters or page owners. All rows retain HYPOTHESIS_NOT_SERP_VERIFIED. Confidence describes interpretability of the wording, not a statistical probability or ranking likelihood. No external metrics were acquired during this classification.

| Primary intent | Meaning | Example | Rows |
|---|---|---|---:|
| NAVIGATIONAL | Find a specific brand, official site or app | بیت فیت | 20 |
| COMMERCIAL_INVESTIGATION | Evaluate product, solution, software, comparison or price | سنسور ضربان قلب | 364 |
| INFORMATIONAL | Understand a concept, method or training topic | بار تمرینی چیست | 342 |
| TRANSACTIONAL | Buy or request a demo/consultation | خرید سنسور ضربان قلب | 13 |
| UTILITY | Obtain calculation or reference output | محاسبه زون ضربان قلب | 31 |
| SUPPORT | Setup, connection, device use or troubleshooting | چرا سنسور ضربان قلب وصل نمی‌شود | 8 |
| AMBIGUOUS | Unclear meaning or broad unresolved context | بیت | 50 |
| VOCABULARY_ONLY | Context-free semantic support words in the research inventory | حسگر | 76 |
| Total | | | 904 |

Prices normally imply evaluation rather than an immediate purchase. Explicit comparison can be commercial or conceptual. Utility and support are task-oriented subdivisions used for content research; the taxonomy is not a claim that Google uses these exact labels. A single primary label enables summaries; secondary intent and ambiguity fields preserve mixed intent. All labels can be revised after SERP evidence.

## Relevance and boundary rules

609 CORE, 101 ADJACENT, 110 BROAD, 76 VOCABULARY_ONLY and 8 BOUNDARY_ONLY records. These are qualitative fit hypotheses, not keyword deletion or ranking priority. Retain all raw strings even where the initial relevance label is low. The 8 boundary-only records concern other brands/models or clinical products/symptoms; these are retained for monitoring/disambiguation, not misleading product claims. Broad queries such as ضربان قلب and دستگاه هوشمند پایش قلب have sports/clinical ambiguity; use sports context and scientific review, not implied ECG/medical capability. Wrist devices, third-party compatibility, device sale, online demo, app distribution, price and gamification capabilities require evidence before implementation.

Brand relation distinguishes 51 BeatFit-related strings, five ambiguous brand fragments, four other-brand/model strings and 844 other research strings. The bare words بیت and فیت are important to the owner's goal, but broad relevance and mixed meaning must not be hidden. Other-brand spellings must not become BeatFit aliases. No new landing pages are assigned; exact spelling variants remain separate research rows.

## Review and Phase 08 handoff

231 LOW, 507 MEDIUM and 166 HIGH qualitative confidence records. 279 records are flagged for review due to uncertainty, ambiguity or boundary status. The review queue selects all such records plus all A/B collection-band entries. The first 83 query sample records retain existing collection bands from Phase 06. The remaining 175 SERP/editorial cases are a follow-up queue; 76 vocabulary-only cases are semantic review rather than mandatory individual Google search captures.

Phase 08: collect exact query, timestamp, device, actual location, language, organic result titles/URLs/positions where legitimately available, result types, dominant/mixed intent, and evidence references. Keep ads and features distinct from organic ranking. Use accessible public content only as nonlocalized context where Google capture is unavailable. Record inaccessible results as blocked, not zero visibility. Review ambiguous labels and observed result intent; do not claim actual search intent or organic difficulty based on wording alone. Preserve source rows, immutable IDs and historical hypothesis values.

## Acceptance

904 unique demand IDs and unchanged raw queries, 20 fields per classification row, one row per Phase 06 entry, exact unchanged collection bands and all metric statuses NOT_MEASURED. Summary and review queue derived from this snapshot. No unknown topic bucket remains; this does not establish exhaustive correctness. Google surface capture (Phase 03), quantitative demand (Phase 06) and empirical intent verification remain incomplete. No website code, content, URLs, deployment or Search Console actions changed.
