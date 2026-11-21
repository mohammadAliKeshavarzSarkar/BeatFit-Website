# Render Shell Parity — Preview vs Live (No Content Changes)

**Record:** BF-SEO-VERIFY-T5-001  
**Date:** 2026-11-21  
**Scope:** Technical indexing shells only. Content PRs not exercised.  
**Method:** Initial HTML fetch (JS-off equivalent) for preview `localhost:4173` and live `https://beatfit.ir`; Chromium JS-on smoke for `/gym` and one article on preview.

## Results — initial HTML (JS not required)

| Route | Preview | Live | Title / canonical / H1 shell | Notes |
|---|---|---|---|---|
| `/` | 200 | 200 | Match; `https://beatfit.ir/` | `bf-static-seo` + JSON-LD present |
| `/gym` | 200 | 200 | Match; gym-specific title + canonical | Route shell distinct from home |
| `/blog/زون-های-ضربان-قلب` | 200 | 200 | Match; article title + canonical | Shell H1/summary only (expected) |
| unknown path | 404 + noindex | 404 + noindex | Match; no canonical | Real 404 shell |

Checker script: `node scripts/check-seo-render-shells.mjs` (requires `npm run preview` and network to live).

## Results — JS-enabled browser (preview)

- `/gym`: full page sections visible; title `پایش زنده تمرین برای باشگاه‌ها | بیت‌فیت`; nav includes `درخواست مشاوره` and `ورود به بیت‌فیت`.
- Article `زون-های-ضربان-قلب`: full article body, sources, and related UI visible after React render.

## Interpretation

- Deployed production now serves the same route-specific SEO shells as the trusted local build.
- Article **body** still depends on JavaScript (BF-SEO-F02). Google can render JS; first-party GSC URL Inspection remains deferred by owner.
- External crawler reachability from outside Iran remains a separate hosting concern (HTML file GSC verify failed for that reason).

## Status

**T5 local/live shell parity: PASS** for sampled templates.  
**GSC render confirmation: NOT RUN** (owner deferred).  
**SSR/SSG: not justified by this run alone.**
