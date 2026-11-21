import { coachHero } from "../content/coach";

export function CoachHero() {
  return (
    <section id="top" className="bf-coach-hero" aria-labelledby="coach-hero-title">
      <div className="bf-coach-hero__stage">
        <figure className="bf-coach-hero__media">
          <img
            src={coachHero.image}
            alt={coachHero.imageAlt}
            width={1553}
            height={1013}
            decoding="async"
          />
        </figure>

        <div className="bf-coach-hero__copy" dir="rtl">
          <h1 id="coach-hero-title" className="bf-coach-hero__title">
            {coachHero.title}
          </h1>
          <p className="bf-coach-hero__body">{coachHero.body}</p>
        </div>
      </div>
    </section>
  );
}
