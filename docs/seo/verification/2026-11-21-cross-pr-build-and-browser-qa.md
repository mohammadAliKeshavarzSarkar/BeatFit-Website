# Pinned Content PRs — Real Build, SEO Integrity and Browser QA

**Record:** BF-SEO-CROSS-PR-QA-001  
**Date:** 2026-11-21  
**Target site:** BeatFit marketing website, Persian (fa-IR)  
**Evidence:** [Successful GitHub Actions run 44874359478](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/actions/runs/44874359478) and detailed job logs  
**Workflow branch:** `seo/cross-pr-qa-2026-11-21`  
**QA workflow revision:** `06dfd4d33fd0cd466c0e5555a40edac31fca0a6a`  
**Status:** **PASS** for the specified build/artifact/browser smoke checks of both pinned revisions. **NOT MERGED / NOT DEPLOYED**.

## 1. Why separate QA branches

PR #1 and PR #3 are independent Draft PRs that predate the proposed SEO checker. The verifier exists on PR #2, which is also still a Draft PR. Rather than merge code prematurely, duplicate the checker or change the content PR diffs, this run created a **read-only isolated workflow** that checked out each content PR's **exact commit** and used the corrected checker from the QA branch.

| Subject | PR | Exact application commit tested | Runner job | Result |
|---|---|---|---|---|
| Persian gym page copy | [#1](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/pull/1) | `ae1b576f89c8cdb21d234064ffa0461f54d817d4` | `136755661386` | **SUCCESS** |
| Related article links | [#3](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/pull/3) | `ae93c38983870ddd1331e7d5dcbcc58169aba23c` | `136755661646` | **SUCCESS** |

**Environment:** GitHub-hosted `ubuntu-24.04`, Node.js 22, locked application dependencies, Vite production build and locally served Vite Preview, Playwright 1.55.0 Chromium, mobile viewport **390 × 844**, `fa-IR` browser locale.

## 2. First run and environment-only failure

- [First QA run 44874303700](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/actions/runs/44874303700) attempted `ubuntu-latest`.
- Both revision builds and source/SEO checks proceeded; the browser runner hit an unsupported OS issue: Playwright 1.55.0 rejected `ubuntu26.04-x64` while attempting to install Chromium.
- This was a **browser-tool installation failure**, not a BeatFit rendering failure; the browser smoke step did **not** run in that attempt.
- Corrected the QA-only workflow to explicitly use `ubuntu-24.04`, then repeated both pinned revision tests.
- No website code, app dependencies, or production settings were changed to fix the runner.

## 3. Real successful run — evidence by gate

| Gate | PR #1 gym copy | PR #3 related links |
|---|---|---|
| Pinned application source checkout | PASS | PASS |
| `npm ci` with lockfile | PASS | PASS |
| Actual `npm run build` (TypeScript + Vite) | **PASS** | **PASS** |
| Corrected `verify-seo-build.mjs` on real `dist/` | **PASS — 254 checks** | **PASS — 254 checks** |
| Change-specific source assertions | PASS — new text and title, unchanged H1 | PASS — 14 valid related-card edges, at least one inbound for each article |
| Build-generated tracked `public/` drift | PASS — clean diff | PASS — clean diff |
| Playwright and Chromium installation | PASS | PASS |
| JavaScript-enabled mobile Vite Preview smoke | **PASS** | **PASS** |
| JavaScript-disabled initial HTML inspection | OBSERVED | OBSERVED |

### PR #1 — /gym mobile browser observations

The Playwright log explicitly records `PASS browser /gym (390px): visible content in DOM, revised title, H1, canonical`.

- React-rendered text contains the proposed new gym product explanation.
- `document.title` matches `پایش زنده ضربان قلب در باشگاه‌ها | بیت‌فیت`.
- The existing H1 remains `تجربه‌ای بسازید که اعضا ارزشش را در هر جلسه ببینند.`.
- Canonical URL resolves to the expected `/gym` path.
- `#bf-static-seo` is no longer in the JS-enabled DOM (the React app takes over).
- No JavaScript `pageerror` was reported in the sampled interaction.

**Important limitation:** These are headless mobile smoke assertions, not a human-approved visual design review, pixel-perfect snapshot, accessibility test or product-fact validation.

### PR #3 — /resources and two articles, mobile browser observations

The Playwright log explicitly records:

- `PASS browser /resources (390px): seven unique article card links`.
- `PASS browser article /blog/تاریخچه-تمرین: two correct links, substantial article body, canonical`.
- `PASS browser article /blog/پایش-ضربان-قلب-در-باشگاه: two correct links, substantial article body, canonical`.
- `PASS browser smoke for pinned article-links PR`.

**Article-related links verified in the rendered DOM:**

| Article page | Actual first related link | Actual second related link |
|---|---|---|
| `/blog/تاریخچه-تمرین` | `/blog/زون-های-ضربان-قلب` | `/blog/بار-تمرینی-چیست` |
| `/blog/پایش-ضربان-قلب-در-باشگاه` | `/blog/مقایسه-سنسور-ضربان-قلب` | `/blog/کنترل-شدت-تمرین-در-کلاس-گروهی` |

The checker also verified 14 source-declared related-card edges, valid published target slugs and one or more related-card inbound references for every one of the seven article nodes.

## 4. JavaScript-disabled contrast (confirmed on Vite Preview)

The no-JavaScript Chromium check returned:

| Sample | HTML-only observation | JS-enabled observation |
|---|---|---|
| `/gym` | `#bf-static-seo` H1 and summary block present | Full React page appears with new description and expected title/H1/canonical |
| `/blog/تاریخچه-تمرین` | `#bf-static-seo` exists; **0** `.bf-blog-post__body` elements and **0** `.bf-blog-post__related-link` anchors | Full article body and two related links are present |

This confirms the **source architecture BF-SEO-F02 in an actual local Vite Preview browser**, not merely by reading TypeScript. It is **not proof that Google fails to index the pages**. Google documents a JavaScript rendering/indexing pipeline and provides Search Console URL Inspection to check what Google actually rendered.

The production hosting environment remains a separate unknown: Vite Preview routing cannot prove that IIS on `beatfit.ir` serves the same HTML, redirects or statuses.

## 5. Remaining gates and caveats

- **PR #1:** Product owner must confirm that the sensor → live display → coach panel → saved history text accurately reflects currently available capabilities. Human responsive/brand review remains pending.
- **PR #3:** Editorial approval of conceptual link choices remains pending; broader keyboard/accessibility and multi-viewport validation not covered by this targeted smoke.
- **PR #2:** Build checker is still an independent Draft PR; its CI is not installed on `main` and must be merged only after code review.
- **All PRs:** Deployed HTTP/TLS, actual IIS rewriting, Search Console indexing/canonical choice, field Web Vitals, and true demo lead submission remain **NOT RUN / BLOCKED** as appropriate.
- A passing smoke suite is not a ranking improvement or a production-approval decision. All three Draft PRs are **open, unmerged and undeployed**.
- Build logs include a nonfatal Vite bundle-size warning. Treat it as a **performance investigation candidate**, not field Core Web Vitals evidence.
- A nonfatal GitHub npm cache-save contention message was seen after one completed job; the job itself concluded SUCCESS.

## 6. Reproduction and traceability

- [GitHub Actions QA run 44874359478 — both jobs success](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/actions/runs/44874359478)
- [Runner OS failure run 44874303700](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/actions/runs/44874303700)
- [QA branch workflow and scripts](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/tree/seo/cross-pr-qa-2026-11-21)
- [Proposed gym text PR #1](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/pull/1)
- [Proposed internal-link PR #3](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/pull/3)
- [Generated output checker PR #2](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/pull/2)
- [Rendering architecture decision brief](../strategy/2026-11-21-rendering-architecture-decision-brief.md)

**Evidence discipline:** This document supersedes earlier `NOT RUN` build/browser statuses **only for the exact pinned PR revisions and sampled routes in the successful run**. Older source audits remain historical records.
