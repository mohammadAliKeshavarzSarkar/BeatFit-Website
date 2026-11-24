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

## BF-SEO-RUN-015 — 2026-11-21 — Technical SEO phases (no content) kicked off

**Owner instruction:** Proceed with professional SEO phases; park content/copy PRs (#1, #3, #4, #8).

- Synced local `main` to `7d5dddb` (includes merged SEO verifier CI from PR #2).
- Confirmed T1 locally: `npm run test:seo:fixtures` **10/10 PASS**; `npm run build` PASS; `npm run test:seo` **254 checks PASS**.
- Collected target-market live evidence (not GitHub runner): HTTP apex **301 → https://beatfit.ir/**; HTTPS home/robots/sitemap **200**; `www.beatfit.ir` DNS **ENOTFOUND**.
- Observed production HTML still on an older 2026-11-15 build: `http://` canonicals, shared homepage shell for `/gym`, Google verification file **not** deployed (unknown path returned homepage HTML).
- Implemented source HTTPS canonical policy: `SITE_ORIGIN` / `.env.production` → `https://beatfit.ir`; enabled IIS `HTTPS Redirect`; canonical-host action URL updated to HTTPS.
- Wrote [technical phases plan](../strategy/2026-11-21-technical-phases-no-content.md). Content backlog remains parked.

**Not done in this run:** production deploy, GSC Verify click, demo CRM, SSR, content PR merges.

## BF-SEO-RUN-016 — 2026-11-21 — Production deploy broke with HTTPS rewrite loop

- After owner uploaded a new build, live probes of `https://beatfit.ir/` returned repeated **301 → `https://beatfit.ir/`** (redirect loop). Same pattern for `/gym`, verification file, and asset URLs.
- Root cause: source `public/web.config` had rule `HTTPS Redirect` set `enabled="true"`. On this IIS TLS binding/proxy, `{HTTPS}` can still evaluate as off for HTTPS client requests, so the rule redirects forever.
- Fix: set `HTTPS Redirect` back to `enabled="false"`. Keep HTML/sitemap/robots canonicals on `https://beatfit.ir` (those are correct). Live host already performs HTTP→HTTPS outside this rule.
- Owner must redeploy at least the fixed `web.config` (or full `dist/`) to restore the site.

## BF-SEO-RUN-017 — 2026-11-21 — Google Search Console ownership verified

- Owner confirmed Search Console verification for resource `https://beatfit.ir/` after publishing DNS TXT `google-site-verification=pryLHfD06lff-cxHVtVxxuNfjwPwWsEh6dgFQ8uSvVs`.
- T4 ownership gate: **PASS**. Crawl Stats UI is reachable for the property.
- **Next GSC actions (not done in this run):** submit `https://beatfit.ir/sitemap.xml`; run URL Inspection on `/`, `/gym`, and one Persian article; monitor coverage once data appears.
- External crawler reachability from outside Iran remains a separate hosting risk for ongoing crawl success.

## BF-SEO-RUN-018 — 2026-11-21 — T4 discovery prep + T6/T7 specs

- Re-probed production from target market: `https://beatfit.ir/sitemap.xml` **200** (13 `<loc>`, HTTPS apex); `robots.txt` **200** with `Sitemap: https://beatfit.ir/sitemap.xml`.
- Advanced T4 to **PARTIAL** (ownership done; sitemap submit + URL Inspection remain owner GSC clicks).
- Drafted [T6 demo conversion contract](../strategy/2026-11-21-demo-conversion-contract.md) from current `DemoForm` fields; no endpoint invented; implementation blocked on owner API/CRM/consent (D006).
- Opened [T7 weekly GSC measurement loop](2026-11-21-gsc-weekly-measurement-loop.md); T7 no longer blocked on ownership.
- Updated [technical phases snapshot](../strategy/2026-11-21-technical-phases-no-content.md) and README checkpoint.

## BF-SEO-RUN-019 — 2026-11-21 — Alias redirects leak HTTP Location

- GSC sample live matrix (Iran): home/gym/demo/article/sitemap/robots/verification **200**; unknown path **404**.
- `/blog/heart-rate-zones` returned **301** with `Location: http://beatfit.ir/blog/...` then host upgraded to HTTPS (extra hop / mixed scheme signal).
- Root cause: relative redirect actions absolutized as HTTP when IIS `{HTTPS}` is off behind TLS offload.
- Source fix: absolute `https://beatfit.ir/...` targets for trailing-slash, `/blog`→resources, and all five aliases in `public/web.config`; emitter asserts HTTPS alias actions.
- Evidence: [alias HTTP Location fix](../verification/2026-11-21-alias-http-location-fix.md). **Redeploy `web.config` (or full dist) required** for live PASS.

## BF-SEO-RUN-020 — 2026-11-21 — Alias HTTPS Location live PASS

- Owner uploaded the fixed build/`web.config`.
- Re-probe: `/blog/heart-rate-zones`, `/blog/live-class-monitoring`, `/blog`, `/gym/` all **301** with `Location: https://beatfit.ir/...` (no `http://` hop).
- Sample indexables still **200** with HTTPS canonicals; sitemap **200**.
- T3 alias redirect gate: **LIVE PASS**.

## BF-SEO-RUN-025 — 2026-11-21 — Sync resources hub from SEO team PR #25

- Checked `origin/main` merge `03732ce` / PR #25 resources-hub-discovery.
- Applied locally: SEO title `آموزش پایش ضربان قلب و تمرین | بیت‌فیت`; intro lede listing subjects; filter `برای باشگاه‌ها` (ZWNJ); sr-only catalog H2 accessibility text. Kept ASCII blog hrefs from earlier local work.
- Spec: [resources-hub-discovery-optimization](../research/2026-11-21-resources-hub-discovery-optimization.md).

## BF-SEO-RUN-024 — 2026-11-21 — Align on-page SEO to keyword map v2

- Pulled from `origin/main`: page-keyword-map-v2 (113), on-page optimization review, beatfit-brand-search-language.
- Aligned marketing titles/metas/H1s to owner primary phrases; home title/description per review; coach/athlete/resources/demo titles updated.
- Gym informational article seoTitle/H1 shifted to «چیست / چگونه کار می‌کند» to separate from `/gym` commercial intent.
- Brand positioning phrase set on Organization/WebSite schema. Pack doc updated.

## BF-SEO-RUN-023 — 2026-11-21 — Brand sitelinks readiness

- Google sitelinks cannot be forced; improved readiness for brand queries (`بیت فیت`, `beatfit`, …).
- Organization/WebSite `alternateName` brand variants; home `SiteNavigationElement` + crawlable primary nav in SEO shell; footer lists `/gym` `/coach` `/athlete` `/resources` `/demo`.
- Spec: [brand-sitelinks-readiness](../strategy/2026-11-21-brand-sitelinks-readiness.md).

## BF-SEO-RUN-022 — 2026-11-21 — Marketing page SEO pack (titles/H1/schema)

- Reworked six marketing pages: unique titles + long-tail meta descriptions from Persian seed clusters; H1s on gym/coach/athlete/resources/demo aligned to short keys.
- Home title uses پایش + مانیتورینگ باشگاه; BreadcrumbList JSON-LD on non-home marketing pages.
- Spec: [marketing-page-seo-pack](../strategy/2026-11-21-marketing-page-seo-pack.md). Redeploy for live SERP titles.

## BF-SEO-RUN-021 — 2026-11-21 — ASCII public blog URLs (copy/paste fix)

- Browser clipboard percent-encodes non-ASCII paths even when sitemap/canonicals use Unicode Persian; owner confirmed paste still showed `%D8%...`.
- Flipped public/canonical article paths to English ASCII slugs (`/blog/heart-rate-zones`, etc.). Persian paths **301** to ASCII. Content language remains Persian.
- Sitemap locs, internal links, IIS rewrite map, and SEO shells updated. Legacy Persian→ASCII rules in `web.config`.
- Local: fixtures 10/10; build; **255 SEO checks PASS**. Redeploy required for live copy/paste.

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

## BF-SEO-RUN-019 — 2026-11-21 — Verified combined Draft PR #8 + PR #10 preview

**Isolated QA branch:** `seo/combined-zones-editorial-qa-2026-11-21`; workflow run [44879300759](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/actions/runs/44879300759), job `136770848464`, completed **SUCCESS**.

- Checked out exact Draft PR #8 commit `1f486da6bc1f17e73452fefcd77c7189991e96c6` in a temporary runner and overlaid only the reviewed single `/demo` → `/athlete` CTA line from Draft PR #10 source commit `a1d7cecea2547b68ff8c293a197856cb1d5968f5`.
- Overlay assertion **PASS**, actual `npm ci` **PASS**, TypeScript/Vite build **PASS**, **254 generated SEO integrity checks PASS**, and tracked `public/` files clean.
- Chromium 390×844 Vite Preview verified the Zone 2 threshold note, original six FAQ questions plus updated answer, PubMed PMID 40225831 reference, correct article CTA and preserved common `/demo` footer. Click navigated to `/athlete` with matching page H1 and canonical; no pageerror.
- **This was a prospective combined source test, not an actual merge of the PR branches or a deployed production release.** No scientific/marketing owner approval, real HTTP/IIS, Search Console or conversion analytics verified.
- [Integrated evidence report](../verification/2026-11-21-zone2-cta-combined-qa.md) stored separately from individual PR verification results.

**Next:** Review and decide separately on PR #8 and #10; re-run the final release build if approved. Keep gym demo submission functionality and production network/GSC investigation as independent gates.

## BF-SEO-RUN-020 — 2026-11-21 — Demo form conversion integrity and lead receiver contract

**Source baseline:** `dee5c47bf33cd35569e88c59c3353e03fa075af6`. **Scope:** Demo form and route content, static Vite/IIS architecture, legal footer links, read-only source review.

- Inspected the full `src/components/DemoForm.tsx` and `src/content/demo.ts`, source config, current static site routing and package/deployment tree. The six-field form's onSubmit only invoked `preventDefault()`; no API/CRM/mail/lead handler was observed in the component. Three essential fields were not required. This is a **source gap**, not observed production lead loss or verified external service absence.
- Confirmed the footer's privacy/terms links are currently `href="#"` and that public HTTPS/IIS reachability has not passed an external production check. Do **not** collect personal contact information to an unverified HTTP endpoint or invented third party.
- Created [Draft PR #11](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/pull/11) at exact code commit `1b9571d03296a14694f97af2c8d68d6838a3df81`. It adds native required checks for name/gym/phone, length bounds and a truthful accessible **not sent** message on valid submit. It sends **no PII** and does not pretend a lead succeeded. CSS warning is minimal; six fields and existing CTA preserved.
- Standard PR GitHub Actions [44880438660](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/actions/runs/44880438660) concluded SUCCESS. Independent pinned mobile Chromium/real build workflow [44880488104](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/actions/runs/44880488104) was launched; its final outcome is recorded only after logs are read.
- Documented a detailed **proposed and not implemented** first-party `POST /api/demo-requests` contract as one option; no endpoint, credentials or provider was configured. HTTPS, privacy notice, server acknowledgment, secure storage/retention, abuse protection, idempotency and real staging recipient tests are owner gates.
- Added a 14-case acceptance matrix distinguishing actual source observations and missing backend/production work. Draft PR #11 is not merged/deployed.
- This work does not change the demo page SEO metadata, redirect rules, CSS outside a narrow status element or any content article.

**Artifacts:** [funnel audit](../audits/2026-11-21-demo-request-funnel-audit.md), [secure receiver contract](../strategy/2026-11-21-demo-lead-submission-contract.md), [acceptance matrix](../verification/2026-11-21-demo-funnel-acceptance-matrix.csv), [PR #11 QA](../verification/2026-11-21-demo-form-pr11-qa.md).

**Next owner gate:** Approve source-to-recipient service, HTTPS and privacy terms before a real intake PR. Never call a frontend-only status transition a successful conversion.

## BF-SEO-RUN-021 — 2026-11-21 — Completed actual Draft PR #11 form integrity QA

- [Standard GitHub PR CI 44880438660](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/actions/runs/44880438660) concluded SUCCESS for exact draft code commit `1b9571d03296a14694f97af2c8d68d6838a3df81`.
- [Pinned GitHub runner 44880488104](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/actions/runs/44880488104), job `136774519308`, completed **SUCCESS**: `npm ci`, real TypeScript/Vite Build, **254 SEO artifact checks**, clean generated tracked-public diff.
- Headless Chromium at 390×844 verified original six input/select/textarea controls, three essential required fields, native empty-form invalid blocking, new explicit `role=alert` not-sent warning after synthetic test fields and **zero non-GET requests**; /demo canonical remained valid, no JS pageerror.
- Test input used fictional QA name/gym/phone only within a local Vite Preview browser and was not sent to a real endpoint or logged as a lead.
- Product UX release gate: consider pre-entry notice or disabled form and a verified optional contact alternative; the current interim warning appears after data entry and may be inappropriate for live acquisition.
- **No backend, privacy notice, recipient/CRM, HTTPS verification, conversion analytics, merge or deployment is established by CI.** All successful checks are for an isolated Draft PR frontend.
- [Full verification](../verification/2026-11-21-demo-form-pr11-qa.md), [backend contract](../strategy/2026-11-21-demo-lead-submission-contract.md).

## BF-SEO-RUN-022 — 2026-11-21 — Reported server update, public network observations and latest source QA

**Pinned source audit revision:** `ae2eb506845380bc952d80c372851078b297d44f`. **Scope:** Read-only post-update server checks from public monitoring nodes and local real source Build/browser checks. Documentation English-only and under `docs/seo/`.

- Re-fetched GitHub main and PR records. The user's latest code updates—gym hero copy, article links, CDC reference, Zone 2 caveat, athlete CTA and disabled pre-entry demo form—are **merged in source**. PRs #1, #3, #4, #8, #10 and #11 are merged; this audit initiated none of those merges or a server deployment.
- Verified `https://beatfit.ir` canonical source default and `.env.production`, HTTPS robots Sitemap reference, and 13 HTTPS Sitemap URLs. `public/web.config` has an intentionally disabled IIS HTTPS Redirect rule due a historically documented proxy loop, and `src/config/site.ts` contains an unverified source comment that production redirects correctly.
- [Latest source CI 44882056225](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/actions/runs/44882056225), job `136779276910`, **SUCCESS**: actual locked install/TypeScript/Vite Build, **254 SEO post-build checks**, no tracked public diff; Chromium 390px confirmed seven main/marketing/article routes, canonical/hydration, current CDC citation and disabled demo, no pageerror.
- [Live network CI 44881936131](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/actions/runs/44881936131), job `136778905924`, **SUCCESS as a diagnostic only**: apex A `87.107.166.140`, TCP 80 and 443 connected, TLS handshake `ECONNRESET`, www lookup `ENOTFOUND`, but **0/14 replay and 0/13 expanded GETs** obtained an HTTP response status. The tool did not verify actual redirected or live SEO HTML.
- [Regional monitoring CI 44882198848](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/actions/runs/44882198848) used Check-Host nodes in Tehran, Isfahan, Qom, Zurich and Los Angeles. HTTPS/HTTP from completed Tehran and Isfahan nodes returned **Connection reset by peer**, Qom HTTP timed out (HTTPS check incomplete), and outside nodes also returned resets. These results are evidence of those monitoring vantages only; no global downtime or search crawl failure was asserted.
- Direct public webpage retrieval and Python container DNS were also unsuccessful, so no public browser screenshot, live canonical, real redirect or indexing status could be established.
- Saved [full audit](../verification/2026-11-21-post-deployment-public-server-audit.md), [27 HTTP cases](../verification/2026-11-21-post-deploy-http-get-results.csv), [10 regional cases](../verification/2026-11-21-post-deploy-regional-results.csv), [pinned source QA](../verification/2026-11-21-current-merged-main-source-qa.md), and [owner handoff](../strategy/2026-11-21-public-server-postdeploy-handoff.md).

**Priority next gate:** The authorized hosting owner compares ordinary user results from Iran and outside against timestamped WAF/proxy/IIS/TLS logs, then repeat real HTTPS redirect, robots, Sitemap, canonicals and 404 tests. The demo form is intentionally inactive in source and still requires a real approved backend/privacy flow. No production changes performed in this audit.

## BF-SEO-RUN-023 — 2026-11-21 — Public HTTP/TLS differential probes without backend changes

- Re-read GitHub `main` and confirmed recent merges #17/#18 brought independent QA/probe tooling, not an independently proven live web-server fix; current source base was `09e5f696bee514224aa70f747392484ffc3001da` at verification.
- Re-attempted public home, robots and Sitemap retrieval through an external web surface; no usable page content or status was obtained. Do **not** infer a global outage from this.
- Created a bounded, reproducible public transport diagnostic under `docs/seo/tools/transport-layer-probe.mjs` on isolated QA branch `seo/transport-layer-differential-qa-2026-11-21`, with GitHub Actions [44882903669](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/actions/runs/44882903669), job `136781863103`, conclusion SUCCESS (script execution).
- Tested 11 network scenarios: ordinary HTTP GET/HEAD, ordinary HTTPS GET/HEAD, forced HTTPS HTTP/1.1, OpenSSL TLS 1.2 with SNI, TLS 1.3 with SNI, no SNI, fixed-IP HTTPS with hostname/SNI, fixed-IP HTTP Host and deliberately labeled untrusted IP-only TLS diagnostic. **Eight curl probes received 0 HTTP statuses; three OpenSSL handshake probes timed out with no conclusive result.**
- Runner apex DNS A resolved to `87.107.166.140`, with curl TCP connects ~0.23 s and no proxy environment. No response bytes or validated TLS handshake were observed; fixed-IP and GET/HEAD behavior remained unsuccessful. This does **not** prove a specific WAF/IIS/SNI/SSL fault.
- Preserved [11-case results](../verification/2026-11-21-transport-differential-results.csv) and [full differential interpretation](../verification/2026-11-21-transport-differential-audit.md). Updated hosting owner handoff to begin at the public edge listener, correlate normal-browser requests, and distinguish monitoring IP filtering from public reachability.
- No server configurations, redirects, SEO code, browser forms, production data or Google Search Console account were changed.

**Open gate:** Actual hosting-side logs with timestamps and successful normal-browser HTTP/TLS verification, followed by production SEO acceptance. Avoid further blind repeated probes until a reported network configuration change.

## BF-SEO-RUN-024 — 2026-11-21 — All-page Persian keyword ownership and homepage metadata

- Analyzed source `src/content/{home,gym,coach,athlete,resources,demo}.ts`, marketing SEO metadata and all seven published article title/description/H1 sources against the existing 36-query map.
- Ran broad and focused exploratory public searches for Persian commercial group HR platforms, branded queries, coach/athlete software, zone calculators, training-load guides, sensor comparisons and progress articles. Evidence is qualitative; **no Google Search Console query/impression/position/volume data** was obtained.
- Committed 113 assigned phrase records for 13 existing page destinations, separated user intent, negative/out-of-scope queries, lexical brand variants and potential `/gym` vs gym-article collision. Documents: [architecture](../research/2026-11-21-persian-keyword-architecture-v2.md), [keyword CSV](../research/2026-11-21-page-keyword-map-v2.csv), [17 external examples](../research/2026-11-21-keyword-discovery-v2-evidence.csv), [current page review](../research/2026-11-21-current-page-onpage-optimization-review.md), [brand spelling](../strategy/2026-11-21-beatfit-brand-search-language.md).
- Created [PR #20](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/pull/20) with two homepage string substitutions: category-specific `site.title` and `HOME_DESCRIPTION`, preserving visual H1/design and all other page metadata. Exact PR source commit `725835ad4353298a6c5835fbeb1c9587a8751b3d`.
- **CI verified:** [Standard 44884239038](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/actions/runs/44884239038) and [pinned 44884358962](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/actions/runs/44884358962), job `136786306104`, both SUCCESS: real locked dependencies/TypeScript/Vite build, **254 generated SEO checks**, clean public diff, Chromium 390px exact homepage title/meta/OG and H1, canonical and `/gym` non-regression.
- PR #20 was **MERGED on 2026-11-21 08:22:48 UTC** by separate repository activity, merge commit `6d9ca5d2ad6e0e278db40db36dd0de3bfec86b14`. The audit did not initiate source merge/deployment. QA-only PR #21 also subsequently merged.
- Created [page-by-page work queue](../strategy/2026-11-21-page-by-page-keyword-optimization-queue.md) and [complete homepage QA](../verification/2026-11-21-homepage-keyword-pr20-ci.md). Next high-impact SEO intent check: commercial `/gym` vs informational `/blog/پایش-ضربان-قلب-در-باشگاه`.
- **Outstanding:** actual public HTTPS/TLS and deployed page content, Google indexing and measured query performance, backend demo form functionality. **No SEO ranking or traffic improvement was claimed.**

## BF-SEO-RUN-026 — 2026-11-23 — Marketing CTA source-link CI coverage

- Reviewed current six marketing content modules, seven registered blog content modules, source-link checker and review-only workflow. `href` was checked in article/home/resources source while marketing `ctaHref` and other marketing module links were omitted. No deployed broken CTA was asserted.
- In [Draft PR #41](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/pull/41), extended existing `scripts/verify-seo-source-links.mjs` to validate literal `href`/`ctaHref` in marketing and articles against the registered route and ASCII public-slug set; added a unique public-URL mapping guard. Added seven isolated negative/positive fixtures and wired them before the actual source/build verification steps in `.github/workflows/seo-verify.yml`.
- [GitHub Actions 45127419031](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/actions/runs/45127419031), job `137534864446`, completed SUCCESS for exact tested source commit `d628587e8a89a027ca4524d801ce85ae466ea0fa`. Existing build-checker fixtures 10/10 PASS; new link fixtures **7/7 PASS**; source links **7 articles, 14 related references, 62 literal internal links PASS**; locked installation + actual TypeScript/Vite build PASS; **255 generated SEO artifact checks PASS**; no tracked-public drift.
- Documentation: [source-link gate and limitations](../verification/2026-11-23-marketing-cta-source-link-gate.md). Newer commits on the PR branch are English-only docs; this run is not claimed as a fresh exact-head execution.
- Separate [Draft PR #40](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/pull/40) records source URL identity, including the training-load article under `/blog/live-tv-group-training`. No slug migration/redirect changes were made.
- **Not established:** public HTTP/TLS availability, deployed revision, Search Console indexing/query overlap, working lead receiver, hash-fragment targets, actual browser-click operation, or SEO traffic lift. PR #41 is draft and unmerged; no production code or publishing action taken.

## BF-SEO-RUN-027 — 2026-11-24 — Full thirteen-page Persian keyword/source reconciliation

- Re-read current website `main`: six marketing page content modules, `src/seo/marketing.ts`, all seven published article title/description/H1 sources, ASCII public slug registry, prior source research and decision records. Confirmed 13 unique source SEO titles and descriptions and differentiated commercial/product/informational intent; no blanket page-copy rewrite warranted.
- Reconciled all **113** historical phrase candidate rows with seven actual public English article slugs, preserving historical research page IDs and all 13 page owners in [canonical map v3](../research/2026-11-24-canonical-keyword-map-v3.csv). Candidate phrases are not measured Google query data.
- Created [13-page metadata inventory](../inventory/2026-11-24-current-13-page-meta-keyword-inventory.csv) with source title, description, H1, focus keyword, character counts, and exact content-source file blob SHA. Identified long-ish marketing descriptions as mobile snippet review candidates, not mechanical truncation failures.
- Added [all-page readiness report](../audits/2026-11-24-all-page-persian-keyword-readiness-audit.md). Main open owner issues: `/demo` promises a demo while the form is disabled; training-load article canonical source path `/blog/live-tv-group-training` is semantically mismatched; article full body requires JS after the initial SEO shell, so obtain Google-rendered content evidence before making an indexing claim. Existing scientific limitations must remain intact.
- Public research used Google Search Central documentation and sampled Persian search terms qualitatively. Attempted `https://beatfit.ir/` and `https://beatfit.ir/sitemap.xml` through an independent web surface; it did not return usable content. Owner reports Search Console sitemap fetched; no direct GSC impressions, URL Inspection or selected-canonical data accessible in this session.
- **Not performed:** website source-copy or URL/redirect changes, production deployment, Google Console actions, exact Googlebot HTML inspection, keyword volume/ranking attribution, new release CI. The documentation PR is review-only. Next needed input is first-party query + landing-page performance and URL Inspection outcomes.
