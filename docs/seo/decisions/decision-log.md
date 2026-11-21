# SEO Decision Log

**Lifecycle:** PROPOSED → REVIEWED → APPROVED → IMPLEMENTED → VERIFIED → SUPERSEDED.  
An approved scope is not permission to deploy; a source observation is not a completed fix.

| ID | Date | Decision / subject | Status | Rationale and next gate |
|---|---|---|---|---|
| BF-SEO-D001 | 2026-11-21 | Scope search and content work to Persian (`fa-IR`), excluding English rollout | APPROVED | Direct project-owner instruction |
| BF-SEO-D002 | 2026-11-21 | Store all BeatFit-specific SEO work in `docs/seo/` | APPROVED / IMPLEMENTED | Owner instruction; files written to GitHub |
| BF-SEO-D003 | 2026-11-21 | Write documentation in English, retaining original Persian search/website quotations | APPROVED / IMPLEMENTED | Owner instruction; applied to documents and filenames |
| BF-SEO-D004 | 2026-11-21 | Select final HTTPS and apex/www canonical and redirects | APPROVED / IMPLEMENTING | Local target-market probe 2026-11-21: `http://beatfit.ir/` → 301 `https://beatfit.ir/`; HTTPS home/robots/sitemap 200; `www` DNS unresolved. Source default origin + IIS HTTPS rule switched to `https://beatfit.ir`. Deploy of new build still required for VERIFIED |
| BF-SEO-D005 | 2026-11-21 | Evaluate full prerender/SSG/SSR against current SEO shells | PROPOSED / BLOCKED | Need build, JS-off, rendered and GSC evidence |
| BF-SEO-D006 | 2026-11-21 | Implement actual demo/CRM submission with privacy-safe conversion events | PROPOSED | Approve backend/owner/consent contract |
| BF-SEO-D007 | 2026-11-21 | Replace placeholder privacy, terms and social destinations | PROPOSED | Policy owner and official URLs needed |
| BF-SEO-D008 | 2026-11-21 | Preserve 18 November Playbook as historical research, not current production audit | APPROVED | New pinned source supersedes several earlier source assertions |
| BF-SEO-D009 | 2026-11-21 | Route athlete and informational visitors to audience-appropriate next steps instead of default gym demo | PROPOSED | Source review BF-SEO-F07/F08; journey ownership and actual conversion performance need validation |
| BF-SEO-D010 | 2026-11-21 | Improve existing Persian page ownership before generating spelling-variant/duplicate intent URLs | PROPOSED | Exploratory discovery shows mixed intents; current pages already cover seven clusters; need localized SERP/GSC validation |
| BF-SEO-D011 | 2026-11-21 | Evaluate optional heart-rate zone calculator as a product/content enhancement, not an automatic SEO requirement | PROPOSED | Search samples include tools and guides; product, accessibility, science and engineering effort must be approved |
| BF-SEO-D012 | 2026-11-21 | Do not claim actual Google ranking or search volume from pooled public-web discovery | APPROVED (evidence methodology) | Result provider is not a localized Google SERP; first-party indexing and demand remain unknown |
| BF-SEO-D013 | 2026-11-21 | Propose a small /gym hero-description and SEO title clarity revision for review | REVIEW — [Draft PR #1](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/pull/1) | Pinned PR real build, 254 SEO checks, 390px browser PASS (CI 44874359478); product owner/brand approval and production verification remain |
| BF-SEO-D014 | 2026-11-21 | Add post-build integrity checks for SEO shells, Sitemap, robots, IIS map and metadata | MERGED — [PR #2](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/pull/2) (2026-11-21 06:43:04 UTC) | GitHub merge verified; prior CI 44873467188 passed build, 10 fixture tests, 254 artifact checks and public diff; actual server deployment and GSC still not verified |
| BF-SEO-D015 | 2026-11-21 | Balance two related-article links to cover existing underlinked topics | REVIEW — [Draft PR #3](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/pull/3) | Pinned PR real build, 254 SEO checks, 390px browser/related links PASS (CI 44874359478); editorial approval and deployed behavior pending |

| BF-SEO-D016 | 2026-11-21 | Decide whether to prerender full Persian article bodies and internal links rather than continue current client-only content | PROPOSED / EVIDENCE-GATED | Vite Preview JS-enabled full article content PASS; JS-disabled only H1/summary (0 article body/related links); Google renders JS, and real IIS/GSC indexing evidence is missing. No architecture change approved. |
| BF-SEO-D017 | 2026-11-21 | Investigate production public HTTP/TLS reachability before changing canonical redirects | INVESTIGATION REQUIRED | GitHub runner apex A resolved, TCP ports 80/443 connected, but 12 apex GETs timed out and TLS reset; www DNS unresolved. This is runner-specific evidence, not global outage. Hosting owner must verify target-market behavior and cert/bindings. No live configuration change authorized. |
| BF-SEO-D018 | 2026-11-21 | Stop expecting Google FAQ rich results while preserving useful visible Q&A | APPROVED (documented official feature status) | Google Search Central: rich result ended 2026-05-07, feature documentation removed 2026-06-15; no schema penalty asserted |
| BF-SEO-D019 | 2026-11-21 | Establish genuine authorship/reviewer and dateModified governance | PROPOSED | Seven articles use permitted institutional Organization author and real datePublished; qualified reviewers/actual revision timestamps not established |
| BF-SEO-D020 | 2026-11-21 | Correct one legacy CDC exercise-intensity reference | REVIEW — [Draft PR #4](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/pull/4) | Current CDC page verified; actual build and 254 SEO checks PASS on pinned revision, browser/deployment/editorial merge approval outstanding |
| BF-SEO-D021 | 2026-11-21 | Clarify five-zone HRmax Zone 2 definition versus physiology-based threshold concepts | REVIEW — [Draft PR #8](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/pull/8) | AHA/Tanaka formulas and Meixner et al. 2025 support the proposed explanation; pinned GitHub run 44877833723 passed actual build, 254 SEO checks and 390px Chromium smoke; external scientific approval and production verification still required |
| BF-SEO-D022 | 2026-11-21 | Preserve model- and activity-specific sensor accuracy caveats rather than make universal product superiority claims | PROPOSED / EVIDENCE-GATED | 2024/2025 wearable comparisons and INTERLIVE guidance support qualified statements; no independently validated BeatFit sensor accuracy or connection capacity obtained |
| BF-SEO-D023 | 2026-11-21 | Close 2017 device-specific wrist-versus-forearm comparative claim audit without rewriting valid source copy | VERIFIED NARROW CLAIM | Gillinov 2017 PMID 28709155 and scholarly review Table 3 support named Apple Watch vs Scosche Rhythm+ comparison; general sensor/BeatFit product accuracy NOT verified |
| BF-SEO-D024 | 2026-11-21 | Align zones article-specific introduction CTA with athlete intent | REVIEW — [Draft PR #10](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/pull/10) | Single PR + combined temporary PR #8/10 Vite builds, 254 SEO checks and Chromium click PASS (CI 44879300759); original demo footer retained; marketing/scientific approval, deployed evidence and real conversion metrics outstanding |
| BF-SEO-D025 | 2026-11-21 | Classify demo request form's preventDefault-only submit as a conversion integrity source gap | CONFIRMED SOURCE / P1 | Six fields and contact promise exist, but no submission transport in DemoForm; no actual live lead loss or CRM failure measured |
| BF-SEO-D026 | 2026-11-21 | Define truthful safe interim demo form status without claiming leads are saved | REVIEW — [Draft PR #11](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/pull/11) | Exact pinned GitHub CI 44880488104 passed Build, 254 SEO checks, Chromium native validation, honest alert and zero non-GET requests. Product must review pre-entry UX; no real backend, merge, live PII or deployment |
| BF-SEO-D027 | 2026-11-21 | Gate real demo lead activation on approved first-party/CRM backend, valid HTTPS, privacy notice and server-acknowledged receipt | BLOCKED / OWNER DESIGN REQUIRED | Proposed API contract and 14-case acceptance matrix; no chosen provider, verified deployed SSL, retention policy or staging E2E evidence |





| BF-SEO-D028 | 2026-11-21 | Treat source build success separately from actual public deployment / crawler access | VERIFIED SOURCE / PUBLIC BLOCKED | GitHub Build 44882056225: 254 SEO checks and 7 Chromium routes PASS; production GETs 0/27 HTTP statuses from GitHub 44881936131 |
| BF-SEO-D029 | 2026-11-21 | Investigate public HTTP/TLS resets from sampled Iran and global nodes before calling server deployment verified | P1 HOSTING OWNER INVESTIGATION | Apex A and TCP connect, TLS ECONNRESET; Iran Tehran/Isfahan and non-Iran Check-Host nodes reported HTTP/HTTPS reset, one Qom timeout; root cause and worldwide accessibility unknown |
| BF-SEO-D030 | 2026-11-21 | Preserve source HTTPS canonical/13-Sitemap configuration pending verified edge redirects | SOURCE ACCEPTED / LIVE NOT VERIFIED | Source uses HTTPS; `web.config` IIS HTTPS redirect intentionally disabled due proxy-loop history; no live Location/header/status chain obtained; do not blindly flip rule |

| BF-SEO-D031 | 2026-11-21 | Keep production HTTP/TLS signoff blocked after differential protocol tests | P1 / AWAIT HOST-OWNER EVIDENCE | GitHub 44882903669: 8 curl variants got zero HTTP statuses, fixed-IP/SNI GET-HEAD all timed out; three OpenSSL variant probes were inconclusive after process timeouts. No verified production HTTP, root cause, or deployed canonical/redirect behavior |

| BF-SEO-D032 | 2026-11-21 | Give all 13 existing pages distinct Persian branded, commercial or informational keyword owners | DOCUMENTED / QUALITATIVE | 113 keyword candidates and 17 public-web samples, source-specific title/H1 review; no rank, search-volume, GSC or keyword-difficulty claims |
| BF-SEO-D033 | 2026-11-21 | Clarify homepage brand category in SEO title/meta and keep emotional H1 unchanged | MERGED — [PR #20](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/pull/20) | Real CI 44884239038 and pinned 44884358962 PASS including 254 checks, new meta/OG, preserved H1 and /gym; actual deployment and search impact unverified |
| BF-SEO-D034 | 2026-11-21 | Distinguish /gym's commercial system intent from the gym HR technology article | NEXT QUALITATIVE REVIEW | Current source topics overlap; do not force title changes or create duplicate URLs without actual query-page and editorial evidence |

## Future decision record standard

For every important change, record exact evidence references, affected URLs/templates, alternatives including no change, implementation/release authority, business value, risk, dependent decisions, acceptance tests, rollback, responsible reviewer and review date.

**This document records decisions, not test outcomes.** Separate verification records are required for a VERIFIED status.
