import { gymHero } from "../content/gym";

export function GymHero() {
  return (
    <section id="top" className="bf-gym-hero" aria-labelledby="gym-hero-title">
      <div className="bf-gym-hero__stage">
        <div className="bf-gym-hero__copy" dir="rtl">
          <h1 id="gym-hero-title" className="bf-gym-hero__title">
            {gymHero.title}
          </h1>
          <p className="bf-gym-hero__body">{gymHero.body}</p>
        </div>

        <figure className="bf-gym-hero__media">
          <img
            src={gymHero.image}
            alt={gymHero.imageAlt}
            width={1023}
            height={723}
            decoding="async"
          />
        </figure>
      </div>
    </section>
  );
}
