# Phase 06 — Search demand analysis

**Date:** 2026-11-25. **Scope:** Persian keyword demand for Iran; preserve English/mixed-language benchmark terms. **Status:** Measurement preparation and source review complete; numeric demand collection **incomplete**.

## Deliverables

- [demand-queue.csv](demand-queue.csv): 904 unique exact strings. Includes all raw queries from 462 Phase 01 seed rows, 253 Phase 02 variant rows (plus their concept anchors), 66 Phase 03 query rows, and 183 Phase 05 vocabulary/derived rows. One comparison seed was added in Phase 06. All 36 existing priority-register phrases remain present. Provenance IDs are retained; a phrase may have several source rows. Concept anchors and competitor vocabulary are measurement candidates, not observed Google searches.
- [trends-comparison-plan.csv](trends-comparison-plan.csv): 14 five-term comparison groups (70 slots, 63 distinct phrases), with explicit Iran geography, Web Search, search-term mode and two fixed collection windows.
- [sources.csv](sources.csv): 16 official-method or third-party methodology references.
- [measurement-attempts.csv](measurement-attempts.csv): 8 records describing retrieval attempts, policy review and access limitations.
- [trends-observations.csv](trends-observations.csv), [market-volume-observations.csv](market-volume-observations.csv), [gsc-observations.csv](gsc-observations.csv): intentionally header-only until genuine metric exports are available. No fabricated values.

## Evidence and market-specific limitations

1. Google Trends publicly identifies Iran as a region. Its Explore time series could not be retrieved here: three attempted URLs returned inaccessible errors. A public Trending Now excerpt concerned unrelated events and is not evidence of demand for BeatFit terms.
2. Public web searches for volume data for سنسور ضربان قلب, پایش ضربان قلب and زون ضربان قلب produced no usable query-specific numeric results. This does not establish zero searches.
3. Google Ads official country restrictions exclude targeting sanctioned regions, and official policy identifies Iran. Do not attempt to evade these restrictions. No Keyword Planner account was accessed. Where legitimately available, Persian global estimates may be considered with their real scope. They are not Iran-only search volumes.
4. Seemerce and RGB explicitly describe their Iran-labelled keyword volume workflow as worldwide Persian-language Google Ads data. Their disclosed upstream method overlaps, so agreement does not constitute independent corroboration. No paid result, purchase or vendor account was accessed. Other vendors may have different coverage and must disclose their methodology before their data is accepted.
5. No accessible Search Console tool or supplied owner export was available. First-party impressions, clicks, CTR and average position remain unmeasured.

## Collection sequence

- **A: 63 comparison sample terms.** First measure brand spellings, ambiguous fragments, core heart-rate words, devices, sensors, placement, purchase, gym, software, exercise, zones, tools and engagement.
- **B: 20 additional prior priority-register terms.** Extend collection using the existing strategy after the initial comparisons.
- **C: 821 remaining inventory strings.** Retain all terms, including low-priority/ambiguous phrases. Classify and cluster before scaling collection. No keyword is removed because its metric is unknown.

These collection bands are operational sequencing, not demand grades, competition scores or Phase 12 keyword prioritization. The 14 comparison batches contain overlapping terms, including repeated anchors and adjacent brand diagnostic terms; the 70 slots are not 70 unique queries.

## Google Trends capture instructions

Open Google Trends Explore with the exact search-term text from each batch. Set country Iran, Web Search, All categories, and the fixed 12 complete calendar months 2025-11-01 through 2026-10-31. For a seasonality review repeat the same settings for 2021-11-01 through 2026-10-31. These dates are chosen to avoid partial current-month comparisons; exact exported date labels and sampling intervals must be retained. If the tool rejects an input, record the rejection, not a substituted value.

Export Interest over time as CSV and retain the original file plus capture settings, capture date and source URL. Preserve displayed less-than-one values and unavailable/suppressed values as distinct states; a displayed 0 may reflect insufficient data. Compare indices within a batch and matching window only. Do not compare normalized scores between independent batches or between the 12- and 60-month windows directly. Repeated anchors are useful for controlled comparisons; any future cross-batch calibration must document a valid nonzero anchor, matching windows and sampling uncertainty. The ambiguous brand diagnostic batch should not be used to infer BeatFit-specific demand.

Google Trends is a relative popularity measure, not absolute monthly searches. Use the long window for seasonality/long-term direction only when enough data is available. Avoid claiming a seasonal pattern from a few sparse points.

## Market-volume collection instructions

For any legally accessible provider, record exact provider and upstream methodology, geography, language scope, network, period, raw query and estimate/range. Preserve a provider's close-variant grouping when disclosed; do not sum separate spellings where the provider may count them together. Use GLOBAL_FA only when the underlying estimate truly represents worldwide Persian-language searches. Do not mislabel as IR. Advertising competition and CPC are not organic competition. Do not invent a conversion factor to estimate Iran-only searches. Missing values, low-volume suppression and actual reported zeros are distinct.

## Owner-provided Search Console export

In the verified BeatFit property, select Performance > Search results, Web, and export the latest 28 and 90 complete days. Keep separate exports for all countries and Iran, where available. Save the query table and site/page totals; record date range, filters, property and device scope. To obtain query-to-page observations, filter each target page and export its Queries table, or use a legitimately authorized Search Console API report with query/page dimensions and explicit date/country/device settings. Independent Queries and Pages tables are not a joint query/page report. Do not infer combinations by joining their totals. Keep property-level and page-level aggregations separate.

Export clicks, impressions, CTR and average position. Preserve raw export files in an authorized private location; before sharing any aggregate record in GitHub, confirm repository access and owner approval. Omitted/anonymized queries and limited exports are not zero demand; impressions depend on current site visibility, and average position is not an exact fixed Google rank. No credentials should be committed.

## Acceptance and next steps

Validated exact source preservation, queue uniqueness, reference joins, planned comparison slots and empty metric schemas. Numeric demand, growth, seasonality, rank and difficulty remain unverified. Phase 06 is **partial**, not fully complete, until real scoped observations are obtained or the unresolved limitation is formally accepted. Phase 07 may proceed with qualitative search-intent classification without numeric demand assumptions. No implementation, code, copy, live site, deployment, purchases or external outreach changed.
