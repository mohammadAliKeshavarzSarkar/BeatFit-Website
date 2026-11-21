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
const article = read("src/content/blog/heartRateSensorComparison.ts");
const home = read("src/content/home.ts");
const resources = read("src/content/resources.ts");

assert.match(posts, /["']مقایسه-سنسور-ضربان-قلب["']\s*:/, "Canonical sensor-comparison slug is missing");
assert.match(article, /seoTitle:\s*["']مقایسه سنسور ضربان قلب بازویی، مچی و سینه‌ای["']/, "Sensor-comparison SEO title is missing");
assert.equal((article.match(/kind:\s*["']table["']/g) ?? []).length >= 1, true, "Sensor comparison table is missing");
assert.doesNotMatch(article, /kind:\s*["']chart["']/, "Article six must not invent an accuracy chart");
assert.match(article, /kind:\s*["']faq["']/, "Sensor FAQ is missing");
assert.match(article, /kind:\s*["']sources["']/, "Sensor sources are missing");
assert.equal((article.match(/https:\/\//g) ?? []).length >= 8, true, "Eight sensor-comparison sources are required");
assert.match(article, /href:\s*["']\/blog\/زون-های-ضربان-قلب["']/, "Internal zones link is missing");
assert.match(article, /href:\s*["']\/blog\/پایش-ضربان-قلب-در-باشگاه["']/, "Internal gym-monitoring link is missing");
assert.match(article, /href:\s*["']\/athlete["']/, "Athlete CTA is missing");
assert.match(article, /سنسورهای-ضربان-قلب-بیت-فیت\.png/, "Inline BeatFit sensor image is missing");
assert.match(article, /کدام حسگر برای نیاز شما مناسب‌تر است\؟/, "Quick-selection guide is missing");

for (const existingImage of [
  "/beatfitImages/blog-heart-rate-zones.png",
  "/beatfitImages/blog-live-class.png",
  "/beatfitImages/blog-club-data-flow.png",
  "/beatfitImages/blog-workout-history.png",
  "/beatfitImages/blog-live-tv.png",
]) {
  assert.equal(home.includes(existingImage), true, `Existing homepage image changed or disappeared: ${existingImage}`);
}

assert.match(home, /id:\s*["']sensors["']/, "Sixth homepage card is missing");
assert.match(home, /href:\s*["']\/blog\/مقایسه-سنسور-ضربان-قلب["']/, "Homepage sensor-comparison link is missing");
assert.match(resources, /id:\s*["']athlete-sensors["']/, "Resources sensor card is missing");
assert.match(resources, /image:\s*["']\/beatfitImages\/articles\/مقایسه-سنسور-ضربان-قلب\.png["']/, "Resources sensor hero is missing");
assert.match(resources, /href:\s*["']\/blog\/مقایسه-سنسور-ضربان-قلب["']/, "Resources sensor link is missing");

for (const asset of [
  "public/beatfitImages/articles/مقایسه-سنسور-ضربان-قلب.png",
  "public/beatfitImages/articles/سنسورهای-ضربان-قلب-بیت-فیت.png",
]) {
  assert.equal(existsSync(resolve(root, asset)), true, `Missing article-six asset: ${asset}`);
}

console.log("Sixth Persian heart-rate sensor article content contract passed.");
