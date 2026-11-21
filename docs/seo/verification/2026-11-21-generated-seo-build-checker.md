# Generated SEO Build Regression Checker — Proposal and Synthetic QA

**Record ID:** BF-SEO-VERIFY-003
**Date:** 2026-11-21
**Status:** IMPLEMENTED ON REVIEW BRANCH; NOT MERGED OR DEPLOYED
**Base source revision:** `ed310762d167f36587bbe421155817ab45fdbab4`
**Proposed branch:** `seo/verify-generated-build-2026-11-21`
**Intended environment:** Node.js 22+ after `npm run build`
**Change scope:** `scripts/verify-seo-build.mjs`, `scripts/verify-seo-build.test.mjs`, two new `package.json` scripts, this record.

## Purpose and safety boundary

The existing Vite `emitSeoFiles` generator already validates uniqueness, title presence, some canonical behavior, and 404 directives while writing route shells. This new independent **post-build** checker validates the generated `dist/` output as a connected graph: Sitemap locations, robots origin, IIS route-map targets and each route HTML head.

This is an output-integrity check, **not** a production crawler, JavaScript rendering test, Google Search Console validation, proof of search indexability, legal/privacy audit or HTTPS readiness check.

## Proposed commands

```bash
# Fast self-contained unit test, no npm dependency installation required
npm run test:seo:fixtures

# Trusted clean checkout: build the actual site, then inspect generated output
npm ci
npm run build
npm run test:seo
```

The checker also accepts a custom output folder:

```bash
node scripts/verify-seo-build.mjs path/to/dist
```

**The existing `npm run build` command was intentionally left unchanged.** CI or the release owner should invoke both `npm run build` and `npm run test:seo` after reviewing this PR. The generator may modify tracked `public/` files during build, so run in an isolated working tree and check the resulting git diff.

## Positive assertions

| Check family | Verification |
|---|---|
| Baseline route preservation | Six marketing URLs and seven existing Persian article slugs remain listed in the Sitemap; more pages may be added |
| Sitemap | Nonduplicate absolute HTTP(S) URLs, no query/fragment, one canonical origin, no `route-html` URLs |
| Robots | Internal route-shell disallow rule and Sitemap URL agree on origin |
| IIS map | Marked `BeatfitRoutes` block present, distinct route keys, all nonhome URLs mapped to existing HTML files, no orphan map entry |
| Each HTML shell | Persian `lang=fa`, `dir=rtl`, unique nonempty title and meta description, a single matching canonical, indexable robots, matching Open Graph URL, H1 placeholder shell |
| Structured data | Exactly one managed `bf-jsonld` script per page, containing syntactically valid JSON |
| Error page | `404.html` exists, has `noindex`, has no canonical |

**Current HTTP/HTTPS policy:** This verifier intentionally does NOT require HTTPS because the site's existing `SITE_ORIGIN` defaults to HTTP pending infrastructure validation. It enforces consistency only. This is not approval of HTTP as the final preferred production origin.

**Important:** A syntactically valid JSON-LD block does not mean the content is eligible for a Google rich result or that Schema.org requirements are all fulfilled. The H1 shell check does not establish full page prerendering.

## Completed test evidence — synthetic data only

**Environment:** Isolated Node.js v22.16.0 / local container; hand-generated 13-page output fixture, not copied from the actual BeatFit Vite build.  
**Commands:** `node --check scripts/verify-seo-build.mjs` and `node --test scripts/verify-seo-build.test.mjs` (testing content equivalent to the review-branch scripts).  
**Results:**

- A valid 13-page synthetic fixture produced **254 checks PASS**.
- Eight Node test cases produced **8 PASS / 0 FAIL**, including the positive fixture and seven intentionally malformed scenarios.
- Negative scenarios correctly rejected a noindex-marked indexable page, incorrect canonical and OG URL, a missing article route shell, invalid JSON-LD, a canonical on 404, a duplicate Sitemap location and a missing rewrite block.

**Interpretation:** The checker responds to representative correct and incorrect fixtures. This result MUST NOT be reclassified as `npm run build` passing, production HTTP correctness, SEO indexing or traffic uplift.

## Outstanding acceptance matrix

| Test ID | Required evidence | Status |
|---|---|---|
| CHECKER-01 | Syntax of proposed script | PASS — locally checked |
| CHECKER-02 | Synthetic valid fixture | PASS — 254 assertions |
| CHECKER-03 | Synthetic negative cases | PASS — 7 expected failures verified by Node tests |
| CHECKER-04 | `node --test` self-test suite | PASS — 8/8 locally |
| REPO-01 | Changed file scope and no accidental edits | PENDING — inspect actual PR diff |
| BUILD-01 | Trusted actual `npm ci && npm run build` | NOT RUN |
| BUILD-02 | Checker against actual built BeatFit dist | NOT RUN |
| BUILD-03 | Build-induced tracked public/ drift reviewed | NOT RUN |
| BROWSER-01 | Rendered pages and JS-disabled content parity | NOT RUN |
| DEPLOY-01 | Production IIS routes and HTTP/HTTPS | BLOCKED — deployed response not independently verified |
| GSC-01 | Actual indexing/canonical from Google Search Console | BLOCKED — first-party connection unavailable |

## Change-specific review concerns

- The test keeps the 13 established baseline routes as an invariant. If the site deliberately retires a page under an approved migration, the expected-route list must be updated alongside the release decision.
- The checker uses pragmatic markup/route-map matching for this generator's controlled output. It is not a general-purpose XML/HTML parser; if generation changes, fixture tests and matching logic must change together.
- The checker tests SEO head integrity and routes, not sitemap submission or actual HTTP status returned by IIS.
- Node tests create temporary synthetic files under the system temporary folder and remove them; they do not contact live BeatFit or third-party services.
- No new dependencies and no changes to the application code, page copy, canonical preference, server config, sitemap generator or deployment scripts.

## Definition of done

After review, verify the actual Vite output with a pinned checkout; check both new package scripts in CI or a trusted environment; resolve any false positives with a recorded explanation; then approve merge separately. Keep deployment and post-release HTTP/Google checks as separate workstreams.

**Follow-up:** Add this checker to a reliable CI gate only after the real project build and regression behavior have been verified; do not assume GitHub Actions CI exists or is configured here.
