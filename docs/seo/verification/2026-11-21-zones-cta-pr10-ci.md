# Draft PR #10 — Exact Build, SEO and Mobile CTA Navigation Verification

**Record ID:** BF-SEO-CTA-PR10-001  
**Date:** 2026-11-21  
**Draft PR:** https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/pull/10  
**Application revision tested:** `a1d7cecea2547b68ff8c293a197856cb1d5968f5`  
**QA branch:** `seo/zones-cta-pr10-qa-2026-11-21`  
**Standard PR CI:** https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/actions/runs/44878957309 — SUCCESS  
**Pinned Chromium CI:** https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/actions/runs/44879013001 — **SUCCESS**, job `136769968104`  
**Environment:** Ubuntu 24.04 / Node 22 / Vite Preview / Chromium (Playwright 1.55.0), 390×844, fa-IR.

## Verified results

| Gate | Evidence | Outcome |
|---|---|---|
| Review diff | Exactly one CTA destination changed on one Persian article | **PASS** |
| GitHub Actions pinned checkout | `a1d7cecea2547b68ff8c293a197856cb1d5968f5` | **PASS** |
| Locked package install | `npm ci` | **PASS** |
| Real TypeScript/Vite website build | `npm run build` | **PASS** |
| Corrected post-build SEO checker | Real `dist/`, log says `SEO build verification PASSED: 254 checks` | **PASS — 254** |
| Exact source CTA mapping | In-article `href: "/athlete"`, common footer `to="/demo"` | **PASS** |
| Tracked generator output drift | `git diff --exit-code -- public/robots.txt public/sitemap.xml public/web.config` | **PASS** |
| Chromium mobile DOM | One article CTA, target `/athlete` | **PASS** |
| Chromium actual click | Click sends client to `/athlete`; heading and canonical correct | **PASS** |
| Common footer preserved | Independent `درخواست دمو` remains `/demo` | **PASS** |
| JavaScript runtime exceptions | No pageerror during tested journey | **PASS** |
| Product/marketing owner review | No approval collected | **PENDING** |
| Google Search Console / production IIS / conversions | Not accessed or verified | **NOT RUN / BLOCKED** |

**Actual console evidence:** `PASS source article CTA target and common footer` and `PASS CTA review: /blog/زون-های-ضربان-قلب CTA → /athlete clicked, H1/canonical correct, separate /demo footer preserved`.

## Interpretation and release gate

These tests establish a functional **review-branch link and rendered navigation**. They do not establish landing-page engagement, demo lead capture, buyer conversion, SEO indexing or better rankings. The current demo form still has a source-level `preventDefault()` submission gap; that is **out of PR #10 scope**.

PR #8 modifies other content of the same zones article. Both together require integrated revision QA after editorial approval, even though their changed source lines do not overlap. **Do not merge or deploy automatically.**

**Rollback:** Restore the single `href: "/demo"` line in article CTA data.
