# Learning Doc — Animorio “The loader that becomes a logo”

Source: [Animorio — The loader that becomes a logo](https://animorio.com/en/animations/loader-that-becomes-a-logo/)  
Inspired by the entrance idea on bleibtgleich.dev (Maksym Bleibtgleich); Animorio rebuilt code, copy, and assets.  
License (Animorio): free on your own / client sites (paid work included). **Not** for resale, redistribution, templates, or code collections. GSAP remains under its own license.

This document is a BeatFit-side study note: what the animation does, how each technique works, which knobs matter, and how we would adapt it later. It is **not** a drop-in of the demo into production.

---

## 1. What the visitor experiences

One continuous entrance sequence:

1. **Count** climbs `0 → 100` (percent) in a clipped mask.
2. **Vertical rule** (“binario”) grows from top to full height, splitting the layout into two columns.
3. At ~100%: the **number exits** upward out of its mask.
4. **Corner controls** (grid + menu) slide in diagonally from off-screen.
5. **Logo** appears as a solid rectangle revealed with `clip-path` from the top, then **MorphSVG** bends that rectangle into the final mark path.
6. **Copy lines** resolve one by one from heavy SVG blur + alpha threshold (“ink blot → letter”).
7. A **Replay** control fades in (demo utility; usually omit or gate on a real site).

**When to use (Animorio guidance):** first-visit brand / portfolio entrance. Not on every route revisit — second visit should show the settled logo.

**Reduced motion:** skip the sequence; logo, buttons, and text are already in place (`fermo` class).

---

## 2. Scene graph (DOM roles)

| Role | Class / attr | Job |
| --- | --- | --- |
| Filter host | `.filtri > defs` | Empty SVG; script injects one filter per text line |
| Corner chrome | `.angoli` / `.angolo` | Fixed header actions; start hidden, enter after count |
| Left column | `.sinistra` | Logo + meta + counter |
| Rail | `.binario` | 1px vertical rule; height `0 → 100%` |
| Right column | `.destra` | Meta, name, lead phrase |
| Logo wrap | `.marchio` | Clip-path reveal host |
| Logo path | `.marchio__forma` | Starts as rectangle `d`; final path in `data-forma` |
| Counter | `.conta` / `.conta__riga` / `.conta__cifre` | Overflow-clipped digit row |
| Ink targets | `[data-inchiostro]` | Split into lines, each filtered |
| Replay | `.rivedi` | Hidden until sequence ends |

Layout: CSS grid `3fr | 1px | 7fr` (desktop), tighter `1fr | 1px | 3fr` under `700px`. Page uses Mona Sans Variable in the demo; BeatFit would keep Dana / design tokens instead.

---

## 3. Dependencies

| Package | Role |
| --- | --- |
| `gsap` (~3.15) | Timeline, tweens, `attr` plugin usage |
| `MorphSVGPlugin` | Rectangle → logo path morph (**GSAP Club / paid plugin**) |
| `SplitText` | Split blocks into `.riga-inchiostro` lines (**GSAP Club / paid plugin**) |
| `@gsap/react` + `useGSAP` | React scope, cleanup, Strict Mode safety |
| `@fontsource-variable/mona-sans` | Demo typography only |

BeatFit already has `gsap` and `@gsap/react`. **MorphSVG + SplitText are not free npm defaults** — adapting this pattern requires a Club license (or a redesigned substitute without those plugins).

React cleanup pattern from the demo:

- Snapshot `container.current.innerHTML` at start of `useGSAP`.
- On unmount: kill timeline, restore markup so filters / SplitText wrappers do not leak across remounts.

Vue equivalent: `gsap.context(..., container)` + `ctx.revert()` on `onBeforeUnmount`.

---

## 4. Timeline architecture

Pseudo-structure (shared React / Vue logic):

```
t = 0
  binario.height → 100%     duration CONTEGGIO+0.5   ease CURVA (power3.inOut)
  conta__riga y% 100 → 0    duration 0.7             ease expo.out   @ 0.05
  { n: 0 → 100 }            duration CONTEGGIO       ease CURVA
                            onUpdate → digits text

fine = CONTEGGIO + 0.1
  conta__riga y% → -105     duration 0.55            ease expo.in    @ fine

fine + 0.15
  angoli autoAlpha = 1
  angolo[0] from (-FUORI,-FUORI) → (0,0)  duration 1  expo.out  immediateRender:false
  angolo[1] from (+FUORI,-FUORI) → (0,0)  duration 1  expo.out  immediateRender:false

fine + 0.2
  marchio autoAlpha = 1
  marchio clipPath inset(bottom 100%) → inset(0)  duration 0.75  expo.out

fine + 0.8
  forma morphSVG → data-forma              duration 1.2   expo.inOut

fine + 0.35 + i * SFASATURA   (per ink line)
  line opacity 1 + filter url(#inchiostro-i)
  feGaussianBlur stdDeviation (h*SFOCATURA) → 0   duration 1.25  power2.out
  onComplete → filter: none

+= 0.4 after last work
  show .rivedi (fade / slide up)
```

`azzera()` (reset) before every run / replay:

- Kill previous `tl`
- Digits → `"0"`
- Rail height `0`
- Counter row `yPercent: 100`
- Corners `autoAlpha: 0`
- Logo `autoAlpha: 0` + `clipPath: inset(0% 0% 100% 0%)`
- Path `d` restored to **saved rectangle** (`RETTANGOLO`)
- Ink lines `opacity: 0`, `filter: none`
- Hide replay

Critical: **store the rectangle `d` before MorphSVG**. Replay must restore the rectangle; otherwise MorphSVG starts from the already-morphed path.

---

## 5. Technique deep-dives

### 5.1 Count + rail (synchronized progress metaphor)

- Tween a plain object `{ n: 0 }` → `100` and round into the DOM on update (avoids digit-jump jitter from textContent alone).
- Same ease + similar duration as the rail so **progress feels physical**, not decorative.
- Counter lives inside `overflow: clip`; enter/exit use `yPercent` so the mask does the wipe — no extra SVG.

**Production tip (Animorio):** on a real site, bind `CONTEGGIO` to real asset readiness (fonts/images) with a **minimum** duration so the sequence never flashes.

### 5.2 Corner buttons (readiness cue)

- Start far off-diagonal (`FUORI`: `6vw` desktop / `25vw` mobile).
- `immediateRender: false` on `fromTo` so initial off-screen transforms apply **only when that tween starts** — otherwise mobile would flash buttons at the wrong place during the count.
- Visibility: CSS `visibility: hidden` + GSAP `autoAlpha`.

### 5.3 Rectangle → logo (two-stage brand birth)

1. **Reveal:** `clip-path: inset(0 0 100% 0)` → `inset(0)` (uncover top → bottom).
2. **Morph:** MorphSVG from rectangle path to `data-forma`.

Why rectangle first: a simple equal-topology start makes the morph **readable** — you see a block bend into the mark, not a random path scramble.

Adaptation for BeatFit: redraw the BeatFit mark inside the **same viewBox** (`96 × 160` in the demo, or a new shared box), set as `data-forma`, keep a simple start path (rect or rounded rect) with compatible point structure when possible.

### 5.4 Ink lines (blur + threshold)

Per `[data-inchiostro]` block:

1. Wait for `document.fonts.ready` (line breaks must match final font).
2. `SplitText.create(el, { type: 'lines', linesClass: 'riga-inchiostro' })`.
3. For each line, append an SVG filter:

```
feGaussianBlur(in=SourceGraphic, stdDeviation=animated)
feColorMatrix(type=matrix, values=`1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  ${SOGLIA}`)
```

`SOGLIA` default `'0 0 0 22 -8'` is the **alpha row** of the color matrix: high multiplier + bias creates a hard threshold. Strong blur + threshold = soft ink blobs; blur → 0 = letters resolve.

Filter region must be enlarged (`x/y/width/height`) or the blur is clipped into a hard rectangle.

After each line finishes: **`filter: none`** — thresholded edges look slightly harsh if left on, and filters on large type are expensive (especially mobile).

Stagger: `SFASATURA` (default `0.09s`) between lines.

### 5.5 Fonts gate

`pageFontsReady = document.fonts.ready` then `avvia()`:

- Build SplitText lines
- If `prefers-reduced-motion: reduce` → add `.fermo`, set final path `d`, return
- Else bind replay click + run `sequenza()`

Without the fonts gate, fallback metrics split lines differently and ink filters blur the wrong bands.

---

## 6. Tunable constants

| Name | Default | Meaning |
| --- | --- | --- |
| `CONTEGGIO` | `2.2` | Seconds to reach 100; also drives rail pacing |
| `SFOCATURA` | `0.32` | Initial blur as fraction of line height |
| `SOGLIA` | `'0 0 0 22 -8'` | Alpha threshold matrix row (edge hardness / blot point) |
| `SFASATURA` | `0.09` | Delay between ink lines |
| `FUORI` | `6vw` / `25vw` | Corner button travel distance |
| `CURVA` | `'power3.inOut'` | Shared ease for count + rail |
| `data-forma` | sprout path | Final logo SVG path (same viewBox as start) |

CSS tokens in the demo (`--carta`, `--inchiostro`, `--tenue`, `--accento`) map conceptually to BeatFit `--bf-white` / `--bf-forest` / muted / accent — **do not** ship Mona Sans or the demo palette into BeatFit.

---

## 7. Accessibility & performance

- Counter is `aria-hidden`; real content is the ink text + logo.
- Decorative SVG filters: `aria-hidden` / `focusable="false"` on `.filtri`.
- Honor `prefers-reduced-motion`.
- Keep ink filters for entrance only; strip after settle.
- SVG filters on large display type are heavy on phones — Animorio keeps them for entrance only; BeatFit should do the same or soften (fewer lines, shorter blur).

---

## 8. Pitfalls checklist (from Animorio + code review)

1. Split text **only after** `document.fonts.ready`.
2. Expand filter region so blur is not clipped.
3. Remove filters when idle (`filter: none`).
4. Cache starting path `d` before morph; restore on reset/replay.
5. Use `immediateRender: false` on late `fromTo` corner tweens.
6. Scope GSAP to a container; revert / restore markup on leave (SPA safe).
7. Do not replay MorphSVG from the already-final path.
8. Club plugins: verify MorphSVG + SplitText availability before committing to this exact recipe.

---

## 9. React vs Vue differences (same choreography)

| Concern | React (`useGSAP`) | Vue 3 |
| --- | --- | --- |
| Scope | `{ scope: container }` | `gsap.context(fn, el)` |
| Cleanup | Restore `innerHTML` snapshot + kill tl | `ctx.revert()` |
| Mount gate | `mounted` flag around fonts promise | Same idea in closure |
| Markup | JSX with `data-inchiostro=""` | Template `data-inchiostro` |

Logic of `preparaRighe` / `azzera` / `sequenza` / `avvia` is intentionally shared.

---

## 10. BeatFit adaptation map (future work)

Goal: reuse the **grammar**, not the demo brand, Italian copy, Mona Sans, or corner chrome.

| Demo piece | BeatFit direction |
| --- | --- |
| Count 0–100 | Optional first-visit splash; or map to real boot (video poster / critical CSS / fonts) |
| Binario rail | Could echo home journey spine / forest hairline; or omit if splash is full-bleed hero |
| Morph logo | BeatFit mark path in a fixed viewBox; start from simple rect / capsule |
| Ink text | Persian Dana lines — **RTL + SplitText line splitting must be verified**; may need alternate reveal if SplitText RTL is weak |
| Corner buttons | Map to real Header (logo / CTA), or drop and let Header mount after splash |
| Replay | Dev-only or omit |
| Palette / type | `--bf-*` tokens + Dana only |
| Reduced motion | Jump to settled home (header + hero visible) |

Suggested product placement options (decide later):

1. **App shell splash** once per session (overlay → home).
2. **Hero brand moment** integrated into first viewport (lighter: morph + short ink only).
3. **Technique borrowing only** — ink-line reveal or morph mark used in smaller section intros without the full loader.

### Minimal BeatFit “technique kit” if Club plugins are unavailable

- Rail + count: pure GSAP core (already licensed via npm `gsap`).
- Logo reveal: CSS `clip-path` / mask without MorphSVG (swap SVG symbols, or FLIP scale).
- Ink: approximate with CSS `filter: blur()` + opacity stagger, or canvas — weaker, but free.

---

## 11. Named Italian identifiers → English meaning

| Italian id | Meaning |
| --- | --- |
| `binario` | Vertical rule / rail |
| `marchio` / `forma` | Mark / shape path |
| `conta` / `cifre` / `riga` | Counter / digits / row |
| `angoli` / `angolo` | Corners / corner button |
| `inchiostro` | Ink (text reveal) |
| `rivedi` | Replay |
| `fermo` | Reduced-motion settled state |
| `CONTEGGIO` | Count duration |
| `SFOCATURA` | Blur amount |
| `SOGLIA` | Threshold matrix |
| `SFASATURA` | Line stagger |
| `FUORI` | Off-screen travel |
| `CURVA` | Shared ease |
| `preparaRighe` | Prepare lines + filters |
| `azzera` | Reset |
| `sequenza` | Run timeline |
| `avvia` | Start after fonts |

---

## 12. Implementation readiness (BeatFit)

Before coding into the site:

- [ ] Confirm GSAP Club access for MorphSVG + SplitText (or choose free substitutes).
- [ ] Export BeatFit logo path into a shared viewBox; validate morph quality.
- [ ] Prototype Persian ink lines with SplitText RTL; fall back if line breaks fail.
- [ ] Decide first-visit only vs every load; wire to sessionStorage / route.
- [ ] Map overlay end → Header + Hero visibility (no double logo flash).
- [ ] Match duration to real loading budget; keep reduced-motion path.
- [ ] Keep Animorio attribution / license note in source header if shipping derived code.

---

## 13. One-sentence mental model

**A synchronized progress meter (digits + growing rule) hands off to a brand birth (clipped rectangle → morph mark) while copy resolves from thresholded blur, then the chrome settles — all gated on fonts and reduced motion.**
