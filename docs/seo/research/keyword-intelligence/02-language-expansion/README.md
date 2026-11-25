# Phase 02 — Persian language expansion

**Record date:** 2026-11-25. **Status:** Initial mapping pass complete; search demand and exact equivalence unverified.

[variants.csv](variants.csv) preserves **253 concept-to-variant mappings**, including 21 English technical concept groups. Reconstructed from the prior research phase; mappings are candidate relationships, not proof that Google treats all variants as equivalent.

## Rules for future normalization

Keep raw query text immutable. Derive optional normalized keys later using Unicode NFC, consistent Arabic/Persian yeh and kaf handling, whitespace handling and separate orthography-group keys. Do not silently delete original forms. ZWNJ, spelling variants and English case forms remain distinct raw records even where a future clustering key groups them.

Formal writing should remain natural Persian. Do not create duplicate pages to target spelling differences. Synonyms and related terms can have different intent: continuous monitoring vs one-off measurement, armband vs wristband, chest strap vs ECG, sports monitoring vs medical diagnosis, BeatFit vs Fitbit. Keep these boundaries explicit. HRV, PPG, BLE, ANT+, VO2 max and other technical words are not verified BeatFit product specifications.

The file retains colloquial searches as generated hypotheses. Published vocabulary is not equivalent to autocomplete evidence. Source references for the current web sample are in [Phase 03 sources](../03-search-behavior/sources.csv).

## Acceptance

Exact mapping triples are deduplicated, with raw Persian and mixed-language text preserved. No demand, ranking or product capability is asserted. Semantic clustering and search-intent judgments remain subject to later review.
