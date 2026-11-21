# SDD ledger — plan: D:\Project\BeatFit\docs\superpowers\plans\2026-11-08-persian-rich-blog-article.md

Setup Ruling: The workspace is not a Git repository, so worktree detection, task-start commit bases, task-done commit ranges, and final branch review packages are unavailable. Execute in place with per-task RED→GREEN evidence, production builds, browser verification, and an author self-review. Cost if wrong: changes cannot be isolated or reverted through Git in this folder.

Pre-flight: Task 1 produces BlogContentBlock and BlogContentBlocks; Task 2 consumes both — interfaces match.
Pre-flight: Task 2 produces canonical Persian post data and resolveBlogSlug; Task 3 consumes post SEO fields and canonical routing — interfaces match.
Pre-flight: Tasks 1–3 produce the implementation Task 4 verifies — interfaces match.

Task 1 complete. Added typed rich-content blocks, semantic renderer, and responsive styling for headings, notes, lists, tables, figures, charts, FAQ, sources, and CTA blocks. GREEN evidence: `npx tsc -b` exited 0.

Task 2 complete. Added the full Persian article, canonical Persian slug, English alias, both supplied images, updated Resources cards, and preserved the existing homepage card image. RED evidence: initial validator failed with `Persian canonical slug is missing`. GREEN evidence: `npm run test:blog` printed `First Persian blog content contract passed.`

Task 3 complete. Added canonical, description, Open Graph, Twitter, BlogPosting, and FAQPage metadata with cleanup on route changes; wired English-to-Persian canonical redirect. Browser evidence: old URL resolved to `/blog/زون-های-ضربان-قلب`; inspected metadata showed `fa_IR`, the supplied Persian description, canonical Persian URL, and FAQPage JSON-LD.

Task 4 complete. Production build succeeded. Browser checks covered the Resources featured/card links and image, article hero, rich content, chart, inline image, legacy redirect, SEO metadata, and homepage card link/image preservation.

