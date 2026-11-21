# Fourth Persian Training History Article Implementation Plan

**Goal:** Publish the complete fourth Persian athlete article with supplied media, canonical routing, discovery cards, educational chart, internal links, and SEO.

**Spec:** `docs/superpowers/specs/2026-11-09-fourth-persian-training-history-article-design.md`

## Global constraints

- Canonical route: `/blog/تاریخچه-تمرین`.
- Legacy `/blog/workout-history-progress` redirects to the canonical route.
- Homepage card image remains `/beatfitImages/blog-workout-history.png`.
- The supplied runner PNG is copied, not moved.
- The existing product dashboard file is reused in place.

## Task 1: Content contract and article

**Files:**
- Create `scripts/validate-fourth-blog.mjs`
- Create `src/content/blog/trainingHistory.ts`
- Modify `src/content/blog/posts.ts`
- Copy hero to `public/beatfitImages/articles/تاریخچه-تمرین.png`

- [x] Write and run a failing validator for slug, alias, SEO, two tables, chart, FAQ, sources, images, internal link, CTA, and discovery constraints.
- [x] Add the complete rich article and register its canonical route and alias.
- [x] Copy the supplied hero image and run the article contract plus TypeScript compiler.

## Task 2: Discovery and full verification

**Files:**
- Modify `src/content/home.ts`
- Modify `src/content/resources.ts`
- Modify `package.json`

- [x] Update homepage copy and Persian href without changing its image.
- [x] Update the athlete Resources card with the hero and both old history links with the canonical href.
- [x] Add `test:blog:fourth`.
- [x] Run all four contracts and production build.
- [x] Verify the canonical article, legacy redirect, Resources, homepage, chart, tables, media, links, and SEO in the browser.
