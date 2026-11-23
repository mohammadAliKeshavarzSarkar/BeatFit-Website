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
npm ci
npm run test:seo:fixtures
npm run test:seo:links:fixtures
npm run test:seo:links
npm run build
npm run test:seo
```

The new `scripts/verify-seo-source-links.test.mjs` creates three synthetic article records and six minimal marketing modules in an OS temporary directory. Cases expect: clean baseline; invalid coach CTA; invalid homepage link; missing article via athlete CTA; non-ASCII gym CTA; relative CTA; and duplicate article public slug. Each case invokes the actual validator as a subprocess. No target website access or external packages are required for this fixture test.

The `.github/workflows/seo-verify.yml` review-only workflow runs the added synthetic fixture suite before invoking the real source-link validator and the existing TypeScript/Vite build and SEO output checks. CI is the acceptance gate; new coverage alone is not validation of the deployed server or search indexing.

## Exact GitHub Actions verification

- **Exact tested PR source commit:** `d628587e8a89a027ca4524d801ce85ae466ea0fa`.
- **Run:** [SEO Build Verification #39 — 45127419031](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/actions/runs/45127419031), completed **SUCCESS** on 2026-11-23, hosted Ubuntu/Node.js 22, job `137534864446`.
- Existing SEO build-checker fixtures: **10 tests, 10 passed, 0 failed**.
- New source-link fixtures: **7 tests, 7 passed, 0 failed**.
- Real source-link validator: **PASSED** for seven registered articles, 14 related-slug references and 62 internal links/CTAs in the script's declared literal scope.
- Real dependency installation and TypeScript/Vite `npm run build`: **PASS**.
- Generated SEO build verifier: **255 checks, PASS**. Public tracked artifact drift: **PASS**.
- These results apply to the **tested PR commit**, not any untested later edits or a production deployment. Subsequent documentation-only commits do not change the tested implementation but must not be called CI on a new exact revision.

## Acceptance

| Gate | Result at tested revision | Evidence |
|---|---|---|
| Change scope / diff | PASS (reviewable) | Validator, fixture test, package script, CI workflow, this document |
| Seven isolated fixture cases | PASS | GitHub run 45127419031: 7/7 |
| Real current source-link check | PASS (source) | 7 articles, 14 references, 62 internal links |
| Built SEO routes / generated integrity | PASS (source/build) | Actual Node 22/Vite build and 255 checks |
| Marketing UI click and anchor resolution | NOT RUN | Separate browser review for relevant CTAs |
| Production transport, conversions and indexing | NOT RUN | Live HTTP/HTTPS, owner-backed API, Search Console as applicable |

**Unrelated gate:** URL topic mismatch at `/blog/live-tv-group-training` remains documented separately in [URL identity review — Draft PR #40](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/pull/40) on separate Draft PR #40. This change does not alter that URL or approve a migration.
