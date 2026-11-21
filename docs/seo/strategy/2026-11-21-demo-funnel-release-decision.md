# Demo Request Funnel — Implementation and Release Decision Brief

**Record:** BF-SEO-DEMO-DECISION-001
**Date:** 2026-11-21
**Current source:** PR #11 pre-entry inactive form is merged into main; actual deployment not verified.
**Decision status:** **OWNER REVIEW REQUIRED**. This document is not an authorization to collect personal data.

## Current evidence

The original `/demo` form in the React/Vite marketing repository silently prevented submission and showed no server receipt. It has been revised to a visibly **unavailable** state before entry, with disabled contact inputs and submit CTA; no invented backend, customer contact data collection or fake success is present. Both [exact PR QA](../verification/2026-11-21-demo-form-pre-entry-disabled-qa.md) and [actual merged-main QA](../verification/2026-11-21-merged-main-conversion-seo-qa.md) passed 254 SEO checks and mobile Chromium, but they do not prove deployment.

There is no approved backend, CRM destination, recipient inbox monitoring, privacy/retention policy or live HTTPS verification in this audit. `src/content/home.ts` advertises `mailto:hello@beatfit.ir`, but that does **not** prove the mailbox is actively monitored. Footer `حریم خصوصی` and `شرایط استفاده` source links remain placeholders `href="#"`.

## Honest release choices

| Option | User experience | What is known | Main risk | Status |
|---|---|---|---|---|
| Silent no-op | Visitor enters details but nothing is received | Original source did this | Misleading submission UX | REJECT AS AN INTENDED DESIGN |
| After-entry warning | Visitor types private details before learning delivery is unavailable | Earlier PR #11 revision tested | Wastes effort and trust | SUPERSEDED |
| **Pre-entry notice + disabled form** | Visitor knows before entry; cannot submit | Now merged into main; tested | Still no lead channel | **MERGED SOURCE; LIVE RELEASE AND OWNER APPROVAL UNKNOWN** |
| User-initiated contact alternative | Visitor uses a verified monitored email/channel | Source contains a mailto link only | Delivery/operator/consent unverified | OWNER DECISION REQUIRED |
| Real secure receiver (preferred) | Server acknowledges and stores/dispatches legitimate demo request | Proposed contract only | Requires secure backend, privacy and operations | NOT IMPLEMENTED |

## Requirements for the durable conversion path

1. **Product owner:** Approve the gym-buyer workflow, truthful Persian copy, qualification rules and what counts as a confirmed demo request.
2. **Backend/Operations:** Choose and maintain a first-party or approved processor receiver, real storage/notification and a recipient responsible for leads. The documented `POST /api/demo-requests` is hypothetical, **not a deployed endpoint**.
3. **Hosting/security:** Verify successful HTTPS and certificate/host behavior before transmitting contact data; implement server-side validation, rate limiting and retries/idempotency.
4. **Privacy/legal owner:** Publish an accurate accessible privacy notice with purpose, data recipients, retention, access/deletion and appropriate permissions. Do not replace `#` links with invented legal claims.
5. **QA:** Use synthetic staging records to prove receipt in the real target system, authorization, input validation, 429/503/timeout/duplicate handling and no private data in logs or analytics.
6. **Analytics:** Record `demo_request_confirmed` **only after** a server-accepted receipt; never record a disabled-button click or successful Vite build as a lead. Never transmit phone/name/free-text to GA4/GSC.

The permanent backend implementation must replace the disabled fieldset and inactive warning **atomically with** verified secure delivery and privacy, not merely enable inputs without a receiver.

## SEO consequences and limitations

The `/demo` route is configured as indexable in marketing source. An inactive form is primarily a conversion/user-experience problem; no Google ranking penalty was measured or established. Do not automatically noindex/remove the route until the product owner and SEO team decide how prospective gym buyers should be routed.

[PR #10](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/pull/10) routes athlete-intent heart-rate-zone content toward `/athlete`; other B2B navigation still leads to the demo page, so business acquisition remains affected until a valid contact path exists.

**No additional merge or production change is approved by this decision brief.**
