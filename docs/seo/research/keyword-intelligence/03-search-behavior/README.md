# Phase 03 — Search behavior and query expansion

**Research date:** 2026-11-25. **Status:** Public-web research pass complete; Google surface capture incomplete.

## Objective

Identify the search tasks behind the seed vocabulary: product purchase, price, comparisons, setup, gym solutions, educational questions, branded navigation and broad ambiguous queries.

## Evidence obtained

- [queries.csv](queries.csv): 66 candidate queries, 6 marked PUBLISHED_PHRASE based on visible source wording (orthographic differences may be present), 60 derived candidates. The provisional intent labels are hypotheses, not completed Phase 07 classification.
- [sources.csv](sources.csv): 15 source records, including official Google methodology and sample commercial/educational/support pages.
- [capture-queue.csv](capture-queue.csv): 22 seeds; two direct Google Autocomplete retrieval attempts were inaccessible.
- [google-observations.csv](google-observations.csv): intentionally header-only. Zero captured Google predictions, related searches or question-panel entries. Do not insert generated suggestions as observed data.

The web search sample is not a localized Google Iran SERP recording and does not establish positions or popularity. The two attempted requests used client=firefox, hl=fa, gl=ir and seeds ضربان قلب and سنسور ضربان قلب. The available retrieval surface returned an access error for both. Locale parameters alone do not prove physical Iran localization.

## Findings

1. Commercial source pages contain purchase/price and sports sensor vocabulary. Research modifiers خرید، قیمت، بهترین، مقایسه separately; do not claim an active BeatFit retail offer.
2. Device-support sources cover setup and phone tracking; expand how-to candidates with connection, wearing location and troubleshooting. Do not claim BeatFit supports a specific device or integration without evidence.
3. Educational sources expose calculation and recovery topics. Formula/tools content must be scientifically reviewed; no universal heart-rate threshold or calorie guarantee.
4. Gym platform content includes live group monitoring and heart-rate wall terminology; useful for B2B questions, not proof of feature parity.
5. Broad heart-monitoring results include ECG and medical suppliers, while Fitbit is a separate brand. Retain mixed/ambiguous terms for analysis rather than misrepresenting BeatFit's purpose.

## Required Google capture procedure

Use signed-out Google Search, Persian interface, an Iran-targeted measurement environment where legitimately available, and separate desktop/mobile captures. Record observed locale/location, date/time, query seed, device and exact phrase order. Capture visible autocomplete, related-search and question-panel wording; record absent surfaces as NOT_SHOWN, blocked requests as ACCESS_BLOCKED, and unattempted seeds as PENDING. Do not treat a blocked request as zero demand.

Record one observation per row in google-observations.csv, with an evidence reference to a saved screenshot or permitted capture. Preserve original text, including spacing. Do not record personal search history. No prohibited scraping or bypass of access controls is required. If using Google Trends later, report relative indices, not search counts; if Keyword Planner data is available, retain its location, date range and metric definitions. GSC measures BeatFit's own impressions and clicks, not total market demand.

Official methodology: [Google Autocomplete](https://support.google.com/websearch/answer/7368877?hl=en), [Trends data](https://support.google.com/trends/answer/4365533?hl=en-ca), [Keyword Planner](https://support.google.com/google-ads/answer/7337243/use-keyword-planner).

## Acceptance and blocker

Public content-derived query expansion is complete for this sample. **Direct Google search behavior evidence remains incomplete.** Complete the capture queue or formally retain the documented evidence limitation before claiming full Phase 03 acceptance. Phase 04 competitor discovery can proceed in parallel without inventing Google observations.

No website source, deployment, Search Console or product content was changed.
