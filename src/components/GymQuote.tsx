import { gymQuote } from "../content/gym";

export function GymQuote() {
  return (
    <section className="bf-gym-quote" aria-labelledby="gym-quote-title">
      <div className="bf-gym-quote__shell">
        <h2 id="gym-quote-title" className="bf-gym-quote__title">
          {gymQuote.title}
        </h2>

        <blockquote className="bf-gym-quote__block" dir="rtl">
          <p>
            <span className="bf-gym-quote__mark" aria-hidden="true">
              ”
            </span>
            {gymQuote.body}
            <span className="bf-gym-quote__mark" aria-hidden="true">
              “
            </span>
          </p>
        </blockquote>
      </div>
    </section>
  );
}
