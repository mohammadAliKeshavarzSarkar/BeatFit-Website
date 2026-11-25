# Phase 14 — Ranking measurement protocol

Version 1.0-draft; 2026-11-25. BeatFit only. Research and measurement specification, not implementation or an active monitoring service.

## Baseline and cadence
Obtain authorized Search Console export for verified property sc-domain:beatfit.ir (confirm actual property). Use latest complete 28 days, previous 28 days, and 90-day context; record actual dates, property, search type web, country IR and device. Export query/page and property-level totals separately; retain unfiltered originals, pagination and coverage limitations. Do not sum anonymized queries or assume omitted rows equal zero. CTR = clicks/impressions if impressions >0; aggregate average position only with impression weights for comparable non-overlapping rows. Never equate average position with a localized SERP rank.

All 1,024 master IDs retained in measurement-queue.csv. Weekly brand 26, weekly core 361, monthly education 347, approval-gated 138, boundary sampling 67, contextual 85. These are proposed coverage bands; choose affordable stratified sample when full capture is impractical and record omissions. Existing and proposed paths are hypotheses, not confirmed indexed owners. No standalone capture for contextual vocabulary. Do not target unrelated brands or medical intent.

## Localized capture
Target Iran, Persian interface, web search; record actual geography, language, device, engine, timestamp, method and query exact string. Use authorized manual or compliant measurement source; no bypassing access restrictions. Separate mobile and desktop. Capture organic results within documented depth, excluding ads and distinguishing special features. Record found position and URL, NOT_FOUND_WITHIN_DEPTH, BLOCKED, or NOT_CAPTURED; blank rank except FOUND. No fake geographic claims or personalized rank guarantees. Store evidence references. Track expected versus observed page, including redirects; do not create pages based on a single result.

## Indexation and ownership
For each of 13 source-indexable routes request authorized live HTTP/canonical/robots/sitemap checks and Search Console URL Inspection evidence. Record declared and Google-selected canonical separately, inspection date and coverage status. No inference from inaccessible retrieval. Compare query-page pairs across equivalent windows; flag multiple URLs as review candidates, not confirmed cannibalization. Consider intent, canonical variants, device/geography and impression sufficiency. Suggested review trigger: two distinct canonical destinations each with >=20 impressions and >=20% of visible query-page impressions in a 28-day window, or persistent ownership switches across two windows; analyst validates before action. Thresholds are provisional, not Google rules.

## KPIs and reporting
Track branded top-1/top-3 coverage among comparable successfully captured queries (including not-found-within-depth as non-top), core top-10 coverage, organic clicks/impressions/CTR and average position, expected-owner match, verified indexed routes and open overlap reviews. Report capture success and denominator beside each KPI. Baseline unknown until data arrives. Weekly review brand/core visibility and anomalies; monthly review educational coverage, 28-day comparisons, page ownership and content gaps. Separate device/country segments and annotate releases. Rank #1 is a goal, not promise.

## Handoff
Owner supplies exports and approves capture method, measurement cadence, product/science claims and proposed destinations. Developer team prepares separate page briefs, title/H1/meta/body/FAQ/internal-link changes only after review; reconcile 22 historical mapping differences and nine overlap hypotheses. Keep snapshots and change log, deploy through existing process, verify live and compare like-for-like windows. No production changes here. Phase 03/06/08 empirical work remains partial. Templates are header-only by design, no observations invented.
