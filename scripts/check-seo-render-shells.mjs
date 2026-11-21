const routes = [
  ["home", "http://localhost:4173/", "https://beatfit.ir/"],
  ["gym", "http://localhost:4173/gym", "https://beatfit.ir/gym"],
  [
    "article",
    "http://localhost:4173/blog/heart-rate-zones",
    "https://beatfit.ir/blog/heart-rate-zones",
  ],
  ["missing", "http://localhost:4173/no-such-page-xyz", "https://beatfit.ir/no-such-page-xyz"],
];

function pick(html, re) {
  const m = html.match(re);
  return m ? m[1].trim() : null;
}

async function check(label, url) {
  const res = await fetch(url, { redirect: "follow" });
  const html = await res.text();
  return {
    label,
    status: res.status,
    title: pick(html, /<title>([^<]*)<\/title>/i),
    canonical:
      pick(html, /rel=["']canonical["'][^>]*href=["']([^"']+)["']/i) ||
      pick(html, /href=["']([^"']+)["'][^>]*rel=["']canonical["']/i),
    h1: pick(html, /<h1[^>]*>([^<]*)<\/h1>/i),
    hasStatic: html.includes("bf-static-seo"),
    hasJsonLd: html.includes("bf-jsonld"),
    noindex: /noindex/i.test(html),
    len: html.length,
  };
}

for (const [name, preview, live] of routes) {
  console.log(JSON.stringify(await check(`preview:${name}`, preview)));
  console.log(JSON.stringify(await check(`live:${name}`, live)));
}
