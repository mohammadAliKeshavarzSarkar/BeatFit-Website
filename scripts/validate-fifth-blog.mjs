import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (relativePath) => {
  const path = resolve(root, relativePath);
  return existsSync(path) ? readFileSync(path, "utf8") : "";
};

const posts = read("src/content/blog/posts.ts");
const article = read("src/content/blog/trainingLoad.ts");
const types = read("src/content/blog/types.ts");
const renderer = read("src/components/BlogContentBlocks.tsx");
const css = read("src/styles/pages/blog.css");
const home = read("src/content/home.ts");
const resources = read("src/content/resources.ts");

assert.match(posts, /["']بار-تمرینی-چیست["']\s*:/, "Canonical training-load slug is missing");
assert.match(posts, /live-tv-group-training["']\s*:\s*["']بار-تمرینی-چیست/, "Legacy fifth-article alias is missing");
assert.match(article, /seoTitle:\s*["']بار تمرینی چیست\؟ روش محاسبه و تفسیر فشار تمرین["']/, "Training-load SEO title is missing");
assert.equal((article.match(/kind:\s*["']table["']/g) ?? []).length >= 2, true, "Two training-load tables are required");
assert.match(article, /kind:\s*["']chart["']/, "Session RPE chart is missing");
assert.match(article, /kind:\s*["']faq["']/, "Training-load FAQ is missing");
assert.match(article, /kind:\s*["']sources["']/, "Training-load sources are missing");
assert.equal((article.match(/https:\/\//g) ?? []).length >= 6, true, "Six training-load sources are required");
assert.match(article, /href:\s*["']\/blog\/heart-rate-zones["']/, "Internal zones link is missing");
assert.match(article, /href:\s*["']\/blog\/workout-history-progress["']/, "Internal history link is missing");
assert.match(article, /href:\s*["']\/athlete["']/, "Athlete CTA is missing");
assert.match(article, /\/beatfitImages\/blog-workout-history\.png/, "Portrait product image is missing");
assert.match(article, /layout:\s*["']portrait["']/, "Portrait layout is not selected");

assert.match(types, /layout\?:\s*["']default["']\s*\|\s*["']portrait["']/, "Portrait figure layout is not typed");
assert.match(renderer, /bf-blog-block-figure--/, "Figure layout modifier is not rendered");
assert.match(css, /\.bf-blog-block-figure--portrait/, "Portrait figure layout is not styled");

assert.match(home, /image:\s*["']\/beatfitImages\/blog-live-tv\.png["']/, "Homepage fifth-card image must remain unchanged");
assert.match(home, /href:\s*["']\/blog\/training-load["']/, "Homepage training-load link is missing");
assert.match(resources, /image:\s*["']\/beatfitImages\/articles\/بار-تمرینی-چیست\.png["']/, "Resources training-load hero is missing");
assert.match(resources, /href:\s*["']\/blog\/training-load["']/, "Resources training-load link is missing");

for (const asset of [
  "public/beatfitImages/articles/بار-تمرینی-چیست.png",
  "public/beatfitImages/blog-workout-history.png",
]) {
  assert.equal(existsSync(resolve(root, asset)), true, `Missing article-five asset: ${asset}`);
}

console.log("Fifth Persian training-load article content contract passed.");
