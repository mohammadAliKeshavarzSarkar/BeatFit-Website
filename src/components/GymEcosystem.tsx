import { gymEcosystem } from "../content/gym";

export function GymEcosystem() {
  return (
    <section
      className="bf-gym-eco"
      aria-labelledby="gym-eco-title"
    >
      <div className="bf-gym-eco__shell">
        <header className="bf-gym-eco__hero" dir="rtl">
          <h2 id="gym-eco-title" className="bf-gym-eco__title">
            {gymEcosystem.title}
          </h2>
          <p className="bf-gym-eco__lede">{gymEcosystem.lede}</p>
        </header>

        <div className="bf-gym-eco__cards">
          {gymEcosystem.cards.map((card) => (
            <article
              key={card.id}
              className={`bf-gym-eco__card bf-gym-eco__card--${card.id}`}
              dir="rtl"
            >
              <div className="bf-gym-eco__card-copy">
                <h3 className="bf-gym-eco__card-title">{card.title}</h3>
                <p className="bf-gym-eco__card-headline">{card.headline}</p>
                <p className="bf-gym-eco__card-body">{card.body}</p>
              </div>
              <figure className="bf-gym-eco__card-media">
                <img
                  src={card.image}
                  alt={card.imageAlt}
                  decoding="async"
                  loading="lazy"
                />
              </figure>
            </article>
          ))}
        </div>

        <article className="bf-gym-eco__wear" dir="rtl">
          <div className="bf-gym-eco__wear-copy">
            <h3 className="bf-gym-eco__wear-title">
              {gymEcosystem.wearables.title}
            </h3>
            <p className="bf-gym-eco__wear-headline">
              {gymEcosystem.wearables.headline}
            </p>
            <p className="bf-gym-eco__wear-body">
              {gymEcosystem.wearables.body}
            </p>
          </div>
          <figure className="bf-gym-eco__wear-media">
            <img
              src={gymEcosystem.wearables.image}
              alt={gymEcosystem.wearables.imageAlt}
              width={274}
              height={206}
              decoding="async"
              loading="lazy"
            />
          </figure>
        </article>
      </div>
    </section>
  );
}
