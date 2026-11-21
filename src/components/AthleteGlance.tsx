import { athleteGlance } from "../content/athlete";

export function AthleteGlance() {
  return (
    <section
      className="bf-athlete-glance"
      aria-labelledby="athlete-glance-title"
    >
      <div className="bf-athlete-glance__shell">
        <header className="bf-athlete-glance__head">
          <h2 id="athlete-glance-title" className="bf-athlete-glance__title">
            {athleteGlance.title}
          </h2>
          <p className="bf-athlete-glance__lede">{athleteGlance.lede}</p>
        </header>

        <div className="bf-athlete-glance__stage">
          <img
            className="bf-athlete-glance__image"
            src={athleteGlance.image}
            alt={athleteGlance.imageAlt}
            width={634}
            height={475}
            decoding="async"
            loading="lazy"
          />

          <ul className="bf-athlete-glance__cards">
            {athleteGlance.cards.map((card) => (
              <li
                key={card.id}
                className={[
                  "bf-athlete-glance__card",
                  `bf-athlete-glance__card--${card.tone}`,
                  `bf-athlete-glance__card--${card.id}`,
                  card.bodyMuted ? "bf-athlete-glance__card--muted-body" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <div className="bf-athlete-glance__copy" dir="rtl">
                  <h3 className="bf-athlete-glance__card-title">{card.title}</h3>
                  <p className="bf-athlete-glance__card-body">{card.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
