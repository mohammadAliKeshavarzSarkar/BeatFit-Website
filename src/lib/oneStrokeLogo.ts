/* "The one-stroke logo" from Animorio · https://animorio.com
   License: free on your own / client sites; not for resale or redistribution.
   BeatFit: mounted as a home first-visit overlay (not a route). */
// @ts-nocheck
import gsap from "gsap";

export type OneStrokeOptions = {
  name?: string;
  image?: string;
  draw?: number;
  line?: number;
  fill?: boolean;
  bounce?: number;
  speed?: number;
  rest?: number;
  loop?: boolean;
  /**
   * When true (demo default), the nib lands as a full-stop square.
   * BeatFit brand lockups should keep this false — a trailing square reads as a typo.
   */
  period?: boolean;
  /** Fired once when the logo reaches rest (production handoff). */
  onRest?: () => void;
};

/**
 * Mount the one-stroke logo engine inside `root`.
 * Expects the Animorio stage markup under root (`[data-stage]`, defs, world, …).
 * Returns a cleanup function.
 */
export function mountOneStrokeLogo(root: HTMLElement, options: OneStrokeOptions = {}) {
const NAME = options.name ?? "BeatFit";
const IMAGE = options.image ?? "";
const DRAW = options.draw ?? 3.2;
const LINE = options.line ?? 1;
const FILL = options.fill ?? true;
const BOUNCE = options.bounce ?? 0.85;
const SPEED = options.speed ?? 1.15;
const REST = options.rest ?? 0.9;
const LOOP = options.loop ?? false;
const PERIOD = options.period ?? !Boolean(options.image);
const onRest = options.onRest;
let restNotified = false;
const notifyRest = () => {
  if (restNotified) return;
  restNotified = true;
  if (typeof onRest === "function") onRest();
};

const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;
const NS = "http://www.w3.org/2000/svg";
const TRACK = 0.035;
const $ = (s) => root.querySelector(s);
const stage = $("[data-stage]");
const defs = $("[data-defs]");
const world = $("[data-world]");
const pictureG = $("[data-picture]");
const piecesG = $("[data-pieces]");
const linksG = $("[data-links]");
const glintEl = $("[data-glint]");
const nibEl = $("[data-nib]");
const nibRect = $("[data-nib-rect]");

if (!stage || !defs || !world || !pictureG || !piecesG || !linksG || !glintEl || !nibEl || !nibRect) {
  return () => {};
}

function make(tag, attrs, parent) {
  const n = document.createElementNS(NS, tag);
  for (const k in attrs) n.setAttribute(k, attrs[k]);
  if (parent) parent.append(n);
  return n;
}
/* every frame writes many attributes: only the ones that really change are written */
const memo = new WeakMap();
function put(n, k, v) {
  let m = memo.get(n);
  if (!m) memo.set(n, (m = {}));
  const s = String(v);
  if (m[k] === s) return;
  m[k] = s;
  n.setAttribute(k, s);
}
const n2 = (v) => (Math.round(v * 100) / 100).toString();
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const rand = (a, b) => a + Math.random() * (b - a);

/* ------------------------------------------------------------------ tracing the logo */
/* the logo is drawn on a canvas, every pixel becomes a value from 0 to 1, and marching squares follow the line where
   the value crosses one half: closed outlines, smooth because the crossing is interpolated inside each pixel */
function march(v, w, hh) {
  const segA = [];
  const segB = [];
  const map = new Map();
  const link = (e, i) => {
    const l = map.get(e);
    if (l) l.push(i);
    else map.set(e, [i]);
  };
  const add = (a, b) => {
    const i = segA.length;
    segA.push(a);
    segB.push(b);
    link(a, i);
    link(b, i);
  };
  const HE = (x, y) => (y * (w + 1) + x) * 2;
  const VE = (x, y) => (y * (w + 1) + x) * 2 + 1;
  for (let y = 0; y < hh - 1; y++) {
    for (let x = 0; x < w - 1; x++) {
      const a = v[y * w + x];
      const b = v[y * w + x + 1];
      const c = v[(y + 1) * w + x + 1];
      const d = v[(y + 1) * w + x];
      const idx = (a >= 0.5 ? 8 : 0) | (b >= 0.5 ? 4 : 0) | (c >= 0.5 ? 2 : 0) | (d >= 0.5 ? 1 : 0);
      if (idx === 0 || idx === 15) continue;
      const Tt = HE(x, y);
      const Bb = HE(x, y + 1);
      const Ll = VE(x, y);
      const Rr = VE(x + 1, y);
      const mid = (a + b + c + d) / 4 >= 0.5;
      switch (idx) {
        case 1: case 14: add(Ll, Bb); break;
        case 2: case 13: add(Bb, Rr); break;
        case 3: case 12: add(Ll, Rr); break;
        case 4: case 11: add(Tt, Rr); break;
        case 6: case 9: add(Tt, Bb); break;
        case 7: case 8: add(Tt, Ll); break;
        case 5: if (mid) { add(Tt, Ll); add(Bb, Rr); } else { add(Tt, Rr); add(Ll, Bb); } break;
        case 10: if (mid) { add(Tt, Rr); add(Ll, Bb); } else { add(Tt, Ll); add(Bb, Rr); } break;
        default: break;
      }
    }
  }
  const point = (e) => {
    const k = e >> 1;
    const x = k % (w + 1);
    const y = Math.floor(k / (w + 1));
    if (e & 1) {
      const v0 = v[y * w + x];
      const v1 = v[(y + 1) * w + x];
      return [x, y + clamp((0.5 - v0) / (v1 - v0 || 1))];
    }
    const v0 = v[y * w + x];
    const v1 = v[y * w + x + 1];
    return [x + clamp((0.5 - v0) / (v1 - v0 || 1)), y];
  };
  const used = new Uint8Array(segA.length);
  const loops = [];
  for (let s = 0; s < segA.length; s++) {
    if (used[s]) continue;
    used[s] = 1;
    const first = segA[s];
    const pts = [point(first)];
    let cur = segB[s];
    let seg = s;
    let guard = 0;
    while (cur !== first && guard++ < 2e6) {
      pts.push(point(cur));
      const l = map.get(cur);
      const nx = l[0] === seg ? l[1] : l[0];
      if (nx === undefined || used[nx]) break;
      used[nx] = 1;
      cur = segA[nx] === cur ? segB[nx] : segA[nx];
      seg = nx;
    }
    if (pts.length > 5) loops.push(pts);
  }
  return loops;
}

/* fewer points: Ramer-Douglas-Peucker on the two halves of each closed outline */
function rdp(p, eps) {
  const n = p.length;
  if (n < 3) return p.slice();
  const keep = new Uint8Array(n);
  keep[0] = keep[n - 1] = 1;
  const st = [[0, n - 1]];
  while (st.length) {
    const [a, b] = st.pop();
    const ax = p[a][0];
    const ay = p[a][1];
    const dx = p[b][0] - ax;
    const dy = p[b][1] - ay;
    const L = Math.hypot(dx, dy) || 1;
    let md = 0;
    let mi = -1;
    for (let i = a + 1; i < b; i++) {
      const d = Math.abs((p[i][0] - ax) * dy - (p[i][1] - ay) * dx) / L;
      if (d > md) { md = d; mi = i; }
    }
    if (md > eps) {
      keep[mi] = 1;
      st.push([a, mi], [mi, b]);
    }
  }
  return p.filter((_, i) => keep[i]);
}
function simplifyLoop(p, eps) {
  let m = 0;
  let md = 0;
  for (let i = 1; i < p.length; i++) {
    const d = Math.hypot(p[i][0] - p[0][0], p[i][1] - p[0][1]);
    if (d > md) { md = d; m = i; }
  }
  const a = rdp(p.slice(0, m + 1), eps);
  const b = rdp(p.slice(m).concat([p[0]]), eps);
  return a.concat(b.slice(1, -1));
}
/* signed area: on a screen, where y grows downwards, a positive area runs clockwise */
const areaOf = (p) => {
  let s = 0;
  for (let i = 0, j = p.length - 1; i < p.length; j = i++) s += p[j][0] * p[i][1] - p[i][0] * p[j][1];
  return s / 2;
};
const boxOf = (p) => {
  let x0 = Infinity; let y0 = Infinity; let x1 = -Infinity; let y1 = -Infinity;
  for (const [x, y] of p) { x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y); }
  return { x0, y0, x1, y1 };
};
const inside = (pt, p) => {
  let c = false;
  for (let i = 0, j = p.length - 1; i < p.length; j = i++) {
    const [xi, yi] = p[i];
    const [xj, yj] = p[j];
    if ((yi > pt[1]) !== (yj > pt[1]) && pt[0] < ((xj - xi) * (pt[1] - yi)) / (yj - yi) + xi) c = !c;
  }
  return c;
};

let picture = null;
let shape = null;

/* draws the logo on a canvas and turns it into pieces: every piece is an outline and the holes inside it; for every
   piece also how deep it is (the farthest point inside it from the edge), so the line knows how thick to grow */
function traceShape() {
  const cv = document.createElement('canvas');
  const ctx = cv.getContext('2d', { willReadFrequently: true });
  const pad = 8;
  let unit;
  let base;
  let w;
  let hh;
  let values = null;
  let place = null;
  if (picture) {
    /* Square lockups put the wordmark in a thin band — need enough vertical pixels
       so letter stems/counters survive marching squares (mask clips the real SVG). */
    let ih = 320;
    let iw = Math.max(8, Math.round((ih * (picture.naturalWidth || 300)) / (picture.naturalHeight || 150)));
    if (iw > 960) { ih = Math.max(8, Math.round((ih * 960) / iw)); iw = 960; }
    w = iw + 2 * pad;
    hh = ih + 2 * pad;
    cv.width = w;
    cv.height = hh;
    /* Nearest-neighbour keeps thin letter stems from dissolving into the threshold. */
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(picture, pad, pad, iw, ih);
    unit = ih / 1.6;
    place = { x: pad, y: pad, w: iw, h: ih };
    values = new Float32Array(w * hh);
    try {
      const d = ctx.getImageData(0, 0, w, hh).data;
      /* dark and coloured parts become the outline, light parts and a transparent background stay ground; a light
         logo on a transparent background is traced by its shape alone */
      let cover = 0;
      for (let i = 0; i < w * hh; i++) {
        const r = d[i * 4] / 255;
        const g = d[i * 4 + 1] / 255;
        const b = d[i * 4 + 2] / 255;
        const al = d[i * 4 + 3] / 255;
        values[i] = al * clamp(1.9 - 0.42 * r - 1.43 * g - 0.15 * b);
        if (values[i] >= 0.5) cover++;
      }
      if (cover < w * hh * 0.01) for (let i = 0; i < w * hh; i++) values[i] = d[i * 4 + 3] / 255;
    } catch (e) {
      /* a picture from another site without permission can't be read: it becomes a plain rectangle */
      for (let y = pad; y < hh - pad; y++) for (let x = pad; x < w - pad; x++) values[y * w + x] = 1;
    }
  } else {
    const cs = getComputedStyle(stage);
    let F = 260;
    const font = (px) => `${cs.fontWeight} ${px}px ${cs.fontFamily}`;
    const chars = Array.from(NAME.trim() || 'Logo');
    const measure = () => {
      ctx.font = font(F);
      const letters = [];
      let x = 0;
      chars.forEach((ch) => {
        letters.push({ ch, x });
        x += ctx.measureText(ch).width + TRACK * F;
      });
      const m = ctx.measureText(chars.join(''));
      return { letters, width: x - TRACK * F, asc: m.actualBoundingBoxAscent || F * 0.72, desc: m.actualBoundingBoxDescent || 0, left: m.actualBoundingBoxLeft || 0 };
    };
    let M = measure();
    if (M.width > 2600) { F = Math.floor((F * 2600) / M.width); M = measure(); }
    w = Math.ceil(M.width + 2 * pad + M.left + F * 0.1);
    hh = Math.ceil(M.asc + M.desc + 2 * pad);
    cv.width = w;
    cv.height = hh;
    ctx.font = font(F);
    ctx.fillStyle = '#000';
    for (const L of M.letters) ctx.fillText(L.ch, pad + M.left + L.x, pad + M.asc);
    unit = M.asc;
    base = pad + M.asc;
    const d = ctx.getImageData(0, 0, w, hh).data;
    values = new Float32Array(w * hh);
    for (let i = 0; i < w * hh; i++) values[i] = d[i * 4 + 3] / 255;
  }
  /* an empty frame all round, so that every outline closes */
  for (let x = 0; x < w; x++) { values[x] = 0; values[(hh - 1) * w + x] = 0; }
  for (let y = 0; y < hh; y++) { values[y * w] = 0; values[y * w + w - 1] = 0; }

  /* Picture lockups (mark + wordmark) need smaller pieces kept — dropping counters makes letters look wrong. */
  const minArea = (picture ? 0.0035 : 0.004) * unit * unit;
  const loops = march(values, w, hh)
    .map((p) => simplifyLoop(p, picture ? 0.28 : 0.3))
    .filter((p) => p.length > 2)
    .map((p) => ({ pts: p, area: Math.abs(areaOf(p)), box: boxOf(p), depth: 0, parent: null, holes: [] }))
    .filter((c) => c.area > minArea);
  /* which outline is inside which: an even depth is the outside of a piece, an odd one a hole in its parent */
  for (const c of loops) {
    for (const o of loops) {
      if (o === c || o.area <= c.area) continue;
      const [px, py] = c.pts[0];
      if (px < o.box.x0 || px > o.box.x1 || py < o.box.y0 || py > o.box.y1) continue;
      if (!inside(c.pts[0], o.pts)) continue;
      c.depth++;
      if (!c.parent || o.area < c.parent.area) c.parent = o;
    }
  }
  let outers = loops.filter((c) => c.depth % 2 === 0);
  for (const c of loops) if (c.depth % 2 === 1 && c.parent) c.parent.holes.push(c);
  /* Cap shape count, but leave room for mark fragments + every letter (+ counters). */
  const maxOuters = picture ? 28 : 30;
  if (outers.length > maxOuters) outers = outers.sort((a, b) => b.area - a.area).slice(0, maxOuters);
  for (const o of outers) if (o.holes.length > (picture ? 8 : 6)) o.holes = o.holes.sort((a, b) => b.area - a.area).slice(0, picture ? 8 : 6);
  if (!outers.length) {
    const s = unit;
    const pts = [[pad, pad], [pad + 3 * s, pad], [pad + 3 * s, pad + s], [pad, pad + s]];
    outers = [{ pts, area: 3 * s * s, box: boxOf(pts), holes: [] }];
  }

  /* how deep each piece is: a walk in from the ground measures every inked pixel's distance from the edge (a
     city-block distance, never shorter than the real one), and each piece keeps the deepest one in its box */
  const dist = new Int32Array(w * hh).fill(-1);
  const queue = new Int32Array(w * hh);
  let qa = 0;
  let qb = 0;
  for (let q = 0; q < w * hh; q++) {
    if (values[q] < 0.5) {
      dist[q] = 0;
      queue[qb++] = q;
    }
  }
  while (qa < qb) {
    const q = queue[qa++];
    const d = dist[q] + 1;
    const qx = q % w;
    const near = [qx > 0 ? q - 1 : -1, qx < w - 1 ? q + 1 : -1, q - w, q + w];
    for (const r of near) {
      if (r < 0 || r >= w * hh || dist[r] !== -1) continue;
      dist[r] = d;
      queue[qb++] = r;
    }
  }
  let deepest = 1;
  for (const o of outers) {
    let far = 1;
    const x0 = Math.max(0, Math.floor(o.box.x0));
    const x1 = Math.min(w - 1, Math.ceil(o.box.x1));
    const y0 = Math.max(0, Math.floor(o.box.y0));
    const y1 = Math.min(hh - 1, Math.ceil(o.box.y1));
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if (dist[y * w + x] > far) far = dist[y * w + x];
    o.deep = far;
    deepest = Math.max(deepest, far);
  }

  const all = outers.flatMap((o) => [o, ...o.holes]);
  const box = boxOf(all.flatMap((c) => c.pts));
  if (base === undefined) base = box.y1;
  shape = { pieces: outers.map((o) => ({ outer: o.pts, holes: o.holes.map((hc) => hc.pts), box: o.box, deep: o.deep })), box, unit, base, deepest, place };
}

/* ------------------------------------------------------------------ a polyline, measured */
const lengths = (pts) => {
  const cum = [0];
  for (let j = 1; j < pts.length; j++) cum.push(cum[j - 1] + Math.hypot(pts[j][0] - pts[j - 1][0], pts[j][1] - pts[j - 1][1]));
  return cum;
};
function pointAt(pts, cum, s) {
  const len = cum[cum.length - 1];
  s = clamp(s, 0, len);
  let lo = 0;
  let hi = cum.length - 1;
  while (hi - lo > 1) {
    const m = (lo + hi) >> 1;
    if (cum[m] <= s) lo = m;
    else hi = m;
  }
  const a = pts[lo];
  const b = pts[Math.min(lo + 1, pts.length - 1)];
  const f = (s - cum[lo]) / (cum[lo + 1] - cum[lo] || 1);
  return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f];
}
const pathOf = (p) => {
  let d = `M${n2(p[0][0])} ${n2(p[0][1])}`;
  for (let i = 1; i < p.length; i++) d += `L${n2(p[i][0])} ${n2(p[i][1])}`;
  return d;
};
/* a stretch [a, b] of a path drawn with one dash; nothing at all when it is empty (a round cap would leave a dot) */
function dash(el, a, b, len) {
  if (b - a <= 0.05) {
    put(el, 'visibility', 'hidden');
    return;
  }
  put(el, 'visibility', 'visible');
  if (a <= 0.01 && b >= len - 0.01) {
    put(el, 'stroke-dasharray', 'none');
    put(el, 'stroke-dashoffset', '0');
    return;
  }
  put(el, 'stroke-dasharray', `${n2(b - a)} ${n2(len * 2 + 20)}`);
  put(el, 'stroke-dashoffset', n2(-a));
}

let T = null;
let idle = null;
let S = null;
let size = { w: 0, h: 0 };
let runs = 0;

/* ------------------------------------------------------------------ measures and pieces */
function build() {
  const W = stage.clientWidth || innerWidth;
  const H = stage.clientHeight || innerHeight;
  size = { w: W, h: H };
  stage.setAttribute('viewBox', `0 0 ${W} ${H}`);
  defs.replaceChildren();
  pictureG.replaceChildren();
  piecesG.replaceChildren();
  linksG.replaceChildren();
  piecesG.removeAttribute('opacity');
  linksG.removeAttribute('opacity');
  gsap.set(world, { clearProps: 'opacity' });
  stage.setAttribute('aria-label', picture ? 'Logo' : NAME.trim() || 'Logo');

  /* one size for everything, in letter heights: the logo, a little gap and the full stop as wide as most of the
     screen, never taller than a fifth of it; on a phone the same layout, smaller */
  const { box, unit, deepest } = shape;
  const Lu = (box.x1 - box.x0) / unit;
  const Hu = (box.y1 - box.y0) / unit;
  const qU = picture ? 0.16 : clamp((1.7 * deepest) / unit, 0.12, 0.21);
  const gapU = PERIOD ? (picture ? 0.12 : 0.08) : 0;
  const tall = W < H * 0.9;
  const widthUnits = Lu + (PERIOD ? gapU + qU : 0);
  const h = Math.max(10, Math.min(((tall ? 0.84 : 0.8) * W) / Math.max(0.5, widthUnits), ((picture ? 0.42 : 0.2) * H) / Math.max(1, Hu), 220));
  const k = h / unit;
  const q = Math.max(6, Math.round(qU * h));
  const gap = gapU * h;
  const total = Lu * h + (PERIOD ? gap + q : 0);
  const ox = Math.round(W / 2 - total / 2);
  const oy = Math.round(H / 2 - (Hu * h) / 2 - 0.04 * h);
  const X = (x) => ox + (x - box.x0) * k;
  const Y = (y) => oy + (y - box.y0) * k;
  const B = Y(shape.base);
  const w = clamp(0.021 * h * Math.max(0.2, LINE), 1.1, 9);
  const nibS = Math.max(5, 3.2 * w);
  const first = !runs++;

  /* the pieces, left to right, every outline clockwise; each outline starts at the point nearest to where the pen
     is, so the stretches between one outline and the next stay short */
  const pieces = shape.pieces
    .map((p) => ({ ...p }))
    .sort((a, b) => a.box.x0 - b.box.x0 || a.box.y0 - b.box.y0);
  const loops = [];
  let pen = null;
  const order = [];
  pieces.forEach((p, pi) => {
    const el = make('g', {}, piecesG);
    const clip = make('clipPath', { id: `piece-${pi}` }, defs);
    const outlines = [p.outer, ...p.holes].map((pts) => pts.map(([x, y]) => [X(x), Y(y)]));
    make('path', { d: outlines.map((o) => `${pathOf(o)}Z`).join(''), 'clip-rule': 'evenodd' }, clip);
    /* a word: the thickening line is clipped to the piece; a picture gets its line in a mask further down */
    const fillG = picture ? null : make('g', { 'clip-path': `url(#piece-${pi})` }, el);
    const lineG = make('g', {}, el);
    const piece = { el, dy: 0, sc: 1, cx: X((p.box.x0 + p.box.x1) / 2), cy: Y((p.box.y0 + p.box.y1) / 2), half: (Math.max(p.box.x1 - p.box.x0, p.box.y1 - p.box.y0) * k) / 2, loops: [], end: 2 * (p.deep + 2) * k + 2 * w, fillG, pi };
    outlines.forEach((o) => {
      let pts = o.slice();
      if (areaOf(pts) < 0) pts.reverse();
      let at = 0;
      if (!pen) {
        /* the first outline starts at its leftmost point, where the lead-in arrives */
        for (let i = 1; i < pts.length; i++) if (pts[i][0] < pts[at][0] - 0.5 || (Math.abs(pts[i][0] - pts[at][0]) <= 0.5 && pts[i][1] > pts[at][1])) at = i;
      } else {
        let best = Infinity;
        for (let i = 0; i < pts.length; i++) {
          const d = Math.hypot(pts[i][0] - pen[0], pts[i][1] - pen[1]);
          if (d < best) { best = d; at = i; }
        }
      }
      pts = pts.slice(at).concat(pts.slice(0, at));
      pts.push(pts[0].slice());
      const cum = lengths(pts);
      const len = cum[cum.length - 1];
      const d = pathOf(pts);
      const L = { pts, cum, len, d, piece, a: 0, b: 0, o: 1, fw: w };
      L.line = make('path', { class: 'tratto', d, pathLength: n2(len) }, lineG);
      if (fillG) L.fill = make('path', { class: 'riempi', d, pathLength: n2(len) }, fillG);
      /* the stretch of line from where the pen is to the start of this outline */
      const from = pen || [-nibS * 2 - 12, pts[0][1]];
      const lp = [from, pts[0]];
      const ll = Math.hypot(lp[1][0] - lp[0][0], lp[1][1] - lp[0][1]);
      if (ll > 0.5) {
        const lk = { pts: lp, len: ll, a: 0, b: 0, lead: !pen, el: make('path', { class: 'filo', d: pathOf(lp), pathLength: n2(ll) }, linksG) };
        order.push({ kind: 'link', ref: lk, len: ll, weight: ll / (pen ? 2.2 : 1.7) });
      }
      order.push({ kind: 'loop', ref: L, len, weight: len });
      piece.loops.push(L);
      loops.push(L);
      pen = pts[0];
    });
    p.state = piece;
  });
  const parts = pieces.map((p) => p.state);
  const links = order.filter((o) => o.kind === 'link').map((o) => o.ref);

  /* a picture: it shows through a mask made of the same thickening line, each piece clipped to its own outline */
  let pic = null;
  if (picture) {
    const pl = shape.place;
    const mask = make('mask', { id: 'reveal', maskUnits: 'userSpaceOnUse', x: 0, y: 0, width: W, height: H }, defs);
    parts.forEach((piece) => {
      const g = make('g', { 'clip-path': `url(#piece-${piece.pi})` }, mask);
      piece.loops.forEach((L) => {
        L.fill = make('path', { d: L.d, pathLength: n2(L.len), fill: 'none', stroke: '#fff', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
      });
    });
    pic = { el: make('g', { mask: 'url(#reveal)' }, pictureG), dy: 0, sc: 1 };
    /* meet keeps letter proportions; none was stretching the wordmark vs the mark. */
    make('image', {
      href: IMAGE.trim(),
      x: n2(X(pl.x)),
      y: n2(Y(pl.y)),
      width: n2(pl.w * k),
      height: n2(pl.h * k),
      preserveAspectRatio: 'xMidYMid meet',
    }, pic.el);
  }

  /* the whole run of the pen, as one polyline, for the place and direction of the nib; every stretch has a weight,
     so the joining stretches are drawn faster than the outlines */
  const all = [];
  let s0 = 0;
  let u0 = 0;
  const wsum = order.reduce((a, o) => a + o.weight, 0) || 1;
  order.forEach((o) => {
    o.s0 = s0;
    o.u0 = u0;
    o.du = o.weight / wsum;
    s0 += o.len;
    u0 += o.du;
    const pts = o.ref.pts;
    pts.forEach((p, i) => { if (i || !all.length) all.push(p); });
  });
  const cum = lengths(all);
  const end = loops.length ? loops[loops.length - 1].pts[0] : [W / 2, H / 2];

  /* the full stop: just right of the logo, standing on the baseline */
  const px = ox + total - q / 2;
  const land = B - q / 2;

  S = {
    W, H, h, k, q, w, nibS, B, ox, total, px, land, end, first, parts, loops, links, order, all, cum, pic,
    pen: { u: 0 },
    nib: { follow: 1, x: -nibS * 3, y: end[1], r: 0, s: nibS / q, sx: 1, sy: 1 },
    glint: { loop: null, p: 0, seg: 0 },
  };
  nibRect.setAttribute('x', n2(-q / 2));
  nibRect.setAttribute('y', n2(-q / 2));
  nibRect.setAttribute('width', q);
  nibRect.setAttribute('height', q);
  glintEl.setAttribute('stroke-width', n2(Math.max(1.2, w)));
  place();
}

/* where the pen is on its run, from the eased time (u) of the timeline */
function penLength(u) {
  const { order } = S;
  for (let i = 0; i < order.length; i++) {
    const o = order[i];
    if (u <= o.u0 + o.du || i === order.length - 1) return o.s0 + clamp((u - o.u0) / (o.du || 1)) * o.len;
  }
  return 0;
}

/* one function writes the whole stage after every frame, from a few numbers */
function place() {
  if (!S) return;
  const { order, parts, w, nib, q, all, cum, pic, glint } = S;
  const s = penLength(S.pen.u);
  order.forEach((o) => {
    o.ref.b = clamp(s - o.s0, 0, o.len);
  });
  S.loops.forEach((L) => {
    dash(L.line, L.a, L.b, L.len);
    put(L.line, 'stroke-width', n2(w * L.o));
    if (L.o <= 0.004) put(L.line, 'visibility', 'hidden');
    if (L.fill) {
      dash(L.fill, L.a, L.b, L.len);
      put(L.fill, 'stroke-width', n2(L.fw));
    }
  });
  S.links.forEach((lk) => {
    dash(lk.el, lk.a, lk.b, lk.len);
    put(lk.el, 'stroke-width', n2(w));
  });
  parts.forEach((p) => {
    const dy = pic ? pic.dy : p.dy;
    put(p.el, 'transform', `translate(${n2(p.cx)} ${n2(p.cy + dy)}) scale(${n2(p.sc * 1000) / 1000}) translate(${n2(-p.cx)} ${n2(-p.cy)})`);
  });
  if (pic) put(pic.el, 'transform', `translate(0 ${n2(pic.dy)})`);

  /* the nib: at the head of the line while it draws, then on its own */
  if (nib.follow) {
    const [x, y] = pointAt(all, cum, s);
    const a = pointAt(all, cum, s - 3);
    const b = pointAt(all, cum, s + 3);
    let r = 0;
    if (Math.hypot(b[0] - a[0], b[1] - a[1]) > 0.5) r = (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI;
    nib.x = x;
    nib.y = y;
    /* a square looks the same every quarter turn */
    nib.r = ((r % 90) + 90) % 90;
  }
  if (nib.s <= 0.002) put(nibEl, 'visibility', 'hidden');
  else {
    put(nibEl, 'visibility', 'visible');
    const lift = (q / 2) * nib.s * (1 - nib.sy);
    put(nibEl, 'transform', `translate(${n2(nib.x)} ${n2(nib.y + lift)}) scale(${n2(nib.sx * 1000) / 1000} ${n2(nib.sy * 1000) / 1000}) rotate(${n2(nib.r)}) scale(${n2(nib.s * 1000) / 1000})`);
  }

  /* the glint: a stretch of blue line running once round one outline */
  if (glint.loop && glint.p > 0 && glint.p < glint.loop.len + glint.seg) {
    put(glintEl, 'd', glint.loop.d);
    put(glintEl, 'pathLength', n2(glint.loop.len));
    dash(glintEl, Math.max(0, glint.p - glint.seg), Math.min(glint.loop.len, glint.p), glint.loop.len);
  } else put(glintEl, 'visibility', 'hidden');
}

/* After fill, show the crisp source image (mask clips from marching-squares always soften type). */
function settlePicture() {
  if (!S?.pic) return;
  S.pic.el.removeAttribute('mask');
  piecesG.setAttribute('opacity', '0');
  linksG.setAttribute('opacity', '0');
  glintEl.setAttribute('visibility', 'hidden');
}

/* ------------------------------------------------------------------ small pieces of the story */
/* the letters dip under the blow of the full stop, the nearest first and most */
function dip(tl, t, amount) {
  const { parts, px, pic } = S;
  if (pic) {
    tl.to(pic, { dy: amount, duration: 0.07, ease: 'power2.out' }, t);
    tl.to(pic, { dy: 0, duration: 0.8, ease: 'elastic.out(1, 0.3)' }, t + 0.07);
    return;
  }
  const byNear = parts.slice().sort((a, b) => Math.abs(px - a.cx) - Math.abs(px - b.cx));
  byNear.forEach((p, i) => {
    const f = 1 - (0.65 * i) / Math.max(1, byNear.length - 1);
    const at = t + i * 0.035;
    tl.to(p, { dy: amount * f, duration: 0.07, ease: 'power2.out' }, at);
    tl.to(p, { dy: 0, duration: 0.8, ease: 'elastic.out(1, 0.3)' }, at + 0.07);
  });
}

/* the square hops on the spot: a squash, a little jump, a squash on landing, and the elastic */
function hop(tl, t, height) {
  const { nib, land } = S;
  tl.to(nib, { sx: 1.12, sy: 0.88, duration: 0.09, ease: 'power2.out' }, t);
  tl.to(nib, { sx: 0.94, sy: 1.07, duration: 0.1, ease: 'power2.out' }, t + 0.09);
  tl.to(nib, { y: land - height, duration: 0.2, ease: 'power2.out' }, t + 0.09);
  tl.to(nib, { y: land, duration: 0.18, ease: 'power2.in' }, t + 0.29);
  tl.to(nib, { sx: 1, sy: 1, duration: 0.12, ease: 'power1.inOut' }, t + 0.19);
  tl.to(nib, { sx: 1.1, sy: 0.9, duration: 0.05, ease: 'power2.out' }, t + 0.47);
  tl.to(nib, { sx: 1, sy: 1, duration: 0.55, ease: 'elastic.out(1, 0.4)' }, t + 0.52);
}

/* a blue line runs once round an outline, and the full stop answers with a hop */
function glintRound(tl, t) {
  const { parts, px, q, glint } = S;
  const byNear = parts.slice().sort((a, b) => Math.abs(px - a.cx) - Math.abs(px - b.cx));
  const piece = S.first || byNear.length < 2 ? byNear[0] : byNear[Math.floor(rand(0, Math.min(3, byNear.length)))];
  if (!piece || !piece.loops.length) return;
  const L = piece.loops[0];
  tl.set(glint, { loop: L, seg: L.len * 0.3, p: 0 }, t);
  tl.to(glint, { p: L.len * 1.3, duration: 1.15, ease: 'power2.inOut' }, t);
  hop(tl, t + 1.0, q * 0.32);
}

/* ------------------------------------------------------------------ the story */
function story(from) {
  const { parts, loops, links, nib, q, h, px, land, end, w, nibS } = S;
  T = gsap.timeline({ paused: true, onUpdate: place });
  const n = parts.length;

  /* the nib slides in from the left with its line and traces every outline without lifting */
  let t = 0.25;
  T.addLabel('start', t);
  const draw = Math.max(0.6, DRAW);
  T.to(S.pen, { u: 1, duration: draw, ease: 'power1.inOut' }, t);

  /* the last outline closes: the nib leaves the line */
  const tD = t + draw;
  T.addLabel('reveal', tD);
  const a0 = (() => {
    const a = pointAt(S.all, S.cum, S.cum[S.cum.length - 1] - 6);
    const r = (Math.atan2(end[1] - a[1], end[0] - a[0]) * 180) / Math.PI;
    return ((r % 90) + 90) % 90;
  })();
  T.set(nib, { follow: 0, x: end[0], y: end[1], r: a0 }, tD);

  /* the stretches that joined the outlines are pulled into the letters, the lead-in last of all */
  links.forEach((lk, i) => {
    T.to(lk, { a: lk.len, duration: lk.lead ? 0.6 : 0.34, ease: lk.lead ? 'expo.inOut' : 'power3.inOut' }, tD + 0.02 + (lk.lead ? 0.08 : 0.03 * i));
  });

  /* fill timing — shared by period landing and no-period nib exit */
  const n0 = Math.max(1, n);
  const fillStep = Math.min(0.07, 0.5 / n0);
  const fl = FILL ? clamp(0.55 + (n0 - 1) * fillStep + 0.45, 1, 1.5) : 0.85;
  const up = fl * 0.6;
  const apex = Math.max(q * 0.8, Math.min(end[1], land) - 0.9 * h);
  const rEnd = Math.ceil((a0 + 200) / 90) * 90;
  let tEnd = tD + fl;

  if (PERIOD) {
    /* the nib leaves the line: grows into the full stop, hangs, then drops into place */
    T.to(nib, { s: 1, duration: 0.45, ease: 'back.out(2.2)' }, tD + 0.04);
    T.to(nib, { x: px, duration: fl, ease: 'power2.inOut' }, tD);
    T.to(nib, { y: apex, duration: up, ease: 'power3.out' }, tD);
    T.to(nib, { y: land, duration: fl - up, ease: 'power3.in' }, tD + up);
    T.to(nib, { r: rEnd, duration: fl * 0.9, ease: 'power3.out' }, tD);
    T.to(nib, { sx: 0.93, sy: 1.08, duration: 0.14, ease: 'power1.in' }, tD + fl - 0.14);

    const b = clamp(Number(BOUNCE) || 0, 0, 3);
    const tL = tD + fl;
    T.addLabel('land', tL);
    const blow = Math.max(1, 0.013 * h) * (0.5 + 0.5 * Math.min(2, b));
    T.to(nib, { sx: 1 + 0.26 * Math.min(1.3, 0.5 + b), sy: 1 - 0.22 * Math.min(1.3, 0.5 + b), duration: 0.07, ease: 'power2.out' }, tL);
    dip(T, tL, blow);
    tEnd = tL + 0.07;
    if (b > 0.02) {
      const bounceUp = q * 1.1 * b;
      const t1 = tL + 0.07;
      const air = 0.15 + 0.12 * Math.sqrt(b);
      T.to(nib, { sx: 0.9, sy: 1.12, duration: 0.12, ease: 'power2.out' }, t1);
      T.to(nib, { y: land - bounceUp, duration: air, ease: 'power2.out' }, t1);
      T.to(nib, { sx: 1, sy: 1, duration: 0.14, ease: 'power1.inOut' }, t1 + 0.12);
      T.to(nib, { y: land, duration: air * 0.95, ease: 'power2.in' }, t1 + air);
      const t2 = t1 + air * 1.95;
      T.to(nib, { sx: 1.16, sy: 0.86, duration: 0.06, ease: 'power2.out' }, t2);
      dip(T, t2, blow * 0.45);
      const air2 = air * 0.55;
      T.to(nib, { sx: 1, sy: 1, duration: 0.1, ease: 'power1.out' }, t2 + 0.06);
      T.to(nib, { y: land - bounceUp * 0.3, duration: air2, ease: 'power2.out' }, t2 + 0.06);
      T.to(nib, { y: land, duration: air2 * 0.95, ease: 'power2.in' }, t2 + 0.06 + air2);
      tEnd = t2 + 0.06 + air2 * 1.95;
      T.to(nib, { sx: 1.06, sy: 0.95, duration: 0.05, ease: 'power2.out' }, tEnd);
      tEnd += 0.05;
    }
    T.to(nib, { sx: 1, sy: 1, duration: 0.6, ease: 'elastic.out(1, 0.4)' }, tEnd);
  } else {
    /* brand lockup: nib bows out while the mark fills — no fake full-stop square */
    T.addLabel('land', tD + fl * 0.55);
    T.to(nib, { r: a0 + 45, duration: fl * 0.45, ease: 'power2.out' }, tD);
    T.to(nib, { s: 0, duration: 0.38, ease: 'back.in(1.6)' }, tD + 0.12);
    T.to(nib, { sx: 1.08, sy: 0.92, duration: 0.12, ease: 'power2.out' }, tD);
    tEnd = tD + Math.max(0.5, fl * 0.55);
  }

  /* the line thickens inwards until the letters are full; picture logos fill nearly together
     so many small letter pops don't read as a glitch */
  let tFull = tD + 0.4;
  if (FILL) {
    const tF = tD + 0.12;
    const stagger = picture ? Math.min(0.028, fillStep * 0.35) : fillStep;
    parts.forEach((p, i) => {
      const at = tF + i * stagger;
      p.loops.forEach((L) => {
        T.to(L, { fw: p.end, duration: picture ? 0.78 : 0.95, ease: 'power3.inOut' }, at);
        T.to(L, { o: 0, duration: picture ? 0.55 : 0.7, ease: 'power2.inOut' }, at + 0.16);
      });
      T.to(p, { sc: 1 + 1.2 / Math.max(8, p.half), duration: 0.14, ease: 'power2.out' }, at + (picture ? 0.62 : 0.82));
      T.to(p, { sc: 1, duration: 0.5, ease: 'elastic.out(1, 0.35)' }, at + (picture ? 0.74 : 0.96));
      tFull = Math.max(tFull, at + (picture ? 1.05 : 1.3));
    });
  }
  const rest = Math.max(tEnd + (PERIOD ? 0.7 : 0.35), tFull);
  T.addLabel('rest', rest);

  /* Drop approximate mask clips so the settled frame is the real SVG, not traced outlines. */
  if (picture) {
    T.call(() => {
      settlePicture();
    }, null, rest);
  }

  /* on show: accent line runs round a letter (only when the period metaphor is active) */
  if (PERIOD && REST >= 1.8) glintRound(T, rest + Math.min(1.1, REST * 0.3));

  if (!LOOP) {
    T.call(() => {
      notifyRest();
    }, null, rest + Math.max(0.15, REST));
  } else {
    /* the full stop jumps away, the letters empty into a line and the line unwinds */
    const out = rest + REST;
    T.addLabel('leave', out);
    T.to(nib, { sx: 1.16, sy: 0.84, duration: 0.13, ease: 'power2.out' }, out);
    T.to(nib, { sx: 0.9, sy: 1.12, duration: 0.12, ease: 'power2.out' }, out + 0.13);
    T.to(nib, { y: land - q * 1.4 - 0.25 * h, duration: 0.42, ease: 'power2.out' }, out + 0.13);
    T.to(nib, { r: rEnd + 90, duration: 0.42, ease: 'power2.in' }, out + 0.13);
    T.to(nib, { s: 0, duration: 0.3, ease: 'back.in(2)' }, out + 0.28);
    let tX = out + 0.3;
    if (FILL) {
      parts.slice().reverse().forEach((p, i) => {
        const at = out + 0.25 + i * Math.min(0.05, 0.4 / Math.max(1, n));
        p.loops.forEach((L) => {
          T.to(L, { fw: w, duration: 0.6, ease: 'power3.inOut' }, at);
          T.to(L, { o: 1, duration: 0.45, ease: 'power2.inOut' }, at);
        });
        tX = Math.max(tX, at + 0.6);
      });
    }
    const step = Math.min(0.06, 0.6 / Math.max(1, loops.length));
    loops.forEach((L, i) => {
      T.to(L, { a: L.len, duration: 0.5, ease: 'power2.in' }, tX + i * step);
    });
    T.call(() => start(), null, tX + loops.length * step + 0.65);
  }

  T.timeScale(SPEED);
  if (from) T.seek(from, false);
  place();
  T.play();
}

/* without LOOP: the logo stays, and every few seconds the blue line runs round a letter */
function calm() {
  if (idle) idle.kill();
  S.first = false;
  idle = gsap.timeline({ repeat: -1, onUpdate: place });
  idle.to({}, { duration: 4.2 });
  glintRound(idle, 1.2);
  idle.timeScale(SPEED);
}

/* less motion: nothing moves, the logo fades in already drawn, then the full stop */
function quiet(from) {
  const { parts, links, nib, px, land, w, end } = S;
  T = gsap.timeline({ paused: true, onUpdate: place });
  S.pen.u = 1;
  links.forEach((lk) => { lk.a = lk.len; });
  parts.forEach((p) => p.loops.forEach((L) => {
    L.fw = FILL ? p.end : w;
    L.o = FILL ? 0 : 1;
  }));
  Object.assign(nib, {
    follow: 0,
    x: PERIOD ? px : end[0],
    y: PERIOD ? land : end[1],
    r: 0,
    s: PERIOD ? 1 : 0,
    sx: 1,
    sy: 1,
  });
  place();
  if (picture) settlePicture();
  gsap.set(world, { opacity: 0 });
  gsap.set(nibEl, { opacity: 0 });
  T.to(world, { opacity: 1, duration: 0.6, ease: 'none' }, 0.1);
  T.addLabel('reveal', 0.7);
  if (PERIOD) T.to(nibEl, { opacity: 1, duration: 0.4, ease: 'none' }, 0.8);
  T.addLabel('rest', 1.3);
  if (LOOP) {
    T.to(world, { opacity: 0, duration: 0.5, ease: 'none' }, 1.3 + REST);
    T.call(() => start(), null, 1.9 + REST);
  } else {
    T.call(() => {
      notifyRest();
    }, null, 1.3 + Math.max(0.15, REST));
  }
  T.timeScale(SPEED);
  if (from) T.seek(from, false);
  T.play();
}

/* ------------------------------------------------------------------ start, replay, resize */
function start(from) {
  if (T) T.kill();
  if (idle) idle.kill();
  idle = null;
  gsap.set(nibEl, { clearProps: 'opacity' });
  build();
  if (REDUCED) quiet(from);
  else story(from);
}

function loadPicture() {
  return new Promise((done) => {
    if (!IMAGE.trim()) return done(null);
    const im = new Image();
    im.onload = () => done(im);
    im.onerror = () => done(null);
    im.src = IMAGE.trim();
  });
}

let wait = null;
let disposed = false;
const onResize = () => {
  /* One-shot splash: rebuilding mid-flight looks like a bug and causes lag spikes. */
  if (!LOOP) return;
  const W = stage.clientWidth;
  const H = stage.clientHeight;
  /* on a phone the address bar changes the height a little while scrolling: only a real change starts again */
  if (W === size.w && Math.abs(H - size.h) < 120) return;
  if (wait) wait.kill();
  wait = gsap.delayedCall(0.25, () => {
    if (disposed) return;
    start(T && T.labels.reveal !== undefined && T.time() > T.labels.reveal ? "rest" : 0);
  });
};
window.addEventListener("resize", onResize);

const face = getComputedStyle(stage);
const yieldFrame = () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

Promise.all([
  document.fonts ? document.fonts.load(`${face.fontWeight} 100px ${face.fontFamily}`).catch(() => null) : null,
  loadPicture(),
]).then(async ([, im]) => {
  if (disposed) return;
  picture = im;
  /* Let the overlay paint first, then do the heavy trace so the start hitch is hidden. */
  await yieldFrame();
  if (disposed) return;
  traceShape();
  await yieldFrame();
  if (disposed) return;
  start();
  root.classList.add("is-ready");
});

return () => {
  disposed = true;
  root.classList.remove("is-ready");
  window.removeEventListener("resize", onResize);
  if (wait) wait.kill();
  if (T) T.kill();
  if (idle) idle.kill();
};
}
