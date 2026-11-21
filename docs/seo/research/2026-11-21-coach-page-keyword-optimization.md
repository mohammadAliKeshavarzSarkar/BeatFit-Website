# Coach Landing Page — Search Intent and On-Page Optimization

**Date:** 2026-11-21  
**Status:** Draft PR / source edits proposed; no merge or deployment  
**Target route:** `/coach`  
**Source:** `src/content/coach.ts`, `src/seo/marketing.ts`  
**Language policy:** English documentation and Persian website/search phrasing.

## Current page understanding

The actual React source presents a live coach view, participant heart-rate and training-zone visibility, session history, and coach guidance. `CoachHero.tsx` renders `coachHero.title` and `coachHero.body`. `coachDocument` uses the same body as both description and SEO summary. The existing H1 is deliberately benefit-led and should remain unchanged.

## Search-intent ownership

- **`/coach`:** coach-specific live participant view and training-zone oversight, a commercial product-capability page.
- **`/gym`:** decision-maker evaluating a complete gym/group system, sensors, public display and installation.
- **`/blog/کنترل-شدت-تمرین-در-کلاس-گروهی`:** informational how-to about guiding intensity; should not become a commercial coach panel page.
- **`/athlete`:** athlete's own live view and past-session tracking.

## Keyword assignments (qualitative candidates)

| Role | Exact phrase | Placement |
|---|---|---|
| Primary | `پایش ضربان قلب ورزشکاران برای مربی` | SEO title |
| Semantic variation | `پایش زنده ضربان قلب ورزشکاران` | Title / natural body |
| Secondary | `پنل مربی ورزشی` | On-page context |
| Secondary | `مانیتورینگ کلاس گروهی` | Contextual language if editorially needed |
| Secondary | `زون ضربان قلب تمرین` | Existing coaching/zone sections |
| Long-tail | `مشاهده زنده ضربان قلب اعضای کلاس برای مربی` | Descriptive intro |
| Long-tail | `پنل مربی برای پایش شدت تمرین کلاس گروهی` | Existing tools section |
| Long-tail | `بررسی نتیجه هر جلسه تمرینی توسط مربی` | Session history |
| Branded | `پنل مربی بیت فیت`, `بیت‌فیت`, `BeatFit` | Natural brand references |

These are **not** verified search volumes, Google rankings or Search Console data.

## Controlled edits

1. Change the SEO title from `دید زنده از کلاس برای مربی | بیت‌فیت` to `پایش زنده ضربان قلب ورزشکاران برای مربی | بیت‌فیت`.
2. Replace the hero paragraph with: `با پنل مربی بیت‌فیت، ضربان قلب و زون تمرینی ورزشکاران متصل را در لحظه و در یک نمای مشترک ببینید؛ نتیجه هر جلسه را هم برای مرور و هدایت بهتر تمرین‌های بعدی دنبال کنید.`
3. Two coach page CTA labels previously stated `درخواست دمو`. Replace their text with `آشنایی با فرایند راه‌اندازی` while retaining `/demo` destination, since the source form is disabled and no working lead receiver is confirmed.
4. Keep the H1, route, canonical, image/layout, other component content, and robots configuration unchanged.

## Evidence and safeguards

Reviewed current source and project keyword map `docs/seo/research/2026-11-21-page-keyword-map-v2.csv`, on-page review and demo release decision. Public search examples:
- https://pulsemonitor.net/ (coach group overview, real-time HR and intensity)
- https://www.fitcollab.net/en/ (group heart-rate class monitoring)
- https://www.pulsemonitor.net/en/training (participant reports and coaching workflow)

These examples qualify vocabulary and page intent, **not** relative rankings in Iran, traffic expectations, direct competitor equivalence, or BeatFit feature validation.

Avoid promises of medical diagnosis, automated safety alerts, guaranteed improvement, injury prevention or precise sensor validity. Product owner should independently verify the current coach panel, session data availability and real feature behavior.

## Verification gate

- Verify the source diff contains only the intended title, hero paragraph and two CTA label replacements.
- Execute `npm ci && npm run build` and generated route-shell SEO checks before merge.
- Check `/coach` HTML title/meta, H1, canonical, OG, schema and other pages for regression.
- Perform 320–390 px mobile visual/overflow QA for revised Persian hero text.
- Confirm the `/demo` page visibly explains request unavailability and CTA does not claim a working receiver.
- Obtain editorial/product owner review before merge; verify live behavior only after deployment.
- Review GSC page/query pairs before further keyword shifts.

**Verification in this document:** source-read and write only. Build, browser QA, PR merge, deployment and search performance are not claimed.
