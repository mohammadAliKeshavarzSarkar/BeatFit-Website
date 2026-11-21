# Persian Rich Blog Article Design

## Intent

Publish the first final Persian BeatFit article as a complete editorial experience and extend the existing article system so future Persian articles can use the same structure without custom page components.

The website remains Persian-only, RTL, and optimized for Persian search intent.

## Goals

- Publish the final heart-rate-zones article using the supplied Persian copy.
- Use the Persian URL `/blog/زون-های-ضربان-قلب` everywhere.
- Preserve the existing homepage carousel image for this article.
- Allow the homepage title and summary to be updated to match the final article.
- Use `Post-Workout Focus at BeatFit.png` as the article hero image.
- Use `Live Fitness Dashboard in a Modern Gym.png` as an inline article image in the BeatFit product section.
- Add reusable support for rich article elements required by this and future articles.
- Make the article readable and visually consistent on desktop and mobile.
- Give the article Persian-specific SEO metadata and structured data.

## Non Goals

- No English article or multilingual routing.
- No CMS or external content service.
- No redesign of the homepage blog carousel.
- No replacement of the existing homepage carousel image.
- No changes to unrelated website pages.

## Constraints

- Continue using the existing React, TypeScript, Vite, and CSS architecture.
- Preserve the existing BeatFit visual system, RTL direction, Dana typography, and shared header/footer.
- Store article images in the project under descriptive web-safe filenames.
- Treat the supplied final article copy as the content authority.
- Keep medical and safety qualifications intact.

## Approaches Considered

### Reusable rich-content blocks

Extend the article data model with typed blocks for paragraphs, subheadings, bullet lists, tables, images, charts, FAQs, sources, and CTAs. Render every article through the shared article component.

This is the selected approach because more final articles will arrive and should reuse one consistent system.

### Article-specific component

Create a dedicated React component for the first article. This would be quicker for one page but would duplicate layout and styling for future articles, so it was rejected.

## Content Model

The shared article model will retain its existing metadata and add reusable content blocks:

- paragraph with optional inline emphasis
- H2 and H3 headings
- unordered lists
- responsive data tables
- inline figures with image, alt text, and optional caption
- analytical chart for time spent in heart-rate zones
- FAQ group
- source list with external links
- in-article CTA

The final article content excludes editorial notes, publishing checklists, favicon artifacts, and instructions from the supplied handoff file.

## Article Structure

1. Back to Resources link
2. Category pill
3. H1 article title
4. Article summary
5. Hero image
6. Introductory paragraphs
7. Educational H2 and H3 sections
8. First heart-rate-zone reference table
9. Calculation example and zone list
10. Training-goal table
11. Session-distribution chart marked as hypothetical data
12. Inline BeatFit dashboard image
13. Safety and limitations section
14. FAQ section
15. Conclusion and BeatFit CTA
16. Sources and further reading
17. Related articles
18. Page-level demo CTA and footer

## Images

### Homepage carousel

Keep `/beatfitImages/blog-heart-rate-zones.png` unchanged.

### Article hero

- Source: `Post-Workout Focus at BeatFit.png`
- Project filename: `/beatfitImages/articles/زون-های-ضربان-قلب.png`
- Alt: `ورزشکار در حال تمرین با حسگر ضربان قلب نصب‌شده روی بازو`

### Inline BeatFit figure

- Source: `Live Fitness Dashboard in a Modern Gym.png`
- Project filename: `/beatfitImages/articles/نمایش-زون-های-تمرین-در-بیت-فیت.png`
- Alt: `نمایش زنده ضربان قلب و زون تمرینی ورزشکاران در بیت‌فیت`

The source files in Downloads will be copied, not deleted.

## Routing

- Primary article route: `/blog/زون-های-ضربان-قلب`
- Homepage, Resources, and related-article links will use the Persian route.
- The old `/blog/heart-rate-zones` route will redirect to the Persian route so existing references do not break.
- Missing or unpublished articles will continue redirecting to `/resources`.

## SEO

- Browser title: `زون ضربان قلب چیست؟ معرفی ۵ زون و نحوه محاسبه | بیت‌فیت`
- Persian meta description from the supplied final SEO specification.
- Canonical URL for the Persian article route.
- Article-specific Open Graph and Twitter title, description, URL, and image.
- `BlogPosting` structured data with Persian language, publication date, author organization, image, and canonical article URL.
- Page content remains `fa` and RTL.

## Responsive Presentation

- Keep the existing 920px editorial reading column.
- Tables scroll horizontally on narrow screens without clipping.
- Figures use rounded BeatFit styling and preserve their aspect ratio.
- The chart uses accessible text labels and remains legible on mobile.
- Body type, headings, FAQ spacing, sources, and CTAs adapt at the existing mobile breakpoint.

## Verification

- Confirm TypeScript and production build succeed.
- Confirm the Persian route renders directly and the English route redirects.
- Confirm homepage carousel image remains unchanged.
- Confirm both article images load from project assets.
- Confirm article-specific title, description, canonical, social metadata, and JSON-LD.
- Visually inspect the complete article on desktop and mobile.
- Check tables, chart, FAQ, sources, and CTAs for RTL layout and accessibility.

