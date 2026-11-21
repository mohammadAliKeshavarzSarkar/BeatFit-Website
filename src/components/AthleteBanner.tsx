import { BeatfitCta } from "./BeatfitCta";
import { athleteBanner } from "../content/athlete";

export function AthleteBanner() {
  return (
    <section
      className="bf-athlete-banner"
      aria-labelledby="athlete-banner-title"
    >
      <div className="bf-athlete-banner__shell">
        <div className="bf-athlete-banner__card">
          <div className="bf-athlete-banner__copy" dir="rtl">
            <h2 id="athlete-banner-title" className="bf-athlete-banner__title">
              {athleteBanner.title}
            </h2>
            <p className="bf-athlete-banner__body">{athleteBanner.body}</p>
            <BeatfitCta
              variant="banner-on-dark"
              className="bf-athlete-banner__cta"
              href={athleteBanner.ctaHref}
            >
              {athleteBanner.ctaLabel}
            </BeatfitCta>
          </div>
        </div>

        <figure className="bf-athlete-banner__media">
          <img
            src={athleteBanner.image}
            alt={athleteBanner.imageAlt}
            width={420}
            height={315}
            decoding="async"
            loading="lazy"
          />
        </figure>
      </div>
    </section>
  );
}
