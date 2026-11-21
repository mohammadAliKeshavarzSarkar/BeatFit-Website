import { BeatfitCta } from "./BeatfitCta";
import { resourcesFeatured, resourcesHero } from "../content/resources";

export function ResourcesHero() {
  return (
    <section className="bf-resources" aria-labelledby="resources-title">
      <div className="bf-resources__shell">
        <header className="bf-resources__intro" dir="rtl">
          <h1 id="resources-title" className="bf-resources__title">
            {resourcesHero.title}
          </h1>
          <p className="bf-resources__lede">{resourcesHero.lede}</p>
        </header>

        <article className="bf-resources__featured">
          <div className="bf-resources__featured-media">
            <img
              src={resourcesFeatured.image}
              alt={resourcesFeatured.imageAlt}
              loading="eager"
              decoding="async"
            />
          </div>

          <div className="bf-resources__featured-copy" dir="rtl">
            <span className="bf-resources__tag">{resourcesFeatured.tag}</span>
            <h2 className="bf-resources__featured-title">
              {resourcesFeatured.title}
            </h2>
            <p className="bf-resources__featured-body">
              {resourcesFeatured.body}
            </p>
            <BeatfitCta
              variant="blog-card"
              className="bf-resources__more"
              href={resourcesFeatured.ctaHref}
            >
              {resourcesFeatured.ctaLabel}
            </BeatfitCta>
          </div>
        </article>
      </div>
    </section>
  );
}
