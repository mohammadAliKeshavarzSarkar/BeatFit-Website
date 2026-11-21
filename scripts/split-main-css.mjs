import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const stylesRoot = path.join(__dirname, "..", "src", "styles");

const importOrder = [
  "base.css",
  "pages/gym-hero.css",
  "pages/coach-hero.css",
  "pages/athlete.css",
  "pages/coach.css",
  "pages/gym.css",
  "pages/home.css",
  "pages/home-faq-footer.css",
  "animations.css",
  "pages/blog.css",
  "pages/resources.css",
  "pages/demo.css",
];

const combined = importOrder
  .map((file) => fs.readFileSync(path.join(stylesRoot, file), "utf8"))
  .join("\n");

/** First matching file wins (order = cascade). */
const markerRoutes = [
  { pattern: /Reset & base/i, file: "base.css" },
  { pattern: /Wells & cards/i, file: "base.css" },
  { pattern: /Buttons/i, file: "base.css" },
  { pattern: /Metric chip/i, file: "base.css" },
  { pattern: /Header/i, file: "base.css" },
  { pattern: /^Gym hero/i, file: "pages/gym-hero.css" },
  { pattern: /^Coach hero/i, file: "pages/coach-hero.css" },
  { pattern: /^Athlete /i, file: "pages/athlete.css" },
  { pattern: /^Coach /i, file: "pages/coach.css" },
  { pattern: /^Gym /i, file: "pages/gym.css" },
  { pattern: /^Hero/i, file: "pages/home.css" },
  { pattern: /^Gap under the hero/i, file: "pages/home.css" },
  { pattern: /^Experience/i, file: "pages/home.css" },
  { pattern: /^Live journey/i, file: "pages/home.css" },
  { pattern: /^Feature cards/i, file: "pages/home.css" },
  { pattern: /^Activity showcase/i, file: "pages/home.css" },
  { pattern: /^Persona/i, file: "pages/home.css" },
  { pattern: /^Blogs carousel/i, file: "pages/home.css" },
  { pattern: /^FAQ/i, file: "pages/home-faq-footer.css" },
  { pattern: /^Contact \/ CTA/i, file: "pages/home-faq-footer.css" },
  { pattern: /^Footer/i, file: "pages/home-faq-footer.css" },
  { pattern: /^Live metric animation/i, file: "animations.css" },
  { pattern: /^Blog post detail/i, file: "pages/blog.css" },
  { pattern: /^Resources page/i, file: "pages/resources.css" },
  { pattern: /^Resources catalog/i, file: "pages/resources.css" },
  { pattern: /^Demo page/i, file: "pages/demo.css" },
];

const lines = combined.split(/\r?\n/);
const sections = [];
let current = null;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const markerMatch = line.match(/^\/\* ——— (.+?) ——— \*\/$/);
  if (markerMatch) {
    const title = markerMatch[1];
    const route = markerRoutes.find((r) => r.pattern.test(title));
    if (!route) {
      throw new Error(`No route for section: ${title} (line ${i + 1})`);
    }
    if (current?.file !== route.file) {
      current = { file: route.file, lines: [line] };
      sections.push(current);
    } else {
      current.lines.push(line);
    }
  } else if (current) {
    current.lines.push(line);
  } else {
    throw new Error(`Content before first section marker at line ${i + 1}`);
  }
}

const buckets = new Map();
for (const { file, lines: sectionLines } of sections) {
  const prev = buckets.get(file) ?? "";
  buckets.set(file, prev + (prev ? "\n" : "") + sectionLines.join("\n"));
}

for (const file of importOrder) {
  const outPath = path.join(stylesRoot, file);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  const body = buckets.get(file);
  if (!body) {
    throw new Error(`Empty bucket: ${file}`);
  }
  fs.writeFileSync(outPath, `${body.trimEnd()}\n`);
}

console.log("Re-split OK:", [...buckets.keys()].join(", "));

const imports = [
  "./tokens.css",
  "./fonts.css",
  "./base.css",
  "./shared/marketing-cta.css",
  ...importOrder.map((f) => `./${f.replace(/\\/g, "/")}`),
];

const mainPath = path.join(stylesRoot, "main.css");
fs.writeFileSync(
  mainPath,
  `${imports.map((u) => `@import url("${u}");`).join("\n")}\n`,
);

