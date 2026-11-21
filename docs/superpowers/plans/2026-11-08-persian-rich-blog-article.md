# Persian Rich Blog Article Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish the final Persian heart-rate-zones article through a reusable rich-article system while preserving the homepage carousel image.

**Architecture:** Add a typed rich-content block model beside the existing legacy section model, render those blocks through one shared article-body component, and store the first final article as structured content. Add Persian canonical routing with an English legacy alias, article-specific head metadata, optional Resources images, and responsive editorial styles.

**Tech Stack:** React 19, TypeScript 5.8, React Router 6, Vite 6, CSS, Node.js validation scripts

**Spec:** `docs/superpowers/specs/2026-11-08-persian-rich-blog-article-design.md`

## Global Constraints

- The website is Persian-only, `fa`, and RTL.
- Use `/blog/زون-های-ضربان-قلب` as the primary article URL everywhere.
- Keep `/beatfitImages/blog-heart-rate-zones.png` unchanged on the homepage carousel.
- Copy the supplied Downloads images into the project; do not delete the originals.
- Preserve the final supplied article copy, including medical and safety qualifications.
- Do not add a CMS, new runtime dependency, or unrelated page changes.

## Review Focus

- A legacy visit to `/blog/heart-rate-zones` must redirect to the Persian canonical route without a redirect loop.
- An unpublished or unknown slug must still redirect to `/resources`.
- Tables, charts, long Persian headings, and source URLs must not overflow a 390px viewport.
- Article metadata must be restored when navigating away so homepage metadata is not polluted.
- Homepage card image must remain the existing asset even though Resources and article-detail images change.

---

### Task 1: Rich article content contract and renderer

**Files:**
- Create: `src/content/blog/types.ts`
- Create: `src/components/BlogContentBlocks.tsx`
- Modify: `src/content/blog/posts.ts`
- Modify: `src/content/blog/index.ts`
- Modify: `src/components/BlogArticle.tsx`
- Modify: `src/components/index.ts`
- Modify: `src/styles/pages/blog.css`

**Interfaces:**
- Consumes: existing `BlogPostSection` legacy article sections.
- Produces: `BlogInline`, `BlogRichText`, `BlogContentBlock`, `RichBlogPost`, `LegacyBlogPost`, and `BlogPost`; `BlogContentBlocks({ blocks }: { blocks: readonly BlogContentBlock[] })`.

- [ ] **Step 1: Define the rich-content types**

Add discriminated block types for paragraph, heading, list, table, figure, chart, FAQ, sources, and CTA. Define the `BlogPost` union so an article has either `content` or legacy `sections`, never both.

- [ ] **Step 2: Run TypeScript to expose integration failures**

Run: `npx tsc -b`

Expected: FAIL until exports and renderers consume the new union correctly.

- [ ] **Step 3: Implement the shared rich-block renderer**

Render inline emphasis semantically, H2/H3 hierarchy, lists, scrollable tables, rounded figures, accessible bar charts, FAQ groups, external source links, and internal CTA links.

- [ ] **Step 4: Update `BlogArticle` to support both content modes**

Use `BlogContentBlocks` when `content` is present and preserve the existing legacy section rendering for the remaining articles.

- [ ] **Step 5: Add responsive rich-article styles**

Add dedicated BEM classes under `.bf-blog-post` for every block type. Tables use an overflow wrapper; chart labels remain visible on mobile; images preserve aspect ratio.

- [ ] **Step 6: Verify the shared renderer compiles**

Run: `npx tsc -b`

Expected: PASS.

### Task 2: First final Persian article, assets, cards, and routing

**Files:**
- Create: `public/beatfitImages/articles/زون-های-ضربان-قلب.png`
- Create: `public/beatfitImages/articles/نمایش-زون-های-تمرین-در-بیت-فیت.png`
- Create: `scripts/validate-first-blog.mjs`
- Modify: `package.json`
- Modify: `src/content/blog/posts.ts`
- Modify: `src/content/home.ts`
- Modify: `src/content/resources.ts`
- Modify: `src/components/ResourcesHero.tsx`
- Modify: `src/components/ResourcesCatalog.tsx`
- Modify: `src/styles/pages/resources.css`
- Modify: `src/pages/BlogPostPage.tsx`

**Interfaces:**
- Consumes: `BlogContentBlock` and the two supplied image files.
- Produces: canonical post key `زون-های-ضربان-قلب`; `resolveBlogSlug(slug: string): { canonicalSlug: string; post: BlogPost } | undefined`; optional Resources `image` and `imageAlt` fields.

- [ ] **Step 1: Write a zero-dependency failing content contract test**

Create `scripts/validate-first-blog.mjs` using Node assertions. It must check the Persian canonical slug, legacy alias, article image paths, required rich block kinds, six sources, Persian Resources links, and the unchanged homepage image path.

- [ ] **Step 2: Run the validator to verify it fails**

Run: `node scripts/validate-first-blog.mjs`

Expected: FAIL because the Persian article and assets are not integrated yet.

- [ ] **Step 3: Copy the supplied images into project assets**

Copy, without deleting the originals:

- `Post-Workout Focus at BeatFit.png` → `public/beatfitImages/articles/زون-های-ضربان-قلب.png`
- `Live Fitness Dashboard in a Modern Gym.png` → `public/beatfitImages/articles/نمایش-زون-های-تمرین-در-بیت-فیت.png`

- [ ] **Step 4: Replace the first legacy post with the final structured article**

Use the final H1, SEO title, meta description, summary, category `برای ورزشکار`, existing publication date, hero metadata, complete body copy, two tables, calculation list, zone-distribution chart, inline dashboard figure, FAQ, conclusion CTA, and six sources. Exclude handoff notes, checklists, favicon fragments, and publishing instructions.

- [ ] **Step 5: Add Persian routing and the legacy alias**

Export `blogAliases` and `resolveBlogSlug`. Redirect `heart-rate-zones` to `زون-های-ضربان-قلب`; continue redirecting unknown or unpublished posts to `/resources`.

- [ ] **Step 6: Synchronize homepage and Resources metadata**

Keep the homepage image path unchanged. Update its title, summary, and href. Update the Resources featured item and athlete card to the Persian URL and new hero image. Add optional image rendering without changing cards whose images have not yet been supplied.

- [ ] **Step 7: Add the validation command**

Add `"test:blog": "node scripts/validate-first-blog.mjs"` to `package.json`.

- [ ] **Step 8: Run content validation**

Run: `npm run test:blog`

Expected: PASS with confirmation that routing, assets, rich blocks, sources, and homepage-image preservation satisfy the contract.

### Task 3: Persian article SEO and metadata lifecycle

**Files:**
- Create: `src/lib/blogSeo.ts`
- Modify: `src/pages/BlogPostPage.tsx`
- Modify: `src/content/blog/types.ts`
- Modify: `src/content/blog/posts.ts`

**Interfaces:**
- Consumes: post fields `seoTitle`, `metaDescription`, `image`, `datePublished`, `slug`, and `title`.
- Produces: `applyBlogSeo(post: BlogPost, origin: string): () => void`, returning a cleanup function that restores prior title, canonical, description, Open Graph, Twitter, and JSON-LD state.

- [ ] **Step 1: Extend post metadata fields**

Add `seoTitle` and `metaDescription` to the shared metadata contract and populate them for the first article; legacy articles may fall back to title and summary.

- [ ] **Step 2: Implement metadata application and restoration**

Upsert article-specific title, description, canonical, `og:type=article`, Open Graph fields, Twitter fields, and one `BlogPosting` script. Capture and restore the previous state on cleanup.

- [ ] **Step 3: Connect metadata to canonical routing**

Only apply SEO after the canonical published post resolves. Build URLs from `window.location.origin` plus the Persian slug and article image path.

- [ ] **Step 4: Verify type safety and production output**

Run: `npm run build`

Expected: PASS and Vite emits the production bundle.

### Task 4: End-to-end article verification

**Files:**
- Verify: `src/content/blog/posts.ts`
- Verify: `src/components/BlogContentBlocks.tsx`
- Verify: `src/styles/pages/blog.css`
- Verify: `src/styles/pages/resources.css`

**Interfaces:**
- Consumes: the completed implementation.
- Produces: verified desktop and mobile Persian article behavior.

- [ ] **Step 1: Run automated verification**

Run: `npm run test:blog`

Expected: PASS.

Run: `npm run build`

Expected: PASS.

- [ ] **Step 2: Verify routing in the browser**

Open `/blog/زون-های-ضربان-قلب` and confirm the article renders. Open `/blog/heart-rate-zones` and confirm it redirects to the Persian route. Open an unknown slug and confirm it redirects to `/resources`.

- [ ] **Step 3: Verify article metadata in the browser**

Confirm Persian title, meta description, canonical URL, Open Graph fields, Twitter fields, and exactly one `BlogPosting` JSON-LD script use the final article values.

Navigate back to the homepage and confirm the original homepage title, description, canonical, Open Graph fields, and Twitter fields are restored and the article JSON-LD script is removed.

- [ ] **Step 4: Inspect the desktop article**

At a desktop viewport, inspect the complete page for hierarchy, image placement, table legibility, chart labels, FAQs, sources, related articles, CTA, and footer.

- [ ] **Step 5: Inspect the mobile article**

At 390×844, inspect the complete page for RTL wrapping, horizontal table containment, readable chart labels, responsive images, and stacked actions.

- [ ] **Step 6: Verify homepage and Resources integration**

Confirm the homepage card still uses `/beatfitImages/blog-heart-rate-zones.png`, while Resources uses the new article hero image and all first-article links use the Persian URL.

