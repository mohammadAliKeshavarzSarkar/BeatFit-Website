# Seventh Persian Group-Class Design Article — Design

## Intent

Publish the supplied seventh Persian article for coaches as a new, discoverable BeatFit resource. It should teach coaches how to design one group class for athletes with different readiness levels while preserving the article author's safety caveats and BeatFit's role as an information tool rather than an automatic program designer.

## Goals

- Use the canonical Persian route `/blog/طراحی-تمرین-گروهی` with the supplied Persian SEO title and description.
- Preserve the full educational arc, including movement scaling, a complete 45-minute example, execution guidance, seven FAQs, and seven sources.
- Present the five-step class-design guide with the existing process component.
- Present movement alternatives and the 45-minute plan as responsive tables; add no statistical chart.
- Use `BeatFit Strength Training Portrait.png` as the hero and the existing real BeatFit coach panel `public/assets/gym/eco-panel.png` inside the product section.
- Add a seventh coach card to Home and Resources while preserving the first six Home card images.

## Non-goals and anti-goals

- No English route or alias.
- No new visual component or stylesheet unless the existing rich blocks prove insufficient.
- No claim that BeatFit designs programs automatically or that heart rate alone describes muscular load.
- No presentation of the 45-minute example as a universal prescription.
- Do not move or delete the user's source image.

## Approach

Use the established rich-blog content model. Alternatives considered were a bespoke interactive class planner and a prose-only article; the first adds unnecessary product behavior and the second loses the supplied practical structure. The selected approach reuses `process`, `table`, `figure`, `faq`, `sources`, and `cta` blocks, which is consistent with the preceding Persian articles and already responsive.

## Content and discovery decisions

- New source module: `src/content/blog/groupClassDesign.ts`.
- Hero asset: `public/beatfitImages/articles/طراحی-تمرین-گروهی.png`.
- Inline product asset: `/assets/gym/eco-panel.png` with honest alt text describing the coach panel.
- Internal links target group-class intensity, heart-rate zones, and training history.
- CTA targets `/coach`.
- Home card uses the supplied hero because this is a new seventh card; all existing six images remain unchanged.

## Verification

A focused validator must fail before implementation and then prove the canonical route, metadata, content blocks, internal links, CTA, discovery cards, preserved Home images, and both image assets. The full seven-article suite, TypeScript build, production build, and browser rendering complete the verification.
