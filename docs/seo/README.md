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
| Audit | [Persian article internal-link review](audits/2026-11-21-internal-link-source-review.md) | Validated catalog/home/related source graph and low-inbound related-card articles |
| Inventory | [Article link graph](inventory/2026-11-21-article-link-graph.csv) | 28 source-declared edges with evidence types |
| Strategy | [Related-article editorial proposal](strategy/2026-11-21-related-article-link-proposal.md) | Two narrowly scoped, review-only link substitutions |
| Inventory | [Source URL inventory](inventory/source-route-inventory.csv) | Six marketing and seven Persian article URLs |
| Verification | [Source check record](verification/2026-11-21-source-checks.md) | Eleven bounded source observations and outstanding tests |
| Verification | [Actual GitHub Actions CI evidence](verification/2026-11-21-github-actions-ci-gate.md) | Real build, corrected Persian URL check, 10 fixture tests, 254 assertions |
| Verification | [Production access attempts and test plan](verification/2026-11-21-production-access-and-test-plan.md) | Blocked live checks plus reproducible HTTP/build/browser gate |
| Decisions | [Decision log](decisions/decision-log.md) | Approved scope, proposed changes, blockers and review gates |
| Operations | [Run log](operations/run-log.md) | Dated completed work, blocked tasks and repository writes |
| Research | [Persian search-intent seed map](research/2026-11-21-persian-intent-seed-map.md) | Earlier source-derived hypotheses only |
| Research | [Public-web search discovery 001](research/2026-11-21-persian-search-discovery.md) | Sampled result types, intent evidence and limits |
| Research | [Exact sampled queries](research/2026-11-21-sampled-search-queries.csv) | 17 query strings submitted to discovery |
| Research | [Representative result register](research/2026-11-21-search-evidence-register.csv) | 22 linked samples with review depth; not ranked SERP |
| Research | [Keyword-to-page map](research/2026-11-21-keyword-to-page-map.csv) | 36 candidate phrases, source/variant status and existing URL ownership |
| Competitors | [Competitor page-type patterns](research/2026-11-21-competitor-page-type-review.md) | Observable content and format comparisons |
| Strategy | [Proposed content backlog](strategy/2026-11-21-content-priority-backlog.md) | Reviewable actions; implementation unapproved |
| Research | [Focused /gym intent qualification](research/2026-11-21-gym-focused-intent-check.md) | Specialist monitoring vs generic gym management |
| Strategy | [Controlled /gym copy proposal](strategy/2026-11-21-gym-copy-proposal.md) | Exact before/after Persian copy and merge gate |
| Verification | [Gym copy preflight](verification/2026-11-21-gym-copy-preflight.md) | Source binding, build, browser and GSC check states |
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

A bounded Persian public-web discovery sample is now recorded; it is not a geographically controlled Google SERP or first-party GSC export. Confirm query/page measurements and ownership before asserting search demand or creating new URLs. Separately determine live TLS/canonical behavior, confirm valid HTTP statuses and server redirects, test representative route-specific built and rendered HTML, and verify the real demo submission path. Only then assert production SEO readiness or choose larger architecture changes.

## Active review-only implementation

- **Draft [PR #1 — Clarify `/gym` live heart-rate monitoring copy](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/pull/1)**, branch `seo/gym-hero-clarity-2026-11-21`, initial PR commit `ae1b576f89c8cdb21d234064ffa0461f54d817d4`. Two source string values change; H1, layout, routes and canonical are unchanged. Source-level string/binding checks passed. **Build, browser, product confirmation and GSC are outstanding. Not merged or deployed.**

## Active QA review — Draft PR #2

- [Draft PR #2 — Verify generated SEO build artifacts](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/pull/2), feature branch `seo/verify-generated-build-2026-11-21`.
- Adds `npm run test:seo:fixtures` and `npm run test:seo` without modifying the existing build script.
- **Real CI evidence:** [GitHub Actions run 44873467188](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/actions/runs/44873467188) PASSED: `npm ci`, **10/10 fixture tests**, **real Vite/TypeScript build**, **254 generated SEO artifact checks**, and **clean tracked-public diff**. The earlier failed run exposed and led to correction of a Unicode URL comparison false positive.
- **Still NOT RUN/BLOCKED:** browser rendering, deployed HTTP/TLS, Search Console and actual demo submission. PR #2 remains draft, **not merged or deployed**. See [the dated CI evidence record](verification/2026-11-21-github-actions-ci-gate.md).

## Active editorial review — Draft PR #3

- [Draft PR #3 — Rebalance two Persian articles' related links](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/pull/3), branch `seo/rebalance-related-articles-2026-11-21`.
- Based on [the source graph audit](audits/2026-11-21-internal-link-source-review.md), changes precisely two `relatedSlugs` arrays: training history → training load and gym monitoring → sensor comparison.
- Source-only checks and PR diff scope verified. **Build, rendered browser, deployed HTTP and Google indexing tests NOT RUN for PR #3**. PR #2's successful CI does not validate this different branch.
- Open and draft; **not merged or deployed**.
