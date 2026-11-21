# Demo Lead Request Submission — Proposed First-Party API, Privacy and Analytics Contract

**Document ID:** BF-SEO-DEMO-CONTRACT-001
**Date:** 2026-11-21
**Status:** **PROPOSED, NOT IMPLEMENTED**. Requires product, backend, security/privacy and hosting owner approval.
**Site:** BeatFit marketing website, `/demo`.
**Why:** The website currently renders a form but has no observed functional lead receiver.

## 1. Ownership decision that must come first

The current repository contains a static React/Vite frontend and IIS rewrite configuration; it does **not** establish a backend deployment or CRM provider. The proposed shape `POST /api/demo-requests` below is an **illustrative first-party endpoint contract only**. Do **not** put it in frontend code, deploy it as a static asset, or assume IIS static rewrite will process POSTs. The authorized product owner must choose and own the actual endpoint, hosting route, data processor and recipient workflow.

A managed form/CRM integration is another valid choice, but it still requires explicit processor approval, security/privacy review and staging acceptance. Avoid inventing an email address, Slack channel, spreadsheet, CRM account or webhook.

## 2. Proposed minimal data schema

| Property | Purpose | Initial proposal | Server gate |
|---|---|---|---|
| `fullName` | Contact person | Required, trimmed, 1–100 characters | Reject blank, control characters and excessive size |
| `gymName` | Business identity | Required, trimmed, 1–100 characters | Reject blank/oversize |
| `phone` | Callback number | Required, 7–20 characters, normalize Iranian and international variants | Verify plausible format server-side; never rely solely on HTML |
| `city` | Gym location | Optional selectable value | Bound value to allowed vocabulary or accepted "other" |
| `gymType` | Product qualification | Optional selectable value | Approved vocabulary; not a prerequisite unless owner decides |
| `notes` | Free-form business requirements | Optional, up to 1000 characters | Treat as untrusted data, encode on output, strip or reject abuse |
| `sourcePage` | Attribution context | Optional path-only value such as `/demo` | Do not accept arbitrary absolute URLs or identifiers without policy |

Only send fields the owner explicitly authorizes. A sample payload with **fictional test-only data**:

```json
{
  "fullName": "QA Visitor",
  "gymName": "QA Test Gym",
  "phone": "0000000000",
  "city": "سایر",
  "gymType": "باشگاه چندمنظوره",
  "notes": "Synthetic staging request only"
}
```

This is a proposed wire schema, not actual payload captured from the product. Do not add athlete health or sensor metrics to a lead form.

## 3. Proposed API and truthful acknowledgment rules

**Candidate endpoint:** same-origin `POST /api/demo-requests`, `Content-Type: application/json` over working HTTPS.

- **201 Created** or **202 Accepted** only if the server has durably accepted the request into an authorized system/queue. A failed downstream delivery must be retried/observed by operations; do not discard leads silently.
- **400/422** malformed or unacceptable fields, with safe field-level validation feedback and no echo of private values.
- **409** duplicate/replayed request where appropriate (only if idempotency semantics are defined).
- **429** abuse/rate-limit response, with polite retry messaging.
- **500/502/503** server/recipient unavailable; visible form status should say **not confirmed**, retain fields, and permit later retry. Never assert success after a timeout.
- Request timeout/transport error: **unknown receipt**, not unequivocal failure. Coordinate idempotency before allowing repeated retries.
- A `requestId` may be returned for troubleshooting if it is non-identifying; do not put phone/name in URLs, errors, or telemetry.

**Minimum success response proposal (non-secret):**

```json
{
  "status": "accepted",
  "requestId": "synthetic-server-id"
}
```

A browser reaching a mocked test endpoint is not a real delivered lead. Staging verification must confirm persistence and authorized recipient accessibility/notification.

## 4. Security, privacy and deploy prerequisites

1. Verify a valid HTTPS listener, full certificate chain and intended origin/host policy. Previous GitHub probe was unable to complete HTTPS; sending real PII over the current unverified transport is **not approved**.
2. Owner approves an accurate accessible privacy notice explaining purpose, recipient/controller, lawful basis/permission model, retention/deletion, contact follow-up and rights or local obligations as applicable. The current `href="#"` privacy link is not acceptable as a real notice.
3. Use strict server-side validation, safe escaping and minimal retention. No full body or phone/name in CDN logs, request paths, client analytics, error trackers or debug consoles.
4. Use abuse protection (rate limit, optional honeypot/challenge), scoped CORS/CSRF defenses appropriate to the chosen authentication/cookie architecture, no wildcard cross-origin PII collection.
5. Store secrets, SMTP/CRM credentials and signing keys **server-side only**. Never use `VITE_` environment variables for secrets; Vite exposes prefixed values to the browser bundle.
6. Define data access controls, backup retention, deletion handling, incident response and a real operator who receives/acts on leads.
7. No simulated successful leads in production. No fake testimonials, metrics or unverified contact promises.

## 5. Frontend state machine required in a future integration PR

| UI state | Entry condition | User-visible behavior |
|---|---|---|
| `idle` | First visit | Empty labeled fields, no success/failure message |
| `invalid` | Missing required or invalid data | Native/browser field-level validation, focus actionable input |
| `submitting` | Approved secure request in progress | Disable duplicate submit, show progress, keep input values |
| `confirmed` | Authenticated/accepted server receipt | Show accurate Persian acknowledgment, optionally non-identifying tracking code |
| `unconfirmed` | Timeout/network/backend error | State that receipt is **not confirmed**; keep input values, safe retry guidance |
| `rate_limited` | 429 | Provide clear delay/retry guidance without revealing security internals |
| `unavailable` | Backend not configured | Explicit no-delivery message; never treat click as successful conversion |

The current Draft PR #11 deliberately implements only native required validation and an honest `unavailable` state. Do not mistake it for an API integration.

## 6. Responsible measurement contract

Define funnel events without embedding contact details. Candidate event names:
- `demo_form_viewed`: visible form opened; no PII or automatic conversion attribution claims.
- `demo_form_validation_blocked`: invalid attempt; aggregate only.
- `demo_request_confirmed`: **ONLY** after approved receiver acknowledgment; counted as a genuine lead request event, not a lead qualification or sale.
- `demo_request_unconfirmed`: network/server issue, separate from verified rejection.
- `demo_request_rate_limited`: aggregate abuse signal if privacy review allows.

Campaign/referrer attribution and analytics storage require owner consent/cookie-policy review as applicable. Never pass phone/name/free-text notes into GA4, GSC, URL query parameters or other third-party telemetry. Avoid even sending hashed phone numbers as analytics identifiers without explicit assessment.

The business should separately measure qualified leads, meeting scheduling and actual customers from authoritative CRM data after the system becomes operational.

## 7. Acceptance tests before shipping real collection

- HTTPS and intended host redirects work in a target-market client and an independent external vantage.
- Privacy notice link resolves to a genuine approved policy, and legal approval/consent mechanism is implemented as required for the intended jurisdiction and process.
- Valid synthetic staging submission reaches an authorized recipient and can be retrieved by a real operator; server receipt is returned.
- Empty/invalid/oversize phone/name/notes rejected server-side; scripts/HTML in notes do not execute on retrieval.
- Duplicate click/retry/timeout/429/500/503 work as defined; no duplicate unintentional lead records.
- Rate limiting and anti-spam are tested in a controlled staging environment.
- Browser is keyboard/mobile accessible, with clear disabled/loading/confirmed/unconfirmed states.
- No private details in client or server logs, querystrings, telemetry, emails to unintended recipients or public GitHub logs.
- Publish only after owner-signed backend, hosting, security/privacy, operations and marketing acceptance and separately re-run built SEO/404 checks.

## 8. Non-goals

This document does not choose a CRM vendor, implement a real API, supply a domain certificate, legal advice, Google Analytics credentials, a production email destination, or a live lead. It provides verifiable engineering gates to prevent a UI-only success claim.

## 9. Interim unavailability UX and approved fallback

The Draft PR #11 submission guard shows a truthful **not sent** alert after a browser-valid attempt. This is a good regression-testable integrity check but **not necessarily an acceptable public experience**: it may lead prospects to enter private details before learning the form is unavailable.

Before shipping any interim guard, the product owner should prefer a pre-entry availability notice or disable the form and present a verified contact alternative. The footer currently advertises `mailto:hello@beatfit.ir` in source, but receipt, business ownership and response SLA were not validated; do not promise that a mailbox or team will respond until approved. An alternative mailto request is a **user-initiated** opt-in outside this form's automated lead funnel; it should not be measured as a confirmed server-submitted lead.

Once a real backend is approved, remove the interim no-delivery state and replace it with the explicit idle/submitting/confirmed/unconfirmed states above. Do not leave a nonworking submit control next to any copy that promises a successful callback request.
