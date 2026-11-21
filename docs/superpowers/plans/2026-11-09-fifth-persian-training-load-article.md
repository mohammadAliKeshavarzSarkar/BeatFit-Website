# Fifth Persian Training Load Article Implementation Plan

**Goal:** Publish article five with supplied media, a desktop-friendly portrait screenshot, Persian routing, discovery cards, chart, internal links, and SEO.

**Spec:** `docs/superpowers/specs/2026-11-09-fifth-persian-training-load-article-design.md`

## Constraints

- Canonical route: `/blog/بار-تمرینی-چیست`.
- Legacy fifth placeholder route redirects to the canonical route.
- Homepage fifth card image remains `/beatfitImages/blog-live-tv.png`.
- Hero source is copied, not moved.
- Existing portrait product image is reused in place.

## Task 1: Contract, portrait figure, and article

- [x] Write and run a failing fifth-article validator.
- [x] Add the typed portrait figure option, renderer modifier, and responsive desktop styling.
- [x] Add the complete rich article, canonical route, legacy alias, and copied hero.
- [x] Run the fifth contract and TypeScript compiler.

## Task 2: Discovery and verification

- [x] Update the fifth homepage card copy/href without changing its image.
- [x] Add the article-five Resources card with the supplied hero.
- [x] Add `test:blog:fifth`.
- [x] Run all five article contracts and production build.
- [x] Verify Resources, homepage, canonical/legacy routes, SEO, hero, portrait image, tables, chart, FAQ, links, and desktop layout in the browser.
