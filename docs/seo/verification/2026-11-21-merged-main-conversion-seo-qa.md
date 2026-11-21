# Actual Merged Main — Article + Demo Funnel Integrated Browser QA

**Record:** BF-SEO-MAIN-INTEGRATION-001
**Date:** 2026-11-21
**Exact application main revision tested:** `0fa3d308ce600fe5bbe478a82d7ded577d8c90b6`
**Source revision message:** `Merge pull request #8 — clarify five-zone HRmax Zone 2 versus physiological thresholds`
**Isolated QA branch:** `seo/merged-main-integrated-qa-2026-11-21`
**Independent QA code:** `00f9112b9769273ebc989cd15d9055a8fc749679`
**GitHub Actions:** [44881644598](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/actions/runs/44881644598), job `136778022221` — **COMPLETED SUCCESS**.
**Environment:** Ubuntu 24.04, Node.js 22, real TypeScript/Vite build, Playwright Chromium 390×844 mobile, Persian locale and local Vite Preview.

## Why merged-main testing matters

PRs #8, #10 and #11 were separately tested before merge and then **merged into main by other repository activity** on 2026-11-21. Earlier combined QA of PRs #8+#10 used a temporary overlay rather than a real main revision. This run now validates **one pinned actual merged main snapshot** containing:
- The zone-2 physiology-convention disclaimer and corresponding FAQ/source citation from PR #8.
- The article-specific athlete CTA `/athlete` from PR #10.
- The pre-entry inactive form and disabled controls from PR #11.

## Actual build and SEO output results

| Gate | Result |
|---|---|
| Checkout exact merged main revision | PASS |
| Install package-lock dependencies with `npm ci` | PASS |
| Actual TypeScript/Vite `npm run build` | PASS |
| Generated SEO artifact verifier | **PASS — 254 checks** |
| No tracked robots/sitemap/IIS config drift | PASS |
| Combined Chromium user-journey test | PASS |
| JavaScript runtime page errors | NONE in the tested path |

## Chromium journey 1: Article → athlete

- Opened `/blog/زون-های-ضربان-قلب` with a successful Vite Preview HTTP 200.
- Verified full article text contains the specific `60–70% HRmax` Zone 2 note and the physiological ventilatory/lactate distinction.
- Verified exactly six visible FAQ questions and the updated Zone 2 FAQ response.
- Verified PubMed PMID `40225831` reference link renders.
- Verified the article's rendered canonical pathname.
- Verified its contextual CTA points to `/athlete`; clicked it in Chromium.
- Verified the destination athlete H1 and canonical; the **separate** shared article footer retains the `/demo` option.

**Job log:** `PASS MERGED MAIN ZONES: Zone 2 note, six FAQs, new source, athlete CTA click and common demo footer`.

## Chromium journey 2: Demo page (intentionally inactive)

- Opened `/demo` successfully in local Vite Preview.
- Verified the truthful Persian inactive-form notice appears before the first contact field.
- Verified the old callback-promise sentence is no longer rendered.
- Verified six form controls and the submit button are disabled by a native fieldset, with three `required` attributes retained as inactive future scaffolding.
- Verified the warning is associated with the form, input cannot be filled and **zero non-GET** network requests occur during the sample.
- Verified `/demo` canonical remains correct.

**Job log:** `PASS MERGED MAIN DEMO: warning before disabled six fields, no misleading promise, no data entry, zero non-GET requests, canonical, 390px Chromium`.

## What this does NOT establish

- No IIS public-host HTTP/HTTPS, valid production TLS/redirects or deployed-revision provenance were verified.
- The disabled form does not deliver a request to any API, CRM, mailbox or sales team.
- No Search Console indexing/queries, GA4 leads, customer acquisition or ranking impact was measured.
- A small mobile Chromium smoke is not a full cross-browser, accessibility, performance or responsive design certification.
- Owner approvals for temporary contact unavailability, copy, scientific wording and privacy have not been collected here.

The main source is **build-and-browser compatible**, but the actual conversion funnel remains **operationally incomplete**.

## Linked decisions

- [Demo lead receiver release decision](../strategy/2026-11-21-demo-funnel-release-decision.md)
- [Pre-entry form QA](2026-11-21-demo-form-pre-entry-disabled-qa.md)
- [Original combined PR #8+#10 temporary QA](2026-11-21-zone2-cta-combined-qa.md)

**Next verified milestone:** Product and infrastructure owners decide on a monitored contact alternative and real approved HTTPS receiver; after deployment, verify actual publicly served source and a synthetic end-to-end lead receipt in staging.
