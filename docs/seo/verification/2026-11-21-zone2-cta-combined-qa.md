# Integrated Zone 2 + Athlete CTA — Two Draft PR Compatibility Verification

**Record ID:** BF-SEO-COMBINED-PR8-PR10-001
**Date:** 2026-11-21
**Status:** **PASS on temporary combined review checkout; not merged or deployed**
**CI workflow:** [Run 44879300759](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/actions/runs/44879300759), GitHub Actions job `136770848464`
**QA branch:** `seo/combined-zones-editorial-qa-2026-11-21`, revision `a581c533f750dfe2bff72d35e77f88e72b462301`
**Exact PR #8 source revision:** `1f486da6bc1f17e73452fefcd77c7189991e96c6`
**Exact PR #10 source revision:** `a1d7cecea2547b68ff8c293a197856cb1d5968f5`
**Execution environment:** GitHub-hosted Ubuntu 24.04; Node.js 22; Vite Preview; Playwright Chromium 1.55.0; 390×844 mobile viewport; `fa-IR`.

## Why this was required

Two separate open Draft PRs modify one article source file (`src/content/blog/heartRateZones.ts`) at distinct lines:

- [Draft PR #8](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/pull/8) clarifies the five-zone `60–70% HRmax` teaching convention compared with individual ventilatory/lactate thresholds, edits one Zone 2 FAQ answer and adds PubMed PMID 40225831.
- [Draft PR #10](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/pull/10) changes the athlete-oriented article CTA destination from `/demo` to `/athlete`, preserving the common template footer demo path.

Independent passing builds are necessary but do not establish whether the two edits work together. Therefore a **separate, read-only, non-merged** composition test was performed.

## Exact integration method

1. Check out PR #8's precise application commit in an isolated GitHub Actions runner.
2. Assert the PR #8 PubMed source already exists.
3. Apply **only** the previously verified, one-line PR #10 CTA destination diff to this temporary checkout, with exact one-match assertions. The overlay is not committed to either PR or to `main`.
4. Install locked application dependencies using `npm ci` and run the actual `npm run build`.
5. Run the already validated generated SEO artifact checker against built `dist/`, and confirm generated tracked `public/` files have no drift.
6. Run a Playwright Chromium 390×844 mobile smoke test against Vite Preview, including an actual CTA click.

This procedure tests an intentional **prospective combined source state**, not a GitHub merge commit, final release branch or deployed IIS server.

## Verified results

| Check | GitHub job evidence | Result |
|---|---|---|
| Exact checkout of PR #8 source | GitHub checkout step | PASS |
| One-line PR #10 CTA overlay and PR #8 citation existence | Log: `PASS exact one-line PR 10 overlay on PR 8` | PASS |
| Locked dependency install | `npm ci` | PASS |
| Actual combined TypeScript/Vite Build | `npm run build` | PASS |
| Generated HTML, Sitemap, robots, rewrites, 404, SEO head | `SEO build verification PASSED: 254 checks` | **PASS — 254 checks** |
| Generated tracked `public` drift | `git diff --exit-code -- public/...` | PASS |
| Visible Zone 2 explanation | New 60–70% HRmax model-specific note in DOM | PASS |
| Physiological threshold caveat | Ventilatory/lactate wording present | PASS |
| FAQ content | Exactly six questions, updated Zone 2 answer | PASS |
| Added scientific reference | PubMed PMID 40225831 link renders | PASS |
| Article-specific CTA | `/athlete` link present and clicked | PASS |
| Independent common footer CTA | `/demo` link remains present | PASS |
| Athlete landing-page navigation | Expected H1 + canonical after click | PASS |
| Sampled browser JavaScript runtime exceptions | Empty `pageerror` list | PASS |
| Human product/scientific editorial approval | No signoff obtained | PENDING |
| Actual deployed HTTP/IIS, GSC, conversion behavior | Not accessed | NOT RUN / BLOCKED |

**Browser log:** `PASS COMBINED ZONE2+CTA: new zone note + FAQ + PMID + athlete CTA click + separate demo footer, Chromium 390px, no runtime errors`.

The full GitHub job finished **SUCCESS** (not merely a successful individual step), at job `136770848464`.

## Important interpretation

- The test establishes compatibility of the two proposed source-level edit sets in a common temporary Vite build. It does **not** authorize either PR for merge.
- The exact future merge/base branch may change. A final post-merge/build verification is still required if the owner accepts either/both PRs.
- Vite Preview is not actual IIS production and does not verify HTTPS, DNS, redirects, Google-rendered HTML, Search Console URL Inspection or search rankings.
- The shared footer `/demo` remains available, but its current source form has an unresolved submission-handler gap. **No successful lead conversions are claimed.**
- Scientific/editorial owner confirmation of the new Zone 2 caveat and marketing-owner approval of the athlete route remain required.

## Linked evidence

- [Scientific copy PR #8](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/pull/8)
- [Athlete CTA PR #10](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/pull/10)
- [Original scientific audit](../audits/2026-11-21-zones-and-sensors-claim-review.md)
- [2017 study and CTA architecture audit](../audits/2026-11-21-2017-study-and-cta-audit.md)
- [PR #10 independent browser QA](2026-11-21-zones-cta-pr10-ci.md)
- [GitHub combined workflow and QA script](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/tree/seo/combined-zones-editorial-qa-2026-11-21)

**Release status:** Both PRs remain open as Draft at the time of this evidence record. No website code was merged or deployed by this combined QA.
