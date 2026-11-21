# Homepage Keyword Metadata — Verified PR #20

**Date:** 2026-11-21  
**Source tested:** `725835ad4353298a6c5835fbeb1c9587a8751b3d`  
**PR #20:** https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/pull/20 — **MERGED** (2026-11-21 08:22:48 UTC; merge `6d9ca5d2ad6e0e278db40db36dd0de3bfec86b14`). The SEO audit did not initiate this merge.  
**QA-only PR #21:** https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/pull/21 — merged separately, without changing homepage marketing content.  
**Standard source CI:** https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/actions/runs/44884239038 — SUCCESS.  
**Pinned independent browser QA:** https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/actions/runs/44884358962 — SUCCESS, job `136786306104`.

## Exact source changes

1. Homepage `site.title` in `src/content/home.ts`: `بیت‌فیت | مانیتورینگ زنده ضربان قلب و مدیریت تمرین` → `بیت‌فیت | سیستم پایش زنده ضربان قلب و تمرین گروهی`.
2. Homepage `HOME_DESCRIPTION` in `src/seo/marketing.ts`: `بیت‌فیت سیستم پایش زنده ضربان قلب در تمرین‌های گروهی است؛ با حسگرهای پوشیدنی، نمایشگر کلاس، پنل مربی و تاریخچه جلسات، روند تمرین را بهتر دنبال کنید.`.

Original hero/H1 `با بیت فیت ضربان به ضربان، بدنت رو بساز.`, styles, route, URL, image, social image and other page titles were not changed by the source PR.

## Actual QA outcome

| Gate | Outcome |
|---|---|
| Exact source PR patch: two strings + English preflight | PASS |
| Standard SEO fixture tests | PASS |
| Actual Node 22 `npm ci` and TypeScript/Vite build | PASS |
| Post-build SEO integrity checker | **PASS — 254 checks** |
| Tracked robots/Sitemap/IIS asset drift | PASS / no drift |
| Chromium 390×844 homepage `<title>` | PASS / new exact title |
| Chromium homepage `meta name=description` | PASS / new exact description |
| Open Graph `og:title` and `og:description` | PASS |
| Visible homepage H1 and HTTPS canonical | PASS / unchanged |
| `/gym` title and canonical non-regression | PASS |
| Browser runtime errors on sampled routes | NONE |
| Live public HTTP/TLS deployment and GSC impressions/rank | **NOT VERIFIED** |

Exact job output: `SEO build verification PASSED: 254 checks`, `PASS HOMEPAGE: new unique title and description, og tags, original H1, https canonical`, and `PASS GYM NON-REGRESSION: original commercial SEO title and /gym canonical unchanged`.

**Interpretation:** The source changes are integrated in GitHub, and this exact source revision passed a real browser and generated SEO test. The new metadata is not a measured traffic/ranking improvement, nor proof that a public IIS site is serving this build. Google's title and snippets may differ from authored values.

**Research:** [13-page intent architecture](../research/2026-11-21-persian-keyword-architecture-v2.md) · [113 candidate terms by URL](../research/2026-11-21-page-keyword-map-v2.csv).
