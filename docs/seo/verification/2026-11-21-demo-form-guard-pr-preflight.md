# Demo Form — Honest Submission State Guard (Review Only)

**ID:** BF-SEO-DEMO-FORM-PR-001
**Date:** 2026-11-21
**Source baseline:** 17fe7530cbcbb1ad5bb05051342e445647dd665f
**Branch:** seo/demo-form-honest-submit-guard-2026-11-21
**Status:** Draft PR proposed; not merged, deployed, or connected to a lead receiver.

## Source finding

src/components/DemoForm.tsx currently renders a six-field Persian club demo-request form. Its previous onSubmit handler only prevented the default submit and had no observable API, CRM, email or database operation. The three essential fields also lacked browser-native required validation. Meanwhile the demo page copy tells prospective gym operators to register their details to arrange a call.

This is an **observed source-code gap**, not proof about an external service or the operational status of the live domain.

## Bounded patch

- Require fullName, gymName and phone. Keep city, gymType and notes optional until product qualification rules are approved.
- Set conservative HTML maximum lengths: 100 characters for each name, 20 for phone, 1000 for optional notes, with a permissive 7-character phone minimum. No rigid country-only number regular expression.
- Preserve field ordering, labels and visual CTA.
- On a browser-valid submit, use a React state transition to show a visible accessible **role=alert** warning: "ثبت آنلاین درخواست دمو هنوز فعال نیست؛ اطلاعات فرم ارسال نشده‌اند."
- Add a small consistent warning text style.
- **No request is sent or logged; no PII is stored in localStorage, cookies or a new data service.**
- Do **not** claim a successful lead submission, introduce a fake endpoint, or enable an unapproved external destination.

## Release gate

This is a reversible **honesty guard**, not a working demo-request funnel. A warning can hurt acquisition; the product owner must decide whether a temporary guard should be shipped or whether this PR remains Draft until a real receiver and privacy notice are ready. No deployment is approved by this record.

Follow the accompanying [backend contract](../strategy/2026-11-21-demo-lead-submission-contract.md) for a first-party secure receiver, consent/privacy governance and a real staging server acknowledgment.

## Acceptance criteria

1. Missing essential fields must block submission via native validity, before the handler runs.
2. A valid-looking submission must show the truthful "not sent" alert, and no HTTP POST, beacon or network lead request.
3. The form remains usable on a 390px viewport and preserves all existing fields and CTA copy.
4. Actual TypeScript/Vite build, 254 SEO artifacts and tracked public drift checks pass.
5. Source changes are restricted to the form, its CSS and this English preflight record.
6. No production HTTP, GSC or CRM functionality is claimed.

**Rollback:** Restore the original form and CSS files, with no data migration or backend cleanup required.
