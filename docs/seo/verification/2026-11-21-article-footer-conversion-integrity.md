# Article Footer Conversion Integrity — Cross-Page QA

Date: 2026-11-21
Status: proposed for review; not deployed
Scope: seven published articles through src/components/BlogArticle.tsx
Documentation: English; user-facing site text: Persian

## Source evidence

The existing website emits route-specific head metadata, canonical URLs, structured data, and an initial H1/summary HTML shell. Full article bodies and internal links are added by client-side React. This is a confirmed JS dependency, not evidence that Google cannot index the site. See docs/seo/strategy/2026-11-21-rendering-architecture-decision-brief.md.

The existing SEO Build Verification workflow checks generated SEO artifacts and now has a source-link-integrity check. GitHub Actions run 44887950387 passed. PRs 27 through 33 were merged at inspection time.

## Observed conversion mismatch

Each of the seven rich articles already has an audience-specific contextual body CTA, usually to /athlete or /coach. Shared BlogArticle additionally rendered a generic 'درخواست دمو' footer CTA to /demo. The actual demo request form remains intentionally disabled. This shared CTA is redundant and can imply a functioning submission flow.

## Narrow source change

- Remove only the shared footer BeatfitCta pointing to /demo.
- Remove the unused BeatfitCta import.
- Preserve the 'بازگشت به منابع' footer link, article-specific body CTA, related article navigation, headings, metadata and published dates.
- Do not modify the demo form or claim the submission backend works.

## Release verification

1. Review exact diff limited to footer CTA and import removal.
2. Run npm ci, npm run build, npm run test:seo:links and npm run test:seo.
3. Browser-check at least one athlete and one coach article for correct article CTA, /resources footer navigation, RTL and mobile layout.
4. Confirm generated canonical, H1, JSON-LD and metadata remain unchanged.
5. Confirm live production separately; get first-party Search Console rendered HTML before any SSR or prerender architectural commitment.

Verification completed: repository source review and targeted source edit. Pending: branch CI, browser testing, editorial approval, merge, deployed verification, rankings.