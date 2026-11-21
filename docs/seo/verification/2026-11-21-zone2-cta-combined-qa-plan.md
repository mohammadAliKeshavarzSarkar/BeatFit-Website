# Combined PR #8 + PR #10 — Isolated Integration QA Plan

**Date:** 2026-11-21  
**Mode:** Read-only CI review, no merge or deployment.  
**Branch:** `seo/combined-zones-editorial-qa-2026-11-21`  
**Base checker/runner revision:** `0f6174d84fd9c355c9e54b46be110a4047ae20f6`  
**Exact reviewed application PR #8 commit:** `1f486da6bc1f17e73452fefcd77c7189991e96c6`  
**Exact PR #10 source diff:** change zones article CTA `href` from `/demo` to `/athlete`.

The workflow checks out PR #8's exact source revision, applies PR #10's previously inspected **one-line** CTA diff in a temporary GitHub runner checkout, builds, checks generated SEO artifacts and validates both edit sets together in Chromium on a mobile viewport. The overlay is **not committed to the application repository or main** and does not simulate an authorized merge/deployment.

Verify Zone 2 explanatory note, physiological-threshold caveat, six FAQs, PMID 40225831 source reference, article-specific CTA /athlete, common footer CTA /demo, actual click/navigation to the athlete page, correct canonicals and no JS runtime errors. A passing build does not establish production IIS/GSC correctness or qualified editorial acceptance.

**Workflow status:** Await independent completed CI run and logs. Record results on main in a dated verification document; maintain both PRs as Draft unless separately approved.