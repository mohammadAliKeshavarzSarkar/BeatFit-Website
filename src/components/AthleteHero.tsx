import { athleteHero } from "../content/athlete";

export function AthleteHero() {
  return (
    <section
      id="top"
      className="bf-coach-hero bf-athlete-hero"
      aria-labelledby="athlete-hero-title"
    >
      <div className="bf-coach-hero__stage">
        <div className="bf-coach-hero__copy" dir="rtl">
          <h1 id="athlete-hero-title" className="bf-coach-hero__title">
            {athleteHero.title}
          </h1>
          <p className="bf-coach-hero__body">{athleteHero.body}</p>
        </div>

        <figure className="bf-coach-hero__media">
          <img
            src={athleteHero.image}
            alt={athleteHero.imageAlt}
            width={921}
            height={1708}
            decoding="async"
          />
        </figure>
      </div>
    </section>
  );
}
