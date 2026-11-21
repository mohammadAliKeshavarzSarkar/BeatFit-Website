import { Link } from "react-router-dom";
import type { BlogPost } from "../content/blog";
import { getBlogPost } from "../content/blog";
import { BlogContentBlocks } from "./BlogContentBlocks";

type BlogArticleProps = {
  post: BlogPost;
};

export function BlogArticle({ post }: BlogArticleProps) {
  const publishedDate = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    dateStyle: "long",
  }).format(new Date(`${post.datePublished}T12:00:00Z`));
  const related =
    post.relatedSlugs
      ?.map((slug) => getBlogPost(slug))
      .filter((item): item is BlogPost => item != null && item.published) ?? [];

  return (
    <article className="bf-blog-post" itemScope itemType="https://schema.org/BlogPosting">
      <meta itemProp="headline" content={post.title} />
      <meta itemProp="description" content={post.summary} />
      <meta itemProp="datePublished" content={post.datePublished} />
      <meta itemProp="image" content={post.image} />

      <div className="bf-blog-post__shell">
        <nav className="bf-blog-post__nav" dir="rtl" aria-label="مسیر">
          <Link className="bf-blog-post__back" to="/resources">
            بازگشت به منابع
          </Link>
        </nav>

        <header className="bf-blog-post__head" dir="rtl">
          <span className="bf-blog-post__eyebrow">{post.eyebrow}</span>
          <h1 className="bf-blog-post__title" itemProp="name">
            {post.title}
          </h1>
          <p className="bf-blog-post__lede">{post.summary}</p>
          <div className="bf-blog-post__meta">
            <span>نویسنده: تیم محتوای بیت‌فیت</span>
            <time dateTime={post.datePublished}>تاریخ انتشار: {publishedDate}</time>
          </div>
        </header>

        <figure className="bf-blog-post__hero">
          <img
            src={post.image}
            alt={post.imageAlt}
            width={920}
            height={520}
            decoding="async"
            loading="eager"
            itemProp="image"
          />
        </figure>

        <div className="bf-blog-post__body" dir="rtl" itemProp="articleBody">
          {"content" in post && post.content ? (
            <BlogContentBlocks blocks={post.content} />
          ) : (
            post.sections.map((section, index) => (
              <section
                key={section.heading ?? `section-${index}`}
                className="bf-blog-post__section"
              >
                {section.heading ? (
                  <h2 className="bf-blog-post__section-title">{section.heading}</h2>
                ) : null}
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)} className="bf-blog-post__paragraph">
                    {paragraph}
                  </p>
                ))}
              </section>
            ))
          )}
        </div>

        {related.length > 0 ? (
          <aside className="bf-blog-post__related" dir="rtl" aria-labelledby="blog-related">
            <h2 id="blog-related" className="bf-blog-post__related-title">
              مطالب مرتبط
            </h2>
            <ul className="bf-blog-post__related-list">
              {related.slice(0, 2).map((item) => (
                <li key={item.slug}>
                  <Link className="bf-blog-post__related-link" to={`/blog/${item.slug}`}>
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        ) : null}

        <footer className="bf-blog-post__foot" dir="rtl">
          <Link className="bf-blog-post__foot-link" to="/resources">
            بازگشت به منابع
          </Link>
        </footer>
      </div>
    </article>
  );
}
