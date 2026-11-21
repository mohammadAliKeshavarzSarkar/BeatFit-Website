# SEO Decision Log

**Lifecycle:** PROPOSED → REVIEWED → APPROVED → IMPLEMENTED → VERIFIED → SUPERSEDED.  
An approved scope is not permission to deploy; a source observation is not a completed fix.

| ID | Date | Decision / subject | Status | Rationale and next gate |
|---|---|---|---|---|
| BF-SEO-D001 | 2026-11-21 | Scope search and content work to Persian (`fa-IR`), excluding English rollout | APPROVED | Direct project-owner instruction |
| BF-SEO-D002 | 2026-11-21 | Store all BeatFit-specific SEO work in `docs/seo/` | APPROVED / IMPLEMENTED | Owner instruction; files written to GitHub |
| BF-SEO-D003 | 2026-11-21 | Write documentation in English, retaining original Persian search/website quotations | APPROVED / IMPLEMENTED | Owner instruction; applied to documents and filenames |
| BF-SEO-D004 | 2026-11-21 | Select final HTTPS and apex/www canonical and redirects | PROPOSED / BLOCKED | Deployed TLS/host observations needed first |
| BF-SEO-D005 | 2026-11-21 | Evaluate full prerender/SSG/SSR against current SEO shells | PROPOSED / BLOCKED | Need build, JS-off, rendered and GSC evidence |
| BF-SEO-D006 | 2026-11-21 | Implement actual demo/CRM submission with privacy-safe conversion events | PROPOSED | Approve backend/owner/consent contract |
| BF-SEO-D007 | 2026-11-21 | Replace placeholder privacy, terms and social destinations | PROPOSED | Policy owner and official URLs needed |
| BF-SEO-D008 | 2026-11-21 | Preserve 18 November Playbook as historical research, not current production audit | APPROVED | New pinned source supersedes several earlier source assertions |
| BF-SEO-D009 | 2026-11-21 | Route athlete and informational visitors to audience-appropriate next steps instead of default gym demo | PROPOSED | Source review BF-SEO-F07/F08; journey ownership and actual conversion performance need validation |
| BF-SEO-D010 | 2026-11-21 | Improve existing Persian page ownership before generating spelling-variant/duplicate intent URLs | PROPOSED | Exploratory discovery shows mixed intents; current pages already cover seven clusters; need localized SERP/GSC validation |
| BF-SEO-D011 | 2026-11-21 | Evaluate optional heart-rate zone calculator as a product/content enhancement, not an automatic SEO requirement | PROPOSED | Search samples include tools and guides; product, accessibility, science and engineering effort must be approved |
| BF-SEO-D012 | 2026-11-21 | Do not claim actual Google ranking or search volume from pooled public-web discovery | APPROVED (evidence methodology) | Result provider is not a localized Google SERP; first-party indexing and demand remain unknown |
| BF-SEO-D013 | 2026-11-21 | Propose a small /gym hero-description and SEO title clarity revision for review | REVIEW — [Draft PR #1](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/pull/1) | Pinned PR real build, 254 SEO checks, 390px browser PASS (CI 44874359478); product owner/brand approval and production verification remain |
| BF-SEO-D014 | 2026-11-21 | Add post-build integrity checks for SEO shells, Sitemap, robots, IIS map and metadata | REVIEW — [Draft PR #2](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/pull/2) | Real GitHub Actions run 44873467188 passed build, 10 fixture tests, 254 artifact checks and tracked-public diff; browser/production verification and code review remain separate gates |
| BF-SEO-D015 | 2026-11-21 | Balance two related-article links to cover existing underlinked topics | REVIEW — [Draft PR #3](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/pull/3) | Pinned PR real build, 254 SEO checks, 390px browser/related links PASS (CI 44874359478); editorial approval and deployed behavior pending |

| BF-SEO-D016 | 2026-11-21 | Decide whether to prerender full Persian article bodies and internal links rather than continue current client-only content | PROPOSED / EVIDENCE-GATED | Vite Preview JS-enabled full article content PASS; JS-disabled only H1/summary (0 article body/related links); Google renders JS, and real IIS/GSC indexing evidence is missing. No architecture change approved. |
| BF-SEO-D017 | 2026-11-21 | Investigate production public HTTP/TLS reachability before changing canonical redirects | INVESTIGATION REQUIRED | GitHub runner apex A resolved, TCP ports 80/443 connected, but 12 apex GETs timed out and TLS reset; www DNS unresolved. This is runner-specific evidence, not global outage. Hosting owner must verify target-market behavior and cert/bindings. No live configuration change authorized. |
| BF-SEO-D018 | 2026-11-21 | Stop expecting Google FAQ rich results while preserving useful visible Q&A | APPROVED (documented official feature status) | Google Search Central: rich result ended 2026-05-07, feature documentation removed 2026-06-15; no schema penalty asserted |
| BF-SEO-D019 | 2026-11-21 | Establish genuine authorship/reviewer and dateModified governance | PROPOSED | Seven articles use permitted institutional Organization author and real datePublished; qualified reviewers/actual revision timestamps not established |
| BF-SEO-D020 | 2026-11-21 | Correct one legacy CDC exercise-intensity reference | REVIEW — [Draft PR #4](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/pull/4) | Current CDC page verified; actual build and 254 SEO checks PASS on pinned revision, browser/deployment/editorial merge approval outstanding |
| BF-SEO-D021 | 2026-11-21 | Clarify five-zone HRmax Zone 2 definition versus physiology-based threshold concepts | REVIEW — [Draft PR #8](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/pull/8) | AHA/Tanaka formulas and example pass arithmetic checks; Meixner et al. 2025 supports definition caveat; full scientific approval and production verification still required |
| BF-SEO-D022 | 2026-11-21 | Preserve model- and activity-specific sensor accuracy caveats rather than make universal product superiority claims | PROPOSED / EVIDENCE-GATED | 2024/2025 wearable comparisons and INTERLIVE guidance support qualified statements; no independently validated BeatFit sensor accuracy or connection capacity obtained |



## Future decision record standard

For every important change, record exact evidence references, affected URLs/templates, alternatives including no change, implementation/release authority, business value, risk, dependent decisions, acceptance tests, rollback, responsible reviewer and review date.

**This document records decisions, not test outcomes.** Separate verification records are required for a VERIFIED status.
