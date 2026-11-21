# Seventh Persian Group-Class Design Article Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the seventh Persian coach article with supplied imagery, practical class-design visuals, discovery cards, internal links, and Persian SEO.

**Architecture:** Add one `RichBlogPost` module and register it in the existing post map. Reuse the current rich block renderer for process, tables, figure, FAQ, sources, and CTA, then append Home and Resources discovery entries.

**Tech Stack:** React, TypeScript, Vite, Node content-contract scripts.

**Spec:** `docs/superpowers/specs/2026-11-09-seventh-persian-group-class-design-article-design.md`

## Global Constraints

- Canonical route is `/blog/طراحی-تمرین-گروهی`; no English alias.
- Copy the supplied hero; do not move or delete its source.
- Reuse `/assets/gym/eco-panel.png` for the inline product figure.
- Preserve all six existing Home card image paths.
- Use two tables and one five-step process; do not add a chart.
- Keep the 45-minute plan explicitly illustrative and retain medical/safety caveats.

## Review Focus

- The hero and transparent panel must load without overflow or distortion on desktop and mobile.
- Table wrappers must remain usable at narrow viewport widths.
- The 45-minute example must total 45 minutes and remain labeled as non-universal.
- Product copy must not claim automated program design or treat heart rate as the only intensity signal.
- Canonical, cards, internal links, FAQ schema, and source links must all use the intended Persian article.

---

### Task 1: Article contract and rich content

**Files:**
- Create: `scripts/validate-seventh-blog.mjs`
- Create: `src/content/blog/groupClassDesign.ts`
- Modify: `src/content/blog/posts.ts`
- Modify: `package.json`
- Create: `public/beatfitImages/articles/طراحی-تمرین-گروهی.png`

**Interfaces:**
- Consumes: `RichBlogPost` and the existing content block renderer.
- Produces: `groupClassDesignPost` at canonical slug `طراحی-تمرین-گروهی`.

- [ ] Write the focused validator for metadata, process, two tables, no chart, 7 FAQ items, 7 sources, links, CTA, and assets.
- [ ] Run `node scripts/validate-seventh-blog.mjs`; expect failure because the canonical slug is absent.
- [ ] Add the article module, register it, copy the hero, and add `test:blog:seventh`.
- [ ] Run `npm run test:blog:seventh` and `npx tsc -b`; expect success.

### Task 2: Discovery and end-to-end verification

**Files:**
- Modify: `src/content/home.ts`
- Modify: `src/content/resources.ts`
- Test: `scripts/validate-seventh-blog.mjs`

**Interfaces:**
- Consumes: the canonical route and hero from Task 1.
- Produces: one seventh Home card and one Resources coach card.

- [ ] Append both discovery cards without altering the first six Home image paths.
- [ ] Run all seven article contracts and `npm run build`; expect success.
- [ ] Verify Resources, Home, Persian SEO/RTL, hero, inline panel, process, tables, FAQ, sources, links, and absence of a chart in the browser.
