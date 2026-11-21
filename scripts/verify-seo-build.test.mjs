import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const checker = resolve(dirname(fileURLToPath(import.meta.url)), 'verify-seo-build.mjs');
const origin = 'http://beatfit.ir';
const publishedPaths = [
  '/', '/gym', '/coach', '/athlete', '/resources', '/demo',
  ...[
    'زون-های-ضربان-قلب', 'کنترل-شدت-تمرین-در-کلاس-گروهی',
    'پایش-ضربان-قلب-در-باشگاه', 'تاریخچه-تمرین',
    'بار-تمرینی-چیست', 'مقایسه-سنسور-ضربان-قلب',
    'طراحی-تمرین-گروهی',
  ].map(slug => `/blog/${slug}`),
];

function buildFixture() {
  const root = mkdtempSync(join(tmpdir(), 'beatfit-seo-check-'));
  const urls = publishedPaths.map(p => new URL(p, `${origin}/`).href);
  writeFileSync(join(root, 'sitemap.xml'), `<urlset>${urls.map(url => `<url><loc>${url}</loc></url>`).join('')}</urlset>`);
  writeFileSync(join(root, 'robots.txt'), `User-agent: *\nDisallow: /route-html/\nSitemap: ${origin}/sitemap.xml\n`);
  const routeMap = new Map();
  let counter = 0;
  for (const pathname of publishedPaths) {
    const file = pathname === '/' ? 'index.html' : pathname.startsWith('/blog/') ? `route-html/blog/${++counter}.html` : `route-html/${pathname.slice(1)}.html`;
    routeMap.set(pathname, file);
    const absolute = new URL(pathname, `${origin}/`).href;
    const html = `<!DOCTYPE html><html lang="fa" dir="rtl"><head><title>Title ${routeMap.size}</title><meta name="description" content="Unique description ${routeMap.size}"/><meta name="robots" content="index, follow"/><link rel="canonical" href="${absolute}"/><meta property="og:url" content="${absolute}"/><script id="bf-jsonld" type="application/ld+json">{"@context":"https://schema.org","@type":"WebPage"}</script></head><body><main id="bf-static-seo"><h1>تیتر</h1></main></body></html>`;
    const destination = join(root, file);
    mkdirSync(dirname(destination), {recursive:true});
    writeFileSync(destination, html);
  }
  const entries = [...routeMap].filter(([pathname]) => pathname !== '/').map(([pathname, file]) => `<add key="${pathname.slice(1)}" value="/${file}" />`).join('\n');
  writeFileSync(join(root, 'web.config'), `<configuration><!-- bf:routes -->\n${entries}\n<!-- /bf:routes --></configuration>`);
  writeFileSync(join(root, '404.html'), '<html lang="fa" dir="rtl"><head><meta name="robots" content="noindex, follow"/></head><body></body></html>');
  return {root, routeMap};
}

function run(root) {
  return spawnSync(process.execPath, [checker, root], {encoding:'utf8'});
}

function withFixture(callback) {
  const fixture = buildFixture();
  try { callback(fixture); } finally { rmSync(fixture.root, {recursive:true, force:true}); }
}

test('accepts 13 valid source-baseline routes and shared canonical origin', () => withFixture(({root}) => {
  const result = run(root);
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /PASSED/);
}));

test('rejects indexable route when robots meta incorrectly says noindex', () => withFixture(({root,routeMap}) => {
  const filename = join(root, routeMap.get('/gym'));
  writeFileSync(filename, readFileSync(filename, 'utf8').replace('content="index, follow"', 'content="noindex, follow"'));
  const result = run(root);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Invalid robots index directive/);
}));

test('rejects bad canonical and og:url for one route', () => withFixture(({root,routeMap}) => {
  const filename = join(root, routeMap.get('/coach'));
  writeFileSync(filename, readFileSync(filename, 'utf8').replaceAll('http://beatfit.ir/coach', 'http://beatfit.ir/gym'));
  const result = run(root);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Wrong or duplicate canonical/);
  assert.match(result.stderr, /Wrong og:url/);
}));

test('rejects missing rewritten article shell', () => withFixture(({root,routeMap}) => {
  rmSync(join(root, routeMap.get('/blog/زون-های-ضربان-قلب')));
  const result = run(root);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Missing built file/);
}));

test('rejects invalid JSON-LD', () => withFixture(({root,routeMap}) => {
  const filename = join(root, routeMap.get('/athlete'));
  writeFileSync(filename, readFileSync(filename, 'utf8').replace('"@type":"WebPage"', '"@type":'));
  const result = run(root);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Invalid JSON-LD syntax/);
}));

test('rejects a canonical link on the 404 shell', () => withFixture(({root}) => {
  const filename = join(root, '404.html');
  writeFileSync(filename, readFileSync(filename, 'utf8').replace('</head>', '<link rel="canonical" href="http://beatfit.ir/404" /></head>'));
  const result = run(root);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /404 shell must not emit canonical/);
}));

test('rejects duplicate sitemap entries', () => withFixture(({root}) => {
  const filename = join(root, 'sitemap.xml');
  const html = readFileSync(filename, 'utf8');
  writeFileSync(filename, html.replace('</urlset>', `<url><loc>${origin}/gym</loc></url></urlset>`));
  const result = run(root);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /duplicate <loc>/);
}));

test('rejects missing route-map block', () => withFixture(({root}) => {
  writeFileSync(join(root, 'web.config'), '<configuration></configuration>');
  const result = run(root);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /route-map marker block is missing/);
}));
