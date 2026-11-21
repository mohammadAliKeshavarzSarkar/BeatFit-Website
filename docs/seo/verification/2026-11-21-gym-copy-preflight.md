# /gym SEO Copy — Preflight and Pending Verification

**Record:** BF-SEO-COPY-CHECK-001
**Date:** 2026-11-21
**Website code base:** `d11130cef8f941f54b06362bb9bd124f89853adb`
**State:** Pre-implementation source relationships observed; no build/browser/GSC test claimed.

| Test ID | Assertion | Current evidence and result |
|---|---|---|
| SRC-GYM-01 | Hero heading is a standalone H1 | OBSERVED: `GymHero.tsx` renders `gymHero.title` within `<h1>` |
| SRC-GYM-02 | Hero paragraph sourced from content registry | OBSERVED: `GymHero.tsx` renders `gymHero.body` in a `<p>` |
| SRC-GYM-03 | SEO description and static summary sourced from same paragraph | OBSERVED: `gymDocument.description` and `gymDocument.summary` both use `gymHero.body` |
| SRC-GYM-04 | SEO title defined independently | OBSERVED: `gymDocument.title` is a literal in `src/seo/marketing.ts` |
| CHECK-GYM-01 | Exactly two intended string edits and no other source edits | NOT RUN — requires PR diff |
| BUILD-GYM-01 | `npm ci && npm run build` passes | NOT RUN — GitHub checkout unavailable in current container |
| BUILD-GYM-02 | Generated `/gym` route shell includes updated unique metadata | NOT RUN |
| BROWSER-GYM-01 | Persian visual line wrapping, mobile and desktop | NOT RUN |
| BROWSER-GYM-02 | H1, schema, canonical, navigation and hero visuals unaffected | NOT RUN |
| PRODUCT-GYM-01 | Product owner validates exact feature claims | NOT RUN |
| GSC-GYM-01 | Actual search query/page baseline for `/gym` | BLOCKED — no connected Google Search Console data |
| LIVE-GYM-01 | Deployed HTML/HTTP and version confirmed | BLOCKED — no authoritative live response evidence in audit |

Preflight is not a production validation. Once the PR is created, record its URL, changed lines, review state and exact static checks as a dated addendum or next verification file.
