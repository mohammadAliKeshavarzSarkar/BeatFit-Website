# Workout Calorie Estimates — BeatFit Product-Evidence and Editorial Gate

**Date:** 2026-11-21
**Status:** Research and draft outline only; **no public article approved or published**
**Workstream:** W2-01 from the proposed Wave 2 content-gap plan (draft PR #36)
**Language convention:** English documentation; Persian audience copy and keywords.

## Verified BeatFit website claims

1. `src/content/athlete.ts` describes the athlete live overview as including calorie consumption alongside heart rate and exercise intensity.
2. In `athleteGlance.cards`, the calorie tile title is `کالری مصرف‌شده`, and its supporting text is precisely `نمایش میزان تخمینی کالری مصرفی در جلسه` (displaying **estimated**, not directly measured, workout calories).
3. `src/content/home.ts` includes a UI proof tile `کالری جلسه`, illustrative value `۳۲۰` and `kcal`. **This is homepage presentation copy, not measured evidence or a validated worked example.**
4. The website source inspected does **not** disclose the calorie algorithm or underlying input variables, accuracy/error bounds, sensor calibration or product validation for BeatFit. Do not infer these from third-party wearables.

**Product-owner questions before publishing any formula-specific statements:**

- Is the calorie value an estimate of active/exercise expenditure, total expenditure (including baseline/rest), or something else?
- Does the actual production product use heart rate alone, HR+duration, user demographic inputs, exercise type, movement sensors, or another model? Which are verified?
- Is the value live/provisional, finalized later, or retroactively recalculated?
- How are absent HR samples, irregular signal quality, missing demographic data and paused intervals handled?
- Are the displayed illustrative numbers synthetic and clearly marked as such?
- Is the publicly described algorithm and units approved by the product owner? Is any validation study for the specific product/device available?

Record actual answers or product documentation before moving a claim from UNKNOWN to VERIFIED.

## External scientific evidence and scope

These sources document **general** validity and methodological issues, not BeatFit-specific performance:

- 2024 systematic-review umbrella review: `https://pubmed.ncbi.nlm.nih.gov/39080098/`. Consumer-wearable energy-expenditure agreement varies by measurement, study and device; apparent group-average bias cannot guarantee accuracy for an individual.
- Systematic review/meta-analysis of activity monitor energy expenditure: `https://pubmed.ncbi.nlm.nih.gov/30194221/`. HR sensing combined with motion can improve estimates for some activities, not a universal accuracy guarantee.
- INTERLIVE expert recommendation/checklist for consumer-wearable energy-expenditure validation: `https://pmc.ncbi.nlm.nih.gov/articles/PMC9325806/`. Use device- and use-case-appropriate reference validation and reporting.
- 2026 peer-reviewed comparative exercise-mode study: `https://www.mdpi.com/1424-8220/26/8/2526`. Wearable HR and energy-expenditure agreement depends on the exercise modality and particular model; do not project results onto BeatFit.
- General wearable-method explanation: `https://www.nature.com/articles/s44325-025-00082-6`. Some commercial devices may incorporate personal attributes and multiple signals, but this is **not** evidence that BeatFit does.

Avoid unsupported numeric accuracy percentages, device comparisons, clinical outcomes or automatic weight-loss claims.

## One-page intent decision

**Candidate standalone educational article:** `کالری مصرفی هنگام ورزش چطور تخمین زده می‌شود؟`

**Primary working phrase:** `محاسبه کالری مصرفی هنگام ورزش`

**Supporting reader questions:**
- `کالری ورزش با ضربان قلب چگونه محاسبه می‌شود؟`
- `چرا کالری ساعت هوشمند با دستگاه دیگر فرق دارد؟`
- `آیا ضربان قلب بالاتر همیشه کالری بیشتری می‌سوزاند؟`
- `تفاوت کالری مصرفی و شدت تمرین چیست؟`
- `چرا کالری دو جلسه مشابه ممکن است متفاوت باشد؟`

These are qualitative candidate queries. No first-party GSC impressions, click volume, Iran-specific SERP rank, or demand estimates have been obtained.

### Cannibalization boundaries

- `/blog/زون-های-ضربان-قلب` continues to own HR zones and HRmax-based illustrations.
- `/blog/بار-تمرینی-چیست` continues to own load, internal/external stress and the sRPE example; calorie estimation is **not** training load.
- `/blog/مقایسه-سنسور-ضربان-قلب` continues to own arm/wrist/chest sensor tradeoffs; do not turn calorie interpretation into an unsupported sensor quality ranking.
- `/blog/تاریخچه-تمرین` owns session-to-session comparison methodology; this proposal may link there but should not duplicate its full example.
- `/athlete` owns the BeatFit product UI and actual displayed session metrics, while this proposed article owns educational interpretation.

## Editorial outline (not ready to publish)

1. **Answer first:** a workout calorie number is generally an estimate of energy expenditure; distinguish it from a directly measured laboratory value.
2. **What determines an estimate?** duration and activity context, individual factors, and signals some wearable systems may use; never attribute a specific signal to BeatFit without confirmation.
3. **Why can devices disagree?** algorithms, sensor signals, placement, exercise modality, and definitions of active vs total calories.
4. **Does a higher heart rate mean more calories?** HR can relate to exercise demand but the relationship is not a universal one-to-one conversion; muscle work/exercise modality and individual context matter.
5. **Practical interpretation:** treat workout calories as one contextual feedback metric; avoid turning an unvalidated number into an exact personal dietary prescription.
6. **BeatFit context:** accurately state that the athlete interface labels the value as an estimate, show only real approved screen assets, and link to `/athlete`.
7. **Cautions/FAQ:** calories versus training load; different devices; similar workouts; uncertainty; why the metric should not replace a coach/qualified expert.
8. **References:** scientific sources matched to each claim, with uncertainties visible.

## Approval checklist

- [ ] BeatFit product owner confirms exact displayed metric meaning and calculation/model inputs.
- [ ] Exercise-science reviewer approves general physiological statements and scope of examples.
- [ ] Editorial owner confirms a unique user task against existing seven articles.
- [ ] Search-intent verification through reproducible Persian SERP observations or first-party query/page data.
- [ ] Article QA uses only actual product imagery and no fabricated device-specific performance statistics.
- [ ] Only after approval: assign canonical Persian slug, register it as a published article, link from resources/home, validate source links, run build and browser QA, then independently verify production deployment.

**Conclusion:** The website substantiates that estimated calorie expenditure is displayed; it does **not** substantiate the formula, numerical accuracy or validation of the calorie estimate. This document explicitly blocks publishing unsupported BeatFit-specific details.
