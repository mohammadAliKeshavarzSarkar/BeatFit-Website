import { BeatfitCta } from "./BeatfitCta";
import { cta } from "../content/home";

export function Cta() {
  return (
    <section
      id="demo"
      className="bf-section bf-contact-section"
      aria-labelledby="cta-title"
    >
      <div className="bf-container--wide">
        <div className="bf-contact" id="contact" dir="rtl">
          <div className="bf-contact__content">
            <header className="bf-contact__head">
              <h2 id="cta-title">{cta.heading}</h2>
              <p className="bf-contact__lead">{cta.title}</p>
              <p className="bf-contact__sub">{cta.subtitle}</p>
            </header>

            <form
              className="bf-contact__card"
              onSubmit={(event) => {
                event.preventDefault();
              }}
            >
              <div className="bf-contact__fields">
                <label className="bf-contact__field">
                  <span>{cta.fields.name}</span>
                  <input
                    type="text"
                    name="name"
                    autoComplete="name"
                    placeholder={cta.fields.namePlaceholder}
                    required
                  />
                </label>
                <label className="bf-contact__field">
                  <span>{cta.fields.email}</span>
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder={cta.fields.emailPlaceholder}
                    required
                  />
                </label>
                <label className="bf-contact__field">
                  <span>{cta.fields.message}</span>
                  <textarea
                    name="message"
                    rows={2}
                    placeholder={cta.fields.messagePlaceholder}
                    required
                  />
                </label>
              </div>

              <div className="bf-contact__actions">
                <BeatfitCta
                  variant="contact-submit"
                  className="bf-contact__submit"
                  type="submit"
                >
                  {cta.primary}
                </BeatfitCta>
              </div>
            </form>
          </div>

          <figure className="bf-contact__media">
            <img
              src={cta.image}
              alt={cta.imageAlt}
              width={900}
              height={1100}
              loading="lazy"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}
