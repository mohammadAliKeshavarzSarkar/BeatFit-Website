import { athleteMotivation } from "../content/athlete";

export function AthleteMotivation() {
  return (
    <section
      className="bf-athlete-motivation"
      aria-labelledby="athlete-motivation-title"
    >
      <div className="bf-athlete-motivation__shell">
        <header className="bf-athlete-motivation__head">
          <h2
            id="athlete-motivation-title"
            className="bf-athlete-motivation__title"
          >
            {athleteMotivation.title}
          </h2>
          <p className="bf-athlete-motivation__lede">
            {athleteMotivation.lede}
          </p>
        </header>

        <div className="bf-athlete-motivation__grid">
          {athleteMotivation.cards.map((card) => (
            <article
              key={card.id}
              className="bf-athlete-motivation__card"
              dir="rtl"
            >
              <div className="bf-athlete-motivation__copy">
                <h3 className="bf-athlete-motivation__card-title">
                  {card.title}
                </h3>
                <p className="bf-athlete-motivation__card-body">{card.body}</p>
              </div>
              <figure className="bf-athlete-motivation__media">
                <img
                  src={card.image}
                  alt={card.imageAlt}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
