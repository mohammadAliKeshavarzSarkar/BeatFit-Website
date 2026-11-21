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
const article = read("src/content/blog/gymHeartRateMonitoring.ts");
const home = read("src/content/home.ts");
const resources = read("src/content/resources.ts");
const types = read("src/content/blog/types.ts");
const renderer = read("src/components/BlogContentBlocks.tsx");
const css = read("src/styles/pages/blog.css");

assert.match(posts, /["']پایش-ضربان-قلب-در-باشگاه["']\s*:/, "Canonical gym slug is missing");
assert.match(posts, /connected-training-system["']\s*:\s*["']پایش-ضربان-قلب-در-باشگاه/, "Legacy gym alias is missing");
assert.match(article, /kind:\s*["']process["']/, "Four-step system process is missing");
assert.equal((article.match(/kind:\s*["']table["']/g) ?? []).length >= 2, true, "Two management tables are required");
assert.match(article, /kind:\s*["']faq["']/, "Gym FAQ is missing");
assert.match(article, /kind:\s*["']sources["']/, "Gym sources are missing");
assert.doesNotMatch(article, /kind:\s*["']chart["']/, "Article three must not invent a statistical chart");
assert.match(article, /سیستم-پایش-زنده-باشگاه-بیت-فیت\.png/, "Inline gym dashboard image is missing");
assert.match(article, /href:\s*["']\/blog\/زون-های-ضربان-قلب["']/, "Internal link to article one is missing");
assert.match(article, /href:\s*["']\/blog\/کنترل-شدت-تمرین-در-کلاس-گروهی["']/, "Internal link to article two is missing");
assert.match(article, /href:\s*["']\/demo["']/, "Demo CTA is missing");
assert.equal((article.match(/https:\/\//g) ?? []).length >= 7, true, "Seven gym article sources are required");

assert.match(types, /kind:\s*["']process["']/, "Process block is not typed");
assert.match(renderer, /bf-blog-block-process/, "Process block is not rendered");
assert.match(css, /\.bf-blog-block-process/, "Process block is not styled");
assert.match(home, /image:\s*["']\/beatfitImages\/blog-club-data-flow\.png["']/, "Homepage club image must remain unchanged");
assert.match(home, /href:\s*["']\/blog\/پایش-ضربان-قلب-در-باشگاه["']/, "Homepage gym article link is missing");
assert.match(resources, /image:\s*["']\/beatfitImages\/articles\/پایش-ضربان-قلب-در-باشگاه\.png["']/, "Resources gym image is missing");
assert.equal((resources.match(/href:\s*["']\/blog\/پایش-ضربان-قلب-در-باشگاه["']/g) ?? []).length >= 2, true, "Both Resources gym links must be canonical");

for (const asset of [
  "public/beatfitImages/articles/پایش-ضربان-قلب-در-باشگاه.png",
  "public/beatfitImages/articles/سیستم-پایش-زنده-باشگاه-بیت-فیت.png",
]) {
  assert.equal(existsSync(resolve(root, asset)), true, `Missing gym article asset: ${asset}`);
}

console.log("Third Persian gym article content contract passed.");
