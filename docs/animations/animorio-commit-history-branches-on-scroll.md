# Learning Doc — Animorio “The commit history with branches that split and merge on scroll”

Source: [Animorio — The commit history with branches that split and merge on scroll](https://animorio.com/en/animations/commit-history-with-branches-that-split-and-merge-on-scroll/)  
Demo product: **Fernwick** (fictional code host) / repo `billing-web`.  
License (Animorio): free on your own / client sites (paid work included). **Not** for resale, redistribution, templates, or code collections. GSAP remains under its own license.

BeatFit-side study note: mechanics, knobs, pitfalls, and adaptation ideas. **Not** a production drop-in.

Companion to: [`animorio-loader-that-becomes-a-logo.md`](./animorio-loader-that-becomes-a-logo.md)  
Difference in kind: the loader is a **time-based entrance**; this piece is a **scroll playhead** (scrubbed progress `p ∈ [0,1]`).

---

## 1. What the visitor experiences

Sticky panel on a tall scroll track. As you scroll:

1. **Main lane** (black) grows downward commit by commit.
2. A **feature branch** peels sideways on a soft cubic curve, then merges back.
3. A **hotfix branch** peels off later and merges back.
4. Each commit **closes a ring** on its lane (top-start stroke) with a brief radius **pop**.
5. The matching **row** slides in (~12px) with message, optional branch chip, author, hash, relative time.
6. **HEAD** + highlight band **spring** to the newest visible commit (not hard-snapped to scroll).
7. Header **commit count** rolls up on each new arrival; older rows gently **fade back**.
8. Merge commits **fill** their ring, show a light **halo**, and bounce in a **release tag**.
9. Near the end: title “turns on”, footer draws a check (“Up to date…”) + “Released v2.5.0”.
10. Hover row → copy icon on hash; click → clipboard + check state.

**When to use (Animorio):** what’s-new / release pages, code-host landings, CI/review products, case studies that show work splitting and rejoining — storytelling instead of a flat list.

**Reduced motion:** history fully drawn immediately (`p = 1`), HEAD already on newest commit, panel fades in; no scrub / spring chase.

---

## 2. Architecture mental model

```
[ tall scroll track: .corsa / data-corsa ]
        │  height ≈ 340 * RIDE vh
        │  ScrollTrigger scrub → stato.p : 0 → 1
        ▼
[ sticky stage: .palco ]
   ┌─ title
   └─ panel (repo chrome)
        ├─ header (repo, branch pill, commit count)
        ├─ body
        │    ├─ SVG graph (lanes + arcs + rings)   ← drawn in px, rebuilt on resize
        │    ├─ HTML rows (absolutely stacked)
        │    ├─ HEAD pill  ┐
        │    └─ fascia band┘← spring on gsap.ticker (chase newest commit Y)
        └─ footer (status + release)
```

**Scroll is the playhead.** Drawing is imperative (`disegna()`), not a GSAP timeline of many tweens. One scrubbed tween only advances `stato.p`; everything else is derived each frame (plus the spring ticker).

---

## 3. Scene graph (DOM roles)

| Role | Selector | Job |
| --- | --- | --- |
| Scroll track | `[data-corsa]` | Tall section; ST trigger start/end |
| Sticky stage | `[data-palco]` | Measured for row sizing; stays in view while scrolling |
| Title | `[data-titolo]` | Greys → “on” near end (`acceso`) |
| Panel | `[data-pannello]` | Repo UI shell; CSS vars for row metrics |
| Body | `[data-corpo]` | Graph + rows + HEAD + band |
| Graph | `[data-grafo]` | SVG; arcs + nodes rebuilt in `costruisci()` |
| Rows list | `[data-righe]` | Built once from `STORIA` |
| Band | `[data-fascia]` | Soft highlight under active row (springs with HEAD) |
| HEAD | `[data-head]` | Label chasing newest commit Y |
| Count | `[data-conto]` | Integer; GSAP y/opacity roll on change |
| Footer bits | `.piede__stato`, `.piede__uscita`, `.piede__spunta` | End-of-scroll settle |

Rows are mostly empty in HTML; `costruisciRighe()` injects the list items (message, chips, avatar, hash button, time, skeleton bar).

---

## 4. Dependencies

| Package | Role | BeatFit note |
| --- | --- | --- |
| `gsap` | Core + ticker spring | Already in project |
| `ScrollTrigger` | Scrubbed `p` progress | **Free plugin** with GSAP — good fit |
| `lenis` | Smooth wheel inertia | **Not installed yet**; optional |
| `@gsap/react` | `useGSAP` scope/cleanup | Already in project |
| Mona Sans / Geist Mono | Demo UI fonts | Do **not** use; map to Dana + numeric/mono token if needed |

Unlike the loader doc, this pattern does **not** require MorphSVG or SplitText (Club). Implementation cost for BeatFit is much lower.

Lenis wiring (must share one clock with ScrollTrigger):

```js
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((t) => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);
```

Without this, ST and Lenis read scroll at different moments → jitter. On touch, Lenis typically leaves native scroll alone (correct).

**Cleanup note:** Animorio’s React header says to call `lenis.destroy()` on unmount. The pasted cleanup restores markup and removes listeners/tickers — when adapting, **explicitly destroy Lenis** and `ScrollTrigger.getAll().forEach(t => t.kill())` (or scope via `gsap.context`) so SPA navigations do not leak.

Also: the pasted React body uses `window.Lenis ? new Lenis(...)` while importing `Lenis` from `'lenis'`. With a bundler, prefer `new Lenis(...)` directly (or feature-detect the import). CDN demos attach `window.Lenis`.

---

## 5. Data model (`STORIA`)

Oldest → newest. Each commit:

| Field | Meaning |
| --- | --- |
| `h` | Short hash (copy target) |
| `msg` | Commit message |
| `lane` | `0` main, `1` feature, `2` hotfix |
| `par` | Parent indices into `STORIA` (merge ⇒ two parents) |
| `chi` / `nome` / `av` | Author initials, name, avatar variant |
| `quando` | Relative time label |
| `ramo?` | Branch chip when a side branch starts |
| `tag?` | Release tag on merge commits |

Graph edges = every `(parent → child)` pair from `par`.

**Progress windowing:**

```
P0 = 0.05          // first commit appears
P1 = 0.84          // last commit landed
PASSO = (P1-P0)/N
inizio(i) = P0 + i * PASSO
```

Local commit progress: `u = (p - inizio(i)) / PASSO` (can be <0 or >1; drawing clamps where needed).

---

## 6. Layout engine (`costruisci`)

Everything is **pixel-measured** from the sticky stage so the panel fits phone and desktop:

1. Read `palco` height/width, padding, gaps, title height.
2. Derive row height `riga` so `N` rows + header + footer fit available body height (clamped).
3. Derive type size, lane step, gutter (`gronda`), HEAD slot width.
4. Write CSS variables on the panel: `--alta-riga`, `--alta-testa`, `--alta-piede`, `--alta-corpo`, `--corpo-testo`, `--gronda`, `--posto-head`.
5. Toggle density classes: `stretto` / `strettissimo` by panel width.
6. Compute:
   - `mis.x[lane]` — lane X positions
   - `mis.y[i]` — commit centers (`riga * (i + 0.5)`)
   - `mis.r` — node radius
7. Rebuild SVG `viewBox` to **exact** `gronda × riga*N` (1 CSS px = 1 SVG unit).
8. Rebuild paths + circles; re-apply dash lengths.

**Why rebuild on resize:** if the viewBox is stretched independently of HTML rows, rings miss their rows. Animorio pitfall #1.

Debounced resize: `gsap.delayedCall(0.15, () => { costruisci(); ScrollTrigger.refresh(); })`.

---

## 7. Drawing the graph

### 7.1 Arc geometry (parent → child)

Let `k = riga / 2` (half-row control distance).

| Case | Path idea | Stroke color lane |
| --- | --- | --- |
| Same lane | Straight `M xa,ya L xb,yb` | child lane |
| Branch peel (first parent, different lane) | Cubic down then vertical into child: `C xa,ya+k → xb,ya+k → xb,ya+2k` then `L xb,yb` | child lane |
| Merge second parent | Vertical on parent lane then cubic into child: `L xa,yb-2k` + `C … xb,yb` | **parent** lane |

### 7.2 Stroke growth (scroll-scrubbed)

Each arc stores:

- `len = path.getTotalLength()`
- `strokeDasharray = len`
- growth window: `a = inizio(parent) + PASSO*0.5` → `b = inizio(child) + PASSO*0.42`

On draw:

```
t = clamp01((p - a) / (b - a))
strokeDashoffset = len * (1 - t)
opacity = t > 0 ? 1 : 0
```

**Pitfall:** long main segments must grow across the **intervening time**, not only when the child arrives — otherwise the line looks broken for two rows.

### 7.3 Commit rings

- Circle rotated `-90°` around center so stroke starts at the **top** (SVG default starts at 3 o’clock).
- Circumference dash closes with smoothstep over local `u`:
  - ring progress ≈ `liscio((u - 0.3) / 0.35)`
- **Pop:** radius *= `1 + RING_POP * sin(π * …)` near close.
- Merge commits (`par.length > 1`): fill color when ring complete; optional outer “alone” halo fades/scales in.

---

## 8. Rows, count, footer (derived from `u` / `p`)

Per commit row:

| Effect | Drive |
| --- | --- |
| Content enter | `fuori((u - 0.38)/0.42)` → opacity + `translateX((1-entra)*12px)` |
| Skeleton bar fade | inverse of early `u` |
| Past fade | after settle, opacity *= `1 - PAST_FADE * liscio((eta-1)/3)` where `eta = u - 1` |
| Release tag | opacity + scale bounce via `rimbalzo` near `u ≈ 0.66` |

`ultimo` = highest index with `u >= 0.55` → drives HEAD target and commit count.

Count change: small GSAP `fromTo` on `yPercent` / opacity (direction by up/down).

End sequence (global `p`):

- Title `acceso` when `p > 0.86`
- Footer status / release opacities ease in
- Check path `strokeDashoffset` draws itself

---

## 9. HEAD spring (decoupled from scrub)

State:

```
molla = { y, v, meta, visibile }
meta = mis.riga * ultimo   // target top for newest commit
```

Each ticker frame (`passoMolla`):

```
f = HEAD_STIFFNESS * (meta - y) - HEAD_DAMPING * v
v += f * dt
y += v * dt
HEAD / fascia transform translate3d(0, y, 0)
opacity lerps toward visibile
```

**Why not bind HEAD to scrub directly?**

- Scrub would hard-jump row to row (no weight).
- With lag, HEAD would sit **between** rows.

Spring = physical “ride” to the tip of history.

---

## 10. Easing helpers (local, not GSAP eases)

| Name | Curve | Use |
| --- | --- | --- |
| `liscio` | smoothstep `t²(3-2t)` | Ring close, past fade, check draw |
| `fuori` | easeOutCubic `1-(1-t)³` | Row enter, footer fades, halo |
| `rimbalzo` | back-out-ish | Tag scale pop |
| `c01` / `clamp` | saturation | All local progress |

---

## 11. Tunable constants

| Name | Default | Meaning |
| --- | --- | --- |
| `RIDE` | `1` | Scroll length multiplier (`corsa` height `340 * RIDE` vh) |
| `SCRUB` | `0.6` | ScrollTrigger scrub lag (seconds) |
| `HEAD_STIFFNESS` | `320` | Spring pull toward newest commit |
| `HEAD_DAMPING` | `26` | Lower → more bounce |
| `RING_POP` | `0.22` | Ring swell on close (`0` = none) |
| `PAST_FADE` | `0.38` | How far older rows recede |
| `LINE_WIDTH` | `1.6` | Branch stroke width (px) |

Also structural: `P0`, `P1`, `PASSO`, lane colors from CSS `--inchiostro`, `--accento`, `--ramo-tre`.

---

## 12. ScrollTrigger + Lenis setup (`avvia`)

Normal motion:

1. `costruisciRighe()` then `costruisci()`
2. Set track height `340 * RIDE` vh
3. Optional Lenis + ticker bridge
4. `ScrollTrigger.create({ trigger: corsa, start: 'top top', end: 'bottom bottom', scrub: SCRUB, animation: gsap.to(stato, { p: 1, ease: 'none', onUpdate: disegna }) })`
5. Add ticker for `passoMolla`
6. Debounced resize → rebuild + `ScrollTrigger.refresh()`

Reduced motion:

- `corsa` height auto; `stato.p = 1`; `disegna()` once; snap spring; fade panel; resize only rebuilds layout.

Fonts gate: `document.fonts.ready` before `avvia` (metrics affect row math less than the loader’s SplitText, but still keeps UI fonts settled).

---

## 13. Pitfalls checklist

1. SVG viewBox must match column pixels; rebuild on resize or rings drift from rows.
2. Rotate ring `-90°` around center so dash closes from the top.
3. HEAD uses a spring — do not parent it directly to scrubbed `p`.
4. Main arcs must draw across the parent→child interval, not only at child birth.
5. Destroy Lenis + kill ScrollTriggers on SPA unmount; restore or revert scoped markup.
6. Wire Lenis → `ScrollTrigger.update` on the GSAP ticker; set `lagSmoothing(0)`.
7. Clipboard copy needs secure context; demo swallows errors.
8. Dense histories: re-tune `RIDE` / row clamps or virtualize — this demo assumes ~10 commits fit the stage.

---

## 14. Italian identifiers → English

| Id | Meaning |
| --- | --- |
| `corsa` | Scroll track / run |
| `palco` | Sticky stage |
| `pannello` | Repo panel |
| `grafo` | SVG graph |
| `righe` / `riga` | Rows / row |
| `fascia` | Highlight band |
| `piede` | Footer |
| `spunta` | Check mark path |
| `conto` | Commit count |
| `STORIA` | Commit history data |
| `archi` | Graph edges (paths) |
| `nodi` | Commit nodes |
| `molla` | Spring state |
| `costruisci` / `costruisciRighe` | Build layout / build rows |
| `disegna` | Draw frame from `p` |
| `passoMolla` | Integrate spring |
| `avvia` | Boot after fonts |
| `liscio` / `fuori` / `rimbalzo` | Local eases |

---

## 15. BeatFit adaptation map

This pattern is closer to BeatFit’s **scroll storytelling** needs than the logo loader.

| Demo piece | BeatFit candidate |
| --- | --- |
| Sticky stage + scrub progress | Home **Session flow** (`#live-class`) or a product “how a class unfolds” chapter |
| Multi-lane graph | Athlete / coach / club journeys merging into one session story; or sensor → live → coach → history |
| Commit rows | Step cards (title + body) entering beside nodes — already partially present as copy + path SVG |
| HEAD spring | “Now” marker on the live journey spine |
| Branch peel/merge | Parallel concerns that reunite (e.g. athlete effort + coach view → shared session record) |
| Release tags | Milestone chips (“Live”, “Recorded”) instead of semver |
| Hash copy | Omit, or copy a deep-link / class id if product-useful |
| Fernwick chrome | Replace with BeatFit panel tokens (`--bf-gray`, forest, soft shadow, Dana) |
| Lenis | Optional polish; site currently uses native scroll — add only if scrub feels harsh |
| Mona / Geist | Dana + existing numeric role |

### Suggested reuse levels

1. **Full grammar:** sticky scrubbed graph + spring tip marker for a dedicated “session timeline” section.
2. **Partial:** keep current journey SVG art, but drive stroke growth + step enter from one scrubbed `p` (lighter lift of this doc’s Section 7–8).
3. **Spring only:** HEAD-like marker on any vertical timeline without rebuilding a git graph.

### Fit with current `#live-class`

Today: static `journey-path.svg` + absolutely placed copy + hover Lottie icons.  
Next evolution informed by this study: replace or augment the static path with **progress-drawn** edges and a scrubbed enter for each step, keeping icons. That borrows the playhead model without shipping Fernwick UI.

---

## 16. Comparison with the logo-loader study

| | Loader → logo | Commit history on scroll |
| --- | --- | --- |
| Driver | Time (`timeline`) | Scroll (`scrub` → `p`) |
| Plugins | MorphSVG + SplitText (Club) | ScrollTrigger (+ optional Lenis) |
| Layout | Fixed columns + rail | Measured sticky panel, rebuild on resize |
| Signature trick | Ink threshold text + path morph | Dash-grown graph + spring HEAD |
| BeatFit cost | Higher (Club + RTL ink risk) | Lower (tools already mostly available) |
| Best use | First-visit brand splash | In-page product narrative |

---

## 17. Implementation readiness (BeatFit)

- [ ] Decide section: enhance `#live-class` vs new release/timeline block.
- [ ] Define BeatFit “lanes” and node data (not git commits).
- [ ] Prototype scrubbed stroke growth on existing journey path or a new SVG.
- [ ] Optional spring marker for “current step”.
- [ ] Decide on Lenis vs native scroll.
- [ ] Reduced-motion: show full graph settled + static HEAD.
- [ ] Resize rebuild + ST refresh.
- [ ] Keep Animorio license header if shipping derived code.

---

## 18. One-sentence mental model

**A sticky product panel whose git-like graph and rows are functions of a single scrubbed scroll progress, while HEAD alone is a spring that chases the tip of that history.**
