# GitHub PR and Main Branch State Reconciliation — 2026-11-21

**Record ID:** BF-SEO-OPS-STATE-001
**Checked on:** 2026-11-21
**Repository:** `mohammadAliKeshavarzSarkar/BeatFit-Website`
**Observed main before documentation update:** `b060542ce577fd7bd4fe7336ecfa250b27c7bc0b`
**Evidence:** Live GitHub Pull Request records; not a production deployment, release/version inspection or Google Search Console property session.

## Exact Pull Request states observed

| PR | Issue / purpose | GitHub API state | Draft at check | Merge timestamp if supplied | Interpretation |
|---|---|---|---|---|---|
| [#1](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/pull/1) | Gym hero copy | open, not merged | true | — | Review-only copy |
| [#2](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/pull/2) | SEO build checker and PR CI | **closed, merged** | true (GitHub metadata) | 2026-11-21 06:43:04 UTC | **Integrated into main**, not proof of deployment |
| [#3](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/pull/3) | Article related links | open, not merged | true | — | Review-only editorial |
| [#4](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/pull/4) | One CDC citation maintenance link | open, not merged | true | — | Review-only citation |
| [#5](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/pull/5) | Isolated citation PR #4 QA workflow | **closed, merged** | false | 2026-11-21 06:43:02 UTC | Integration observed; QA changes, not article PR #4 |
| [#6](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/pull/6) | Public DNS/TCP/TLS diagnostic | **closed, merged** | false | 2026-11-21 06:49:20 UTC | Diagnostic code merged, no host state change proven |
| [#7](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/pull/7) | Public HTTP/HTTPS diagnostic | **closed, merged** | false | 2026-11-21 06:50:00 UTC | Diagnostic code merged, not a site deployment |
| [#8](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/pull/8) | Zone 2 definition caveat + reference | open, not merged | true | — | Scientific/editorial review remains pending |

**Important:** These merges were observed from GitHub; they were **not initiated by this audit assistant**. The `draft:true` property on already-merged PR #2 is an artifact of GitHub's PR metadata and does not override the definitive `merged:true`/closed state.

## Main source drift observed

Main commit `7dbb283a97681597ee0792dd408f0b0734876a7a` has message `Update header UX and add Google Search Console verification`. That commit was not created by this SEO audit. Source files for verification may indicate an intention to establish property ownership, **but do not establish** GSC index coverage, queries, clicks, rendered HTML, canonical selection or connected data access. No first-party GSC result has been read in this audit.

## Documentation corrections applied

- README's previous active Draft PR #2 description is changed to reflect **MERGED** status.
- Decision BF-SEO-D014 is changed to `MERGED / STATIC CI VERIFIED`, without converting any blocked production/server/GSC tasks to PASS.
- The historical audit/run logs are left intact as point-in-time evidence; this reconciliation is appended instead of rewriting the earlier timelines.
- The current Draft PR #8 passed independent pinned Build, 254 artifact checks and Chromium 390px preview smoke, but has **not** been merged/deployed.

## Open gates

1. PR #1: product owner and full brand/responsive QA before merge.
2. PR #3: editorial approval and broader browser accessibility before merge.
3. PR #4: editorial review of the exact CDC reference update; build gate already passed.
4. PR #8: scientific/editorial review of the Zone 2 note; actual build and mobile smoke gate already passed.
5. Production HTTP/TLS/IIS checks and first-party Google Search Console remain **not verified**. GitHub merger or verification asset presence is not evidence of production SEO success.
