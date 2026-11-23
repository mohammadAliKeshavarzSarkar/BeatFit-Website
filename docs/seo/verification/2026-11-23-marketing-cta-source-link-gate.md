# Marketing CTA and Article Source-Link Integrity — 2026-11-23

**Record:** BF-SEO-LINK-GATE-002  
**Date:** 2026-11-23  
**Branch:** `seo/2026-11-23-marketing-link-gate`  
**Scope:** Review-only validation changes, no marketing copy, URL changes, redirects, deployment, tracking, consent flow or form activation.

## Source finding

The prior `scripts/verify-seo-source-links.mjs` inspected literal `href` values in the published articles, home and resources modules, but did not inspect:
- `ctaHref` on existing page content, including homepage featured/hero and resources CTA.
- Literal `href` in gym, coach, athlete and demo content modules.

Consequently, the source gate could pass even if a landing-page call to action pointed to `/demoo`, an unknown blog article or a stale Persian blog URL. This is a test-coverage gap, **not** evidence that one of those links is currently broken in the deployed site.

## Proposed change

Extend the existing read-only source-link check to examine both `href` and `ctaHref` literal values in all six marketing source content modules and the seven registered published article modules. Keep validation tied to the existing article public-slug registry and the six marketing routes; do not add another route registry. Assert that no two content slugs map to the same public ASCII article slug.

External absolute HTTP(S) links, `mailto:`, `tel:` and hash-only fragment destinations remain outside this route-integrity test. **A hash-only placeholder does not become a verified destination.** The /demo path may be registered and technically valid while the actual lead form remains intentionally disabled. The check does not assess CRM submission, UI accessibility, anchor presence, absolute external link health, client-rendered navigation or production HTTP.

## Repeatable commands

```sh
npm run test:seo:links:fixtures
npm run test:seo:links
npm ci
npm run build
npm run test:seo
```

The new `scripts/verify-seo-source-links.test.mjs` creates three synthetic article records and six minimal marketing modules in an OS temporary directory. Cases expect: clean baseline; invalid coach CTA; invalid homepage link; missing article via athlete CTA; non-ASCII gym CTA; relative CTA; and duplicate article public slug. Each case invokes the actual validator as a subprocess. No target website access or external packages are required for this fixture test.

The `.github/workflows/seo-verify.yml` review-only workflow runs the added synthetic fixture suite before invoking the real source-link validator and the existing TypeScript/Vite build and SEO output checks. CI is the acceptance gate; new coverage alone is not validation of the deployed server or search indexing.

## Acceptance

| Gate | Status at authoring | Evidence required |
|---|---|---|
| Change scope / diff | PROPOSED | `scripts/verify-seo-source-links.mjs`, fixture test, `package.json`, CI workflow, this document |
| Seven isolated fixture cases | NOT RUN | Actual Node test output, zero failures |
| Real current source-link check | NOT RUN | Actual result for current `main`-based branch |
| Built SEO routes / generated integrity | NOT RUN | CI `npm ci`, `npm run build`, `npm run test:seo` |
| Marketing UI click and anchor resolution | NOT RUN | Separate browser review for relevant CTAs |
| Production transport, conversions and indexing | NOT RUN | Live HTTP/HTTPS, owner-backed API, Search Console as applicable |

**Unrelated gate:** URL topic mismatch at `/blog/live-tv-group-training` remains documented separately in [URL identity review — Draft PR #40](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/pull/40) on separate Draft PR #40. This change does not alter that URL or approve a migration.
