# SDD ledger — plan: docs/superpowers/plans/2026-11-14-hero-app-link-alignment.md

Setup ruling: the workspace is not a Git repository, so worktree, BASE, commit-range, and automated review-package steps are unavailable; implementation proceeds in the user-provided workspace and is verified by focused tests, production build, browser checks, and a fresh final reviewer.
Pre-flight: one task only; no shared task interfaces.
Task 1: Ruling: CSS outcomes will be verified in the real browser rather than by grepping stylesheet text — this exercises visible behavior and avoids a brittle source-text test — cost if wrong: responsive CSS could regress without the browser verification step.
