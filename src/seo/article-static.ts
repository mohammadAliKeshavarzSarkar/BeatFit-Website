// Static, no-JavaScript article content for each generated canonical HTML route.
// This mirrors the published source blocks; it is not a second editorial copy.
import type { BlogContentBlock, BlogInline, BlogPost, BlogRichText } from "../content/blog/types.ts";
import { blogPath, getBlogPost } from "../content/blog/posts.ts";
import { escapeHtml } from "./html.ts";

function safeUrl(url: string): string {
  // Published content provides trusted links, but fail the build if a new
  // unsafe protocol or scheme-relative URL enters the source content.
\x20\x20if\x20(/[\\\\\u0000-\u0020\u007f]/.test(url)\x20||\x20(!(url.startsWith("/")\x20&&\x20!url.startsWith("//"))\x20&&\x20!/^https:\/\//i.test(url)))\x20{
    throw new Error(`Static article contains unsafe or relative URL: ${url}`);
  }
  return escapeHtml(url);
}

function inlineText(text: BlogRichText): string {
  if (typeof text === "string") return escapeHtml(text);
  return text.map((part: BlogInline) => {
    let rendered = escapeHtml(part.text);
    if (part.emphasis) rendered = `<em>${rendered}</em>`;
    if (part.strong) rendered = `<strong>${rendered}</strong>`;
    if (part.href) rendered = `<a href="${safeUrl(part.href)}">${rendered}</a>`;
    return rendered;
  }).join("");
}

function paragraph(value: string): string {
  return `<p>${escapeHtml(value)}</p>`;
}

function blockHtml(block: BlogContentBlock): string {
  switch (block.kind) {
    case "heading":
      return `<h${block.level}>${escapeHtml(block.text)}</h${block.level}>`;
    case "paragraph":
      return `<p>${inlineText(block.content)}</p>`;
    case "list":
      return `<ul>${block.items.map(item => `<li>${inlineText(item)}</li>`).join("")}</ul>`;
    case "table":
      return [
        "<table>",
        block.caption ? `<caption>${escapeHtml(block.caption)}</caption>` : "",
        "<thead><tr>",
        ...block.headers.map(header => `<th scope="col">${inlineText(header)}</th>`),
        "</tr></thead><tbody>",
        ...block.rows.map(row => `<tr>${row.map(cell => `<td>${inlineText(cell)}</td>`).join("")}</tr>`),
        "</tbody></table>",
      ].join("");
    case "figure":
      return `<figure><img src="${safeUrl(block.src)}" alt="${escapeHtml(block.alt)}" loading="lazy" />${block.caption ? `<figcaption>${escapeHtml(block.caption)}</figcaption>` : ""}</figure>`;
    case "chart":
      return [
        "<section>",
        `<h2>${escapeHtml(block.title)}</h2>`,
        block.subtitle ? paragraph(block.subtitle) : "",
        `<dl>${block.values.map(v => `<dt>${escapeHtml(v.label)}</dt><dd>${escapeHtml(v.displayValue)}</dd>`).join("")}</dl>`,
        block.metrics?.length ? `<dl>${block.metrics.map(m => `<dt>${escapeHtml(m.label)}</dt><dd>${escapeHtml(m.value)}</dd>`).join("")}</dl>` : "",
        block.note ? paragraph(block.note) : "",
        "</section>",
      ].join("");
    case "process":
      return [
        "<section>",
        `<h2>${escapeHtml(block.title)}</h2>`,
        block.subtitle ? paragraph(block.subtitle) : "",
        "<ol>",
        ...block.steps.map(step => `<li><h3>${escapeHtml(step.title)}</h3>${paragraph(step.body)}</li>`),
        "</ol>",
        block.note ? paragraph(block.note) : "",
        "</section>",
      ].join("");
    case "faq":
      return `<section><h2>${escapeHtml(block.title)}</h2>${block.items.map(item => `<h3>${escapeHtml(item.question)}</h3><p>${inlineText(item.answer)}</p>`).join("")}</section>`;
    case "sources":
      return `<section><h2>${escapeHtml(block.title)}</h2><ol>${block.items.map(item => `<li><a href="${safeUrl(item.href)}">${escapeHtml(item.label)}</a></li>`).join("")}</ol></section>`;
    case "cta":
      return `<aside>${block.title ? `<h2>${escapeHtml(block.title)}</h2>` : ""}${block.body ? paragraph(block.body) : ""}<a href="${safeUrl(block.href)}">${escapeHtml(block.label)}</a></aside>`;
  }
}

/** Renders readable HTML, including complete content and navigable citations. */
export function renderStaticArticle(post: BlogPost): string {
  if (!post.published) throw new Error(`Attempted to render unpublished article: ${post.slug}`);
  const content = "content" in post && post.content
    ? post.content.map(blockHtml).join("\n")
    : post.sections.map(section => `<section>${section.heading ? `<h2>${escapeHtml(section.heading)}</h2>` : ""}${section.paragraphs.map(paragraph).join("")}</section>`).join("\n");
  const related = post.relatedSlugs?.map(slug => getBlogPost(slug))
    .filter((item): item is BlogPost => Boolean(item?.published)) ?? [];
  const relatedHtml = related.length ? [
    '<nav aria-label="مطالب مرتبط"><h2>مطالب مرتبط</h2><ul>',
    ...related.map(item => `<li><a href="${safeUrl(blogPath(item.slug))}">${escapeHtml(item.title)}</a></li>`),
    "</ul></nav>",
  ].join("") : "";
  return [
    '<article data-bf-static-article="true" aria-label="متن کامل مقاله">',
    `<figure><img src="${safeUrl(post.image)}" alt="${escapeHtml(post.imageAlt)}" loading="lazy" /></figure>`,
    `<div class="bf-static-article-content">${content}</div>`,
    relatedHtml,
    '<p><a href="/resources">بازگشت به منابع</a></p>',
    "</article>",
  ].join("\n");
}
