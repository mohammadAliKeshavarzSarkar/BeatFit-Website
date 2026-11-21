# SEO Consolidation — Source Link Integrity Gate

**Date:** 2026-11-21  
**Status:** Proposed in a review PR, not released  
**Repository:** BeatFit-Website  
**Scope:** English engineering documentation; Persian editorial content is not modified.

## Why this check

The existing `npm run test:seo` verifies generated sitemap, metadata, canonical URL, initial H1 shell, robots, JSON-LD syntax and IIS route mapping. The GitHub Actions `SEO Build Verification` workflow runs this after a real build. However, the build checker does not verify the targets of **literal internal links declared in published article bodies, related article slugs, the homepage article list and resources catalog**.

This matters during the sequence of contextual-link changes to the seven published articles. A misspelled Persian slug can leave a valid built HTML shell while creating a broken in-app user journey.

## Implemented checks

New script: `scripts/verify-seo-source-links.mjs`

- Derives published slugs and source filenames from `src/content/blog/posts.ts`; avoids duplicating the seven-slug registry inside the checker.
- Confirms registered source articles have matching canonical slugs and `published: true`.
- Validates literal `href: "/..."` values found in published article modules, `src/content/home.ts` and `src/content/resources.ts` against actual published blog slugs or existing marketing routes.
- Validates each article's `relatedSlugs`: exactly two distinct registered articles and no self-link, retaining the established two-related-card UI.
- Requires every published article to remain linked from both the homepage and resources discovery lists.
- Emits actionable failing paths and URLs and exits nonzero on any mismatch.

Wiring:
- `npm run test:seo:links` in `package.json`.
- Called within `.github/workflows/seo-verify.yml` after SEO fixtures and before build, for the same PR path filter as existing checks.

## Boundaries

This is **source-level literal reference checking only**. It does not parse arbitrary TypeScript expressions, programmatically constructed routes, aliased/redirected links, runtime data, links in unrelated React components, rendered browser DOM, live website availability, or Google indexing. The existing article's scientific and SEO copy is not changed.

It intentionally treats marketing and article links as separate sets and checks URLs without query or fragment suffixes. Non-article on-page fragment destinations (e.g. `/#blogs`) are not checked for matching DOM IDs.

## Review and QA

1. Review proposed script for correct registry parsing against actual repository syntax.
2. Run `npm ci`, `npm run test:seo:links`, `npm run test:seo:fixtures`, `npm run build`, and `npm run test:seo`.
3. Negative testing: temporarily change a known article href to a nonexistent `/blog/...` target in an isolated checkout, confirm nonzero exit and specific failure text; restore afterwards.
4. Test the relatedSlug self-link and duplicate guards in isolation, ensuring failures are actionable.
5. Review upcoming draft content PRs #30–#32 and merge only after target integrity and full CI checks. At the source inspection point, PRs #27–#29 were merged, while #30–#32 were open; PR status may change independently.
6. Verify actual internal anchors in the JS-rendered pages, and production response/crawler access separately.

**Completed:** repository source review, creation of checker and CI integration on a feature branch. **Pending:** exact-branch CI execution, fixture negative tests, merged deployment and GSC confirmation. No SEO ranking improvement is asserted.
