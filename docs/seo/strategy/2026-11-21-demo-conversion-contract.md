# T6 Demo Conversion Contract — Spec Only

**Record:** BF-SEO-T6-CONTRACT-001  
**Date:** 2026-11-21  
**Status:** DRAFT — awaiting owner API/CRM + privacy approval  
**Scope:** Engineering contract for `/demo` lead capture. **No endpoint URL is invented here.**

## Current source state (observed)

| Item | Observation |
|---|---|
| Route | `/demo` — marketing page with gym/club demo request form |
| Component | `src/components/DemoForm.tsx` |
| Submit handler | `onSubmit={(event) => event.preventDefault()}` — **no network request** |
| Required UX copy | `src/content/demo.ts` (Persian labels/placeholders) |
| Privacy/terms | Placeholder destinations remain open under BF-SEO-D007 |

This is a **conversion plumbing gap**, not an SEO ranking claim.

## Fields the product already collects (UI)

| `name` | Type | Purpose |
|---|---|---|
| `fullName` | text | Contact name |
| `gymName` | text | Club / facility name |
| `phone` | tel | Callback number |
| `city` | select | City from fixed list (+ «سایر») |
| `gymType` | select | Facility type from fixed list (+ «سایر») |
| `notes` | textarea | Optional context |

No email field exists in the current UI. Do not add fields in T6 unless product explicitly requests them.

## Owner decisions required before implementation

1. **Destination** — Approved HTTPS endpoint (or serverless/form service) that may receive PII. Paste the exact base URL and path only after approval; do not hardcode guessed URLs.
2. **Auth / abuse** — API key header, signed token, CAPTCHA, rate limit, or IP allowlist as chosen by backend owner.
3. **CRM ownership** — Who receives leads (inbox, sheet, CRM), SLA for callback, and retention period.
4. **Consent** — Whether a privacy checkbox / link is required before submit; official privacy URL (ties to D007).
5. **Success / failure UX** — Inline success message vs thank-you route; Persian error copy for network/validation failures.
6. **Measurement** — Which privacy-safe event fires on successful submit (e.g. `demo_request_submitted`). No raw PII in analytics payloads.
7. **Environment** — How the endpoint is supplied to the SPA (`VITE_…` build-time vs runtime config). Secrets never commit to the public repo.

## Proposed client behavior (after approval)

1. Validate non-empty `fullName`, `gymName`, `phone`, `city`, `gymType` on the client.
2. `POST` JSON (or `application/x-www-form-urlencoded` if the approved API requires it) to the **owner-provided** URL.
3. Disable the submit button while in flight; restore on failure.
4. On HTTP 2xx: show success state; fire the approved conversion event once.
5. On non-2xx / network error: show recoverable error; do not clear the form.
6. Never log phone/name/notes to `console` in production builds.

## Acceptance criteria (T6 exit)

| Gate | PASS when |
|---|---|
| Network | Real submit from production `/demo` reaches the approved backend (DevTools or server log, redacted) |
| Persistence | Lead appears where CRM owner expects it |
| UX | Success and failure paths both demonstrated |
| Privacy | No secrets in git; analytics event contains no PII |
| Regression | `npm run test:seo:fixtures` + `npm run test:seo` still PASS if build artifacts change |

## Explicit non-goals

- Inventing or guessing a BeatFit API path.
- Claiming organic SEO uplift from wiring the form.
- Merging content PRs under a “conversion” label.
- Storing leads in the static website host alone without an approved processor.

## Handoff checklist for implementer

- [ ] Owner supplies endpoint + method + auth scheme in a private channel (not this public doc if secret).
- [ ] Owner confirms consent/privacy text or defers checkbox until D007 closes.
- [ ] Implementer wires `DemoForm` only; keep Persian copy unless product asks otherwise.
- [ ] Record BF-SEO-RUN entry with redacted evidence after first production success.
