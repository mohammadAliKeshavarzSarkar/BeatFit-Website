# Hero App Link Alignment Design

## Intent

Make the home Hero footer read as one balanced row on desktop: proof cards on the left, the app entry link in the center, and the Persian copy on the right. On smaller screens, remove the proof cards so the image, copy, and app link have comfortable vertical spacing.

## Requirements

- Keep the label `ورود به اپ بیت‌فیت` and destination `https://app.beatfit.ir`.
- On desktop, align the bottom edge of the app link with the bottom edge of the Hero copy and proof cards.
- Remove the link underline and add the existing animated outbound-arrow icon on the visual left of the Persian label.
- At widths up to `999px`, hide the Hero proof-card rail entirely.
- On small screens, flow the app link after the Hero copy with clear vertical spacing and no horizontal overflow.

## Approach

Move the link out of the image overlay and make it a direct child of the Hero frame. The frame already owns the two desktop footer rails, so all three items can share `bottom: 0`; at the existing `999px` breakpoint, CSS ordering can place the link after the copy while hiding the proof rail.

Keeping the link inside the image and tuning offsets was rejected because its alignment would vary with viewport height and image scaling.

## Constraints

- Reuse `MarketingCtaIcon`; do not add a new icon dependency or custom SVG.
- Preserve the current Hero animation, Persian copy, image assets, and desktop feature chips.
- Do not change the separate app hosted at `app.beatfit.ir`.

