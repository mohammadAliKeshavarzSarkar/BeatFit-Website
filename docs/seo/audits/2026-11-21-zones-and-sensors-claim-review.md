# Heart-Rate Zones and Wearable Sensor Accuracy — Scientific Claim Review 001

**Record:** BF-SEO-CLAIMS-001  
**Date:** 2026-11-21  
**Locale:** Persian (fa-IR); English documentation  
**Source commit:** `7dbb283a97681597ee0792dd408f0b0734876a7a`  
**Articles:** `/blog/زون-های-ضربان-قلب` and `/blog/مقایسه-سنسور-ضربان-قلب`  
**Method:** Source-text review mapped to identified external public-health documents, original research and domain-specific validation guidance. **Not an individualized medical review, clinical device validation or full systematic literature review.**

## Executive findings

- **No material arithmetic errors were detected** in the existing age-30 HRmax and five-zone worked example. `220 − 30 = 190` and `208 − 0.7 × 30 = 187`; simple percent boundaries for 190 are 95 / 114 / 133 / 152 / 171 / 190 bpm.
- A **terminology clarification** is useful: the article uses Zone 2 as `60–70% HRmax` in a specific five-zone scheme, but physiological zone demarcations defined through ventilatory or lactate thresholds are not guaranteed to match that fixed band across people.
- The wearable sensor article is **already materially cautious**: it describes model/activity/placement-dependent accuracy and explicitly avoids claiming that third-party arm-sensor studies establish BeatFit's own hardware accuracy. A full rewrite is not justified by the sampled evidence.
- The two articles' remaining important risk is **evidence-to-claim traceability and product-specific validation**, not an observed index/ranking failure. High-stakes physiological claims should be reviewed by qualified subject-matter experts.
- **22 distinct source-level claims/claim families** were classified into separate evidence and follow-up states. This is a bounded editorial audit, not a full sentence-level certification.

[Downloadable source-to-claim CSV](../inventory/2026-11-21-zones-and-sensors-claim-matrix.csv) has the exact Persian passage anchor, evidence URL, scope, assessment and proposed action for each row.

## 1. Heart-rate-zone article — what is supported

### BF-HR-Z01 — Age-predicted HRmax formulas are estimates

The existing `220 − age` formula is described as an approximation by the American Heart Association. The `208 − 0.7 × age` alternative matches Tanaka et al. (2001). Neither guarantees a person's measured HRmax. The article already explains individual differences and medications/medical conditions, avoiding a universal safe zone prescription.

Evidence:
- https://www.heart.org/en/healthy-living/exercise-and-physical-activity/fitness-basics/target-heart-rates/
- https://pubmed.ncbi.nlm.nih.gov/11153730/

### BF-HR-Z02 — Five-zone percentages are conventions

The current table divides HRmax into `50–60, 60–70, 70–80, 80–90, 90–100%` and expressly says devices/training models may differ. Arithmetic is consistent for HRmax 190. This is acceptable as a **named model**, rather than a universal exercise prescription.

### BF-HR-Z03 — Zone 2 may refer to different physiological markers

The additional research study by Meixner et al. (2025) evaluated **50 cyclists** and found significant differences in Zone 2 intensity markers when using fixed HRmax percentages versus markers such as VT1 and maximal fat oxidation. The outcomes are population- and study-specific: they support a caveat about terminology/individual variability, **not** a universal substitute percentage or personalized target.

- External evidence: https://pubmed.ncbi.nlm.nih.gov/40225831/
- [Draft PR #8](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/pull/8) adds one Persian note paragraph, refines the Zone 2 FAQ answer and adds the PubMed citation, without changing five-zone tables, calculation examples, slug, metadata or `datePublished`.
- Source-diff check confirms precisely these three article-content edits; the PR remains Draft and is not deployed.

### BF-HR-Z04 — Talk test and safety wording are appropriately bounded

The CDC's talk-test description distinguishes conversational moderate effort from more breathless vigorous intensity. The article explains that this is an **adjunct**, not an exact zone calculator. Its warning states that estimated zones are educational and not individually prescribed limits.

Evidence: https://www.cdc.gov/physical-activity-basics/measuring/index.html, https://www.heart.org/en/healthy-living/exercise-and-physical-activity/fitness-basics/target-heart-rates/.

### BF-HR-Z05 — Remaining targeted review

The “fat-burning Zone 2” paragraph includes useful caution that energy-substrate proportion does not automatically determine body-fat loss; a reviewer should map specific metabolism claims to appropriate primary evidence. Exercise-response lag and device-processing delay are distinct concepts and deserve a sentence-level source check, although no specific error was proven here.

## 2. Sensor comparison article — evidence and context

### BF-SENSOR-01 — Four-device study

Neudorfer et al. (2024) compared four specific consumer-grade optical HR sensors against ECG. Differences among tested wrist and upper-arm devices were observable in the described activities, but do **not** support a universal ranking of armbands above all smartwatches. The BeatFit source accurately scopes this to the devices in that study. Evidence: https://pubmed.ncbi.nlm.nih.gov/39508366/ (full publication: https://onlinelibrary.wiley.com/doi/full/10.1111/sms.14756).

### BF-SENSOR-02 — Placement and high-intensity movement

A study by authors of “Impact of Anatomical Placement...” (online late 2025; journal volume 2026) tested **28 healthy adults**, specific wrist/forearm/upper-arm PPG devices and a Polar H10 chest reference. Accuracy declined for some devices in high-motion burpees; positioning of identical Whoop units affected agreement. This is **specific evidence** for the source article's balanced placement/movement statements, not an independent validation of BeatFit's hardware. Evidence: https://pubmed.ncbi.nlm.nih.gov/41516615/.

### BF-SENSOR-03 — A second optical study is smaller and device-specific

The 2025 Schweizer & Gilgen-Ammann study included **16 participants**, Polar Verity Sense and Vantage V2 at specified positions, versus Polar H10 chest reference. It supports careful, product-specific conclusions; it does not generalize to untested models or skin/fitness populations. Evidence: https://pmc.ncbi.nlm.nih.gov/articles/PMC11951816/.

### BF-SENSOR-04 — Consumer device validation and motion artifacts

The INTERLIVE expert statement emphasizes motion conditions and protocols in wearables validation, including intermittent exercise and wrist movements. A 2026 multi-device comparison further suggests device category alone is insufficient to explain optical measurement accuracy. Evidence: https://doi.org/10.1136/BJSPORTS-2020-103148, https://pmc.ncbi.nlm.nih.gov/articles/PMC13358589/.

### BF-SENSOR-05 — No product-specific accuracy claim is established

The BeatFit article explicitly says its own sensor should be assessed using tests on the **same device and intended conditions**. The review did not obtain any independent BeatFit device-validation study, firmware/specification dossier, simultaneous-connection capacity or error benchmarks. **No BeatFit accuracy/medical claim is approved on the basis of studies of other brands.**

### BF-SENSOR-06 — One historical comparison remains insufficiently checked

The article attributes a specific wrist-versus-forearm finding to a 2017 study. The link is present in the source references, but the exact claim's comparator, protocol and statistics were not independently verified here. Keep **REQUIRES_FULL_TEXT_VERIFICATION** as an editorial item, not a declaration that the source is wrong.

## 3. Claim assessment distribution

| State | Rows | Interpretation |
|---|---:|---|
| `SUPPORTED_WITH_SCOPE` | 9 | Already qualified or checked within stated limitations |
| `ARITHMETIC_CHECKED` | 1 | Already qualified or checked within stated limitations |
| `CLARIFICATION_PROPOSED_PR8` | 1 | One bounded copy change in Draft PR #8 |
| `NEEDS_EDITOR_SOURCE_MAPPING` | 2 | Review exact source-to-claim support before editing |
| `SAFETY_SCOPE_PRESENT` | 2 | Already qualified or checked within stated limitations |
| `PRODUCT_CONFIRMATION_REQUIRED` | 3 | Requires approved BeatFit product or sensor validation |
| `SUPPORTED_DEVICE_SPECIFIC` | 3 | Already qualified or checked within stated limitations |
| `REQUIRES_FULL_TEXT_VERIFICATION` | 1 | Review exact source-to-claim support before editing |
| **Total** | **22** | No claims about rankings, search volume or medical prescriptions |

## 4. SEO and editorial implications

- Maintain the existing Persian slugs, published dates and article H1s. Avoid thin synonym-targeted landing pages.
- **Do not publish a calculator as a medically precise recommendation tool** solely using `220 − age` without clear individualized limitations.
- Product-specific claims about BeatFit's sensor, class display and supported wearables require an owner-verified specification and/or measurements.
- The existing sensor comparison page fulfills a comparison/research task; avoid rewriting it as a purchase page for unrelated brands.
- Article zone-2 FAQ rich result placement is not a 2026 Google SEO KPI (see the separate official FAQ retirement record). Visible FAQ content can remain helpful.
- The current Zone 2 article has a user-facing `/demo` CTA, whereas several athlete-focused articles link to `/athlete`; evaluate audience-fit as existing BF-SEO-F07/F08, not as part of the scientific copy PR.

## 5. Verification and acceptance

**Completed:** Original-source exact text review, arithmetic checks, major peer-reviewed references/abstracts sampled, one three-edit Draft PR diff inspected.  
**Not established:** Full literature review, all citations independently opened, BeatFit device lab testing, credentialed medical/scientific editorial signoff, actual deployed page, Google Search Console indexing/traffic, SEO ranking improvement.

**Next gate:** Review the scientific note in Draft PR #8, run its own real Build and mobile rendered-text tests, then request editorial/scientific acceptance. The hosting-origin and GSC workstreams remain independent; a new Search Console verification file in code would not itself prove property access or performance data.

## References

- American Heart Association: https://www.heart.org/en/healthy-living/exercise-and-physical-activity/fitness-basics/target-heart-rates/
- Tanaka HRmax equation: https://pubmed.ncbi.nlm.nih.gov/11153730/
- Meixner et al. 2025 Zone 2 variability: https://pubmed.ncbi.nlm.nih.gov/40225831/
- CDC talk test: https://www.cdc.gov/physical-activity-basics/measuring/index.html
- Neudorfer et al. 2024 optical accuracy: https://pubmed.ncbi.nlm.nih.gov/39508366/
- Schweizer & Gilgen-Ammann: https://pmc.ncbi.nlm.nih.gov/articles/PMC11951816/
- Anatomical placement comparison: https://pubmed.ncbi.nlm.nih.gov/41516615/
- INTERLIVE expert statement: https://doi.org/10.1136/BJSPORTS-2020-103148
- Multi-device PPG comparison (2026): https://pmc.ncbi.nlm.nih.gov/articles/PMC13358589/
