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
