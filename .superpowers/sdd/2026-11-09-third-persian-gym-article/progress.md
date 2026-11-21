# SDD ledger — plan: D:\Project\BeatFit\docs\superpowers\plans\2026-11-09-third-persian-gym-article.md

Setup Ruling: The workspace is not a Git repository, so isolated worktrees, commit ranges, and Git-backed review packages are unavailable. Execute in place, preserve unrelated files, and use RED→GREEN content contracts, production builds, browser checks, and an author self-review. Cost if wrong: these changes cannot be reverted through Git in this folder.

Pre-flight: Task 1 produces the canonical gym slug and hero asset consumed by Task 2; names and paths match the spec.

Task 1 Ruling: This project has no unit/integration test runner; use the established executable content-contract convention plus compiler and browser behavior checks. Cost if wrong: the validator inspects source contracts rather than mounting React, so browser verification remains required for rendering behavior.

Task 1 Complete: RED confirmed with `Canonical gym slug is missing`; GREEN confirmed with `npm run test:blog:third` and `npx tsc -b`. Added the reusable semantic process block, complete Persian article, canonical post registration, legacy alias, and both copied image assets.

Task 2 Complete: Updated homepage text/href while preserving `/beatfitImages/blog-club-data-flow.png`; updated both Resources links and assigned the supplied hero to the primary gym card. All three article contracts and `npm run build` pass.

Browser Evidence: Verified `/resources`, canonical Persian article, legacy redirect, and homepage at `127.0.0.1:5173`. Observed correct H1/title/meta/canonical, `lang=fa`, `dir=rtl`, 4 process steps, 2 tables, 7 FAQ entries, 7 source links, FAQ JSON-LD, working internal links and CTA, both images loaded with non-zero natural widths, canonical redirect, and the preserved homepage image.

Review Ruling: The requesting-code-review skill normally dispatches a reviewer, but the active collaboration instruction forbids subagents unless explicitly requested. Performed the same checklist as a read-only author review instead. No Critical, Important, or Minor implementation issues found. The supplied editorial/scientific article was integrated as provided and was not independently fact-checked in this implementation pass.

