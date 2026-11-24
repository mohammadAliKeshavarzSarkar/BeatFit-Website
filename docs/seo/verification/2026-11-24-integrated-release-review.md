# Integrated SEO Release Review — 2026-11-24

**Scope:** Current merged source, open PR #43, and the interaction of PRs #42–45. No deployment or Search Console changes.

## Findings and corrections

| Finding | Severity | Review-branch correction |
|---|---|---|
| The merged emitter uses four symbols whose imports were lost during integration | Release-blocking | Restore registry and renderer imports |
| No-JS browser test still uses retired /blog/live-tv-group-training | Release-blocking QA | Test seven current public preview URLs, the two legacy 301s and all seven React articles |
| PR #43 is open with a merge conflict; main still has the old demo title | Integration | Carry forward demo metadata, workflow and current rendered navigation assertions in this branch |
| Keyword v3 map and metadata inventory still describe the old canonical | Documentation | Preserve historical snapshots; publish v4 (113 rows, 13 destinations, eight migrated rows) and an integrated 13-page inventory |
| Documentation index contains a truncated paragraph and merge separator; run 027 missing from the current log | Documentation | Restore the index and the historical run |
| Static article was removed by inline script before React committed | Content availability | Retain article fallback until BlogArticle's layout effect commits; test blocked bundle |
| Replacement string interpolation can reinterpret dollar sequences; local URL validation permits backslash and control characters | Defensive correctness | Use literal replacement callback and reject backslash/control characters in rendered URLs |

## Verification scope

- Existing SEO fixtures, source-link fixtures, source links, fifth article contract, TypeScript/Vite build, seven static article checks, general SEO artifact checks, tracked-public consistency.
- Actual mobile Chromium: all seven canonical public preview routes without JS and with React, old English and Persian training-load redirects preserving query parameters, blocked JS bundle fallback, demo metadata and disabled controls, gym/coach/athlete CTA navigation, seven resources links.
- The preview middleware is not IIS. These tests do not establish live production status, canonical selection, Google indexing, keyword demand, rank or successful lead submission.
- Current keyword candidates are still hypotheses, not search-volume data. No unrelated page titles or article copy were rewritten. The new demo title and description accurately describe unavailable online submission.
- Prior PRs #42, #44 and #45 were observed merged. PR #43 remains open; if this consolidated repair is accepted, supersede #43 rather than merge its stale branch over the repaired source.

## Release acceptance

Exact integrated CI results pending at authoring. Do not release from isolated old-PR runs. After review and approved deployment, test production HTTPS redirects (both old paths), final HTTP 200/canonical, sitemap, GSC rendered HTML and Google-selected canonical, then collect query/page performance. The production revision and actual old-URL backlink/indexing state were not available in this review.
