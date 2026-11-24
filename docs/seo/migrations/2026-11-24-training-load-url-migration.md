# Training-Load Article — Redirect-Safe Public URL Migration Proposal

**Date:** 2026-11-24  
**Status:** DRAFT IMPLEMENTATION / NOT APPROVED FOR PRODUCTION  
**Source old URL:** `https://beatfit.ir/blog/live-tv-group-training`  
**Proposed canonical:** `https://beatfit.ir/blog/training-load`  
**Content slug unchanged:** `بار-تمرینی-چیست`  
**Linked decision:** [2026-11-23 URL identity audit](../audits/2026-11-23-article-url-identity-and-gym-intent-review.md)

## Reason

The current fifth article is a training-load definition and sRPE explainer, but its public English URL looks like a live-TV/group-monitoring feature. This reviewable change reconciles the semantic URL without altering the article's evidence, SEO title, H1 or 45-minute fitness guides. URL wording alone is not proof of improved rankings.

## Proposed changes

- Map the training-load content slug to `/blog/training-load` in the typed public slug registry. Keep the old English slug as a **legacy-only alias**, not a second article or canonical.
- Resolve the old English path in the client to the same content and navigate to the canonical. In route classification, old English and existing Persian paths are redirects, not rewrites to a second indexable HTML document.
- Add a direct IIS `Permanent` redirect from the former English path (including its trailing-slash variant) to the absolute **HTTPS** canonical, before general slash normalization. Preserve query strings. Update the legacy Persian redirect to the same final HTTPS destination.
- Replace literal internal links on the homepage, resources hub and training-history article. Keep related-content slug references as source content identifiers.
- Update exactly one sitemap URL, one generated rewrite-map entry and its HTML shell. Keep the total indexed page count **13**, with **one** canonical for training load.
- Align static SEO build-check fixture, fifth-article content test and preview related-article assertion.
- Make build-time emission fail if the old English URL is missing its direct HTTPS redirect. Make built sitemap validation fail if the old English slug is still indexable.
- Keep the IIS `HTTPS Redirect` rewrite **disabled**, preserving the existing host TLS-offload loop safeguard.

## Required verification

1. Run `npm ci`, SEO source link fixture and actual link gate, `npm run test:seo:fixtures`, `npm run test:blog:fifth`, `npm run build`, `npm run test:seo`, and tracked-public no-diff check on the **exact PR source commit**.
2. Inspect `dist/sitemap.xml`, `dist/web.config`, `dist/route-html/blog/training-load.html`: one `<loc>`, correct canonical/OG, no additional legacy indexable entry, valid old-to-new 301 rule and Persian alias one-hop redirect for normal paths.
3. Verify targeted 390px browser navigation on the actual PR head and legacy redirect URL against an IIS-compatible staging server. Vite Preview cannot simulate IIS permanent redirects.
4. **Before production merge:** obtain owner Search Console URL Inspection for old URL (Google-selected canonical, indexing state, available links); review relevant backlinks, analytics and campaign URLs and confirm whether migration timing is appropriate while indexing requests are pending.
5. **After authorized deployment:** verify exact HTTP 301 Location, status 200 final HTML, HTTPS transport, live canonical, sitemap, OG URL, no chains/loops and live navigation. Submit/inspect only the new canonical in Google Search Console; monitor page/query results, redirects and coverage after propagation. Do not declare success from source/build CI alone.

## Actual review-only CI evidence

- **Exact tested code/document revision:** `10d91e77042402a6e7d8d4e9015c92856c67bd93`.
- **GitHub Actions:** [SEO Build Verification 45383412585](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/actions/runs/45383412585), job `138408034260`, concluded **SUCCESS**.
- **Passed:** 10/10 generated-SEO fixture tests; 7/7 adversarial source-link fixtures; 7 articles, 14 related-slug references and 62 declared source links; Node.js 22 locked install + TypeScript/Vite build; 256 post-build SEO output checks; tracked `public/robots.txt`, `public/sitemap.xml`, `public/web.config` consistency.
- These checks do **not** emulate live IIS 301 responses or demonstrate the new Google-selected canonical. They are exact-commit source/build evidence, not deployment approval.

## Decision gates

| Gate | Current status |
|---|---|
| Source migration changes | Draft PR / reviewable |
| Current GSC indexing & backlinks | NOT AVAILABLE in this session |
| Build and fixture tests | PASS at pinned source revision (see run above) |
| Public redirect and canonical | NOT DEPLOYED / NOT VERIFIED |
| Indexing and ranking outcomes | NOT CLAIMED |

**No automatic merge or deployment is authorized by this PR.** If Google is already indexing the old URL and a migration is inappropriate right now, retain the existing public canonical until a reviewed window; this draft can be closed or deferred. Coordinate source/reference CSV updates in the 13-page keyword reconciliation PR, whose original snapshot predates this proposal.
