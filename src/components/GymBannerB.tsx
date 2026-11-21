import { BeatfitCta } from "./BeatfitCta";
import { gymBannerB } from "../content/gym";

export function GymBannerB() {
  return (
    <section className="bf-gym-banner-b" aria-labelledby="gym-banner-b-title">
      <div className="bf-gym-banner-b__shell">
        <div className="bf-gym-banner-b__card">
          <div className="bf-gym-banner-b__copy" dir="rtl">
            <h2 id="gym-banner-b-title" className="bf-gym-banner-b__title">
              {gymBannerB.title}
            </h2>
            <p className="bf-gym-banner-b__body">{gymBannerB.body}</p>
            <BeatfitCta
              variant="banner-on-dark"
              className="bf-gym-banner-b__cta"
              href={gymBannerB.ctaHref}
            >
              {gymBannerB.ctaLabel}
            </BeatfitCta>
          </div>
        </div>

        <figure className="bf-gym-banner-b__media">
          <img
            src={gymBannerB.image}
            alt={gymBannerB.imageAlt}
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
