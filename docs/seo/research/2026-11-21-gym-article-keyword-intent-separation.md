# Gym Solution and Educational Article — Keyword Intent Separation

**Date:** 2026-11-21
**Status:** Proposed source change on review branch; not deployed
**Routes:** `/gym` and `/blog/پایش-ضربان-قلب-در-باشگاه`
**Scope:** English documentation; Persian public-facing metadata.

## Intent ownership

| Route | Search task | Primary phrase | Treatment |
|---|---|---|---|
| `/gym` | Evaluate BeatFit's live, group heart-rate monitoring solution for a gym | `سیستم پایش ضربان قلب باشگاه` | Keep existing commercial title and current factual hero |
| `/blog/پایش-ضربان-قلب-در-باشگاه` | Learn what a gym monitoring system is, how it works, which equipment is involved, and how to assess it | `پایش ضربان قلب در باشگاه چیست` | Give article SEO title explicit explanatory intent |

## Source changes proposed

- Existing `/gym` SEO title remains `پایش زنده ضربان قلب در باشگاه‌ها | بیت‌فیت`. Its H1 and hero remain unchanged.
- Article SEO title: from `سیستم پایش ضربان قلب در باشگاه | کاربردها و تجهیزات` to `پایش ضربان قلب در باشگاه چیست؟ راهنمای تجهیزات و کاربردها`.
- Article H1, URL, canonical, body explanations, internal links, scientific caveats and metadata description remain unchanged.
- Final article CTA label: from `درخواست دمو بیت‌فیت` to `آشنایی با فرایند راه‌اندازی بیت‌فیت`. It still routes to `/demo`; **the demo form is currently disabled**, and this wording does not imply a lead request is accepted.

## Keyword assignment and supporting terms

**Commercial /gym:**
- Primary: `سیستم پایش ضربان قلب باشگاه`
- Secondary: `پایش ضربان قلب گروهی`, `مانیتورینگ ضربان قلب در باشگاه`, `نمایش زنده ضربان قلب`
- Feature-specific long tail: `نمایش ضربان قلب اعضای باشگاه روی تلویزیون`, `پنل مربی و نمایشگر ضربان قلب باشگاه`, `حسگر ضربان قلب برای کلاس گروهی`
- Brand: `بیت‌فیت`, `بیت فیت`, `BeatFit`
- Avoid generic member billing/attendance-management keyword ownership.

**Informational article:**
- Primary: `پایش ضربان قلب در باشگاه چیست`
- Secondary: `نحوه کار سیستم پایش ضربان قلب گروهی`, `تجهیزات پایش ضربان قلب باشگاه`
- Long tail: `برای راه‌اندازی پایش ضربان قلب گروهی چه تجهیزاتی لازم است`, `تفاوت پایش فردی و گروهی ضربان قلب`, `نمایش ضربان قلب کلاس گروهی چگونه کار می‌کند`
- Avoid commercial title duplication with `/gym` or purchasing claims.

These are qualitative, source- and public-example-derived candidates, **not** established search-volume, ranking, or conversion findings.

## Existing evidence and boundaries

See `docs/seo/research/2026-11-21-gym-focused-intent-check.md`, `docs/seo/research/2026-11-21-page-keyword-map-v2.csv`, and `docs/seo/research/2026-11-21-current-page-onpage-optimization-review.md`. Previously sampled specialist products distinguish group live HR monitoring from generic gym administrative software. No first-party GSC page/query evidence or Iran-localized ranking capture is available.

## Acceptance and next checks

1. Review whether new explanatory title accurately matches the article's existing H1 and content; keep canonical and slug unchanged.
2. Verify article title/meta, OG and canonical in generated article shell; verify `/gym` metadata is unchanged.
3. Run `npm ci && npm run build`, repository SEO validation scripts, and responsive browser inspection before merging.
4. Confirm `/demo` does not claim a functioning submission flow.
5. After authorized deployment and reliable GSC access, inspect query-to-page overlap for `/gym` and the article before further changes.

**Not asserted:** successful build, browser QA, production deployment, measured SEO lift, or Google ranking changes.
