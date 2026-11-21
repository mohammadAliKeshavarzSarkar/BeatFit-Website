import {
  COACH_GUIDE_ANIM,
  UseAnimationIcon,
  type CoachGuideIconId,
} from "./animations";
import { coachGuide } from "../content/coach";

function GuideIcon({ icon }: { icon: CoachGuideIconId }) {
  return (
    <UseAnimationIcon
      animation={COACH_GUIDE_ANIM[icon]}
      size={44}
      interaction="hover-replay"
    />
  );
}

export function CoachGuide() {
  return (
    <section className="bf-coach-guide" aria-labelledby="coach-guide-title">
      <div className="bf-coach-guide__shell">
        <header className="bf-coach-guide__head">
          <h2 id="coach-guide-title" className="bf-coach-guide__title">
            {coachGuide.title}
          </h2>
          <p className="bf-coach-guide__lede">{coachGuide.lede}</p>
        </header>

        <div className="bf-coach-guide__stage">
          <figure className="bf-coach-guide__media">
            <img
              src={coachGuide.image}
              alt={coachGuide.imageAlt}
              width={752}
              height={501}
              decoding="async"
              loading="lazy"
            />
          </figure>

          {coachGuide.cards.map((card) => (
            <article
              key={card.id}
              className={`bf-coach-guide__card bf-coach-guide__card--${card.tone} bf-coach-guide__card--${card.slot}`}
              dir="rtl"
            >
              <span className="bf-coach-guide__card-icon">
                <GuideIcon icon={card.icon} />
              </span>
              <div className="bf-coach-guide__card-copy">
                <h3 className="bf-coach-guide__card-title">{card.title}</h3>
                <p className="bf-coach-guide__card-body">{card.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
