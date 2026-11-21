# Third Persian Gym Article Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish the complete third Persian gym-owner article with its supplied images, process diagram, canonical route, discovery cards, internal links, and SEO.

**Architecture:** Add a reusable process content block to the existing rich renderer, then add a focused rich-post content module and register it in the canonical post map. Update homepage and Resources discovery while preserving the homepage image.

**Tech Stack:** React 19, TypeScript, React Router 6, Vite, CSS.

**Spec:** `docs/superpowers/specs/2026-11-09-third-persian-gym-article-design.md`

## Global Constraints

- Canonical route is `/blog/پایش-ضربان-قلب-در-باشگاه`.
- Legacy `/blog/connected-training-system` redirects to the canonical Persian route.
- Homepage card image remains `/beatfitImages/blog-club-data-flow.png`.
- Supplied originals are copied, not moved or deleted.
- Existing Persian articles remain unchanged.

## Review Focus

- Process flow is semantically ordered and readable on narrow screens.
- Both Resources links that previously targeted the legacy club article resolve to the canonical Persian route.
- Reused dashboard source is copied to the article-three filename and loaded independently.
- Internal links to articles one and two use React Router.
- SEO cleanup does not leak gym article metadata to another route.

---

### Task 1: Process block and article contract

**Files:**
- Create: `scripts/validate-third-blog.mjs`
- Create: `src/content/blog/gymHeartRateMonitoring.ts`
- Modify: `src/content/blog/posts.ts`
- Modify: `src/content/blog/types.ts`
- Modify: `src/components/BlogContentBlocks.tsx`
- Modify: `src/styles/pages/blog.css`

**Interfaces:**
- Consumes: existing `RichBlogPost`, rich inline links, slug resolver, and SEO lifecycle.
- Produces: `process` content block plus canonical gym post and legacy alias.

- [x] Write the failing validator for process block, canonical slug, alias, tables, FAQ, sources, images, internal links, and card constraints.
- [x] Run it and confirm failure because the canonical gym article is missing.
- [x] Add the typed process block, semantic renderer, and responsive styles.
- [x] Add the complete supplied article and register canonical post plus alias.
- [x] Copy both supplied PNG files with Persian article-three filenames.
- [x] Run the third contract and TypeScript compiler; both must pass.

### Task 2: Discovery and verification

**Files:**
- Modify: `src/content/home.ts`
- Modify: `src/content/resources.ts`
- Modify: `package.json`

**Interfaces:**
- Consumes: canonical gym slug and hero asset from Task 1.
- Produces: homepage and Resources entry points to article three.

- [x] Update homepage club title, summary, and Persian href without changing its image.
- [x] Update the primary gym Resources card with the hero image and both legacy club links with the Persian href.
- [x] Add `test:blog:third`.
- [x] Run all three article contracts and production build.
- [x] Verify Resources, homepage, canonical URL, legacy redirect, diagram, images, links, and SEO in the browser.

