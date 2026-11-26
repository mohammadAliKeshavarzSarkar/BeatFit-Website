# BeatFit image ALT and asset naming audit

Source-only review at main 3c9d2a1a208fa5639733808621b1b9daec1bdb8b. No production edits or image renames. GitHub WebP blob retrieval failed UTF-8 decoding; image pixels were not inspected. Proposed ALT descriptions are conditional on visual verification, never established as actual pixel contents. The local athlete kettlebell hero was not in reviewed main.

## Standards
Use natural Persian, canonical بیت‌فیت, concise description of the actual image and its purpose. Decorative or redundant images use alt=""; functional images/links must have accessible names. Meaningful diagrams/screenshots need equivalent information. Do not add keyword lists, unverified hardware/features, hidden keyword text or arbitrary alt length/density targets. Maintain consistent image content descriptions across repeated placements unless purpose differs.

## Naming
New UI assets under /assets/{coach,gym,athlete,product,home,contact}/, English lowercase kebab-case .webp; established Persian product/article filenames may remain. Existing /beatfitImages/athlete/, /beatfitImages/articles/ and mixed legacy root remain unchanged. No bulk rename purely for SEO. For any approved migration, audit all source, CSS, metadata, structured data, generated HTML and deployment references; preserve compatibility/redirects where feasible, verify exact Unicode and case, no broken URLs. Identical Git blob 661b4b93568aa101b67e22efaeea3fff0549760a at /assets/product/مچبند-نئون-بیت-فیت.webp and /beatfitImages/مچبند-ضربان-قلب-بیت-فیت.webp; no deletion until references verified.

## Implementation findings
See findings.csv. Source ALT inventory lists configured fields, not a complete DOM inventory; repeated asset references deliberately retained. Resources catalog thumbnail uses alt="" and redundant hidden link despite content alt; this may be correct. Coach carousel primary face descriptive, others hidden. Header/footer logos have named home links. Decorative hero mark, role portraits, paths and icons need not be filled. Whole activity marquee is hidden including captions; verify accessible equivalent. Repeated athlete phone and coach screens require context review.

## Acceptance
Visual review each meaningful image against proposed ALT; verify product nomenclature. Check generated and hydrated markup, missing versus intentionally empty ALT, accessible link names, redundant content, no hidden meaningful information, responsive and keyboard/screen-reader behavior. Verify local hero asset and alt together. Use existing build/SEO checks and actual browser review after implementation. No ranking claim, no live crawl or accessibility tests performed. No production changes authorized.

Files: source-alt-inventory.csv, findings.csv. Continue Phase 17 after review; do not treat every non-empty alt as required.
