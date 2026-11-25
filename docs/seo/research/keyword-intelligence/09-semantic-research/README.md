# Phase 09 — Semantic keyword research

**Date:** 2026-11-25. **Status:** Initial semantic research complete; empirical query evidence and product/scientific verification remain pending. Research only.

## Deliverables

- [concepts.csv](concepts.csv): 41 stable concept IDs with Persian/English labels, definitions or limits, source IDs and usage gates.
- [relationships.csv](relationships.csv): 60 directed editorial relationships between concepts, not a representation of Google's knowledge graph or ranking algorithm.
- [semantic-candidates.csv](semantic-candidates.csv): 120 unique derived Persian candidate strings, all new by exact-string comparison with Phase 06's 904 strings. This is not semantic deduplication or measured demand. Some are contextual phrases or boundary questions, not standalone commercial targets.
- [existing-keyword-concept-map.csv](existing-keyword-concept-map.csv): all 904 Phase 07 IDs and exact strings preserved, provisionally mapped into 31 of the 41 concepts using prior topic, intent and simple wording rules. The remaining concepts are available for finer clustering and expansion. Single primary associations are provisional; multi-concept overlap and final cluster membership are Phase 10 work.
- [sources.csv](sources.csv): 16 references (15 external sources and one prior research file); external sources reviewed via available public search excerpts. General concept relationships are editorial synthesis, not direct proof of specific product features. The BeatFit-specific metrics concept relies on owner-supplied project terminology, not public competitor claims.

## Semantic model

The core narrative is a sports monitoring system: a wearable can supply heart-rate data, the system may display and record the data, an athlete and coach can interpret it in exercise context, and sessions can support longitudinal review. General scientific concepts explain measurement, relative intensity, target ranges, training load and recovery. Commercial, software, support and educational vocabulary is associated with relevant concepts; no URL or landing-page decisions are made.

### Distinctions that must survive clustering

- Monitoring versus one-time measurement; heart rate versus rhythm, diagnostic ECG or clinical monitoring.
- Finished wearable versus electronics sensor component; optical/electrical measurement versus device wearing position. No protocol, accuracy, battery, water resistance or compatibility claim without model evidence.
- Relative intensity versus absolute workload; heart-rate zones depend on method and individual inputs. Estimated maximum HR is not necessarily measured maximum; HR reserve is distinct from heart-rate recovery. RPE and talk test complement physiological measurements.
- Internal versus external training load; HR is not a complete measure of external work. Energy estimates are not direct calorimetry or guaranteed fat loss. Recovery and progress need context and comparable observations.
- Missing or noisy data is not evidence of low effort. Real-time displays do not guarantee data completeness.
- Member participation, scoring and challenges are distinct from proven retention outcomes. BeatFit-specific بیت and هم‌ریتم are research concepts only; definitions, scoring and release status need product-owner approval.
- Smart gym training systems versus administrative software; BeatFit versus Fitbit and similarly named businesses.

## Method and evidence

Search Central recommends useful natural wording, not keyword stuffing or the keywords meta tag. AHA and CDC supply general intensity and heart-rate vocabulary. Polar documentation provides examples of sensor methods, load dimensions and class metrics; Myzone describes its own group display and effort-scoring features. Bluetooth SIG specifies a fitness HR data service, not BeatFit protocol support. Persian retailer, editorial, academic-abstract, component and support excerpts provide language evidence. Do not reproduce vendor marketing claims or prescribe individualized exercise thresholds based on these research notes.

Concept labels and candidate strings are analyst-authored research hypotheses; source references explain their conceptual basis, not that each exact query appears verbatim in sources or Google. All 120 candidate rows retain UNVERIFIED volume and rank. Earlier Phase 07 labels remain unchanged. Before creating educational copy, review appropriate scientific evidence; before publishing product claims, verify actual capability and release state. All usage gates are research boundaries, not implementation authorization.

## Phase 10 handoff

Build a unified exact-string inventory of the 904 previous entries plus 120 new candidates (1,024 distinct strings if verified by exact join). Preserve stable IDs, source lineage, usage gates and the original classifications. Assign new candidate intent as a hypothesis rather than inheriting measurements. Derive Unicode/orthographic grouping keys separately from raw strings; distinguish synonyms from related concepts and different intent. Create cluster IDs and memberships with ambiguity and review flags. Do not assume one concept equals one page. Page mapping is Phase 11.

## Acceptance

Validate unique IDs, source references, relationship endpoints, exact delta, all 904 preserved query joins and no measured-demand/rank claims. Structural validation does not establish empirical search intent or scientific completeness. Phase 03 Google suggestions, Phase 06 numeric demand, and Phase 08 localized SERPs remain incomplete. No website copy, source code, routes, deployment or Search Console changes.
