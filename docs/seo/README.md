# BeatFit SEO — Documentation Hub

**Website:** beatfit.ir  
**Target search/content language:** Persian (`fa-IR`), RTL  
**Documentation language:** English  
**Established:** 2026-11-21  
**Baseline source:** [`d11130c`](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/commit/d11130cef8f941f54b06362bb9bd124f89853adb)  
**Methodology:** [SEO Engineering](https://github.com/mohammadAliKeshavarzSarkar/SEO-Engineering)

This is the **single source of truth for BeatFit-specific SEO documentation**: research, technical audits, evidence, project scope, decisions, implementation plans, verification and activity history. The SEO Engineering repository provides the methodology but is not used for private BeatFit evidence.

## Documentation index

| Area | Document | Purpose |
|---|---|---|
| Scope | [Project brief](project/project-brief.md) | Business and Persian-language SEO boundaries, approval, workflow |
| Audit | [Baseline Audit 001](audits/2026-11-21-source-baseline.md) | Six findings grounded in a pinned source snapshot |
| Audit | [Page intent and conversion review](audits/2026-11-21-page-intent-and-conversion-review.md) | Six marketing pages, seven articles, three further review findings |
| Inventory | [Source URL inventory](inventory/source-route-inventory.csv) | Six marketing and seven Persian article URLs |
| Verification | [Source check record](verification/2026-11-21-source-checks.md) | Eleven bounded source observations and outstanding tests |
| Verification | [Production access attempts and test plan](verification/2026-11-21-production-access-and-test-plan.md) | Blocked live checks plus reproducible HTTP/build/browser gate |
| Decisions | [Decision log](decisions/decision-log.md) | Approved scope, proposed changes, blockers and review gates |
| Operations | [Run log](operations/run-log.md) | Dated completed work, blocked tasks and repository writes |
| Research | [Persian search-intent seed map](research/2026-11-21-persian-intent-seed-map.md) | Candidate queries and existing-page ownership, not SERP evidence |
| References | [Research Playbook — 2026-11-18](references/2026-11-18-research-playbook.md) | Original English playbook, retained as historical research |

Future research, content strategy, technical implementation plans and verified outcomes belong in appropriately dated Markdown/CSV documents within this folder, with an entry in this index and the activity log.

## Documentation conventions

1. **All document names, folder structure, headings, explanations, decisions, status labels and prose are English.** Preserve literal Persian keywords, original UI text, article names and URL slugs as primary evidence.
2. The website targets Persian search only. English SEO pages, translated campaigns and artificial hreflang entries are not in scope.
3. Tie every finding and test to a specific source commit, sampled URL, date, environment, evidence and confidence.
4. Distinguish source evidence, built output, rendered browser DOM, production HTTP behavior, platform indexing data and measured business conversions. A source pattern is not a production test PASS.
5. Use PASS / FAIL / BLOCKED / NOT RUN / N/A for tests, and keep hypotheses explicitly separate from observations.
6. Decisions follow proposed → reviewed → approved → implemented → verified → superseded. Any website code change, deployment, hosting modification, analytics activation or external submission needs separate authorization.
7. Never publish secrets, athlete/user information, customer leads, private analytics or server logs to this public repository.
8. Preserve dated audit history. Supersede findings rather than silently rewriting old evidence.

## Current checkpoint

- **Completed:** Source review at `d11130cef8f941f54b06362bb9bd124f89853adb`; 13 declared Sitemap URLs; seven Persian articles; 12 non-home IIS rewrite entries; eleven static source checks; six source findings.
- **2026-11-21 next gate:** External live page/robots/sitemap retrieval attempted; no reliable server response in available networks; recorded as BLOCKED rather than failed. Source-only page-intent review and provisional Persian query map completed.
- **Not verified:** Production HTTP/TLS, actual server redirects, build output, browser JS-off/rendered parity, Search Console indexing, field Core Web Vitals, successful lead submissions and conversions.
- **Current documentation status:** GitHub writing restored on 2026-11-21. This folder is maintained directly in the website repository.
- **Application code changes:** None as part of this documentation setup.

## Next verification gate

Determine live TLS/canonical behavior, confirm valid HTTP statuses and server redirects, test representative route-specific built and rendered HTML, and verify the real demo submission path. Only then assert production SEO readiness or choose larger architecture changes.
