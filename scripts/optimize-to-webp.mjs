/**
 * Convert all PNG/JPEG under public/ to WebP, rewrite source refs, delete originals.
 * Usage: node scripts/optimize-to-webp.mjs
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(root, "public");
const rewriteRoots = [
  path.join(root, "src"),
  path.join(root, "index.html"),
];

const RASTER = new Set([".png", ".jpg", ".jpeg"]);
const TEXT_EXTS = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".css",
  ".html",
  ".json",
  ".md",
  ".mjs",
]);

async function walk(dir) {
  const out = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

async function convertFile(file) {
  const ext = path.extname(file).toLowerCase();
  if (!RASTER.has(ext)) return null;

  const webpPath = file.slice(0, -ext.length) + ".webp";
  const input = sharp(file, { failOn: "none" });
  const meta = await input.metadata();
  const hasAlpha = meta.hasAlpha === true;

  await input
    .webp({
      quality: hasAlpha ? 82 : 80,
      alphaQuality: 90,
      effort: 4,
      smartSubsample: true,
    })
    .toFile(webpPath);

  const [before, after] = await Promise.all([
    fs.stat(file),
    fs.stat(webpPath),
  ]);

  await fs.unlink(file);

  return {
    from: path.relative(publicDir, file).replaceAll("\\", "/"),
    to: path.relative(publicDir, webpPath).replaceAll("\\", "/"),
    before: before.size,
    after: after.size,
  };
}

function rewriteText(content) {
  // Only rewrite paths that look like site assets, not random docs mentions of .png as format.
  return content
    .replace(/(\/[\w./\- %\u0600-\u06FF]+)\.png\b/gi, "$1.webp")
    .replace(/(\/[\w./\- %\u0600-\u06FF]+)\.jpe?g\b/gi, "$1.webp");
}

async function rewriteFile(file) {
  const ext = path.extname(file).toLowerCase();
  if (!TEXT_EXTS.has(ext)) return false;
  const before = await fs.readFile(file, "utf8");
  const after = rewriteText(before);
  if (after === before) return false;
  await fs.writeFile(file, after, "utf8");
  return true;
}

async function main() {
  const files = await walk(publicDir);
  const converted = [];

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (!RASTER.has(ext)) continue;
    // Skip if a webp sibling already exists and source is leftover — still convert fresh.
    try {
      const result = await convertFile(file);
      if (result) converted.push(result);
      process.stdout.write(`✓ ${result.from} → ${result.to}\n`);
    } catch (error) {
      process.stderr.write(`✗ ${path.relative(root, file)}: ${error.message}\n`);
    }
  }

  const rewriteTargets = [];
  for (const target of rewriteRoots) {
    const st = await fs.stat(target);
    if (st.isDirectory()) rewriteTargets.push(...(await walk(target)));
    else rewriteTargets.push(target);
  }

  let rewritten = 0;
  for (const file of rewriteTargets) {
    if (await rewriteFile(file)) {
      rewritten += 1;
      process.stdout.write(`✎ ${path.relative(root, file)}\n`);
    }
  }

  const before = converted.reduce((sum, item) => sum + item.before, 0);
  const after = converted.reduce((sum, item) => sum + item.after, 0);

  console.log("\nDone.");
  console.log(`Converted: ${converted.length} images`);
  console.log(`Rewrote:   ${rewritten} source files`);
  console.log(
    `Size:      ${(before / 1e6).toFixed(2)} MB → ${(after / 1e6).toFixed(2)} MB (` +
      `${(((before - after) / Math.max(before, 1)) * 100).toFixed(1)}% smaller)`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
