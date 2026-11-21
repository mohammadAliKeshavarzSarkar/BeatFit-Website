# Learning Doc — Animorio “The one-stroke logo”

Source: [Animorio — The one-stroke logo](https://animorio.com/) (Playground folder `one-stroke-logo`, updated 10 Nov 2026)  
Local study copy: `D:\Project\caseStudyCode\one-stroke-logo-playground\one-stroke-logo`  
License (Animorio): free on your own / client sites (paid work included). **Not** for resale, redistribution, templates, or code collections. GSAP remains under its own license.

This document is a BeatFit-side study note: what the animation does, how each technique works, which knobs matter, and how we would adapt it as a **first-visit home entrance overlay** (not a separate route). It is **not** a drop-in of the demo into production.

---

## 1. What the visitor experiences

One continuous brand entrance on an empty stage:

1. **Blue square nib** slides in from the left, trailing a thin black hairline.
2. The nib **traces every letter outline** (and holes) without lifting — like a plotter — then runs a short straight **link** to the next outline.
3. When the last outline closes: joining stretches are **sucked into** the letters and vanish; the hairline **thickens inward** until each letter fills, left → right; each filled letter **swells ~1px** and settles.
4. Meanwhile the nib **detaches**, grows to full-stop size, rises and spins, then **drops** to the right of the word as the period.
5. Landing: **squash**, two **bounces**, elastic settle; nearby letters **dip** under the blow and spring back.
6. On show: a blue **glint** runs once around a letter; the square hops in reply.
7. If looping: square jumps away, letters empty back to line, line **unwinds**, sequence restarts. Click/tap replays.

**Word or picture:** `NAME` (type) or `IMAGE` (raster). With an image, the line traces dark/coloured pixels and thickening reveals the real colours through a mask.

**When to use (Animorio guidance):** minimal logo intro — almost nothing on stage but a line and a square. Ideal for a first-load brand moment.

**Reduced motion:** no draw/fill/bounce; logo fades in already filled, then the full stop appears.

---

## 2. Scene graph (DOM roles)

| Role | Attr / class | Job |
| --- | --- | --- |
| Stage | `svg.palco[data-stage]` | Full-window SVG; `viewBox = window` so 1 unit ≈ 1 CSS px |
| Defs | `[data-defs]` | Per-piece `clipPath` (+ picture `mask`) |
| World | `[data-world]` | Root group (opacity for reduced-motion fade) |
| Picture | `[data-picture]` | Optional masked `<image>` logo |
| Pieces | `[data-pieces]` | One `<g>` per outer outline (letter / shape) |
| Links | `[data-links]` | Lead-in + straight joins between outlines |
| Glint | `path.scia[data-glint]` | Accent dash that runs around one outline at rest |
| Nib | `[data-nib]` / `rect.punto` | Square pen tip → full stop |

Per piece (built in JS):

- `clipPath#piece-i` — outer + holes, `clip-rule: evenodd`
- `.tratto` — visible outline stroke (thins to 0 while filling)
- `.riempi` — clipped “inner half” stroke that thickens to fill
- `.filo` — link / lead-in path

Demo chrome: pale grey ground, Syne Variable 800, click-to-replay hint. BeatFit would use `--bf-*` + Dana / mark asset, and hide replay in production.

---

## 3. Dependencies

| Package | Role |
| --- | --- |
| `gsap` (~3.15) | Single timeline + `onUpdate: place`; core only |
| `@gsap/react` + `useGSAP` | React scope, cleanup, Strict Mode |
| `@fontsource-variable/syne` | Demo face only (canvas must match CSS font) |

**No MorphSVG / SplitText.** Outline comes from canvas + marching squares in plain JS. BeatFit already has `gsap` + `@gsap/react`.

React cleanup pattern from the package:

- Snapshot `container.current.innerHTML` at start of `useGSAP`.
- Track `mounted`, kill timelines / idle / resize delay on unmount, restore markup.
- Prefer scoping queries to the container (demo still uses a few `document.querySelector` calls — fix that in BeatFit).

Vue: `gsap.context` + `ctx.revert()` on `onBeforeUnmount`.

---

## 4. Pipeline overview (offline → runtime)

```
fonts.ready + optional IMAGE load
  → traceShape()     canvas raster → field → marching squares → pieces + depth
  → start()
       → build()     layout into SVG paths, order, weights, nib home
       → story() or quiet()
            timeline drives S.pen.u, nib.*, piece dy/sc, dash windows
            every frame → place() writes only changed SVG attrs
```

Mental model: **geometry is computed once (or on resize); the timeline only animates a handful of numbers; `place()` is the sole renderer.**

---

## 5. Technique deep-dives

### 5.1 Canvas → density field

- Draw word (`fillText` per glyph with `TRACK` spacing) or `drawImage` into an offscreen canvas.
- Each pixel → `0…1` (word: alpha; image: luminance-ish × alpha, with fallbacks for light-on-transparent and CORS failure → solid rect).
- Force a zero border so every outline closes.
- **Marching squares** at threshold `0.5`, with in-pixel interpolation → smooth closed polylines.
- **Ramer–Douglas–Peucker** simplify; drop tiny loops by area vs `unit²`.
- Nesting: even depth = outer piece, odd = hole; attach holes to smallest enclosing parent.
- Busy images: cap outers (30) and holes per outer (6).

### 5.2 Depth (fill thickness budget)

BFS distance transform from “ground” (`value < 0.5`) into inked pixels (city-block). Each outer keeps `deep` = max distance inside its bbox. Fill stroke grows to roughly `2 * deep` (scaled) so thin letters fill later/sooner appropriately — **not** one global thickness.

### 5.3 Single stroke ordering

1. Sort pieces left → right.
2. Each outline forced **clockwise** (screen Y-down: positive area).
3. Rotate each polyline so it starts at the point **nearest the current pen** (first outline: leftmost).
4. Insert a short **link** from previous end → new start (lead-in from off-left for the first).
5. Build one ordered road: links + loops, each with a **weight** (links weighted shorter so they draw faster).
6. Normalized `u ∈ [0,1]` maps through weights → arc length `s`; each path reveals `[0, b]` via dash.

### 5.4 Dash without ghost dots

`dash(el, a, b, len)`:

- If `b - a ≈ 0` → `visibility: hidden` (round caps would still paint a zero-length dash as a dot).
- Else `stroke-dasharray` / `stroke-dashoffset` with `pathLength = measured length`.

### 5.5 Fill = clipped thickening stroke

For word mode, each piece has:

1. Outline `.tratto` — stroke width → 0 while filling (`o` multiplier).
2. Fill twin `.riempi` — same `d`, clipped to the piece; stroke width → `piece.end`.

Result: ink grows from the edge inward; the remaining edge is exactly the outline. Picture mode uses the same thickening strokes as **white** strokes inside a `mask` over the real image.

### 5.6 Nib / full stop

State on `S.nib`: `{ follow, x, y, r, s, sx, sy }`.

- While `follow`: position = `pointAt(all, cum, s)`; rotation from tangent, **modulo 90°** (square symmetry).
- After last outline: `follow = 0`; grow `s → 1`, arc to `(px, land)` timed to fill duration so land coincides with last letter full.
- Squash uses bottom pivot: `translate(y + lift)` with `lift ∝ (1 - sy)` so the square spreads on the baseline.
- `dip()`: letters (or whole picture) sink by distance-weighted delay from the landing x, then `elastic.out`.

### 5.7 Timeline labels

| Label | Meaning |
| --- | --- |
| `start` | Pen begins (`pen.u` 0 → 1 over `DRAW`) |
| `reveal` | Last outline done; nib detaches; links retract; fill begins |
| `land` | Nib hits full-stop seat; squash + bounce + dip |
| `rest` | Logo on show; optional glint |
| `leave` | Only if `LOOP`: jump away, empty, unwind, `start()` again |

`timeScale(SPEED)` on the whole timeline. Resize: debounce; if past `reveal`, resume at `'rest'`, else from `0`. Ignore tiny mobile viewport height jitter (`|ΔH| < 120`).

### 5.8 `place()` as renderer

Single `onUpdate` writer. `put(node, attr, value)` memoizes strings so unchanged attrs are not touched every frame — important because many paths update per tick.

---

## 6. Tunable constants

| Name | Default | Meaning |
| --- | --- | --- |
| `NAME` | `'odalo'` | Word logo (ignored if `IMAGE` loads) |
| `IMAGE` | `''` | Picture URL / data URL |
| `DRAW` | `4` | Seconds to trace the whole road |
| `LINE` | `1` | Hairline scale (1 = thin, 2 = 2×) |
| `FILL` | `true` | Thicken to solid letters; `false` = outline only |
| `BOUNCE` | `1` | Landing bounce height scale (`0` = dead land) |
| `SPEED` | `1` | Timeline `timeScale` |
| `REST` | `4` | Hold before unwind / calm glint |
| `LOOP` | `true` | Unwind and redraw; `false` stays + periodic glint |
| `TRACK` | `0.035` | Em letter-spacing so glyphs stay separate outlines |

CSS tokens in the demo (`--ground`, `--ink`, `--accent`, `--hint`) map to BeatFit splash tokens — **do not** ship Syne or the demo blue into production.

---

## 7. Accessibility & performance

- Stage has `role="img"` and dynamic `aria-label`.
- Honor `prefers-reduced-motion` via `quiet()`.
- Tracing cost: canvas + marching squares on large type/images — run once per build/resize, not every frame.
- Cap piece counts on complex images.
- Attribute memoization in `place()` keeps SVG churn down.
- Fonts must be loaded before `traceShape()` or outlines use fallback metrics.

---

## 8. Pitfalls checklist (from Animorio + code review)

1. **Zero-length dash + round caps = ghost dots** — hide empty / erased stretches completely.
2. **Unclipped thicken bloated letters** — fill stroke must be clipped to the piece; outline thins to zero.
3. **One global fill width** — thin letters fill too soon; use per-piece `deep`.
4. **Fixed nib flight** — land when the last letter finishes filling; flight duration follows piece count.
5. Trace **after** `document.fonts.load` for the stage face.
6. CORS-tainted images cannot be read — demo falls back to a rectangle; BeatFit should serve same-origin logo assets.
7. Resize: rebuild geometry; don’t restart from scratch mid-show if possible (seek `'rest'`).
8. Scope DOM queries to the component root in SPA (demo uses global `$`).
9. For BeatFit first visit: **disable `LOOP`**, omit click-replay, exit overlay when rest begins (or shortly after land).

---

## 9. React vs Vue vs vanilla

| Concern | Vanilla | React | Vue 3 |
| --- | --- | --- | --- |
| Entry | `script.js` + `index.html` | `TheOneStrokeLogo.jsx` + CSS | `TheOneStrokeLogo.vue` |
| Scope | page | `useGSAP` + innerHTML restore | `gsap.context` + `revert` |
| Fonts | `document.fonts.load` | gated on `mounted` | same |
| Logic | shared story / build / place | same body inlined | same body inlined |

Choreography is intentionally identical across ports.

---

## 10. BeatFit adaptation map (home first-visit loader)

Product intent (from product request):

- **Home only** (`/`).
- **First visit only** (e.g. `sessionStorage` / `localStorage` flag — decide session vs forever).
- **Not a route** — an **overlay** on top of (or instead of) the first paint of Home, then reveal the real page underneath.
- After the logo settles → dismiss overlay → Header + Hero already there (no second logo flash).

| Demo piece | BeatFit direction |
| --- | --- |
| `NAME: 'odalo'` | Prefer **`IMAGE`** = BeatFit mark / wordmark asset (or `NAME: 'BeatFit'` only if canvas typeface matches brand) |
| Syne 800 | Not used if IMAGE mode; if word mode, use a loaded BeatFit display face |
| `--ground` / `--ink` / `--accent` | `--bf-white` or soft gray ground; `--bf-ink` / `--bf-forest` for stroke + nib |
| `LOOP: true` | **`false`** for production entrance |
| `REST` + glint | Short rest (or skip glint); then fade overlay out |
| Click replay | Dev-only / omit |
| Full viewport `.scena` | Fixed overlay `inset: 0; z-index` above home, `pointer-events` until done |
| Reduced motion | Instant settled mark → short fade → show home |

Suggested handoff choreography:

1. Mount Home under the overlay (or mount after settle — prefer under so assets warm).
2. Run one-stroke with `LOOP: false`, `FILL: true`, tuned `DRAW` / `SPEED` (~2–3s feel, not 8s).
3. On `rest` (or `land` + short beat): fade overlay `autoAlpha → 0`, set visit flag, unmount overlay.
4. Ensure Header logo does not also “birth” on the same frame (settle Header mark visible only after overlay gone, or keep Header hidden until dismiss).

### First-visit gating sketch

```
if (path !== '/') skip
if (storage.get('bf-home-intro') || prefers-reduced-motion) skip overlay
else show overlay → on complete storage.set(...) → reveal home
```

### Technique kit if we simplify further

- Keep: canvas trace + dash draw + nib (core brand moment).
- Soften: skip fill thicken; or skip bounce/dip; or use a pre-authored SVG path instead of marching squares if the mark is a single known path.
- Still free GSAP core only.

---

## 11. Named Italian / demo identifiers → English meaning

| Id | Meaning |
| --- | --- |
| `scena` / `palco` | Scene / stage SVG |
| `tratto` | Outline stroke |
| `riempi` | Fill (thickening) stroke |
| `filo` | Link / lead-in stroke |
| `scia` | Glint trail |
| `punto` | Nib / full-stop square |
| `traceShape` | Canvas → pieces |
| `build` | Layout SVG from shape |
| `place` | Per-frame attribute writer |
| `story` / `quiet` / `calm` | Full / reduced / idle loop |
| `dash` | Safe stroke window |
| `dip` / `hop` / `glintRound` | Impact / hop / accent runner |

---

## 12. Implementation readiness (BeatFit)

Before coding into the site:

- [ ] Confirm first-visit storage key (session vs permanent) and home-only guard.
- [ ] Choose IMAGE (recommended) vs NAME; export mark that traces cleanly (contrast, closed shapes).
- [ ] Overlay shell: fixed full viewport, no dedicated route, no URL change.
- [ ] Set `LOOP: false`; tune `DRAW` / `SPEED` / `BOUNCE` / `REST` for ~brand-splash length.
- [ ] Map timeline `rest` → overlay dismiss → Header/Hero visible without double logo.
- [ ] `prefers-reduced-motion` path.
- [ ] Scope all queries to the overlay root; cleanup on unmount.
- [ ] Keep Animorio attribution / license note in source header if shipping derived code.

---

## 13. One-sentence mental model

**A canvas-traced outline becomes one weighted plotter road; a square nib draws it without lifting, the stroke thickens into filled letters, then the nib lands as the full stop — all driven by one GSAP timeline and a memoized SVG `place()` writer.**
