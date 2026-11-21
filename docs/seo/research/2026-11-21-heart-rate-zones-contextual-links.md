# Heart-Rate Zones Article — Contextual Link Optimization

**Date:** 2026-11-21  
**Status:** Review-only branch. No production deployment claimed.  
**Canonical route:** `/blog/زون-های-ضربان-قلب`  
**Source:** `src/content/blog/heartRateZones.ts`  
**Languages:** English audit, Persian article.

## Search-intent decision

The current article already answers `زون ضربان قلب چیست`, introduces five ranges in one named HRmax-based convention, gives an estimated-HRmax worked example and zone table, discusses Zone 2 caveats, explains perceived intensity and talk-test context, and illustrates a 45-minute session. The existing title, H1, meta description, examples, and references are useful. Do **not** rewrite them for keyword-density targets or create a duplicate `zone2` page without separate evidence.

The article must remain distinct from:
- `/blog/تاریخچه-تمرین` (how to review sessions and progress);
- `/blog/مقایسه-سنسور-ضربان-قلب` (device measurement categories);
- `/athlete` (BeatFit's actual product view);
- `/blog/کنترل-شدت-تمرین-در-کلاس-گروهی` (coach methods).

## Controlled implementation

Two existing paragraphs become rich paragraphs with natural descriptive internal links:
1. Under the section about whether zones demonstrate progress, link the phrase `تاریخچه تمرین و بررسی روند پیشرفت` to `/blog/تاریخچه-تمرین`. Keep the existing warning that zones alone do not establish progress.
2. Under detecting zones while exercising, link `مقایسه حسگر بازویی، مچی و سینه‌ای` to `/blog/مقایسه-سنسور-ضربان-قلب`. Keep the general measurement explanation.

No slug, publication date, article title, metadata, formula, numerical boundaries, Zone 2 definitions, FAQ, CTA, bibliography, image, style or canonical changes.

## Evidence and caveats

- Existing reference: `docs/seo/audits/2026-11-21-zones-and-sensors-claim-review.md` (scientific claim and numerical review).
- Existing reference: `docs/seo/research/2026-11-21-page-keyword-map-v2.csv` (qualitative keyword intent ownership).
- The Zone 2 note already differentiates the percent-of-predicted-HRmax convention from ventilatory/lactate threshold definitions.
- No first-party GSC page-query or impression data available to show a performance improvement. These links are an editorial navigation hypothesis, not a ranking outcome or proof of crawl discovery.
- Do not treat heart-rate zones as individual safe exercise prescriptions; do not infer BeatFit sensor measurement accuracy from other brands.

## Verification and release gates

1. Confirm the exact source diff contains the two paragraph replacements only.
2. Run `npm ci && npm run build` and all configured SEO HTML integrity checks, checking unchanged H1/title/description/canonical and both actual article hrefs.
3. Test links and RTL display in the rendered article on mobile and desktop. Confirm they remain visible, accessible anchors in the body copy.
4. Obtain scientific/editorial review before merging; rebase against newer main if needed.
5. Verify live HTTPS rendering separately after deployment, then evaluate GSC page-query evidence when legitimately available.

**Verification completed here:** original-source inspection, exact targeted source replacements and GitHub source write. Build, browser checks, approval, merge, deployment and ranking change are **not** asserted.
