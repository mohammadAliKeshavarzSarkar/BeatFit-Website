# Hero App Link Alignment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Align the Hero app link with the desktop footer rails, add its icon, and simplify the mobile Hero by hiding proof cards.

**Architecture:** Render the app link as a direct child of `.bf-hero__frame`, alongside the existing copy and proof rails. Use the existing desktop absolute footer positioning and the current `999px` responsive flex layout to change its order and hide proof cards on smaller screens.

**Tech Stack:** React 19, TypeScript, CSS, GSAP, react-useanimations, Vite

**Spec:** `docs/superpowers/specs/2026-11-14-hero-app-link-alignment-design.md`

## Global Constraints

- Keep `ورود به اپ بیت‌فیت` and `https://app.beatfit.ir` unchanged.
- Reuse `MarketingCtaIcon`; add no dependency.
- Hide proof cards at widths up to `999px` only.
- Preserve all existing Hero content and feature-chip behavior.

## Review Focus

- Desktop widths above `999px`: all three footer items share the same bottom edge.
- Tablet width at `999px`: proof cards are not rendered visually and the app link enters normal flow.
- Narrow mobile widths: no horizontal overflow and adequate spacing between image, copy, and link.
- Keyboard focus: the link retains a visible focus indicator without an underline.
- Reduced motion: link and icon remain visible and usable.

---

### Task 1: Hero footer alignment and responsive behavior

**Files:**
- Modify: `scripts/validate-hero-app-link.mjs`
- Modify: `src/components/Hero.tsx`
- Modify: `src/styles/pages/home.css`
- Test: `scripts/validate-hero-app-link.mjs`

**Interfaces:**
- Consumes: `hero.appLinkLabel`, `hero.appLinkHref`, `MarketingCtaIcon`
- Produces: `.bf-hero__app-link` as a frame-level footer item and `.bf-hero__app-link-icon` for styling

- [ ] **Step 1: Extend the failing contract test**

Assert that the link appears after `.bf-hero__composition`, contains `.bf-hero__app-link-icon`, keeps the exact href and label, has no underline declaration, and that the `max-width: 999px` block hides `.bf-hero__proof`.

- [ ] **Step 2: Run the contract test to verify it fails**

Run: `npm run test:hero-app-link`

Expected: FAIL because the link is still inside the visual, lacks the icon, remains underlined, and proof cards remain visible on small screens.

- [ ] **Step 3: Implement the frame-level app link**

Import `MarketingCtaIcon`, move the anchor after `.bf-hero__composition`, wrap its label, and add an aria-hidden 16px icon on the visual left.

- [ ] **Step 4: Implement desktop and mobile CSS**

Position the link at frame bottom center without text decoration. At `max-width: 999px`, place it in normal flow after copy, hide `.bf-hero__proof`, and tune frame spacing; retain hover and focus colors.

- [ ] **Step 5: Run focused verification**

Run: `npm run test:hero-app-link`

Expected: `Home hero app-link contract passed.`

- [ ] **Step 6: Run build and responsive visual verification**

Run: `npm run build`

Expected: TypeScript and Vite build exit with code 0. Verify 1440px desktop, 999px tablet, and 390px mobile widths without overlap or horizontal overflow.

- [ ] **Step 7: Record completion without a commit**

This workspace is not a Git repository, so no commit step is available.

