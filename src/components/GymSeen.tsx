import { gymSeen } from "../content/gym";

export function GymSeen() {
  return (
    <section className="bf-gym-seen" aria-labelledby="gym-seen-title">
      <div className="bf-gym-seen__shell">
        <h2 id="gym-seen-title" className="bf-gym-seen__title">
          {gymSeen.title}
        </h2>

        <div className="bf-gym-seen__stage">
          <figure className="bf-gym-seen__media">
            <img
              src={gymSeen.image}
              alt={gymSeen.imageAlt}
              width={564}
              height={618}
              decoding="async"
              loading="lazy"
            />
          </figure>

          {gymSeen.cards.map((card) => (
            <article
              key={card.id}
              className={`bf-gym-seen__card bf-gym-seen__card--${card.tone} bf-gym-seen__card--${card.slot}`}
              dir="rtl"
            >
              <h3 className="bf-gym-seen__card-title">{card.title}</h3>
              <p className="bf-gym-seen__card-body">{card.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
