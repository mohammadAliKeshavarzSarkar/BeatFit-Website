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
const article = read("src/content/blog/groupClassIntensity.ts");
const home = read("src/content/home.ts");
const resources = read("src/content/resources.ts");
const types = read("src/content/blog/types.ts");
const renderer = read("src/components/BlogContentBlocks.tsx");

assert.match(posts, /["']کنترل-شدت-تمرین-در-کلاس-گروهی["']\s*:/, "Canonical coach slug is missing");
assert.match(posts, /live-class-monitoring["']\s*:\s*["']کنترل-شدت-تمرین-در-کلاس-گروهی/, "Legacy coach alias is missing");
assert.match(article, /kind:\s*["']table["']/, "Comparison tables are missing");
assert.match(article, /kind:\s*["']chart["']/, "Relative-intensity chart is missing");
assert.match(article, /kind:\s*["']faq["']/, "Coach FAQ is missing");
assert.match(article, /kind:\s*["']sources["']/, "Coach sources are missing");
assert.match(article, /پایش-زنده-ضربان-قلب-ورزشکاران\.png/, "Inline coach dashboard image is missing");
assert.match(article, /href:\s*["']\/blog\/زون-های-ضربان-قلب["']/, "Internal link to article one is missing");
assert.match(article, /href:\s*["']\/coach["']/, "Internal coach-page link is missing");
assert.equal((article.match(/https:\/\//g) ?? []).length >= 7, true, "Seven coach article sources are required");
assert.match(types, /href\?:\s*string/, "Rich inline links are not typed");
assert.match(renderer, /<Link[^>]+to=\{part\.href\}/, "Internal rich inline links are not rendered with React Router");

assert.match(home, /image:\s*["']\/beatfitImages\/blog-live-class\.png["']/, "Homepage coach image must remain unchanged");
assert.match(home, /href:\s*["']\/blog\/کنترل-شدت-تمرین-در-کلاس-گروهی["']/, "Homepage coach article link is missing");
assert.match(resources, /image:\s*["']\/beatfitImages\/articles\/کنترل-شدت-تمرین-در-کلاس-گروهی\.png["']/, "Resources coach image is missing");
assert.match(resources, /href:\s*["']\/blog\/کنترل-شدت-تمرین-در-کلاس-گروهی["']/, "Resources coach link is missing");

for (const asset of [
  "public/beatfitImages/articles/کنترل-شدت-تمرین-در-کلاس-گروهی.png",
  "public/beatfitImages/articles/پایش-زنده-ضربان-قلب-ورزشکاران.png",
]) {
  assert.equal(existsSync(resolve(root, asset)), true, `Missing coach article asset: ${asset}`);
}

console.log("Second Persian coach article content contract passed.");
