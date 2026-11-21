import { gymBannerA } from "../content/gym";

export function GymBannerA() {
  return (
    <section className="bf-gym-banner" aria-labelledby="gym-banner-a-title">
      <div className="bf-gym-banner__shell">
        <div className="bf-gym-banner__card">
          <div className="bf-gym-banner__copy" dir="rtl">
            <h2 id="gym-banner-a-title" className="bf-gym-banner__title">
              {gymBannerA.title}
            </h2>
            <p className="bf-gym-banner__body">{gymBannerA.body}</p>
          </div>
        </div>

        <figure className="bf-gym-banner__media">
          <img
            src={gymBannerA.image}
            alt={gymBannerA.imageAlt}
            width={552}
            height={311}
            decoding="async"
            loading="lazy"
          />
        </figure>
      </div>
    </section>
  );
}
