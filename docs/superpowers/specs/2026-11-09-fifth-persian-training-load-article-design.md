# Fifth Persian Training Load Article Design

## Intent

Publish the supplied athlete-focused Persian article explaining training load, its calculation methods, interpretation, and limitations. Replace the fifth remaining blog placeholder while keeping Live TV as product-page subject matter rather than a blog article.

## Goals

- Canonical URL: `/blog/بار-تمرینی-چیست`.
- Legacy `/blog/live-tv-group-training` redirects to the new canonical fifth article.
- Use the supplied analytics dashboard image as hero and Resources card image.
- Use `/beatfitImages/blog-workout-history.png` inside the BeatFit product section.
- Add a reusable portrait figure treatment so the tall transparent phone mockup is centered, capped in width, padded, and responsive.
- Preserve the complete supplied SEO, explanatory structure, two tables, sRPE chart, FAQ, sources, cautions, internal links, and athlete CTA.
- Preserve the fifth homepage card image `/beatfitImages/blog-live-tv.png`, updating only its copy and URL.

## Non-goals

- Do not claim that sRPE or TRIMP is the proprietary BeatFit formula.
- Do not independently validate or rewrite the supplied scientific claims.
- Do not redesign the general article page or other cards.

## Approach

Use the current `RichBlogPost` blocks and chart renderer. Extend only the figure block with an optional `layout: "portrait"` value and a modifier class. This is preferred over article-specific CSS because it provides a reusable, type-safe solution for vertical product screenshots.

## Discovery

- Replace the fifth homepage placeholder copy/href while retaining its existing image.
- Add a new athlete Resources card using the supplied hero rather than replacing article four.
- Register the Persian slug and retain the English fifth-placeholder route as an alias.

## Verification

Add a fifth article contract covering the route, alias, media, portrait figure API/styles, tables, chart, FAQ, sources, links, homepage image preservation, and Resources card. Run all article contracts, compiler/build, and browser checks at desktop width.
