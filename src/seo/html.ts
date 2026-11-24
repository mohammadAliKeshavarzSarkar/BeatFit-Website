import { absoluteAsset } from "../config/site";
import type { HeadTag, JsonLd, SeoDocument } from "./types";

const MANAGED_META = [
  { attr: "name", key: "description" },
  { attr: "name", key: "robots" },
  { attr: "property", key: "og:type" },
  { attr: "property", key: "og:site_name" },
  { attr: "property", key: "og:locale" },
  { attr: "property", key: "og:title" },
  { attr: "property", key: "og:description" },
  { attr: "property", key: "og:url" },
  { attr: "property", key: "og:image" },
  { attr: "property", key: "og:image:alt" },
  { attr: "name", key: "twitter:card" },
  { attr: "name", key: "twitter:title" },
  { attr: "name", key: "twitter:description" },
  { attr: "name", key: "twitter:image" },
  { attr: "property", key: "article:published_time" },
] as const;

export function managedMetaKeys(): readonly { attr: "name" | "property"; key: string }[] {
  return MANAGED_META;
}

export function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function serializeJsonLd(data: JsonLd): string {
  return JSON.stringify(data).replaceAll("<", "\\u003c");
}

export function headTags(doc: SeoDocument): HeadTag[] {
  const image = absoluteAsset(doc.imagePath);
  const tags: HeadTag[] = [
    { kind: "title", text: doc.title },
    { kind: "meta", name: "description", content: doc.description },
  ];

  if (doc.canonical) {
    tags.push({ kind: "canonical", href: doc.canonical });
  }

  tags.push(
    { kind: "meta", name: "robots", content: doc.robots },
    { kind: "meta", property: "og:type", content: doc.ogType },
    { kind: "meta", property: "og:site_name", content: "بیت‌فیت" },
    { kind: "meta", property: "og:locale", content: "fa_IR" },
    { kind: "meta", property: "og:title", content: doc.title },
    { kind: "meta", property: "og:description", content: doc.description },
  );

  if (doc.canonical) {
    tags.push({ kind: "meta", property: "og:url", content: doc.canonical });
  }

  tags.push(
    { kind: "meta", property: "og:image", content: image },
    { kind: "meta", property: "og:image:alt", content: doc.imageAlt },
    { kind: "meta", name: "twitter:card", content: "summary_large_image" },
    { kind: "meta", name: "twitter:title", content: doc.title },
    { kind: "meta", name: "twitter:description", content: doc.description },
    { kind: "meta", name: "twitter:image", content: image },
  );

  if (doc.publishedTime) {
    tags.push({
      kind: "meta",
      property: "article:published_time",
      content: doc.publishedTime,
    });
  }

  if (doc.jsonLd) {
    tags.push({ kind: "jsonld", json: serializeJsonLd(doc.jsonLd) });
  }

  return tags;
}

function renderTag(tag: HeadTag): string {
  switch (tag.kind) {
    case "title":
      return `<title>${escapeHtml(tag.text)}</title>`;
    case "meta":
      if (tag.name) {
        return `<meta name="${escapeHtml(tag.name)}" content="${escapeHtml(tag.content)}" />`;
      }
      return `<meta property="${escapeHtml(tag.property ?? "")}" content="${escapeHtml(tag.content)}" />`;
    case "canonical":
      return `<link rel="canonical" href="${escapeHtml(tag.href)}" />`;
    case "jsonld":
      return `<script type="application/ld+json" id="bf-jsonld">${tag.json}</script>`;
  }
}

export function renderSeoHead(doc: SeoDocument): string {
  return headTags(doc).map(renderTag).join("\n");
}

export function renderSeoBody(doc: SeoDocument, articleHtml = ""): string {
  const nav =
    doc.primaryDestinations && doc.primaryDestinations.length > 0
      ? [
          `  <nav aria-label="بخش‌های اصلی بیت‌فیت">`,
          `    <ul>`,
          ...doc.primaryDestinations.map(
            (dest) =>
              `      <li><a href="${escapeHtml(dest.path)}">${escapeHtml(dest.name)}</a></li>`,
          ),
          `    </ul>`,
          `  </nav>`,
        ]
      : [];

  return [
    `<main id="bf-static-seo" lang="fa" dir="rtl">`,
    `  <h1>${escapeHtml(doc.h1)}</h1>`,
    `  <p>${escapeHtml(doc.summary)}</p>`,
    ...nav,
    // This HTML is generated from trusted published source blocks with all text
    // escaped. It remains readable if the client never executes JavaScript.
    ...(articleHtml ? [articleHtml] : []),
    `</main>`,
    `<script>var bfStaticSeo=document.getElementById("bf-static-seo");if(bfStaticSeo)bfStaticSeo.remove();</script>`,
  ].join("\n");
}

export function replaceMarkedBlock(source: string, name: string, inner: string): string {
  const pattern = new RegExp(`<!-- bf:${name} -->[\\s\\S]*?<!-- /bf:${name} -->`);
  if (!pattern.test(source)) {
    throw new Error(`Missing <!-- bf:${name} --> block`);
  }
  return source.replace(pattern, `<!-- bf:${name} -->\n${inner}\n    <!-- /bf:${name} -->`);
}

function indentBlock(block: string): string {
  return block
    .split("\n")
    .map((line) => `    ${line}`)
    .join("\n");
}

export function applySeoBlocks(html: string, doc: SeoDocument, articleHtml = ""): string {
  const withHead = replaceMarkedBlock(html, "seo", indentBlock(renderSeoHead(doc)));
  return replaceMarkedBlock(withHead, "static", indentBlock(renderSeoBody(doc, articleHtml)));
}
