# Persian Article Editorial Evidence and Search Metadata Audit

**ID:** BF-SEO-EDITORIAL-001  
**Date:** 2026-11-21  
**Source snapshot:** `4eb3d6914eeddb2ffea9e8414cbbf218606cdcc1`  
**Locale:** fa-IR (documentation authored in English)  
**Scope:** Seven published article modules, common article renderer, JSON-LD serialization, limited external reference spot checks.

## Evidence inventory

Version-controlled sources contain **7 published articles**, **47 listed external source entries** (**43 distinct URLs**) and **46 FAQ questions**. Each article has a `datePublished`, a visible FAQ section and a source-list block. These counts are source observations, NOT evidence that external URLs are all live, every claim is correct, or pages are indexed.

| Published article slug | Citations | FAQ questions | Publication |
|---|---:|---:|---|
| `زون-های-ضربان-قلب` | 6 | 6 | 2026-11-08 |
| `کنترل-شدت-تمرین-در-کلاس-گروهی` | 7 | 6 | 2026-11-08 |
| `پایش-ضربان-قلب-در-باشگاه` | 7 | 7 | 2026-11-09 |
| `تاریخچه-تمرین` | 6 | 6 | 2026-11-09 |
| `بار-تمرینی-چیست` | 6 | 7 | 2026-11-09 |
| `مقایسه-سنسور-ضربان-قلب` | 8 | 7 | 2026-11-09 |
| `طراحی-تمرین-گروهی` | 7 | 7 | 2026-11-09 |

- [Full 47-entry source register](../inventory/2026-11-21-article-citation-register.csv)
- [Article metadata inventory](../inventory/2026-11-21-article-editorial-inventory.csv)

The register categorizes source *hosts* heuristically as journal/research, clinical/public health, professional association or vendor. The majority of links are `SOURCE_ONLY_NOT_INDEPENDENTLY_RETRIEVED`. A few have limited topic/open-page verification; none has been certified to support every surrounding claim.

## Finding BF-SEO-ED01 — Google FAQ rich result feature retired

**Confirmed, official Google documentation; editorial SEO policy P2, no proven page error.**

Google Search Central's official documentation changelog states that FAQ rich results stopped appearing **May 7, 2026**, with a deprecation notice on **May 8, 2026**; the FAQ rich result documentation was removed on **June 15, 2026**. Current `src/seo/schema.ts` still emits `FAQPage` JSON-LD for visible article FAQ sections. This does **not** prove a markup penalty or search failure. Do not promise rich-result placement or CTR impact. **Keep useful user-facing FAQs.** Optional FAQPage markup simplification is a separate review decision.

Evidence: https://developers.google.com/search/updates ; https://developers.google.com/search/docs/appearance/structured-data/faqpage (redirect).

## Finding BF-SEO-ED02 — Editorial accountability and claim-to-source mapping

**Source-based trust/governance candidate P2; not a fabricated-content allegation.**

All seven pages display `تیم محتوای بیت‌فیت` as institutional author in `BlogArticle.tsx`, and the JSON-LD uses `Organization` with that name. Google explicitly permits an Organization author for `BlogPosting`; **the type is valid**. The inspected source does not establish named credentialed reviewers, article-specific review notes or public corrections policy. A bibliography alone does not prove that each material training, injury-risk or sensor-accuracy assertion is supported.

**Action:** Establish a real product/exercise-claim review record, map specific significant assertions to supporting publications, and publish truthful editorial accountability if desired. Do not invent personal bylines, medical qualifications or endorsements.

Official guidance: https://developers.google.com/search/docs/appearance/structured-data/article

## Finding BF-SEO-ED03 — Publication versus actual revision dates

**Source observation / optional future enhancement P3.**

The article records and visible header provide `datePublished`, but the inspected JSON-LD does not emit `dateModified`, and no real article revision history was established. Google recommends `dateModified` when applicable; it is not obligatory. Add genuine verified revision dates only when a substantive review/update has actually happened. Do not backdate or fake freshness because a citation URL changed.

Official guidance: https://developers.google.com/search/docs/appearance/publication-dates

## Finding BF-SEO-ED04 — Legacy CDC exercise-intensity source link

**Confirmed URL quality issue; Draft PR #4, no merge/deployment.**

The `groupClassIntensity.ts` article links to `https://www.cdc.gov/physicalactivity/basics/measuring/index.html`, which returned the intended content mixed with visible `Error processing SSI file` template errors during a public page read. A clean current CDC page `https://www.cdc.gov/physical-activity-basics/measuring/index.html` was independently verified to describe relative intensity and talk test. This is not a claimed HTTP 404 or evidence of a ranking loss.

[Draft PR #4](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/pull/4) replaces **only that URL**. Exact PR revision `ed9547d5f675f3aba6ccf8f9dacb5224b763a1ac` passed real GitHub CI: TypeScript/Vite build, 254 generated SEO artifact checks, one-link assertion and no tracked-public drift ([run 44876593273](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/actions/runs/44876593273)). Browser clicking, deployed page and indexing remain unverified.

## Targeted source spot checks (not a full scientific review)

1. Clean CDC page: relative intensity and talk-test information present.
2. Legacy CDC page: topic present but SSI template errors shown.
3. American Heart Association chart: `220 − age` presented as an estimate with limitations and medical caveats.
4. ACSM `2027-fitness-trends`: a real page dated **October 20, 2026**; its 2027 topic is not future-dated publication.
5. PubMed 39508366: four consumer optical HR sensor validation topic identified.
6. PubMed 41516615: anatomical placement study identified, publication dated December 2025.
7. PubMed 32552580: wrist-worn PPG systematic review record exists.
8. Polar support introduction: page retrieved.

External web sources are linked in the CSV register. Opening a source establishes limited identity/content evidence, **not** that each study supports every sentence of the BeatFit article.

## Article-specific editorial review queue

| Article | Next human/editorial review |
|---|---|
| `زون-های-ضربان-قلب` | Check age-predicted maximum HR, five-zone estimates, individualized safety limitations |
| `کنترل-شدت-تمرین-در-کلاس-گروهی` | Check heart rate, RPE and talk-test usage; replace legacy CDC reference |
| `پایش-ضربان-قلب-در-باشگاه` | Check BeatFit sensor/receiver/live screen/session data availability against actual product |
| `تاریخچه-تمرین` | Ensure trend comparisons do not overstate individual improvement |
| `بار-تمرینی-چیست` | Separate internal/external load and sRPE from injury prediction |
| `مقایسه-سنسور-ضربان-قلب` | Validate technology, placement, movement-condition specificity; no untested device ranking |
| `طراحی-تمرین-گروهی` | Check scaled movement examples and reasonable exercise cautions |

## Required acceptance gate

- Article facts reviewed with appropriate exercise/scientific/product expertise where necessary.
- Source-to-claim evidence matrix recorded for material assertions.
- Publication dates preserved; real updates logged before any `dateModified` field is introduced.
- Visible FAQs retained for readers; Google FAQ rich result claims removed from future strategy/KPIs.
- Actual rendered and deployed page/link checks when accessible; live BeatFit host and first-party Search Console remain independently blocked.
- Every code or article revision reviewed in a small PR; no automatic merge or production publication.

**Status:** Source inventory COMPLETE; eight selected external spot checks COMPLETE; full source-link reachability / scientific review NOT RUN; production indexing UNKNOWN.
