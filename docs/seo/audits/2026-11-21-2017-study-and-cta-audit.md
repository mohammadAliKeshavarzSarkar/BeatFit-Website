# Wearable Heart Rate Evidence (2017) and BeatFit Article CTA Audit

**Record:** BF-SEO-AUDIT-2017-CTA-001
**Date:** 2026-11-21
**Source revision:** `7d5dddbb5636647fe66b7294a8ec890bbb9c508e`
**Target audience:** Persian-speaking athletes, coaches and gym decision-makers
**Scope:** One previously unresolved research-to-claim mapping and seven article-specific conversion paths.
**Evidence types:** GitHub source, PubMed article record, a peer-reviewed wearable technology review, American College of Cardiology research summary, and pinned GitHub CI.
**Not included:** Search Console click data, production user journeys, medical-device testing or measured conversion uplift.

## A. 2017 wearable study — targeted claim verified

### Source statement in `src/content/blog/heartRateSensorComparison.ts`

> در یک مطالعه قدیمی‌تر در سال ۲۰۱۷، عملکرد بعضی ساعت‌های مچی از یک حسگر نوری ساعدی بهتر بود.

**Finding:** **SUPPORTED, DEVICE-SPECIFIC.** The source cites Gillinov et al., *Variable Accuracy of Wearable Heart Rate Monitors during Aerobic Exercise* (2017), PMID **28709155**.

- Study included **50 adults** and compared wearable devices with ECG during treadmill, cycling and elliptical activity. Polar H7 chest strap and Scosche Rhythm+ optical forearm monitor were included alongside selected wrist-worn watches.
- The published review's summary of that primary study reports concordance with ECG approximately **0.99** for Polar H7, **0.92** for Apple Watch and **0.75** for Scosche Rhythm+. These are **device-specific agreement statistics**, not accuracy percentages or general forecasts.
- The authorial statement **“some wrist models outperformed one forearm optical model in this 2017 study” is supported**. It does not say all wrist sensors outperform all arm sensors, and the article already warns against generalizing based solely on placement.
- This resolves historical audit item `S08` / `BF-CLAIM-02` at the **narrow cited-claim level**. The full copyrighted primary journal article was not independently reproduced or exhaustively reviewed; published PubMed record, professional-society summary and review data were sufficient for this limited comparison.

**Original/source evidence:**
- PubMed primary article: https://pubmed.ncbi.nlm.nih.gov/28709155/
- Published 2018 review Table 3 summarizing Gillinov et al. device comparisons: https://pmc.ncbi.nlm.nih.gov/articles/PMC5841672/
- American College of Cardiology summary of the study design and limitations: https://www.acc.org/about-acc/press-releases/2017/03/08/14/02/wrist-worn-heart-rate-monitors-less-accurate-than-standard-chest-strap

**Decision:** No edit needed to the existing Persian sentence. Do not inject unsupported BeatFit-specific accuracy rankings, universal claims or marketing numbers. Preserve the study/source relationship.

## B. Article CTA architecture — source-declared paths

Read all seven `src/content/blog/*.ts` modules and the common `BlogArticle.tsx` component at the revision above.

| Article / audience | Current article CTA destination | Proposed action |
|---|---|---|
| Heart-rate zones / athlete | `/demo` | **Draft PR #10:** use `/athlete` |
| Group class intensity / coach | `/coach` | Keep |
| Gym HR monitoring / gym buyer | `/demo` | Keep |
| Training history / athlete | `/athlete` | Keep |
| Training load / athlete | `/athlete` | Keep |
| Sensor comparison / athlete | `/athlete` | Keep |
| Group-class design / coach | `/coach` | Keep |

[Source-declared CTA register](../inventory/2026-11-21-article-cta-route-map.csv) includes exact article slugs, source module and destination.

The zones guide is introduced with an athlete eyebrow `برای ورزشکار`, and its in-article CTA says `تمرینت را دقیق‌تر ببین` / `آشنایی با بیت‌فیت`. In the **main source snapshot**, its in-article link goes to `/demo`; the demo page's purpose and input fields are for **club information and arranging a gym demonstration**. The existing `/athlete` landing page describes live workout intensity and session-history features consistent with the educational article.

### Recommended one-line change

[Draft PR #10](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/pull/10) changes only the zones article-level `cta.href` from `/demo` to `/athlete`, preserving the visible text, styling, metadata and publication date.

This is a **qualitative information architecture hypothesis**. The research did not establish an SEO ranking effect, clickthrough rate, lower bounce rate, qualified lead impact, or athlete app signup rate.

### Separate common footer

The shared `BlogArticle.tsx` template independently renders `درخواست دمو` linking to `/demo` **for all seven articles**. PR #10 intentionally leaves this distinct CTA unchanged. Product/marketing owners should eventually decide whether to personalize the shared footer by reader audience. A global template edit is larger in scope than the single article correction.

### Independent conversion-flow concern

In the current `src/components/DemoForm.tsx`, `onSubmit={(event) => event.preventDefault()}` prevents default submission, with no observed submission request handler in this component. Thus **routing the article to the demo page does not by itself establish an operating lead submission path**. Do not invent successful lead counts. This concern predates PR #10 and remains a separate product implementation and end-to-end test gate.

## C. Actual exact-commit PR #10 verification

**Application code revision tested:** `a1d7cecea2547b68ff8c293a197856cb1d5968f5`

- [Standard pull-request SEO CI 44878957309](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/actions/runs/44878957309): PASS.
- [Independent pinned Chromium CI 44879013001](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/actions/runs/44879013001): PASS.
- Exact source diff: **one `href` string**. The PR contains only one source file and its English preflight record under `docs/seo/`.
- GitHub Actions Node 22 / Ubuntu 24.04: `npm ci`, TypeScript/Vite production build, **254 generated SEO checks**, source assertion and tracked-public drift all PASS.
- Chromium at **390 × 844** clicked the article CTA and reached `/athlete`. The athlete page H1 and canonical were verified; the independent template `/demo` footer link remained intact. No JavaScript runtime pageerror was reported in sampled navigation.

**Limitations:** Vite Preview is not production IIS; this is not a field/conversion test. Google Search Console and site HTTP/SSL remain independent verifications.

## D. Interaction with scientific Zone 2 Draft PR #8

PR #8 modifies a Zone 2 explanatory note, FAQ answer and reference in the same article. PR #10 modifies only the article CTA farther down. There is no overlapping edited line in current source diffs, but **two independent green CI runs do not validate the combined post-merge revision**. If both changes are approved, run actual build, 254 SEO output assertions and a mobile browser test on the integrated revision. Preserve dates and publication claims.

## E. Decisions and next gates

- Close `BF-CLAIM-02` at this **specific study-comparison** level; the study is not a sensor-general validation.
- Review Draft PR #10 for athlete path fit; reject or revise it if a verified marketing funnel provides stronger evidence.
- Continue to treat `/demo` submission functionality as **a separate confirmed source implementation gap**, not a conversion outcome of the CTA PR.
- Decide separately whether the **shared article footer CTA** should become audience-aware.
- Require actual analytics attribution and GSC query data before claiming business or ranking impact.

**Status:** Claim verification completed within evidence limits; CTA proposal Build/Browser verified; owner approval and deployment outstanding.
