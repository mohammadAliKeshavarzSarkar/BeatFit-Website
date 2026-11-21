# Second Persian Coach Article Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish the complete second Persian coach article with its supplied images, canonical routing, cards, internal links, and SEO.

**Architecture:** Add a focused rich-post content module and register it in the existing blog post map. Extend rich inline content with internal-link support, then update homepage/Resources discovery while preserving the homepage image.

**Tech Stack:** React 19, TypeScript, React Router 6, Vite, CSS.

**Spec:** `docs/superpowers/specs/2026-11-08-second-persian-coach-article-design.md`

## Global Constraints

- Canonical route is `/blog/کنترل-شدت-تمرین-در-کلاس-گروهی`.
- Legacy `/blog/live-class-monitoring` redirects to the canonical Persian route.
- Homepage card image remains `/beatfitImages/blog-live-class.png`.
- Supplied originals are copied, not moved or deleted.
- Existing Persian article and unrelated content remain unchanged.

## Review Focus

- Persian slug resolves after browser URL decoding and legacy alias redirects exactly once.
- Internal article links use React Router without invalid nested markup.
- Both images have meaningful Persian alt text and responsive cropping.
- Chart clearly identifies hypothetical relative intensities and remains readable on narrow screens.
- SEO cleanup does not leak the coach article metadata to another route.

---

### Task 1: Second-article content contract

**Files:**
- Create: `scripts/validate-second-blog.mjs`
- Create: `src/content/blog/groupClassIntensity.ts`
- Modify: `src/content/blog/posts.ts`
- Modify: `src/content/blog/types.ts`
- Modify: `src/components/BlogContentBlocks.tsx`

**Interfaces:**
- Consumes: `RichBlogPost`, `BlogContentBlock`, `resolveBlogSlug`.
- Produces: canonical coach post, legacy alias, linked rich inline content.

- [ ] Write the validator for canonical slug, alias, content structures, internal links, seven sources, asset paths, and card constraints.
- [ ] Run `node scripts/validate-second-blog.mjs` and confirm it fails because the canonical coach article is missing.
- [ ] Add `href?: string` to `BlogInline` and render internal links with React Router.
- [ ] Add the complete supplied article module and register the canonical post and alias.
- [ ] Copy both supplied PNG files to `public/beatfitImages/articles/` with Persian filenames.
- [ ] Run `node scripts/validate-second-blog.mjs` and `npx tsc -b`; both must pass.

### Task 2: Discovery cards and verification

**Files:**
- Modify: `src/content/home.ts`
- Modify: `src/content/resources.ts`
- Modify: `package.json`

**Interfaces:**
- Consumes: canonical coach slug and hero asset from Task 1.
- Produces: homepage and Resources entry points to the second article.

- [ ] Update homepage coach title, summary, and Persian href without changing its image.
- [ ] Add the hero image and canonical href to the coach Resources card.
- [ ] Add `test:blog:second` script.
- [ ] Run the second-article contract, first-article contract, and production build.
- [ ] Verify Resources, homepage, canonical URL, legacy redirect, chart, inline image, internal links, and SEO in the browser.

