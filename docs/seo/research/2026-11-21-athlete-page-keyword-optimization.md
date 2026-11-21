# Athlete Landing Page — Search Intent and On-Page Optimization

**Date:** 2026-11-21  
**Status:** Proposed on review branch, not merged or deployed  
**Route:** `/athlete`  
**Language:** English documentation; Persian keywords and public-facing copy

## Purpose and source assessment

The current `src/content/athlete.ts` describes live training feedback, heart rate, personal zones, a class display and athlete app, results from completed sessions, and progression through recorded session history. `src/components/AthleteHero.tsx` renders the original benefit-driven H1 and a `coach-hero` layout. `src/seo/marketing.ts` derives the athlete meta description and summary directly from `athleteHero.body`.

SEO improvement should communicate the real product workflow, not a generic medical heart-rate app, exercise programming service, step counter, GPS tracker or gym strength-set logging system.

## Search-intent partition

| Route | Primary user task |
|---|---|
| `/athlete` | View own live HR/zone during a session and review prior recorded sessions in the BeatFit experience |
| `/coach` | Observe multiple participants live and guide the group class |
| `/gym` | Evaluate the complete club-side monitoring system |
| `/blog/تاریخچه-تمرین` | Learn how to interpret past session records |
| `/blog/زون-های-ضربان-قلب` | Learn what HR zones are and how they are estimated |
| `/resources` | Discover topical fitness and monitoring guides |

## Candidate Persian keyword map — qualitative, not measured

| Role | Query candidate | Page placement |
|---|---|---|
| Primary | `پایش ضربان قلب و پیشرفت تمرین ورزشکار` | SEO title |
| Secondary | `پایش ضربان قلب هنگام تمرین` | Hero context |
| Secondary | `تاریخچه تمرین ورزشکار` | Session/history section |
| Secondary | `زون ضربان قلب تمرین` | Live training section |
| Long tail | `مشاهده ضربان قلب و زون تمرینی در لحظه` | Hero and live section |
| Long tail | `دیدن نتیجه هر جلسه تمرین در اپلیکیشن` | Hero and history section |
| Long tail | `پیگیری تغییرات شدت تمرین در جلسات مختلف` | Existing progress section |
| Brand | `اپ ورزشکار بیت فیت`, `بیت‌فیت`, `BeatFit` | Contextual product references |

No volume, CTR, rank, traffic lift or Google Search Console evidence is asserted.

## Proposed exact changes

1. SEO title: from `شدت تمرین، تاریخچه و پیشرفت ورزشکار | بیت‌فیت` to `پایش ضربان قلب و پیشرفت تمرین ورزشکار | بیت‌فیت`.
2. Hero paragraph and inherited meta description: from `با بیت‌فیت، شدت تمرینت را در لحظه دنبال کن، نتیجه هر جلسه را ببین و روند پیشرفتت را بهتر بشناس.` to `با بیت‌فیت، ضربان قلب و زون تمرینی‌ات را هنگام تمرین به‌صورت زنده ببین؛ بعد از هر جلسه هم نتیجه و تاریخچه تمرین‌هایت را در اپلیکیشن مرور کن تا روند فعالیتت را بهتر بشناسی.`
3. Existing athlete CTA `درخواست دمو` links to `/demo`, whose submission form is disabled. Change it to `راهنماهای تمرین را بخوان` linking to the existing `/resources` educational hub. This is a UX/conversion-truthfulness adjustment rather than a ranking claim.
4. Retain original athlete H1 `از لحظه تمرین تا مسیر پیشرفت، همراهت هستیم.`, page visuals, other cards, route, robots and canonical.

## Evidence

- Existing source: `src/content/athlete.ts`, `src/components/AthleteHero.tsx`, `src/seo/marketing.ts`.
- Existing documents: `docs/seo/research/2026-11-21-persian-keyword-architecture-v2.md` and `docs/seo/research/2026-11-21-current-page-onpage-optimization-review.md`.
- Public exploratory comparison: https://play.google.com/store/apps/details?hl=fa&id=com.caynax.sportstracker and https://play.google.com/store/apps/details?hl=fa&id=je.fit illustrate distinct GPS/tracker and strength-workout-log product intents. This is **not** Iran-localized rank tracking, BeatFit competition ranking, or independent verification of app functionality.

## Release requirements

- Source/editorial review: verify these capabilities against actual app/sensor use; do not imply standalone camera-based HR measurement, precise medical accuracy, automated exercise plans or guaranteed physiological progress.
- Run `npm ci && npm run build`; validate generated athlete route shell title, meta description, H1, OG tags, canonical, schema and unchanged siblings.
- Run mobile Persian typography/overflow QA at 320–390 px.
- Verify `/resources` exists and athlete CTA navigation resolves correctly.
- Keep coach and athlete SEO changes independent: both modify `src/seo/marketing.ts`; rebase any parallel draft PR before merging to prevent overwriting the other's title.
- Validate live deployed HTML and Google Search Console page/query performance separately after authorized release.

**Verification so far:** source inspection and write/read checks only. No successful build, browser QA, merge, production deployment or search performance is claimed.
