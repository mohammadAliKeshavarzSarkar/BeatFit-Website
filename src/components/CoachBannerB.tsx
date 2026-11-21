import { BeatfitCta } from "./BeatfitCta";
import { coachBannerB } from "../content/coach";

export function CoachBannerB() {
  return (
    <section className="bf-gym-banner-b" aria-labelledby="coach-banner-b-title">
      <div className="bf-gym-banner-b__shell">
        <div className="bf-gym-banner-b__card">
          <div className="bf-gym-banner-b__copy" dir="rtl">
            <h2 id="coach-banner-b-title" className="bf-gym-banner-b__title">
              {coachBannerB.title}
            </h2>
            <p className="bf-gym-banner-b__body">{coachBannerB.body}</p>
            <BeatfitCta
              variant="banner-on-dark"
              className="bf-gym-banner-b__cta"
              href={coachBannerB.ctaHref}
            >
              {coachBannerB.ctaLabel}
            </BeatfitCta>
          </div>
        </div>

        <figure className="bf-gym-banner-b__media">
          <img
            src={coachBannerB.image}
            alt={coachBannerB.imageAlt}
            width={405}
            height={506}
            decoding="async"
            loading="lazy"
          />
        </figure>
      </div>
    </section>
  );
}
