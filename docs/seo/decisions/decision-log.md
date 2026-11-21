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

## Future decision record standard

For every important change, record exact evidence references, affected URLs/templates, alternatives including no change, implementation/release authority, business value, risk, dependent decisions, acceptance tests, rollback, responsible reviewer and review date.

**This document records decisions, not test outcomes.** Separate verification records are required for a VERIFIED status.
