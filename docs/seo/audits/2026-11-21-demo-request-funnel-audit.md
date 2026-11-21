# BeatFit Demo Request Lead Funnel — Source Implementation Audit

**Audit ID:** BF-SEO-DEMO-FUNNEL-001
**Date:** 2026-11-21
**Site:** BeatFit marketing website, Persian (fa-IR)
**Source revision:** `dee5c47bf33cd35569e88c59c3353e03fa075af6`
**Risk:** **P1 conversion and trust (source confirmed); live lead delivery NOT verified**
**Scope:** Read-only inspection of the marketing website. No form data, leads, CRM account or private endpoint was accessed.

## 1. Current visitor journey

Several marketing pages and article CTAs lead a potential buyer to `/demo`. The destination displays a six-field gym-oriented lead form and says that BeatFit will contact the visitor about arranging a demo.

| Field | HTML control | Original required? | Observed source validation |
|---|---|---|---|
| `fullName` | text | No | None |
| `gymName` | text | No | None |
| `phone` | tel | No | No phone-format or minimum-length check |
| `city` | select | No | Placeholder option disabled; selection not mandatory |
| `gymType` | select | No | Placeholder option disabled; selection not mandatory |
| `notes` | textarea | No | None |

**Source:** `src/components/DemoForm.tsx`, `src/content/demo.ts`.

### Confirmed implementation gap

The form's original submit handler is precisely `onSubmit={(event) => event.preventDefault()}`. No `fetch`, `XMLHttpRequest`, submission action, API client, email/CRM dispatch or returned server receipt exists in this form component. The website project tree and `package.json` identify a static React/TypeScript/Vite marketing app, not a production lead-ingestion service.

**Conclusion:** In this inspected frontend implementation, a valid-looking form submit is silently prevented without an acknowledged lead. This is a **source-level implementation defect**, not a proof that some separate unpublished service or an alternative direct sales channel does not exist. It also does not prove the production site currently serves this exact revision.

### Other independently observed gaps

1. `src/content/home.ts` declares the footer `حریم خصوصی` and `شرایط استفاده` links with `href: "#"`. An accessible, accurate privacy notice describing processing of contact details is not established in this source.
2. The source fallback origin is `http://beatfit.ir` with disabled HTTPS redirect pending configuration. CI probes previously failed to obtain a working public HTTPS response, although TCP port 443 connected. No valid deployed HTTPS certificate/route evidence was collected. **Do not transmit lead PII until secure transport is verified**.
3. No verified CRM lead receiver, data owner, retention period, contact permissions, failure/error codes, anti-spam controls, server-side validation, staging E2E or real confirmation state is documented.
4. The source-based Demo Form is a client-rendered component. The initial SEO shell does not prove functional client-side conversion; browser and real receiver tests are separate acceptance gates.

## 2. Impact interpretation

This is a qualified-lead delivery gap, not an observed loss of actual conversions or search rankings. We have no trusted production submissions, analytics sessions, Search Console clicks or customer funnel metrics. Do not invent lead counts, conversion rate, abandonment or revenue losses.

## 3. Narrow corrective Draft PR

[Draft PR #11](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/pull/11) proposes **three browser-required essential fields and a transparent not-sent message** on a valid submit attempt, with no invented receiver. It keeps city/gym type/notes optional and adds minimal accessible warning styling. This **does not fix real lead submission** and may be unsuitable as a permanent public acquisition experience.

The product owner must review whether to release the temporary honesty guard or keep it Draft until the real backend and privacy notice are ready. This audit does not authorize deployment.

**QA:** Exact build and browser verification is recorded in [the PR #11 QA file](../verification/2026-11-21-demo-form-pr11-qa.md); see actual status there, not this source-only audit.

## 4. Minimum actual lead-intake release contract

The proposed, **not yet implemented**, first-party receiver contract and operational gates are documented in [Demo lead submission contract](../strategy/2026-11-21-demo-lead-submission-contract.md). Product, hosting, legal/privacy and CRM ownership must be approved **before** enabling real transfers of phone/name/gym details.

Primary requirements include:
- Working HTTPS at the destination, server-side validation and abuse protection.
- Explicit purpose/privacy information and a verified retention/deletion/access policy.
- Acknowledgment only **after** durable acceptance by an authorized receiver, never on button click or a fake client timer.
- Safe failures and retry without losing typed input; no sensitive fields in telemetry/logs.
- Controlled test with synthetic records confirming that the lead is available to the authorized recipient and that failure/duplicate routes are handled.

## 5. Independent evidence boundaries

- **CONFIRMED SOURCE:** React form calls preventDefault and has no submit transport.
- **CONFIRMED SOURCE:** Footer privacy and legal links are placeholders.
- **CONFIRMED REPO SNAPSHOT:** Vite/React marketing app and only VITE_SITE_ORIGIN in published production environment file, not a linked lead API.
- **NOT ESTABLISHED:** Third-party off-repository or server-side deployment capabilities.
- **BLOCKED:** Real HTTPS/HTTP, GSC, server lead storage, recipient notification, data retention compliance and live conversion counts.

**Next owner decision:** Choose a legitimate recipient system, approve privacy/hosting/validation policy and implement staging end-to-end lead submission as a separate reviewed PR. Until then, no production conversion success claim is justified.
