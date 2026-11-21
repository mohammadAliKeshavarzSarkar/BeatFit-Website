# Repository State Reconciliation — Merged SEO Editorial and Demo Form PRs

**Observed:** 2026-11-21, from GitHub PR API and pinned main source.
**Main source revision verified:** `0fa3d308ce600fe5bbe478a82d7ded577d8c90b6`
**Scope:** State of repo/source and QA; no claim of deployed revisions or site availability.

| PR | Purpose | Observed GitHub status | Merge timestamp (UTC) | Merge commit |
|---|---|---|---|---|
| [#8](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/pull/8) | Zone 2 physiology terminology and FAQ/source | **MERGED** | 2026-11-21 07:43:29 | `0fa3d308ce600fe5bbe478a82d7ded577d8c90b6` |
| [#10](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/pull/10) | Route zones article CTA to athlete page | **MERGED** | 2026-11-21 07:34:20 | `1c65898c298ce260ebf301a2a067f718d3ab11f6` |
| [#11](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/pull/11) | Upfront demo form warning and disabled controls | **MERGED** | 2026-11-21 07:43:12 | `c5463cb246281773ad8dd4da1d1d8658301b8cf1` |

These merges occurred through repository activity **outside this auditing task**. Earlier documents recording Draft status remain point-in-time historical observations; the live status above supersedes them for current planning.

At the pinned main source revision, the article contains the Zone 2 caveat, PubMed citation and athlete CTA, and the demo form contains the upfront warning, native disabled fieldset and no rendered callback promise. [Actual merged-main build and Chromium QA](../verification/2026-11-21-merged-main-conversion-seo-qa.md) **PASS**, independent of the earlier per-PR/temporary-combination tests.

**Open editorial PRs still observed as Draft in this reconciliation:** #1 gym copy, #3 related links, #4 one CDC citation. These were **not merged** as part of this check.

**Boundaries:** A GitHub merge and successful Vite Preview are not evidence of deploy to IIS/production, correct HTTP status/TLS, GSC visibility or business outcomes. The demo funnel **cannot deliver leads** in the inspected source, even though the rendered inactive state is now truthful.
