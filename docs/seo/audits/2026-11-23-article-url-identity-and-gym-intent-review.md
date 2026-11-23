# Article URL Identity and Gym Keyword Ownership — Review 2026-11-23

**Record:** BF-SEO-URL-ID-001  
**Date:** 2026-11-23  
**Repository:** `mohammadAliKeshavarzSarkar/BeatFit-Website`, default `main` as inspected on this date  
**Scope:** Read-only source inspection of the 6 marketing / 7 published article route model. No production deploy, host change, GSC report, measured query overlap or live redirect test in this review.  
**Evidence anchors:** `src/content/blog/posts.ts`, `src/seo/articles.ts`, `src/seo/routing.ts`, `src/seo/marketing.ts`, `src/content/gym.ts`, `src/content/blog/gymHeartRateMonitoring.ts`, `src/content/blog/trainingLoad.ts`, `src/content/home.ts`, `src/content/resources.ts`, `public/sitemap.xml`, `public/web.config`, `scripts/verify-seo-build.mjs`.  
**Companion:** [Reviewed public URL crosswalk](../inventory/2026-11-23-article-public-url-crosswalk.csv).  
**Status:** Source observations confirmed; publication/indexing and proposed URL migration unapproved.

## Result 1 — /gym and the gym guide already own different intents

| Page | Current source SEO title | Searcher task |
|---|---|---|
| `/gym` | `پایش زنده ضربان قلب در باشگاه‌ها \| بیت‌فیت` | Commercial: decide whether BeatFit's wearable + class display + coach panel + history fit the gym |
| `/blog/connected-training-system` | `پایش ضربان قلب در باشگاه چیست؟ راهنمای تجهیزات و کاربردها` | Informational: learn what group monitoring means, required components, use cases and evaluation criteria |

The article's current title and metadata have already moved away from the prior duplicate-sounding `سیستم پایش ضربان قلب در باشگاه | کاربردها و تجهیزات`. The article H1 asks what the system is and who uses it; the /gym H1 is an editorial value proposition. The /gym hero description explicitly identifies sensors, real-time class screen, coach panel and session history. **Do not submit a duplicate title rewrite or a new keyword-variant URL.** Older 2026-11-21 work-queue items for the collision are historical, not an open source-copy defect.

**Residual gate:** Verify Google Search Console query-to-page impressions/clicks and actual deployed title/canonical before asserting cannibalization is solved or ongoing. Do not infer rankings from URL or source title differences.

## Result 2 — training-load article has a non-matching public URL

Current registered mapping:

- Internal content slug: `بار-تمرینی-چیست`
- Canonical public path in source: `/blog/live-tv-group-training`
- Actual H1: `بار تمرینی چیست و چطور به شناخت فشار تمرین کمک می‌کند؟`
- Actual SEO title: `بار تمرینی چیست؟ روش محاسبه و تفسیر فشار تمرین`
- Intended educational task: internal/external training load, session RPE, estimation and interpretation — **not** Live TV or group class-display setup.

This is an identifiable **semantic URL/topic mismatch**, not proof of a ranking penalty or a confirmed canonical indexing problem. `src/content/blog/posts.ts` maps that public slug to the training-load post; `src/seo/articles.ts` derives canonical, page URL and output filename from the map. `src/content/home.ts` and `src/content/resources.ts` link to the same URL; `public/sitemap.xml` lists it; `public/web.config` redirects the legacy Persian article path to it. Existing tests assert the old alias, so a naive one-line rename would break routing, links or CI. A 200 response, 301 behavior, Googlebot crawl and index state were not tested live here.

**Proposed solution, not yet approved:** Adopt `/blog/training-load` as the explanatory public URL, with one direct permanent **HTTPS** redirect from `/blog/live-tv-group-training` and one direct legacy-Persian redirect to the new target. Preserve query strings per reviewed host behavior, avoid loops and redirect chains, keep article content slug unchanged and make exactly one canonical/indexable sitemap URL. Retain legacy alias resolution in the client router; replace internal homepage/resources and article-body links with the new URL. Review existing backlinks, campaign URLs, deployed access and Search Console before changing canonical; if there is substantial live indexing, a separate migration decision is required. No immediate mass-renaming of the other six URLs is proposed.

### Exact implementation inventory for an eventual review-only PR

1. `src/content/blog/posts.ts`: change the one canonical English slug; preserve the old ASCII alias explicitly without accidentally listing it as a second published document.
2. `src/seo/routing.ts` and client slug resolver: redirect the old English path rather than serve a second indexable shell; maintain the Persian legacy route.
3. `public/web.config`: direct 301 to `https://beatfit.ir/blog/training-load` for both old ASCII and Persian legacy routes; leave existing HTTPS-offload protections intact. Confirm generated map and rules do not conflict.
4. `src/content/home.ts`, `src/content/resources.ts`, and any related article anchor paths: update source links to the intended canonical.
5. `public/sitemap.xml` and build-generated route HTML: regenerate with existing build scripts, not manual fabricated output.
6. `scripts/verify-seo-build.mjs`, associated fixtures, preview-browser assertions and `scripts/validate-fifth-blog.mjs`: align seven-route expectations and add positive old-to-new redirect/integrity checks. Preserve source-to-archive/doc counts.
7. Run `npm ci`, `npm run build`, existing SEO fixture/source/build gates and a narrow mobile-browser check. A green build is **source QA only**.
8. After explicit approval and deployment, test direct final HTTP 301 `Location`, final 200, correct rendered `<title>`, canonical and OG URL, single Sitemap `<loc>`, inbound links and 404; only then evaluate GSC URL Inspection and actual performance.

**Decision gate:** Product/SEO owner must approve the new public slug and migration timing. If approval is withheld, retain the currently working URL and log the wording as a known risk. Do not silently swap URL identities.

## Result 3 — keyword-work-queue reconciliation

Since the original 2026-11-21 queue, current `src/seo/marketing.ts` uses specific live-HR titles for `/coach` and `/athlete`, and `/resources` now names an educational hub. These are **source improvements already present**. The companion 2026-11-21 audit CSV and old URLs with Persian blog path segments are historical research identifiers, not authoritative current public canonical paths. Use the seven-row public URL crosswalk for new work.

**Next source-level content work after migration decision:** Audit `/coach` / `/athlete` rendered introductions and descriptive article bridges, not another blind title substitution; ensure `/demo` does not promise active submission before the backend/privacy approval gate. More new articles should wait for the Wave 2 editorial evidence/review gates.

## External discovery boundary

Sampled Persian public pages from FitMao (https://www.fitmao.com/web/heart-rate-training-system?lang=fa) and Chileaf (https://www.chileaf.com/fa/group-training-wireless-system-data-receiver-product/) describe commercial group-HR monitoring devices and displays. They provide **qualitative terminology and intent examples only**, not Google Iran SERP positions, BeatFit traffic, search volumes, validated competitive capabilities or evidence that a URL rename improves rankings. The two BeatFit page titles and the topic/slug mismatch are source observations independent of those external examples.

## Acceptance and hold register

| Check | Status as of this review | Required evidence |
|---|---|---|
| Current /gym and guide title/H1 intent separation | PASS (source only) | Current TypeScript files; not a deployed inspection |
| Seven public article crosswalk reconstructed | PASS (source only) | Explicit map and post metadata |
| Training-load public URL matches page topic | FAIL (semantic review) | `live-tv-group-training` points to load explainer |
| Canonical migration owner approval | BLOCKED | Reviewed decision and timing |
| Proposed redirect / sitemap / links implementation | NOT RUN | Targeted PR and CI |
| Actual live HTTP / Google canonical indexing | NOT RUN in this review | Deployment and GSC evidence |
| Search CTR/rank or conversion improvement | NOT RUN | First-party measured baseline and follow-up |

**No production SEO change or keyword-performance claim is authorized by this research record.**
