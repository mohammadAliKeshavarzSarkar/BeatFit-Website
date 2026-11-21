import {
  ATHLETE_PROGRESS_ANIM,
  UseAnimationIcon,
  type AthleteProgressIconId,
} from "./animations";
import { athleteProgress } from "../content/athlete";

export function AthleteProgress() {
  return (
    <section
      className="bf-athlete-progress"
      aria-labelledby="athlete-progress-title"
    >
      <div className="bf-athlete-progress__shell">
        <header className="bf-athlete-progress__head">
          <h2
            id="athlete-progress-title"
            className="bf-athlete-progress__title"
          >
            {athleteProgress.title}
          </h2>
          <p className="bf-athlete-progress__lede">{athleteProgress.lede}</p>
        </header>

        <div className="bf-athlete-progress__visual">
          <img
            className="bf-athlete-progress__image"
            src={athleteProgress.image}
            alt={athleteProgress.imageAlt}
            width={1024}
            height={342}
            decoding="async"
            loading="lazy"
          />
        </div>

        <ul className="bf-athlete-progress__cards">
          {athleteProgress.cards.map((card) => (
            <li
              key={card.id}
              className={`bf-athlete-progress__card bf-athlete-progress__card--${card.tone} bf-athlete-progress__card--${card.id}`}
            >
              <div className="bf-athlete-progress__copy" dir="rtl">
                <h3 className="bf-athlete-progress__card-title">{card.title}</h3>
                <p className="bf-athlete-progress__card-body">{card.body}</p>
              </div>
              <span className="bf-athlete-progress__icon" aria-hidden="true">
                <UseAnimationIcon
                  animation={ATHLETE_PROGRESS_ANIM[card.id as AthleteProgressIconId]}
                  size={44}
                  interaction="hover-replay"
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
