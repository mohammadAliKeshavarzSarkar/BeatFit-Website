# Fourth Persian Training History Article Design

## Intent

Publish the supplied athlete-focused Persian article about reading training history and interpreting progress over time. It replaces the existing short placeholder without changing the established blog design.

## Goals

- Use `/blog/تاریخچه-تمرین` as the canonical Persian URL.
- Redirect the existing `/blog/workout-history-progress` route to the canonical URL.
- Preserve the complete supplied editorial structure, SEO title, meta description, cautionary language, FAQ, and sources.
- Use the supplied runner image as the article hero and primary Resources card image.
- Use `/assets/product/class-live-dashboard.png` as the inline BeatFit training-history image.
- Render both supplied tables and the four-session educational chart through the existing rich-content renderer.
- Link naturally to the heart-rate-zones article and the athlete page.
- Keep the existing homepage card image unchanged while updating its copy and URL.

## Non-goals

- Do not publish the future training-load article or add a link to a route that does not exist.
- Do not change the shared blog page layout or redesign unrelated cards.
- Do not independently rewrite or medically validate the supplied article.

## Approach

Use the existing `RichBlogPost` system and reusable chart/table/figure/FAQ/source/CTA blocks. This keeps articles one through four visually and technically consistent. A separate article template was rejected because it would duplicate rendering and SEO behavior.

## Discovery and media

- Homepage card: retain `/beatfitImages/blog-workout-history.png`.
- Resources primary athlete card: `/beatfitImages/articles/تاریخچه-تمرین.png`.
- Article hero: `/beatfitImages/articles/تاریخچه-تمرین.png`.
- Inline product image: `/assets/product/class-live-dashboard.png`.
- Both existing Resources links for the old history article resolve to the Persian canonical route; only the athlete card receives the new hero to avoid duplicate imagery.

## Verification

Add an executable article-four content contract, then run all article contracts, TypeScript/build, and browser checks for Resources, homepage image preservation, SEO, tables, chart, FAQ, images, CTA, canonical route, and legacy redirect.
