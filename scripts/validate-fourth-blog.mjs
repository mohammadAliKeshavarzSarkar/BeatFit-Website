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
const article = read("src/content/blog/trainingHistory.ts");
const home = read("src/content/home.ts");
const resources = read("src/content/resources.ts");

assert.match(posts, /["']تاریخچه-تمرین["']\s*:/, "Canonical training-history slug is missing");
assert.match(posts, /workout-history-progress["']\s*:\s*["']تاریخچه-تمرین/, "Legacy history alias is missing");
assert.match(article, /seoTitle:\s*["']تاریخچه تمرین چیست\؟ بررسی روند پیشرفت ورزشی["']/, "SEO title is missing");
assert.match(article, /kind:\s*["']chart["']/, "Four-session chart is missing");
assert.equal((article.match(/kind:\s*["']table["']/g) ?? []).length >= 2, true, "Two training-history tables are required");
assert.match(article, /kind:\s*["']faq["']/, "Training-history FAQ is missing");
assert.match(article, /kind:\s*["']sources["']/, "Training-history sources are missing");
assert.equal((article.match(/https:\/\//g) ?? []).length >= 6, true, "Six article sources are required");
assert.match(article, /href:\s*["']\/blog\/heart-rate-zones["']/, "Internal heart-rate-zones link is missing");
assert.match(article, /href:\s*["']\/athlete["']/, "Athlete CTA is missing");
assert.match(article, /\/assets\/product\/class-live-dashboard\.png/, "Inline training-history product image is missing");
assert.match(home, /image:\s*["']\/beatfitImages\/blog-workout-history\.png["']/, "Homepage history image must remain unchanged");
assert.match(home, /href:\s*["']\/blog\/workout-history-progress["']/, "Homepage canonical history link is missing");
assert.match(resources, /image:\s*["']\/beatfitImages\/articles\/تاریخچه-تمرین\.png["']/, "Resources history hero is missing");
assert.equal((resources.match(/href:\s*["']\/blog\/workout-history-progress["']/g) ?? []).length >= 2, true, "Both Resources history links must be canonical");

for (const asset of [
  "public/beatfitImages/articles/تاریخچه-تمرین.png",
  "public/assets/product/class-live-dashboard.png",
]) {
  assert.equal(existsSync(resolve(root, asset)), true, `Missing article-four asset: ${asset}`);
}

console.log("Fourth Persian training-history article content contract passed.");
