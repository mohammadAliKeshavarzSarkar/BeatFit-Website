import type { CSSProperties, ReactNode } from "react";
import { Link } from "react-router-dom";
import type {
  BlogContentBlock,
  BlogInline,
  BlogRichText,
} from "../content/blog";
import { BeatfitCta } from "./BeatfitCta";

function renderInline(part: BlogInline, index: number): ReactNode {
  let node: ReactNode = part.text;

  if (part.emphasis) {
    node = <em>{node}</em>;
  }
  if (part.strong) {
    node = <strong>{node}</strong>;
  }

  if (part.href?.startsWith("/")) {
    node = <Link to={part.href}>{node}</Link>;
  } else if (part.href) {
    node = (
      <a href={part.href} target="_blank" rel="noreferrer">
        {node}
      </a>
    );
  }

  return <span key={`${part.text.slice(0, 24)}-${index}`}>{node}</span>;
}

function RichText({ content }: { content: BlogRichText }) {
  if (typeof content === "string") return content;
  return content.map(renderInline);
}

function ChartBlock({ block }: { block: Extract<BlogContentBlock, { kind: "chart" }> }) {
  return (
    <figure className="bf-blog-block-chart" aria-label={block.ariaLabel}>
      <figcaption className="bf-blog-block-chart__head">
        <strong>{block.title}</strong>
        {block.subtitle ? <span>{block.subtitle}</span> : null}
      </figcaption>

      <div className="bf-blog-block-chart__plot">
        {block.values.map((item) => {
          const percent = Math.max(0, Math.min(100, (item.value / block.max) * 100));
          const style = {
            ["--bf-chart-width" as string]: `${percent}%`,
            ["--bf-chart-color" as string]: item.color,
          } as CSSProperties;

          return (
            <div key={item.label} className="bf-blog-block-chart__row">
              <span className="bf-blog-block-chart__label">{item.label}</span>
              <span className="bf-blog-block-chart__track" aria-hidden="true">
                <span className="bf-blog-block-chart__bar" style={style} />
              </span>
              <strong className="bf-blog-block-chart__value">{item.displayValue}</strong>
            </div>
          );
        })}
      </div>

      {block.metrics?.length ? (
        <dl className="bf-blog-block-chart__metrics">
          {block.metrics.map((metric) => (
            <div key={metric.label}>
              <dt>{metric.label}</dt>
              <dd>{metric.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}

      {block.note ? <p className="bf-blog-block-chart__note">{block.note}</p> : null}
    </figure>
  );
}

function BlogBlock({ block }: { block: BlogContentBlock }) {
  switch (block.kind) {
    case "heading": {
      const Heading = block.level === 2 ? "h2" : "h3";
      return (
        <Heading className={`bf-blog-block-heading bf-blog-block-heading--h${block.level}`}>
          {block.text}
        </Heading>
      );
    }
    case "paragraph":
      return (
        <p className={`bf-blog-block-paragraph bf-blog-block-paragraph--${block.tone ?? "default"}`}>
          <RichText content={block.content} />
        </p>
      );
    case "list":
      return (
        <ul className="bf-blog-block-list">
          {block.items.map((item, index) => (
            <li key={index}>
              <RichText content={item} />
            </li>
          ))}
        </ul>
      );
    case "table":
      return (
        <div className="bf-blog-block-table-wrap">
          <table className="bf-blog-block-table">
            {block.caption ? <caption>{block.caption}</caption> : null}
            <thead>
              <tr>
                {block.headers.map((header, index) => (
                  <th key={index} scope="col">
                    <RichText content={header} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>
                      <RichText content={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "figure":
      return (
        <figure className={`bf-blog-block-figure bf-blog-block-figure--${block.layout ?? "default"}`}>
          <img src={block.src} alt={block.alt} loading="lazy" decoding="async" />
          {block.caption ? <figcaption>{block.caption}</figcaption> : null}
        </figure>
      );
    case "chart":
      return <ChartBlock block={block} />;
    case "process":
      return (
        <figure className="bf-blog-block-process" aria-label={block.ariaLabel}>
          <figcaption className="bf-blog-block-process__head">
            <strong>{block.title}</strong>
            {block.subtitle ? <span>{block.subtitle}</span> : null}
          </figcaption>
          <ol className="bf-blog-block-process__steps">
            {block.steps.map((step, index) => (
              <li key={step.title} className="bf-blog-block-process__step">
                <span className="bf-blog-block-process__number" aria-hidden="true">
                  {index + 1}
                </span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
          {block.note ? <p className="bf-blog-block-process__note">{block.note}</p> : null}
        </figure>
      );
    case "faq":
      return (
        <section className="bf-blog-block-faq" aria-labelledby="article-faq-title">
          <h2 id="article-faq-title" className="bf-blog-block-heading bf-blog-block-heading--h2">
            {block.title}
          </h2>
          <div className="bf-blog-block-faq__items">
            {block.items.map((item) => (
              <article key={item.question} className="bf-blog-block-faq__item">
                <h3>{item.question}</h3>
                <p>
                  <RichText content={item.answer} />
                </p>
              </article>
            ))}
          </div>
        </section>
      );
    case "sources":
      return (
        <section className="bf-blog-block-sources" aria-labelledby="article-sources-title">
          <h2 id="article-sources-title" className="bf-blog-block-heading bf-blog-block-heading--h2">
            {block.title}
          </h2>
          <ol>
            {block.items.map((item) => (
              <li key={item.href}>
                <a href={item.href} target="_blank" rel="noreferrer">
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
        </section>
      );
    case "cta":
      return (
        <aside className="bf-blog-block-cta">
          <div>
            {block.title ? <h2>{block.title}</h2> : null}
            {block.body ? <p>{block.body}</p> : null}
          </div>
          <BeatfitCta variant="blog-foot" to={block.href}>
            {block.label}
          </BeatfitCta>
        </aside>
      );
  }
}

export function BlogContentBlocks({ blocks }: { blocks: readonly BlogContentBlock[] }) {
  return (
    <div className="bf-blog-blocks" dir="rtl">
      {blocks.map((block, index) => (
        <BlogBlock key={`${block.kind}-${index}`} block={block} />
      ))}
    </div>
  );
}

