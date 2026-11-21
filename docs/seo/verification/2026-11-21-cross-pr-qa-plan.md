# Cross-PR CI QA Plan — Pinned /gym and Article-Link Revisions

**Date:** 2026-11-21  
**Status:** PROPOSED workflow on isolated QA branch; results must be recorded after actual GitHub Actions completion.  
**QA branch:** `seo/cross-pr-qa-2026-11-21` (based on the corrected checker PR #2 branch)  
**Main repository:** `mohammadAliKeshavarzSarkar/BeatFit-Website`

## Objectives

Obtain independent real build and browser evidence for the source changes proposed in two **unmerged Draft PRs** without copying the checker into each content branch or merging unrelated PRs. Verify precisely pinned commit revisions.

| Revision | PR | Commit under test | Change |
|---|---|---|---|
| Gym copy | [#1](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/pull/1) | `ae1b576f89c8cdb21d234064ffa0461f54d817d4` | Revised SEO title, hero description |
| Article links | [#3](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/pull/3) | `ae93c38983870ddd1331e7d5dcbcc58169aba23c` | Two `relatedSlugs` link changes |

## CI operations

For each pinned revision: check out exact commit, `npm ci`, `npm run build`, run the **corrected PR #2** `verify-seo-build.mjs` against the actual generated `dist/`, assert change-specific source/HTML consistency, check for tracked-`public/` build drift, install temporary Playwright and Chromium for a mobile `vite preview` smoke test.

### Browser checks

- PR #1: /gym on mobile viewport, title, original H1, exact revised paragraph, canonical; temporary initial SEO shell removed after React renders.
- PR #3: /resources renders seven distinct article links; both changed article pages show the expected two related links and actual article body in DOM; canonical matches requested URL.
- Both: JavaScript-disabled HTML retains the generated initial SEO H1 + summary shell. JS-off status is **an architectural observation**, not a Google indexing conclusion.

### Limitations

- A Vite preview is **not IIS production**. Its rewrite behavior may differ from actual deployed hosting and SSL/TLS.
- Google executes JavaScript in its rendering pipeline; a JS-disabled page missing full content is a signal to evaluate SSR/SSG, **not proof** that Google cannot index content.
- Smoke tests in one mobile viewport do not replace full responsive UX, accessibility audits, Search Console URL Inspection or field Core Web Vitals.
- The workflow is limited to a review branch with repository **read-only permissions**. It neither merges nor deploys code; the two content PR branches are not changed.
- Browser dependency installation is a temporary CI environment action; source lockfiles are not modified.
- If a step fails, record actual logs; do not claim full success from a partial CI pass.

## Planned outputs

Dated run/step evidence and any corrections to review-only test tooling, then update `docs/seo/verification/`, `docs/seo/operations/run-log.md`, and `docs/seo/decisions/decision-log.md` on `main`. Keep PRs draft pending explicit owner/release review.
