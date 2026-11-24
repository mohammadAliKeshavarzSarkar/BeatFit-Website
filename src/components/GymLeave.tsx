import { GYM_LEAVE_ANIM, UseAnimationIcon } from "./animations";
import type { GymLeaveIconId } from "./animations";
import { gymLeave } from "../content/gym";

function PointIcon({ icon }: { icon: GymLeaveIconId }) {
  return (
    <UseAnimationIcon
      animation={GYM_LEAVE_ANIM[icon]}
      size={22}
      interaction="hover-replay"
    />
  );
}

export function GymLeave() {
  return (
    <section className="bf-gym-leave" aria-labelledby="gym-leave-title">
      <div className="bf-gym-leave__shell">
        <h2 id="gym-leave-title" className="bf-gym-leave__title">
          {gymLeave.title}
        </h2>

        <div className="bf-gym-leave__layout" dir="rtl">
          <ul className="bf-gym-leave__list">
            {gymLeave.points.map((point) => (
              <li key={point.id} className="bf-gym-leave__item">
                <div className="bf-gym-leave__item-head">
                  <span className="bf-gym-leave__icon">
                    <PointIcon icon={point.icon} />
                  </span>
                  <h3 className="bf-gym-leave__item-title">{point.title}</h3>
                </div>
                <p className="bf-gym-leave__item-body">{point.body}</p>
              </li>
            ))}
          </ul>

          <figure className="bf-gym-leave__media">
            <img
              className="bf-gym-leave__image"
              src={gymLeave.image}
              alt={gymLeave.imageAlt}
              width={1064}
              height={1402}
              decoding="async"
              loading="lazy"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}
