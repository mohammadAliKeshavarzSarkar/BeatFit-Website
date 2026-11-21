import { BeatfitCta } from "./BeatfitCta";
import { gymClosing } from "../content/gym";

export function GymClosing() {
  return (
    <section className="bf-gym-closing" aria-labelledby="gym-closing-title">
      <div className="bf-gym-closing__shell">
        <div
          className="bf-gym-closing__card"
          style={{ backgroundImage: `url(${gymClosing.image})` }}
        >
          <div className="bf-gym-closing__copy" dir="rtl">
            <h2 id="gym-closing-title" className="bf-gym-closing__title">
              {gymClosing.title}
            </h2>
            <p className="bf-gym-closing__question">{gymClosing.question}</p>
            <p className="bf-gym-closing__body">{gymClosing.body}</p>
            <BeatfitCta
              variant="closing-forest"
              className="bf-gym-closing__cta"
              href={gymClosing.ctaHref}
            >
              {gymClosing.ctaLabel}
            </BeatfitCta>
          </div>
        </div>
      </div>
    </section>
  );
}
