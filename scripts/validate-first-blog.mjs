import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname } from "node:path";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (relativePath) =>
  readFileSync(resolve(root, relativePath), "utf8");

const posts = `${read("src/content/blog/posts.ts")}\n${read("src/content/blog/heartRateZones.ts")}`;
const home = read("src/content/home.ts");
const resources = read("src/content/resources.ts");
const page = read("src/pages/BlogPostPage.tsx");

assert.match(posts, /["']زون-های-ضربان-قلب["']\s*:/, "Persian canonical slug is missing");
assert.match(posts, /heart-rate-zones["']\s*:\s*["']زون-های-ضربان-قلب/, "English legacy alias is missing");
assert.match(posts, /kind:\s*["']table["']/, "Rich article table block is missing");
assert.match(posts, /kind:\s*["']chart["']/, "Rich article chart block is missing");
assert.match(posts, /kind:\s*["']faq["']/, "Rich article FAQ block is missing");
assert.match(posts, /kind:\s*["']sources["']/, "Rich article sources block is missing");
assert.match(posts, /نمایش-زون-های-تمرین-در-بیت-فیت\.png/, "Inline dashboard image is missing");
assert.equal((posts.match(/https:\/\//g) ?? []).length >= 6, true, "Six article sources are required");

assert.match(home, /image:\s*["']\/beatfitImages\/blog-heart-rate-zones\.png["']/, "Homepage image must remain unchanged");
assert.match(home, /href:\s*["']\/blog\/زون-های-ضربان-قلب["']/, "Homepage Persian article link is missing");
assert.match(resources, /\/blog\/زون-های-ضربان-قلب/, "Resources Persian article link is missing");
assert.match(page, /resolveBlogSlug/, "Canonical slug resolution is not connected to the page");

for (const asset of [
  "public/beatfitImages/articles/زون-های-ضربان-قلب.png",
  "public/beatfitImages/articles/نمایش-زون-های-تمرین-در-بیت-فیت.png",
]) {
  assert.equal(existsSync(resolve(root, asset)), true, `Missing article asset: ${asset}`);
}

console.log("First Persian blog content contract passed.");
