# GitHub Actions SEO Build Verification — First Real CI Run

**Record ID:** BF-SEO-CI-001  
**Date:** 2026-11-21  
**PR:** [#2 — SEO Build Verification](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/pull/2)  
**Branch:** `seo/verify-generated-build-2026-11-21`  
**Code tested:** `00e65353762e58f123a89caf8c9dd1dfd24456d1`  
**Workflow:** `.github/workflows/seo-verify.yml`, proposed in PR #2; **not on main**.  
**Environment:** GitHub-hosted Ubuntu runner / Node.js 22 / locked dependencies.  
**Result:** SUCCESS on second CI run after correcting a verifier-only Unicode URL comparison bug.

## Why this CI gate was introduced

The existing Vite SEO generator (`scripts/emit-seo-html.ts`) produces route-specific HTML, Sitemap, robots, IIS rewrite map and a 404 shell. It contains some internal assertions but no single independent command comparing all emitted files together. The new PR adds a post-build checker, fixture tests and a limited, read-only pull-request workflow.

It is intentionally scoped to generated output. It is not a production HTTP crawl, Google indexing check, real browser render, Core Web Vitals measurement or demo lead test.

## Actual CI run 1 — failed, diagnostic only

[Run 44873370506](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/actions/runs/44873370506) tested commit `bf2348b03feef103c76661fa0d8542f5ba1d9e48`.

| Step | Result |
|---|---|
| GitHub checkout, Node 22, npm ci | PASS |
| Original eight synthetic fixture tests | PASS |
| Real TypeScript + Vite `npm run build` | PASS |
| Generated artifact verifier | **FAIL — 14/254 checks** |
| Tracked-public source diff | SKIPPED |

**Failure explanation:** Seven Persian article locations in `sitemap.xml` were percent-encoded through `new URL(...).href`. The article HTML canonical and `og:url` used readable Persian path segments from `absoluteUrl()`. The initial verifier compared raw strings and falsely reported both fields for each of seven articles (7 × 2 = 14). The two representations resolve to equivalent normalized absolute URLs. This is **not** evidence of a production canonicalization defect or broken Google indexing.

**Corrective code:** `scripts/verify-seo-build.mjs` now compares `new URL(value).href` for absolute HTTP(S) values. Fixtures were expanded to represent real raw-Persian article metadata and to reject genuinely incorrect article canonical targets. No application-generated canonical or sitemap behavior was changed.

## Actual CI run 2 — success

[Run 44873467188](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/actions/runs/44873467188) tested commit `00e65353762e58f123a89caf8c9dd1dfd24456d1`.

| Gate | Verified result | Evidence |
|---|---|---|
| Checkout and Node 22 setup | **PASS** | GitHub Actions job steps |
| Locked dependency installation (`npm ci`) | **PASS** | GitHub Actions job steps |
| Checker test suite | **PASS — 10/10** | Log: `# tests 10`, `# pass 10`, `# fail 0` |
| Real TypeScript + Vite website build | **PASS** | `npm run build` step completed |
| Built SEO output verification | **PASS — 254 checks** | Log: `SEO build verification PASSED: 254 checks` |
| Build-generated `public/robots.txt`, `public/sitemap.xml`, `public/web.config` drift | **PASS** | `git diff --exit-code -- ...` completed with exit code 0 |

**Job:** `136752936368`; this was a completed GitHub Actions success, not a self-reported synthetic result.

**Build warning:** Vite emitted a chunk-size advisory (previously seen in source/build logs). This does not fail the build and does not establish poor field Core Web Vitals; investigate with real mobile network/browser evidence separately.

## What this proves and what it does not

### Verified

1. The tested PR code builds successfully on a GitHub-hosted Node 22 environment.
2. Ten verifier fixture test cases pass, including raw/encoded Persian URL equivalence and negative cases.
3. The generated `dist` output passes 254 cross-artifact assertions.
4. The checked tracked `public/` files remained unchanged after this build.

### Not established

- HTTP(S), TLS and IIS behavior of `beatfit.ir` in production.
- Correct full article visibility in initial HTML without JavaScript.
- Real browser rendering, mobile accessibility, waterfall or Core Web Vitals.
- Google Search Console indexing, actual canonical selection, search impressions or rankings.
- Successful gym demo requests, lead storage or conversion measurement.
- Product owner approval of the separate `/gym` copy PR.

## GitHub release status

PR #2 is still **open and draft**, not merged. The workflow and checker live on its feature branch; **main does not yet contain or run this gate**. The successful workflow validates the exact tested code commit; subsequent documentation-only commits do not change its executable files.

PR #1 (`/gym` copy) remains separately open and draft, so the new CI result must not be misrepresented as a build of PR #1's changed copy.

## Next gates

- Review and approve the PR #2 checker/CI diff; merge only after explicit engineering acceptance.
- Validate PR #1 against the same build-and-SEO QA gate once available on the relevant branch.
- Independently test rendered DOM and server responses, rather than treating a generated-file PASS as a production crawler PASS.
- Investigate and document any significant frontend bundle/performance issues using actual browser or field measurements.
- Add CI results and any later changes as new dated records without overwriting failed-run history.

## Primary evidence

- [PR #2 source diff](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/pull/2/files)
- [Run #1 logs](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/actions/runs/44873370506)
- [Run #2 successful logs](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/actions/runs/44873467188)
- [Checker proposal on review branch](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/blob/seo/verify-generated-build-2026-11-21/docs/seo/verification/2026-11-21-generated-seo-build-checker.md)
