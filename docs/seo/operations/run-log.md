# SEO Activity and Execution Log

This log records actual operations. Planned work must never be described as completed.

## BF-SEO-RUN-001 — 2026-11-21 — Scope and source identification

- Confirmed BeatFit website `beatfit.ir` with Persian-only SEO and RTL interface.
- Loaded SEO Engineering instructions for new-website onboarding, evidence/decisions and R01–R10 research.
- Located the earlier 18 November Playbook, treated as historical planning evidence.
- Confirmed website source in `mohammadAliKeshavarzSarkar/BeatFit-Website`, initial checked commit `d11130cef8f941f54b06362bb9bd124f89853adb`.
- Read marketing, routing, meta, Sitemap, IIS, generated HTML and form source.

**Not performed:** deployments, site changes, indexing/analytics access, complete browser audit.

## BF-SEO-RUN-002 — 2026-11-21 — Initial static baseline

- Counted 13 Sitemap URLs (6 marketing, 7 Persian articles) and 12 declared nonhome IIS rewrite keys.
- Performed eleven bounded static source checks; no test is represented as a production PASS.
- Recorded six source-driven findings, BF-SEO-F01 through BF-SEO-F06.
- Separately listed live HTTP, TLS, rendered DOM, GSC and conversion evidence as BLOCKED or NOT RUN.

**Artifacts:** baseline audit, verification table and URL inventory.

## BF-SEO-RUN-003 — 2026-11-21 — English documentation and GitHub write authorization

- Owner requested all project SEO outputs under `docs/seo/`, with English folder structure/narrative and original Persian evidence preserved.
- Initially attempted a Git tree write and GitHub Contents file write; both returned GitHub `403 Resource not accessible by integration`.
- Prepared an offline English documentation bundle while access was blocked, without claiming that it was published.
- Owner updated GitHub access and requested a retry.
- Verified repository admin/push permissions through the connected account.
- **Successfully created** `docs/seo/README.md` on main in commit `53ca929fe6c5cae5af8e609685ce3b16d645eff0`.
- Subsequently centralized the initial project brief, audit, test record, inventory, decision log, operations log and full historical Playbook under `docs/seo/` as a documentation-only repository change.
- Kept a compatibility redirect document at `docs/SEO-RESEARCH-PLAYBOOK.md` for existing links.

**Website code changed:** No.  
**Production deployment changed:** No.  
**Sensitive analytics or personal data committed:** None.

## Next work — NOT STARTED

1. Verify authorized live site HTTP/TLS and canonical policy.
2. Run trusted clean checkout/build and compare initial SEO shell to rendered browser content.
3. Verify actual demo submissions and privacy requirements.
4. Begin real Persian R01–R10 query/intent research and map proposed page ownership.

Every new work session will append an entry with exact revision, findings, test results, blockers, changes and follow-up ownership.

## BF-SEO-RUN-004 — 2026-11-21 — Live access attempt, page-intent audit and Persian seed map

**Reference:** Website application code still at `d11130cef8f941f54b06362bb9bd124f89853adb`; documentation at `baa680cc8e74ed3e2bc3c13e11b1133c74e8ac0e` before this run.

- Attempted read-only public HTTP/HTTPS retrieval of the home page, robots and Sitemap. Available web tool returned no usable HTTP response; an independent container attempt failed DNS resolution from that environment. **No production downtime or indexability conclusion was drawn.**
- Reviewed `src/seo/marketing.ts`, six marketing page content sources, all seven published article modules, article renderer, resources catalog and demo page content.
- Identified source-confirmed navigation patterns: athlete CTA points to `/demo` while demo requests gym information; generic article footer CTA points to `/demo`. Logged three candidate page-intent findings BF-SEO-F07–F09 without changing copy or routes.
- Confirmed seven published article modules contain source-defined related-article links, FAQ blocks and source blocks; content quality and deployed rendering remain untested.
- Drafted Persian-language intent seed map based only on source copy. **No actual keyword volume, SERP rankings or validated demand were asserted.**
- Added a structured HTTP, build, rendered-browser, GSC and business-conversion test gate with accurate BLOCKED/NOT RUN statuses.
- All outputs were written only in `docs/seo/`; no website functional code, infrastructure or analytics changes.

**New artifacts:** [page-intent audit](../audits/2026-11-21-page-intent-and-conversion-review.md), [production test plan](../verification/2026-11-21-production-access-and-test-plan.md), [Persian seed map](../research/2026-11-21-persian-intent-seed-map.md).

**Next gate:** Acquire independently usable authorized production/preview evidence, measure actual HTTP/JS behavior, and proceed from provisional queries to real Persian SERP/GSC research.

## BF-SEO-RUN-005 — 2026-11-21 — Persian public-web discovery and existing-page mapping

**Website code reference:** `d11130cef8f941f54b06362bb9bd124f89853adb`. **Work mode:** Read-only external search/source comparison; SEO documentation writes only.

- Sampled 17 exact Persian and index-discovery query strings using grouped public-web search queries.
- Catalogued 22 representative result URLs across gym monitoring, heart-rate zones, coaching intensity, sensor comparison, workout history, class programming and training load.
- Reviewed search snippets and available source pages; **did not capture exact localized Google SERP positions** or first-party query volume. Result-provider output pooled batched queries, preventing reliable per-query ranking assertions.
- Separated commercial solution, calculator, retailer/product, educational and specialist-research page types.
- Compared sampled page types against six current marketing pages and seven published Persian article topics in the pinned website source.
- Created a 36-row candidate keyword-to-existing-page map. Some strings were sampled; the others are explicitly labeled *proposed variants* rather than validated queries.
- Produced a competitor/page-type review and proposed existing-page-first content backlog. No new public SEO pages or website code changes.
- The lack of dependable `site:beatfit.ir` discovery results was classified INCONCLUSIVE, not indexing failure.
- Continued production HTTP, GSC and conversion-verification workstreams as BLOCKED/NOT RUN where evidence remains absent.

**Artifacts:** [research report](../research/2026-11-21-persian-search-discovery.md), [query register](../research/2026-11-21-sampled-search-queries.csv), [result register](../research/2026-11-21-search-evidence-register.csv), [keyword map](../research/2026-11-21-keyword-to-page-map.csv), [competitor review](../research/2026-11-21-competitor-page-type-review.md), [proposed backlog](../strategy/2026-11-21-content-priority-backlog.md).

**Next:** Collect localized and reproducible Google Search page-type observations and first-party GSC query/page evidence; gain review approval for one page improvement at a time; preserve outstanding server/browser verification gates.

## BF-SEO-RUN-006 — 2026-11-21 — Focused gym intent review and PR preparation

**Source reference:** `d11130cef8f941f54b06362bb9bd124f89853adb`. **Scope:** `/gym` page only; source content review and proposal; no production deployment.

- Re-sampled Persian phrases concerning group heart-rate monitoring, live display and coaching, plus a negative-control query for generic membership/attendance gym-management software.
- Reviewed representative specialist pages (FitMao, Chileaf, Pulses) and general management pages (Gymona, Pakoob); documented that these are different product categories.
- Confirmed current BeatFit gym H1 and hero copy and traced source bindings from `src/content/gym.ts` to `GymHero.tsx` and `gymDocument` SEO metadata.
- Prepared a two-string change proposal: preserve brand H1, clarify visible paragraph and explicitly name heart-rate monitoring in the SEO title.
- Defined source-diff, build, browser, product-fact, HTTPS/canonical and Search Console gates. Actual GSC access is not connected; no first-party queries or live ranks were retrieved.
- Recorded this intent qualification and copy proposal in English under `docs/seo/`. A separate feature-branch PR is planned for review, not merged or deployed as part of this documentation commit.

**Artifacts:** [gym intent check](../research/2026-11-21-gym-focused-intent-check.md), [copy proposal](../strategy/2026-11-21-gym-copy-proposal.md), [preflight](../verification/2026-11-21-gym-copy-preflight.md).

## BF-SEO-RUN-007 — 2026-11-21 — First /gym draft PR created and diff checked

- Created feature branch `seo/gym-hero-clarity-2026-11-21` from documentation baseline `a88c63f84fad968ed5ed7665cac4aacb9a824f85`.
- Applied exactly two application source string changes: `src/content/gym.ts` hero paragraph and `src/seo/marketing.ts` SEO title. Updated the related verification file in the same branch.
- Source-level pre/post assertions passed: original strings occurred once, replacements occurred once, H1 and route were retained, and SEO description/summary bindings remained unchanged.
- Opened **[Draft PR #1](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/pull/1)** at initial branch commit `ae1b576f89c8cdb21d234064ffa0461f54d817d4`.
- Independently fetched the PR diff and confirmed only the two expected source string lines changed plus a verification-document addendum (three files total).
- **Not merged or deployed.** Full build, generated route shell, mobile/browser visual check, actual feature confirmation, Search Console query baseline and production verification remain NOT RUN or BLOCKED.
- The first-party Search Console connection was not available during this run; the user was offered an integration option, but no GSC data was read.

**Review gate:** product/engineering owner checks copy and runs trusted build/browser tests before deciding on merge and deployment.

## BF-SEO-RUN-008 — 2026-11-21 — Post-build SEO output regression QA proposal

**Repository baseline:** `ed310762d167f36587bbe421155817ab45fdbab4`. **Mode:** Synthetic verification and review-only feature branch; production code unchanged on main.

- Inspected `package.json`, Vite `closeBundle` SEO generator, SEO head/template serializers, route registry, Sitemap/robots producers and IIS rewrite-map source.
- Identified a reproducibility gap: generator has local uniqueness/title/canonical checks, but no independently invokable post-build cross-artifact check that compares Sitemap URLs, robots origin, route shell files, IIS rewrite targets, JSON-LD validity and 404 behavior.
- Built an isolated Node 22 SEO artifact checker with no third-party runtime dependencies. Validated its syntax and behavior using synthetic generated files based on the 13 observed baseline routes, not the actual site build.
- Recorded **254 source-shape assertions passed on a valid synthetic fixture**, and **8/8 Node fixture tests passed** (one positive + seven expected negative tests: noindex, bad canonical/OG, absent shell, JSON-LD syntax, 404 canonical, duplicate Sitemap, missing rewrite marker).
- Created branch `seo/verify-generated-build-2026-11-21` and added `scripts/verify-seo-build.mjs`, `scripts/verify-seo-build.test.mjs`, two optional npm scripts and English documentation under `docs/seo/verification/`.
- Opened **[Draft PR #2](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/pull/2)**. Verified the PR changed exactly four expected files. GitHub commit-status query returned an empty status list; **do not infer successful CI from this**.
- Left `npm run build` untouched. The real `npm ci && npm run build && npm run test:seo`, generated public/ drift review, browser rendering, IIS HTTP and Google indexing tests are **NOT RUN / BLOCKED**.
- No merge, deployment, HTTPS preference, robots/canonical rewrite, page copy or functionality change was performed on main.

**PR evidence:** [Draft PR #2](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/pull/2); `docs/seo/verification/2026-11-21-generated-seo-build-checker.md` on its review branch.

**Next gate:** Run trusted actual build and post-build verifier, document any false positives, approve PR #2 separately, then integrate checks into a CI release gate when authorized.

## BF-SEO-RUN-009 — 2026-11-21 — Real GitHub CI execution, Unicode false positive and corrected pass

**PR:** [#2](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/pull/2); review branch `seo/verify-generated-build-2026-11-21`. **Main product code not changed.**

- Added `.github/workflows/seo-verify.yml` to PR #2. The `pull_request` workflow has read-only repository permission, runs Node 22, installs locked dependencies, runs fixtures, builds actual production assets, verifies the generated SEO output and checks tracked-public drift. No deployment or secrets.
- GitHub Actions **run 44873370506 failed** only at the generated SEO verifier: 14 false positives for seven readable-Persian article canonicals and `og:url` values compared against percent-encoded Sitemap URLs. Checkout, dependency install, original fixture tests and actual Vite build passed.
- Inspected the source relationship: `src/seo/sitemap.ts` uses `URL.href` encoding while `src/config/site.ts` `absoluteUrl()` preserves readable Persian. Both normalize to equivalent URLs; this is a **verification defect**, not evidence of broken deployed canonicals.
- Fixed the checker to compare normalized HTTP(S) URL values and updated synthetic fixtures to test readable/encoded equivalence as well as a genuinely wrong Persian target.
- Local Node.js 22 synthetic fixture suite passed **10/10** after the fix.
- GitHub Actions **run 44873467188 succeeded** for code commit `00e65353762e58f123a89caf8c9dd1dfd24456d1`: `npm ci`, 10/10 fixtures, actual `npm run build`, **254 generated SEO checks**, and clean tracked-public source diff. Read workflow job steps and logs to confirm.
- The read-only runner emitted a nonfatal Vite chunk-size advisory, not a measured field performance finding.
- The checker and workflow remain in **draft PR #2**, not merged or deployed. PR #1 was not built by this run.
- Production HTTP/TLS, rendered JS/no-JS content, Google Search Console and demo conversion gates remain blocked/not run.

**Canonical evidence:** [CI verification record](../verification/2026-11-21-github-actions-ci-gate.md), [successful run](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/actions/runs/44873467188), [initial failed run](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/actions/runs/44873370506).

**Next:** Review PR #2; after appropriate approval, make the CI gate available to PR #1. Continue separately with source and then deployed rendered-content/link validation.

## BF-SEO-RUN-010 — 2026-11-21 — Source-level internal article link graph

**Source reference:** `d11130cef8f941f54b06362bb9bd124f89853adb`; read-only link inventory, no live crawler.

- Inspected all seven published article source modules, `src/content/resources.ts`, `src/content/home.ts` and the React `BlogArticle.tsx` renderer.
- Verified seven source-declared links from `/resources` and seven from the homepage to the articles. Confirmed 14 related-card links (two each, valid targets, no self-links).
- Related-card incoming counts: zones 6, group intensity 3, gym monitoring 2, history 2, group design 1, training load 0 and sensor comparison 0.
- Correctly classified training-load and sensor-comparison pages as **not orphaned in source**: both appear in homepage and resource registry; only the related-card subgraph has zero inbound edges.
- Prepared two narrow editorial substitutions aimed at more relevant cross-article paths. Source-link distribution is not treated as an observed ranking or crawl improvement.
- Recorded a 28-edge link graph and acceptance plan; no deployed/browser crawling or GSC evidence collected.

**Artifacts:** [link graph review](../audits/2026-11-21-internal-link-source-review.md), [source edge inventory](../inventory/2026-11-21-article-link-graph.csv), [editorial proposal](../strategy/2026-11-21-related-article-link-proposal.md).

## BF-SEO-RUN-011 — 2026-11-21 — Review-only related-article link PR

- Created `seo/rebalance-related-articles-2026-11-21` from documentation baseline `518cf62bd402b489deac819531f2d599e3e9e9a3`.
- Edited exactly two `relatedSlugs` arrays in `src/content/blog/trainingHistory.ts` and `src/content/blog/gymHeartRateMonitoring.ts`; recorded static assertions in `docs/seo/verification/2026-11-21-related-article-pr-preflight.md` on the review branch.
- Opened **[Draft PR #3](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/pull/3)** at commit `ae93c38983870ddd1331e7d5dcbcc58169aba23c`.
- Independently fetched the PR patch: exactly one `relatedSlugs` line in each article source file and one documentation file changed. No other application files changed.
- Target slugs are in the seven published-article registry; each article retains two related references; resulting related-card graph has at least one incoming related-card link per article.
- **No build or browser test for PR #3 has been performed**, and the successful PR #2 GitHub Actions run cannot be reused as verification for PR #3.
- No main website code modification, production deployment, index submission, redirect, metadata or article text change.

**Next gate:** Editorial review of the two link destinations; run PR #3's own build and browser/rendered-link checks once the verification workflow is available to that branch, then decide on merge separately.

## BF-SEO-RUN-012 — 2026-11-21 — Pinned PR #1 and PR #3 real build, artifact and browser QA

**QA branch:** `seo/cross-pr-qa-2026-11-21`; **final workflow code:** `06dfd4d33fd0cd466c0e5555a40edac31fca0a6a`.
**Scope:** Independent verification of exact unmerged PR source snapshots; no website code was changed on main or merged to production.

- Created an isolated GitHub Actions `push` workflow with a two-target matrix; checked out pinned commit `ae1b576f89c8cdb21d234064ffa0461f54d817d4` (PR #1) and `ae93c38983870ddd1331e7d5dcbcc58169aba23c` (PR #3). Reused the corrected PR #2 generated SEO checker without copying changes into either content PR.
- Initial [run 44874303700](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/actions/runs/44874303700) passed the real Build and generated SEO checks but failed browser setup due to **Playwright 1.55.0 not supporting Ubuntu 26.04** on `ubuntu-latest`. Corrected only the QA workflow runner to `ubuntu-24.04`.
- Successful [run 44874359478](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/actions/runs/44874359478) completed with **2/2 jobs SUCCESS**: both had `npm ci` PASS, actual TypeScript/Vite `npm run build` PASS, **254 generated SEO checks PASS**, specific source assertions PASS, no tracked-`public/` drift, and Playwright Chromium mobile smoke PASS.
- PR #1 browser: actual `/gym` title, unchanged H1, proposed new body text and canonical all confirmed in the JS-rendered DOM at **390px**.
- PR #3 browser: `/resources` showed seven distinct article links; both edited article pages rendered full article body, both expected related links and valid canonical, with no page errors in tested navigation.
- JavaScript-disabled Chromium on a sampled article returned the temporary H1/summary `#bf-static-seo` shell, **0** full article-body elements and **0** related-link anchors, confirming BF-SEO-F02's JavaScript dependence for Vite Preview. This is **NOT evidence of Google indexing failure**; Google can render JS, and first-party URL Inspection is still unavailable.
- No PR was merged or deployed, and the QA branch is separate from PR #1/#2/#3.
- Created a rendering architecture decision brief. Deferred SSR/SSG implementation until real production/IIS and Search Console render evidence supports it.
- Sources: [verification report](../verification/2026-11-21-cross-pr-build-and-browser-qa.md), [machine-readable matrix](../verification/2026-11-21-cross-pr-result-matrix.csv), [rendering decision brief](../strategy/2026-11-21-rendering-architecture-decision-brief.md).

**Next gates:** Product/editorial human approval for PR #1/#3, reviewer approval of PR #2, deployed HTTP/IIS/SSL verification, Google Search Console URL Inspection, and demo lead flow ownership.

## BF-SEO-RUN-013 — 2026-11-21 — Public HTTP, DNS, TCP and TLS diagnostic from GitHub Actions

**Scope:** Public unauthenticated probes only. **No merge, deployment, hosting, DNS or SEO source changes.**
**Runs:** [HTTP 44874973166](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/actions/runs/44874973166); [DNS/TCP/TLS 44875160463](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/actions/runs/44875160463).

- Re-attempted live public web fetches of `beatfit.ir`, `robots.txt` and Sitemap. The public-web tool returned no usable HTTP evidence.
- Created isolated read-only GitHub Actions branch `seo/production-http-diagnostics-2026-11-21`; probed 14 fixed public endpoints (HTTP/HTTPS home, www variants, robots, Sitemap, /gym, one Persian article, legacy alias and unknown route) with strict timeouts, at most three concurrent GETs, and no authentication.
- **Result:** 0/14 usable HTTP responses from that CI runner; twelve apex requests timed out (curl 28), and two www requests failed name resolution (curl 6). No HTTP response status or redirect chain was returned; production SEO endpoints remain BLOCKED, not classified as 404 or ranking failure.
- Created a separate read-only `seo/dns-tcp-diagnostics-2026-11-21` job to narrow the diagnosis. The runner resolved apex A to `87.107.166.140`, matching the current source `public/web.config` comment; www A/AAAA/CNAME queries returned ENOTFOUND; apex TCP ports 80 and 443 connected; TLS handshake returned `ECONNRESET`.
- Interpreted a successful TCP handshake as transport only, **not** an HTTP/TLS/SEO PASS. These findings are runner-specific; target-market availability, server configuration, indexing and origin choice remain unknown.
- Created a sanitized request matrix, full English evidence report and owner-facing DNS/SSL/IIS verification checklist.
- Kept source HTTP canonical fallback and disabled HTTPS redirect unchanged because no valid production HTTPS response/certificate was verified.

**Artifacts:** [live evidence](../verification/2026-11-21-public-http-and-network-evidence.md), [request matrix](../verification/2026-11-21-public-http-probe-results.csv), [hosting checklist](../strategy/2026-11-21-hosting-readiness-checklist.md).

**Next gate:** Authorized hosting owner validates DNS/site bindings/certificate and target-market HTTP reachability; then independently verify deployed SEO pages and GSC rendering.

## BF-SEO-RUN-014 — 2026-11-21 — Article evidence inventory, FAQ retirement and citation QA

**Source revision:** `4eb3d6914eeddb2ffea9e8414cbbf218606cdcc1`. **Change scope:** English documentation on main; a separate unmerged one-URL Draft PR #4.

- Read the seven Persian article modules plus shared article renderer and `BlogPosting`/`FAQPage` JSON-LD serializer.
- Recorded **47 citation rows, 43 unique external URLs, 46 FAQ questions** and publication dates in source inventories. Eight selected external citations were spot-checked, not all 47.
- Confirmed from **official Google Search Central** that FAQ rich results stopped appearing on 2026-05-07; deprecation notice 2026-05-08; feature documentation removed 2026-06-15. Visible FAQs may still benefit readers; no FAQ markup change was made.
- Confirmed institutional author `تیم محتوای بیت‌فیت` is source-visible and `BlogPosting.author` Organization is supported. Actual qualified reviewers, correction policy and `dateModified` governance are not established; no identity or revision date was invented.
- External spot checks identified an older CDC exercise-intensity URL rendering SSI template errors; the current CDC page displayed the relevant guidance.
- Created [Draft PR #4](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/pull/4), changing exactly one citation URL in `src/content/blog/groupClassIntensity.ts`, and adding a preflight note. No copy, author, article date, canonical or schema changes.
- Ran independent pinned-revision [GitHub Actions 44876593273](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/actions/runs/44876593273). **Actual `npm ci`, TypeScript/Vite build, 254 SEO output checks, CDC link assertion and tracked-public drift check all PASS.** Browser click and deployed/GSC tests NOT RUN.
- Wrote an English source-reliability, scientific-review and structured-data backlog. PR #4 remains Draft; no merge or deployment.
- Production DNS/HTTP/SSL/GSC blockers remain separate and unresolved.

**Artifacts:** [editorial audit](../audits/2026-11-21-article-editorial-evidence-audit.md), [reference register](../inventory/2026-11-21-article-citation-register.csv), [FAQ guidance](../research/2026-11-21-google-faq-rich-result-retirement.md), [CI record](../verification/2026-11-21-cdc-citation-ci-evidence.md), [editorial backlog](../strategy/2026-11-21-editorial-evidence-backlog.md).

## BF-SEO-RUN-015 — 2026-11-21 — Two-article physiological and wearable-sensor claim review

**Current source snapshot:** `7dbb283a97681597ee0792dd408f0b0734876a7a`, including subsequent third-party main changes that introduced Google Search Console verification assets. Those files are **not evidence of first-party Search Console data access**.
**Scope:** `/blog/زون-های-ضربان-قلب` and `/blog/مقایسه-سنسور-ضربان-قلب`.

- Read both full TypeScript article sources and verified age-30 `220 - age = 190` and `208 - 0.7*age = 187`, with 190-bpm zone cutoffs 95/114/133/152/171/190. AHA and Tanaka provide the supporting age-estimate caveat.
- Compared the fixed `60–70% HRmax` five-zone convention to a 2025 50-cyclist study of Zone 2 physiological thresholds. Classed fixed percentages as a useful teaching model **not equivalent for all people** to ventilatory/lactate-based physiological boundaries.
- Audited sensor claims against Neudorfer (2024), Schweizer and Gilgen-Ammann (2025), anatomical placement (online late 2025), and INTERLIVE expert guidance. Classed device-placement benefits as model- and activity-specific; no BeatFit hardware accuracy data was found.
- Produced a CSV with 22 bounded claim records, evidence references, support/caveats and required editorial/product actions; preserved unresolved 2017-device-comparison and metabolism-source attribution for review rather than calling them false.
- Created **[Draft PR #8](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/pull/8)** at `1f486da6bc1f17e73452fefcd77c7189991e96c6` with exactly three source edits in HR zones article: explanatory note, matching FAQ answer, one PubMed reference. Existing H1, URL, main five-zone table, date and SEO metadata unchanged.
- Prepared separate pinned GitHub QA branch `seo/zone2-pr8-qa-2026-11-21`, workflow [44877833723](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/actions/runs/44877833723) for real build/254 generated artifact checks and mobile Chromium review; **do not mark final CI PASS without actual completed result**.
- Source inspection found the main repository includes new Search Console verification assets from separate code changes; no GSC impressions, indexing or owner-access result was retrieved.
- No site deployment, PR merge, authoritative scientific signoff or lab accuracy certification occurred.

**Artifacts:** [scientific claim review](../audits/2026-11-21-zones-and-sensors-claim-review.md), [claim matrix](../inventory/2026-11-21-zones-and-sensors-claim-matrix.csv), [claim backlog](../strategy/2026-11-21-zones-sensors-follow-up-backlog.md), [PR #8 QA record](../verification/2026-11-21-zone2-pr8-qa.md).

## BF-SEO-RUN-016 — 2026-11-21 — Verified actual Draft PR #8 Build and Chromium results

- Reused independent read-only QA branch `seo/zone2-pr8-qa-2026-11-21` to checkout the exact Draft PR #8 commit `1f486da6bc1f17e73452fefcd77c7189991e96c6`. Did not merge the application PR or deploy.
- [GitHub Actions run 44877833723](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/actions/runs/44877833723), job `136766358509`, completed **SUCCESS** on pinned Ubuntu 24.04 / Node 22.
- `npm ci`, actual TypeScript/Vite `npm run build`, corrected **254 generated SEO checks**, one new PubMed citation/six FAQ source assertions, and tracked-public files drift check all PASS.
- Headless Chromium (390×844 mobile viewport) verified the added Zone 2 explanation, physiological-threshold caveat, unchanged six-question FAQ count, updated FAQ answer, PubMed PMID 40225831 citation anchor, matching canonical and no runtime page errors.
- Full external exercise-science editorial signoff, user studies, production server/Google Search Console rendering and traffic outcomes remain unverified.
- Documentation updated with run ID, job ID, exact content commit and evidence link. Draft PR #8 remains open, unmerged and undeployed.

**Full report:** [Pinned PR #8 QA evidence](../verification/2026-11-21-zone2-pr8-qa.md).

## BF-SEO-RUN-017 — 2026-11-21 — Reconciled GitHub PR states after external merges

- Queried live GitHub PR metadata for #1 through #8 rather than relying on the earlier status snapshots.
- Found PRs **#2, #5, #6 and #7 are MERGED** into main (merge timestamps 2026-11-21 UTC) by repo activity outside this audit step; #1, #3, #4 and #8 remain open/draft.
- Corrected `docs/seo/README.md` and BF-SEO-D014 to reflect merged status of the generated SEO checker. Prior status reports remain historical.
- The website `main` now includes GSC verification assets from a separately authored header/GSC commit. A verification file alone is **not** Search Console search-performance, index or URL Inspection evidence; no property connection was accessed.
- Recorded [GitHub PR and main reconciliation](2026-11-21-repository-state-reconciliation.md) without merging PRs or publishing the website.

## BF-SEO-RUN-018 — 2026-11-21 — 2017 study verification and audience-aligned article CTA

**Source before proposed CTA code change:** `7d5dddbb5636647fe66b7294a8ec890bbb9c508e`; source audit independent of deployed HTTP.

- Revisited Gillinov et al. (2017), PMID 28709155, and compared published review Table 3 to the existing Persian sensor article. The exact cautious claim that **some named wrist devices outperformed a specified optical forearm monitor** is supported: Apple Watch ECG concordance about `r_c=0.92` versus Scosche Rhythm+ forearm about `r_c=0.75` in a 50-person study; Polar H7 chest reference about `0.99`. These are study/device-specific values, not universal accuracy percentages.
- Marked earlier S08/`BF-CLAIM-02` **resolved narrowly** via a dated addendum; the historical evidence matrix was preserved unchanged. No sensor article source text was modified.
- Read all seven article CTA blocks, shared `BlogArticle.tsx` footer, `src/content/demo.ts`, `src/components/DemoForm.tsx` and the athlete landing page. Found the zones article athlete-specific CTA pointed to `/demo`'s **gym/club** request form while its peer athlete-focused articles pointed to `/athlete`. The common footer `/demo` link remained a separate existing CTA.
- Created [Draft PR #10](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/pull/10), exact source commit `a1d7cecea2547b68ff8c293a197856cb1d5968f5`, changing just the zone article `href: "/demo"` to `"/athlete"`. One English preflight document in `docs/seo` was added on that review branch; no meta, Persian text, H1 or date changes.
- GitHub [standard CI 44878957309](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/actions/runs/44878957309) and independent [pinned Chromium QA 44879013001](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/actions/runs/44879013001) both concluded **SUCCESS**. Actual build PASS, **254 SEO output checks**, clean tracked-public diff, 390×844 browser click to `/athlete`, H1/canonical and preserved `/demo` footer PASS.
- The demo form still has source `onSubmit={event => event.preventDefault()}` and no apparent network handler in component. Do not claim conversion capture or SEO uplift based on a tested link.
- PR #8 scientific Zone 2 edits and PR #10 CTA edits touch different lines of one article. They require a separate **combined revision acceptance run** if both are approved.
- No merge/deploy, production IIS, Google indexing, analytics or product-owner conversion review occurred.

**Artifacts:** [2017 claim and CTA audit](../audits/2026-11-21-2017-study-and-cta-audit.md), [source CTA route map](../inventory/2026-11-21-article-cta-route-map.csv), [PR #10 CI record](../verification/2026-11-21-zones-cta-pr10-ci.md), [2017 study resolution](../verification/2026-11-21-sensor-2017-claim-resolution.md).
