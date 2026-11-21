import {
  COACH_CLARITY_ANIM,
  UseAnimationIcon,
  type CoachClarityIconId,
} from "./animations";
import { coachClarity } from "../content/coach";

function ClarityIcon({ icon }: { icon: CoachClarityIconId }) {
  return (
    <UseAnimationIcon
      animation={COACH_CLARITY_ANIM[icon]}
      size={40}
      interaction="hover-replay"
    />
  );
}

export function CoachClarity() {
  return (
    <section className="bf-coach-clarity" aria-labelledby="coach-clarity-title">
      <div className="bf-coach-clarity__shell">
        <header className="bf-coach-clarity__head">
          <h2 id="coach-clarity-title" className="bf-coach-clarity__title">
            {coachClarity.title}
          </h2>
          <p className="bf-coach-clarity__lede">{coachClarity.lede}</p>
        </header>

        <div className="bf-coach-clarity__grid">
          {coachClarity.cards.map((card) => (
            <article
              key={card.id}
              className={[
                "bf-coach-clarity__card",
                `bf-coach-clarity__card--${card.tone}`,
                card.featured ? "bf-coach-clarity__card--featured" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              dir="rtl"
            >
              <span className="bf-coach-clarity__icon">
                <ClarityIcon icon={card.icon} />
              </span>
              <h3 className="bf-coach-clarity__card-title">{card.title}</h3>
              <p className="bf-coach-clarity__card-body">{card.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
