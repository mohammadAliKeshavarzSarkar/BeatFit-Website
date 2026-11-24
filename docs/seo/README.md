# BeatFit SEO — Documentation Hub

**Website:** beatfit.ir  
**Target search/content language:** Persian (`fa-IR`), RTL  
**Documentation language:** English  
**Established:** 2026-11-21  
**Baseline source:** [`d11130c`](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/commit/d11130cef8f941f54b06362bb9bd124f89853adb)  
**Methodology:** [SEO Engineering](https://github.com/mohammadAliKeshavarzSarkar/SEO-Engineering)

This is the **single source of truth for BeatFit-specific SEO documentation**: research, technical audits, evidence, project scope, decisions, implementation plans, verification and activity history. The SEO Engineering repository provides the methodology but is not used for private BeatFit evidence.

**Current verified status, 2026-11-24:** SEO PRs **#39–#42, #44 and #45 are MERGED** into `main` (plus earlier technical SEO merges). Source build, **256** generated SEO checks, marketing/article link gates, and 7 full no-JS article shells PASS locally after the emit-import fix. **Public HTTP/TLS, live IIS rewrite behavior, Google-selected canonicals and ranking lift remain unverified** unless separately proven in production.

Merged recent work includes ASCII blog link integrity (#39), URL-identity audit (#40), marketing CTA source-link gate (#41), 13-page keyword reconciliation docs (#42), canonical `/blog/training-load` with one-hop 301 from `live-tv-group-training` (#44), and source-derived full article HTML in route shells (#45). Historical sections below may still say Draft; prefer dated verification/audit files for evidence.

## Review-only engineering checkpoint — 2026-11-24

- [PR #41 — marketing CTA and article source-link integrity](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/pull/41): **MERGED**. Source validator covers landing-page `ctaHref`, article/public-URL uniqueness and adversarial fixtures. [Verification record](verification/2026-11-23-marketing-cta-source-link-gate.md).
- [PR #40 — source URL identity review](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/pull/40): **MERGED** as audit; training-load migration later landed in [PR #44](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/pull/44).
- [PR #45 — full article static HTML shells](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/pull/45): **MERGED**. [Readiness record](verification/2026-11-24-full-article-static-html-readiness.md).
- Historical 2026-11-21 status below is revision-scoped. Latest source CI is **not** production reachability, Search Console or demo lead-receipt proof.

## Documentation index

| Area | Document | Purpose |
|---|---|---|
| Verification | [Reported server update audit](verification/2026-11-21-post-deployment-public-server-audit.md) | Actual public network probes vs source Build; 0/27 responses and Iran/global checks |
| Verification | [27 external HTTP requests](verification/2026-11-21-post-deploy-http-get-results.csv) | Request URL, curl exit, HTTP status and failure reason |
| Verification | [Regional Iran + external node matrix](verification/2026-11-21-post-deploy-regional-results.csv) | Per-node HTTPS/HTTP resets, timeout and unknown statuses |
| Verification | [Current merged source Build and mobile QA](verification/2026-11-21-current-merged-main-source-qa.md) | 254 SEO output checks and seven locally rendered routes |
| Strategy | [Hosting owner post-deploy handoff](strategy/2026-11-21-public-server-postdeploy-handoff.md) | Exact IIS, TLS, reverse proxy, redirect, DNS and SEO acceptance gates |
| Scope | [Project brief](project/project-brief.md) | Business and Persian-language SEO boundaries, approval, workflow |
| Audit | [Baseline Audit 001](audits/2026-11-21-source-baseline.md) | Six findings grounded in a pinned source snapshot |
| Audit | [Page intent and conversion review](audits/2026-11-21-page-intent-and-conversion-review.md) | Six marketing pages, seven articles, three further review findings |
| Audit | [Persian article internal-link review](audits/2026-11-21-internal-link-source-review.md) | Validated catalog/home/related source graph and low-inbound related-card articles |
| Audit | [Seven-article editorial evidence audit](audits/2026-11-21-article-editorial-evidence-audit.md) | Seven posts, 47 citations, 46 FAQs and review gaps |
| Audit | [Heart-rate zones and sensor scientific claim review](audits/2026-11-21-zones-and-sensors-claim-review.md) | 22 evidence-scoped claims, formulas, sensor study limitations |
| Inventory | [Zones and sensors source-to-claim matrix](inventory/2026-11-21-zones-and-sensors-claim-matrix.csv) | Exact Persian anchors, source URLs, review status and action |
| Strategy | [Claim-specific review backlog](strategy/2026-11-21-zones-sensors-follow-up-backlog.md) | Scientific/owner verification, scoped SEO copy and implementation gates |
| Verification | [Draft PR #8 Zone 2 QA record](verification/2026-11-21-zone2-pr8-qa.md) | Exact pinned review revision, Build/254 checks/Chromium PASS; scientific review outstanding |
| Audit | [2017 sensor study + article CTA audit](audits/2026-11-21-2017-study-and-cta-audit.md) | Resolved narrow 2017 comparison and identified athlete CTA routing inconsistency |
| Verification | [2017 sensor study claim resolution](verification/2026-11-21-sensor-2017-claim-resolution.md) | PubMed/peer-reviewed review comparison and device-specific caveats |
| Inventory | [Article-specific CTA destination map](inventory/2026-11-21-article-cta-route-map.csv) | All seven article CTAs, unchanged common footer and Draft PR #10 destination |
| Verification | [Draft PR #10 build/browser evidence](verification/2026-11-21-zones-cta-pr10-ci.md) | 254 generated SEO checks and successful mobile click-through |
| Verification | [PR #8 + PR #10 combined integration QA](verification/2026-11-21-zone2-cta-combined-qa.md) | Temporary combined source, real build, 254 checks, Chromium both edits PASS |
| Audit | [Demo request source funnel audit](audits/2026-11-21-demo-request-funnel-audit.md) | Six-field silent submit no-op, missing backend, privacy/HTTPS gates |
| Strategy | [Proposed secure demo lead API contract](strategy/2026-11-21-demo-lead-submission-contract.md) | First-party/CRM owner choice, validation, consent/privacy, delivery, failure and analytics rules |
| Verification | [Demo funnel acceptance matrix](verification/2026-11-21-demo-funnel-acceptance-matrix.csv) | 14 checks separating source, browser and missing server implementation |
| Verification | [Draft PR #11 demo form guard](verification/2026-11-21-demo-form-pr11-qa.md) | Real Build, 254 SEO checks, 390px Chromium native validation and zero non-GET requests PASS |
| Operations | [GitHub PR state reconciliation](operations/2026-11-21-repository-state-reconciliation.md) | Actual merged/open state on 2026-11-21, distinct from deployed release |
| Inventory | [Article citation register](inventory/2026-11-21-article-citation-register.csv) | 47 source rows / 43 distinct URLs; verification scope explicit |
| Inventory | [Article editorial metadata](inventory/2026-11-21-article-editorial-inventory.csv) | Dates, FAQ/source counts and unknown reviewer fields |
| Research | [2026 Google FAQ feature retirement](research/2026-11-21-google-faq-rich-result-retirement.md) | Official Google updates and BeatFit interpretation |
| Strategy | [Editorial evidence backlog](strategy/2026-11-21-editorial-evidence-backlog.md) | Claim review, provenance and date governance |
| Verification | [Draft PR #4 real CI gate](verification/2026-11-21-cdc-citation-ci-evidence.md) | Actual build and 254 SEO checks for one citation URL update |
| Inventory | [Article link graph](inventory/2026-11-21-article-link-graph.csv) | 28 source-declared edges with evidence types |
| Strategy | [Related-article editorial proposal](strategy/2026-11-21-related-article-link-proposal.md) | Two narrowly scoped, review-only link substitutions |
| Inventory | [Source URL inventory](inventory/source-route-inventory.csv) | Six marketing and seven Persian article URLs |
| Verification | [Source check record](verification/2026-11-21-source-checks.md) | Eleven bounded source observations and outstanding tests |
| Verification | [Actual GitHub Actions CI evidence](verification/2026-11-21-github-actions-ci-gate.md) | Real build, corrected Persian URL check, 10 fixture tests, 254 assertions |
| Verification | [Pinned PR #1/#3 real build and browser QA](verification/2026-11-21-cross-pr-build-and-browser-qa.md) | Two successful GitHub runner jobs, real build, mobile Chromium and no-JS comparison |
| Verification | [Live HTTP and network evidence](verification/2026-11-21-public-http-and-network-evidence.md) | 14 public GET attempts; DNS A/TCP and failed HTTP/TLS from CI runner |
| Verification | [Public HTTP request results](verification/2026-11-21-public-http-probe-results.csv) | Exact sanitized 14-request status/exit matrix |
| Strategy | [Hosting readiness checklist](strategy/2026-11-21-hosting-readiness-checklist.md) | Owner handoff for DNS, IIS, SSL, HTTP and canonical decision |
| Verification | [Cross-PR result matrix](verification/2026-11-21-cross-pr-result-matrix.csv) | Reproducible per-commit gate statuses |
| Strategy | [Rendering architecture decision brief](strategy/2026-11-21-rendering-architecture-decision-brief.md) | Actual JS-enabled/no-JS evidence, options and future gate |
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

- **Technical phases (no content):** [active plan](strategy/2026-11-21-technical-phases-no-content.md) — content PRs parked.
- **T1–T3 / T5:** Artifact, live HTTPS (Iran), canonicals, render-shell parity, and alias **301→https** (post-redeploy) recorded on the technical track ([alias fix](verification/2026-11-21-alias-http-location-fix.md)).
- **T4 PARTIAL:** Search Console property `https://beatfit.ir/` **verified** (DNS TXT). Live `sitemap.xml` returns **200** with **13** URLs; owner must still **submit the sitemap** and sample **URL Inspection**.
- **T6 SPEC READY:** [Demo conversion contract](strategy/2026-11-21-demo-conversion-contract.md) — form still does not POST; needs approved API/CRM.
- **T7 READY:** [Weekly GSC measurement loop](operations/2026-11-21-gsc-weekly-measurement-loop.md).
- **Parked:** Draft content PRs #1, #3, #4, #8, #10 and copy backlog.

## Next verification gate

A bounded Persian public-web discovery sample is now recorded; it is not a geographically controlled Google SERP or first-party GSC export. Confirm query/page measurements and ownership before asserting search demand or creating new URLs. Separately determine live TLS/canonical behavior, confirm valid HTTP statuses and server redirects, test representative route-specific built and rendered HTML, and verify the real demo submission path. Only then assert production SEO readiness or choose larger architecture changes.

## Active review-only implementation

- **Draft [PR #1 — Clarify `/gym` live heart-rate monitoring copy](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/pull/1)**, branch `seo/gym-hero-clarity-2026-11-21`, initial PR commit `ae1b576f89c8cdb21d234064ffa0461f54d817d4`. Two source string values change; H1, layout, routes and canonical are unchanged. Source string/binding checks passed. **Real build, 254 SEO checks and mobile Chromium smoke PASS** on pinned PR #1 commit, [cross-PR QA run](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/actions/runs/44874359478). **Product owner review, production and GSC remain outstanding. Not merged or deployed.**

## Integrated SEO build verifier — PR #2 merged

- [Merged PR #2 — Verify generated SEO build artifacts](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/pull/2), merged into main 2026-11-21 06:43:04 UTC. Earlier runs are historical evidence.
- Adds `npm run test:seo:fixtures` and `npm run test:seo` without modifying the existing build script.
- **Real CI evidence:** [GitHub Actions run 44873467188](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/actions/runs/44873467188) PASSED: `npm ci`, **10/10 fixture tests**, **real Vite/TypeScript build**, **254 generated SEO artifact checks**, and **clean tracked-public diff**. The earlier failed run exposed and led to correction of a Unicode URL comparison false positive.
- **Still NOT RUN/BLOCKED:** browser rendering, deployed HTTP/TLS, Search Console and actual demo submission. PR #2 is **MERGED into main**; the production website deployment and live HTTP response remain unverified. See [the dated CI evidence record](verification/2026-11-21-github-actions-ci-gate.md).

## Active editorial review — Draft PR #3

- [Draft PR #3 — Rebalance two Persian articles' related links](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/pull/3), branch `seo/rebalance-related-articles-2026-11-21`.
- Based on [the source graph audit](audits/2026-11-21-internal-link-source-review.md), changes precisely two `relatedSlugs` arrays: training history → training load and gym monitoring → sensor comparison.
- Source checks and diff verified. **Real build, 254 SEO checks and mobile Chromium preview PASS** on pinned PR #3 commit via [independent cross-PR QA run](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/actions/runs/44874359478). **Editorial approval, production and Google indexing remain unverified.**
- Open and draft; **not merged or deployed**.

## Scientific review — Zone 2 and wearable sensor evidence (2026-11-21)

- [Bounded 22-claim physiological/sensor audit](audits/2026-11-21-zones-and-sensors-claim-review.md), [source-to-claim matrix](inventory/2026-11-21-zones-and-sensors-claim-matrix.csv) and [follow-up backlog](strategy/2026-11-21-zones-sensors-follow-up-backlog.md) are recorded. Existing age-based arithmetic is valid as an estimate; device-specific comparisons do not validate BeatFit's own sensor accuracy.
- [Draft PR #8 — clarify five-zone vs physiological Zone 2](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/pull/8) has **independent real GitHub Actions QA PASS** at exact source commit `1f486da6bc1f17e73452fefcd77c7189991e96c6`: Build PASS, **254 SEO artifact checks PASS**, six-FAQ/source checks PASS, 390px Chromium note/FAQ/citation/canonical PASS, tracked-public drift PASS. [Verified evidence](verification/2026-11-21-zone2-pr8-qa.md). **Still DRAFT / not merged or deployed; scientific/editorial acceptance and production/GSC verification outstanding.**

## Article CTA review — Draft PR #10 (2026-11-21)

- [Draft PR #10 — Align heart-rate-zones article CTA with athlete journey](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/pull/10) changes **one `href`** from `/demo` to `/athlete` while preserving the template's separate `درخواست دمو` link. Exact source commit `a1d7cecea2547b68ff8c293a197856cb1d5968f5` passed independent real CI/254 SEO checks and mobile Chromium click test [44879013001](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/actions/runs/44879013001). **Open Draft, not merged/deployed**. Audience and conversion effect unmeasured.
- The 2017 wrist-versus-forearm sensor comparison is supported for the named devices, resolving prior S08 at the narrow claim level. [Dated evidence](verification/2026-11-21-sensor-2017-claim-resolution.md). Product-specific sensor validation remains separate.

## Combined editorial PR #8 + PR #10 compatibility gate

- [Independent GitHub Actions run 44879300759](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/actions/runs/44879300759) **SUCCESS**. PR #8 pinned source + exact PR #10 one-line overlay in temporary CI checkout passed real TypeScript/Vite build, **254 SEO checks**, tracked-public drift, new Zone 2 note/FAQ/reference and actual Chromium click to `/athlete` with separate `/demo` footer retained. The PRs themselves remain **open Draft, unmerged and undeployed**; author/editorial approval, final integration release test, production and GSC remain separate. [Full exact evidence](verification/2026-11-21-zone2-cta-combined-qa.md).

## Conversion integrity — Draft PR #11 demo form (2026-11-21)

- [Draft PR #11](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/pull/11) addresses the **source-only silent no-op** form: required fields for name/gym/phone and an accessible truthful **not sent** warning, no new destination or PII transport. Standard [CI 44880438660](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/actions/runs/44880438660) and pinned mobile [CI 44880488104](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/actions/runs/44880488104) **PASS**, including real Build, **254 generated SEO checks**, six-field/three-required Chromium checks, no non-GET request and correct /demo canonical. [Detailed verification](verification/2026-11-21-demo-form-pr11-qa.md).
- This **is not a working lead receiver**. No HTTPS, policy, actual CRM/server delivery or live conversion verified. Product owner must approve the interim UX and then choose a real secure lead endpoint with an accessible privacy notice. PR #11 remains Draft and unmerged/undeployed.

## Current post-deployment audit summary — 2026-11-21

- Exact source snapshot `ae2eb506845380bc952d80c372851078b297d44f`: [GitHub CI 44882056225](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/actions/runs/44882056225) **PASS** real Vite/TypeScript build, 254 SEO output checks, 7 Chromium routes, current CDC citation and disabled demo form. Production deployment provenance is not established.
- [GitHub external public probe 44881936131](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/actions/runs/44881936131): DNS apex and TCP 80/443 resolved/connected, but validated TLS reset, HTTP stalled, and **0/27 requests returned an HTTP status**. [Iran/global third-party HTTP](https://check-host.net/check-report/597b5db5ka04) and [HTTPS](https://check-host.net/check-report/597b5aadk293) also produced resets in selected nodes, including Tehran and Isfahan. This is **not** proof of a universal outage or Googlebot behavior; normal client and edge/IIS log correlation remains the next hosting gate.
- See [post-deployment audit](verification/2026-11-21-post-deployment-public-server-audit.md), [27-case matrix](verification/2026-11-21-post-deploy-http-get-results.csv), [regional matrix](verification/2026-11-21-post-deploy-regional-results.csv), and [hosting owner handoff](strategy/2026-11-21-public-server-postdeploy-handoff.md).

## Latest transport-layer differential (2026-11-21)

- [Public TLS/HTTP differential report](verification/2026-11-21-transport-differential-audit.md): [GitHub run 44882903669](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/actions/runs/44882903669) completed **11 read-only tests**; eight curl variants returned **no HTTP status**, three OpenSSL TLS tests timed out inconclusively. Fixed-IP, HTTP GET/HEAD and SNI variants did not establish a working public response. This **does not identify the hosting fault** or prove a global outage.
- [Per-test evidence CSV](verification/2026-11-21-transport-differential-results.csv), [reusable bounded probe](tools/transport-layer-probe.mjs) and [updated hosting handoff](strategy/2026-11-21-public-server-postdeploy-handoff.md) document the next required edge/firewall/proxy/IIS log correlation. Local source build and 254 SEO checks remain **PASS**, but deployed HTTP/TLS/SEO checks are **BLOCKED**.

## Persian SEO keyword architecture — 2026-11-21

- [13-page intent architecture](research/2026-11-21-persian-keyword-architecture-v2.md) and [113 keyword candidate rows](research/2026-11-21-page-keyword-map-v2.csv) cover 6 marketing pages and 7 blog articles. Terms include branded, short-tail, long-tail and informational/commercial variants. [17 external research examples](research/2026-11-21-keyword-discovery-v2-evidence.csv) are **qualitative samples**, not measured rankings, volume or keyword difficulty.
- [Current SEO title/H1 source review](research/2026-11-21-current-page-onpage-optimization-review.md) and [source-based 13-page audit CSV](research/2026-11-21-current-page-keyword-audit.csv). [BeatFit Persian/English brand spelling guidance](strategy/2026-11-21-beatfit-brand-search-language.md).
- [Homepage keyword/metadata PR #20](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/pull/20) **MERGED into main** by other GitHub activity, with exact source edit of two string values only. Standard [CI 44884239038](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/actions/runs/44884239038) and independent [browser/SEO CI 44884358962](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/actions/runs/44884358962) both **PASS**: actual TypeScript/Vite build, **254 SEO checks**, homepage metadata/OG, unchanged H1 and unaffected `/gym`. [Verified QA report](verification/2026-11-21-homepage-keyword-pr20-ci.md).
- [Page-by-page 13-URL optimization queue](strategy/2026-11-21-page-by-page-keyword-optimization-queue.md) starts next with `/gym` versus the educational gym article. **Public deployed HTML, live HTTPS and GSC search performance remain unverified.**
