# Phase 05 — Competitor keyword research

**Research date:** 2026-11-25. **Scope:** All 27 cases in the Phase 04 competitor register, including all 13 P0 cases. **Status:** Initial extraction pass complete; one blocked case and eight excerpt-only cases retain evidence limitations.

## Deliverables

- [pages.csv](pages.csv): 27 requested page records, each linked to its Phase 04 competitor ID. 18 opened with visible text, 5 search-excerpt-only for the original URL, 3 search excerpts from alternative URLs on the same publisher, and 1 blocked (MrZon). The requested URL and evidence URL are recorded separately. Observed labels are visible headings or result titles, not independently inspected HTML title/H1 metadata.
- [phrases.csv](phrases.csv): 183 source-linked rows; 73 published vocabulary observations, 81 Persian derived query candidates and 29 Persian candidates derived from English material. Each records source page, evidence class, topic and usage boundary. These are not the competitors' measured ranking keywords.
- [candidate-delta.csv](candidate-delta.csv): 110 distinct exact-string derived candidates, compared with the raw query columns from Phase 01 keywords, Phase 02 variants and Phase 03 queries; 104 new exact strings and 6 already present. This is exact matching, not semantic or orthographic deduplication.
- [topic-matrix.csv](topic-matrix.csv): 12 topics, source coverage and extraction counts. Counts represent the research sample, not keyword demand, traffic share or competitive difficulty.

## Method

Attempt the representative URL of every Phase 04 competitor. Capture short visible labels and vocabulary from public pages. If direct retrieval fails, look for usable publisher search excerpts; identify when the evidence URL differs from the requested page. If neither yields evidence, retain a blocked record without fabricating content. A text-open result is not a complete technical crawl or proof of current accessibility for all users.

Extract short terms from the visible material, then produce useful Persian search candidates separately. Translate concepts from English pages as derived hypotheses, not observed Persian search behavior. Preserve raw phrases and source links. No copied marketing paragraphs, proprietary feature claims, or unsupported competitor metrics are adopted.

## Findings

- **Group monitoring** has 29 derived query rows across six competitors, including live class displays, simultaneous heart-rate tracking, training feedback and group history.
- **Hardware** has 17 derived rows across four retailers; the separate hardware-system topic has four more. Device selection, wearing position, compatibility, specifications and purchase intent merit distinct research.
- **Coaching and software** contribute 19 derived rows across five platforms. Performance logging and progress reports offer useful language distinct from general gym administration.
- **Member engagement and gamification** contribute 11 derived rows. Effort tracking, shared goals, club challenges and progress recognition extend the product-category vocabulary beyond sensors.
- **Calculators and education** contribute 15 derived rows. Compare calculation intent with explanatory articles; any future scientific content must be reviewed against appropriate sources.
- **Brand collision and medical boundaries:** all five derived brand-disambiguation strings already occur in the earlier bank; five of six medical-boundary candidates are new exact strings. Keep these as research, not product positioning. The Radio Farda article refers to Fitbit, not BeatFit; it supplies historical spelling-collision evidence only.

## Acceptance and outstanding limitations

Verified page/competitor joins, phrase/page/competitor joins, row and field counts, unique IDs, and the absence of phrases from the blocked case. The 110 derived candidates have explicit unverified volume and rank fields. Earlier Google Autocomplete and related-search observations remain incomplete. All 27 cases were attempted, but MrZon needs a retry, and excerpt-only records require direct page verification where accessible. This is a representative page analysis per case, not exhaustive competitor site keyword discovery. No localized Google ranking, paid-tool data, traffic, volume, keyword difficulty or market share has been obtained.

## Phase 06 handoff

Use the raw query inventory and exact-string delta to build a deduplicated demand-measurement queue with stable identifiers and provenance. Record source, Iran country setting, Persian language, date range, metric definition and access status for each observation. Keep Google Trends relative interest separate from Keyword Planner monthly volume and GSC site-specific impressions. Low volume, unavailable data and zero are distinct states. Research demand evidence where available; do not infer volume from the count of extracted terms or competitor pages. Prioritize brand variants, commercial hardware, group monitoring and educational calculators for the initial measurement sample without dropping other families.

No website copy, runtime code, routes, deployment or external outreach changed.
