# Sixth Persian Heart-rate Sensor Article Implementation Plan

**Goal:** Add article six as a new Persian athlete article with supplied media, neutral comparison content, discovery cards, internal links, and SEO.

**Spec:** `docs/superpowers/specs/2026-11-09-sixth-persian-heart-rate-sensors-article-design.md`

## Constraints

- Canonical route: `/blog/مقایسه-سنسور-ضربان-قلب`.
- No legacy alias is needed.
- Existing five homepage cards and their images remain unchanged.
- Supplied originals are copied, not moved.
- No accuracy chart or unsupported product claim is added.

## Task 1: Contract and article

- [x] Write and run a failing sixth-article validator.
- [x] Add the complete rich article and register its canonical route.
- [x] Copy both supplied images with Persian filenames.
- [x] Run the sixth contract and TypeScript compiler.

## Task 2: Discovery and verification

- [x] Append a sixth homepage card using the supplied hero.
- [x] Append a Resources athlete card using the supplied hero.
- [x] Add `test:blog:sixth`.
- [x] Run all six contracts and production build.
- [x] Verify article, Resources, homepage, SEO, images, table, guide, FAQ, links, and absence of an invented chart in the browser.
