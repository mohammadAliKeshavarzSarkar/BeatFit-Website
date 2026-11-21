# SDD ledger — plan: D:\Project\BeatFit\docs\superpowers\plans\2026-11-09-sixth-persian-heart-rate-sensors-article.md

Setup Ruling: This workspace is not a Git repository, so worktrees, commits, and Git-backed review packages are unavailable. Execute in place using RED→GREEN contracts, compiler/build checks, browser verification, and author self-review. Cost if wrong: no Git rollback is available in this folder.

Pre-flight: Task 1 produces the canonical slug and two image assets consumed by Task 2 and browser verification; paths and names match the spec.

Task 1 Ruling: Represent the quick-selection guide with accessible rich lists rather than a chart or new component. Cost if wrong: the guide is less visually diagrammatic, but it remains readable and avoids unsupported precision.

RED evidence: `npm run test:blog:sixth` failed before implementation because the canonical Persian sensor-comparison slug was absent.

GREEN evidence: the focused sixth-article contract and `npx tsc -b` passed after registering the article, copying both assets, and adding the discovery cards.

Browser evidence: `/resources` exposes the new athlete card; the canonical article renders in Persian RTL with the expected SEO title and description, a loaded hero and inline image, one 9-row comparison table, no chart, 7 FAQ items, 8 external sources, both related-article links, and the athlete CTA. The homepage card links to the same canonical route and uses the supplied hero while the first five card definitions remain unchanged.

Final verification: all six blog contracts and `npm run build` exited successfully. Vite reported only its existing advisory that the main JavaScript chunk exceeds 500 kB.

Review ruling: author self-review found no blocking correctness, SEO, routing, asset, or responsive-layout issue. Independent subagent review was not available under the active no-delegation constraint, and Git-backed review was unavailable because `D:\Project\BeatFit` is not a Git repository.
