# Zone 2 Terminology Clarification — Draft Copy PR

**Record:** BF-SEO-ED-Z2-001  
**Date:** 2026-11-21  
**Target:** `/blog/زون-های-ضربان-قلب`  
**Branch:** `seo/clarify-zone2-definitions-2026-11-21`  
**Base:** `7dbb283a97681597ee0792dd408f0b0734876a7a`  
**Status:** Draft/review only, no merge or deployment.

## Scientific evidence

The existing article correctly presents the five-zone **percentage-of-estimated-HRmax** classification and labels `220 − age` and `208 − 0.7 × age` as approximations. Its age-30 examples (190 and 187 bpm; zones 95–114, 114–133, 133–152, 152–171, 171–190 for an HRmax estimate of 190) are arithmetically consistent.

A 2025 study of Zone 2 intensity boundaries explicitly examined differences between fixed percentages of HRmax and physiology-based limits (including ventilatory and lactate markers), observing individual variability. As a result, `Zone 2 = 60–70% HRmax` is accurate **within the named five-zone convention** but not a universal physiological definition.

**External research:** https://pubmed.ncbi.nlm.nih.gov/40225831/  
**Existing sources for age prediction:** https://pubmed.ncbi.nlm.nih.gov/11153730/ and https://www.heart.org/en/healthy-living/exercise-and-physical-activity/fitness-basics/target-heart-rates/

## Exact intended edits

1. Add **one** Persian note paragraph directly after the existing Zone 2 explanatory paragraph. It explicitly separates the selected five-zone `60–70% HRmax` convention from other threshold-based definitions.
2. Align **one** existing FAQ answer about Zone 2 with this distinction, retaining the existing six-question FAQ structure and user-facing heading.
3. Add **one** PubMed research URL to the visible references section. Retain every existing citation.

## Static checks

- Exact insertion point, original FAQ and bibliography anchor each found once: **PASS**.
- New paragraph, updated FAQ and new research URL each appear once after edit: **PASS**.
- No changes to article slug, H1, SEO title, meta description, publication date, imagery, canonical construction, page layout or unrelated text: **PASS by exact string substitution**.
- Number of FAQ questions remains six: **PASS (source)**.
- Published article count stays seven: **PASS (source design)**.
- Real build / generated HTML / rendered-browser checks: **NOT RUN yet** at PR preparation.
- Editorial fact review, live Google inspection, IIS hosting: **NOT RUN / BLOCKED**.

This is not an individualized exercise prescription and does not claim that all five-zone percent ranges directly map to physiological thresholds. No medical credential or article freshness date is invented.

## Merge gate

Check the exact diff, approve scientifically and editorially, run real `npm ci && npm run build` plus generated SEO integrity tests, inspect the Persian note and FAQ in a JS-enabled browser, and keep production deployment separate. A successful test of another PR does not qualify this one.
