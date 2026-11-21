# Project Brief — BeatFit Persian SEO

**ID:** BF-SEO-SCOPE-001  
**Revision:** 0.2 — 2026-11-21  
**Website:** beatfit.ir  
**Baseline source:** `d11130cef8f941f54b06362bb9bd124f89853adb`  
**Methodology:** [SEO Engineering](https://github.com/mohammadAliKeshavarzSarkar/SEO-Engineering)  
**Permission:** Website source inspection and documentation writes in `docs/seo/`; no feature changes, deployments, production configuration or account actions authorized by this brief.

## Confirmed scope

| Dimension | Definition |
|---|---|
| Brand | BeatFit / بیت‌فیت |
| Search and content language | Persian (`fa-IR`) only |
| Target users | Gyms, coaches and athletes |
| Market | Iran and Persian-language searchers — planning assumption; confirm with evidence |
| UI | RTL; `lang=fa`, `dir=rtl`, mobile and mixed-script QA |
| Documentation | English except literal Persian search queries, site copy and URL slugs |
| Stack | React, TypeScript, Vite, React Router and generated SEO route shells |
| Candidate main conversion | Qualified demo request — ownership and tracking not yet agreed |
| Canonical origin | `beatfit.ir`; preferred HTTP/HTTPS policy must be established from actual infrastructure evidence |
| English-language SEO | Out of scope (no translated pages or invented hreflang) |

## Evidence hierarchy

- Source inspection: source observations only, pinned to Git revision.
- Authorized deployed HTTP/browser inspection: server and rendered behavior when collected.
- First-party Search Console, logs, analytics and CRM: indexed state and measured outcomes when access exists.
- Google Search Central, web.dev and Schema.org: requirements and applicable technical guidance.
- [Historical 18 November Playbook](../references/2026-11-18-research-playbook.md): earlier research, not automatically current production fact.

## Workflow and gates

| Stage | Work | Required result |
|---|---|---|
| 0 — Scope | Domain, users, language, authority, permissions | Project brief and explicit unknowns |
| 1 — Baseline | Crawlability, status, route registry, canonical, robots, sitemap, JavaScript, forms | Evidence-backed findings by technical layer |
| 2 — Persian research | SEO Engineering R01–R10, including R09 variants, real SERPs and audience tasks | Observed queries with provenance, intent and uncertainty |
| 3 — Content and architecture | Page ownership, topics, related links, authorship, evidence and trust | Reviewed route/intent map and content briefs |
| 4 — Decision | Risks, alternatives, dependencies, severity, effort, business value | Decision records and approved priorities |
| 5 — Implementation | Authorized minimal, reversible code/content changes | Reviewable PR and rollback plan |
| 6 — Verification | Build, browser, deployed HTTP, GSC, conversion, privacy, performance | Real PASS / FAIL / BLOCKED / NOT RUN outcomes |
| 7 — Measurement | Indexing, nonbrand visibility, field CWV, lead quality and experiments | Dated baseline and observed impact |

## Persian localization contract

- Preserve original queries including Persian/Arabic Yeh and Kaf, meaningful ZWNJ/spacing, numerals, colloquial variants, transliteration and borrowed technical terms.
- Normalize for analysis without changing the raw observations. Do not make duplicate intent pages from spelling variants or infer demand without measurements.
- Keep current Persian URLs stable unless a reviewed migration with permanent redirects is authorized.
- Only one language is targeted: hreflang is not necessary solely for that reason.
- Test semantic HTML, right-to-left navigation, mobile layout, bidi isolation and important content independent of animation.
- Claims about heart rate, intensity, sensor accuracy, calories and training guidance require verifiable support and qualified editorial review where relevant.

## Baseline facts and unresolved work

The source declares six indexable marketing pages and seven published Persian articles. Sitemap entries count 13, and the IIS routing configuration includes 12 non-home route shells. SEO shells include route metadata and only a summary in initial body HTML; React renders the rest. Source canonical settings use HTTP and the source HTTPS redirect is disabled. The reviewed demo form prevents default submission without sending lead data.

**These are source observations, not observed live rankings, indexing or production defects.** Actual TLS, deployed host, generated build, browser content, GSC canonical selection, field metrics, API/CRM and conversion measurement are not verified.

## Data and authorization boundaries

Keep sensitive athletes' health data, personal contacts, internal logs, credentials and raw private analytics outside this public repository. Documentation-only writes are approved. Code, tracking, SEO platform submission, DNS, SSL and production deployment require separate appropriate approval.
