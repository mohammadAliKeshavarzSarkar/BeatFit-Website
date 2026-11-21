import { useState, type FormEvent } from "react";
import { BeatfitCta } from "./BeatfitCta";
import {
  DEMO_FEATURE_ANIM,
  DemoSelectChevron,
  UseAnimationIcon,
  type DemoFeatureIconId,
} from "./animations";
import { demoPage } from "../content/demo";

function FeatureIcon({ name }: { name: DemoFeatureIconId }) {
  return (
    <UseAnimationIcon
      animation={DEMO_FEATURE_ANIM[name]}
      size={24}
      interaction="hover-replay"
    />
  );
}

function SelectField({
  label,
  name,
  placeholder,
  options,
}: {
  label: string;
  name: string;
  placeholder: string;
  options: readonly string[];
}) {
  return (
    <label className="bf-demo__field">
      <span className="bf-demo__label">{label}</span>
      <span className="bf-demo__select-wrap">
        <select
          className="bf-demo__control bf-demo__select"
          name={name}
          defaultValue=""
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <DemoSelectChevron className="bf-demo__select-chevron" />
      </span>
    </label>
  );
}

export function DemoForm() {
  // No approved lead receiver exists in this website repository.
  // Never tell visitors a request was submitted until the server confirms it.
  const [submissionAttempted, setSubmissionAttempted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmissionAttempted(true);
  };

  return (
    <section className="bf-demo" aria-labelledby="demo-form-title">
      <div className="bf-demo__card">
        <aside className="bf-demo__content" dir="rtl">
          <h1 className="bf-demo__content-title">{demoPage.contentTitle}</h1>
          <p className="bf-demo__content-body">{demoPage.contentBody}</p>

          <ul className="bf-demo__features">
            {demoPage.features.map((feature) => (
              <li key={feature.id} className="bf-demo__feature">
                <span className="bf-demo__feature-icon">
                  <FeatureIcon name={feature.icon} />
                </span>
                <span className="bf-demo__feature-label">{feature.label}</span>
              </li>
            ))}
          </ul>
        </aside>

        <div className="bf-demo__divider" aria-hidden="true" />

        <div className="bf-demo__form-panel" dir="rtl">
          <header className="bf-demo__form-intro">
            <h2 id="demo-form-title" className="bf-demo__form-title">
              {demoPage.formTitle}
            </h2>
            <p className="bf-demo__form-lede">{demoPage.formLede}</p>
          </header>

          <form
            className="bf-demo__form"
            onSubmit={handleSubmit}
          >
            <div className="bf-demo__row">
              <label className="bf-demo__field">
                <span className="bf-demo__label">
                  {demoPage.fields.fullName.label}
                </span>
                <input
                  className="bf-demo__control"
                  type="text"
                  name="fullName"
                  autoComplete="name"
                  required
                  maxLength={100}
                  placeholder={demoPage.fields.fullName.placeholder}
                />
              </label>

              <label className="bf-demo__field">
                <span className="bf-demo__label">
                  {demoPage.fields.gymName.label}
                </span>
                <input
                  className="bf-demo__control"
                  type="text"
                  name="gymName"
                  required
                  maxLength={100}
                  placeholder={demoPage.fields.gymName.placeholder}
                />
              </label>
            </div>

            <div className="bf-demo__row">
              <label className="bf-demo__field">
                <span className="bf-demo__label">
                  {demoPage.fields.phone.label}
                </span>
                <input
                  className="bf-demo__control"
                  type="tel"
                  name="phone"
                  inputMode="tel"
                  autoComplete="tel"
                  required
                  minLength={7}
                  maxLength={20}
                  placeholder={demoPage.fields.phone.placeholder}
                />
              </label>

              <SelectField
                label={demoPage.fields.city.label}
                name="city"
                placeholder={demoPage.fields.city.placeholder}
                options={demoPage.cities}
              />
            </div>

            <div className="bf-demo__row bf-demo__row--half">
              <SelectField
                label={demoPage.fields.gymType.label}
                name="gymType"
                placeholder={demoPage.fields.gymType.placeholder}
                options={demoPage.gymTypes}
              />
            </div>

            <label className="bf-demo__field bf-demo__field--full">
              <span className="bf-demo__label">
                {demoPage.fields.notes.label}
              </span>
              <textarea
                className="bf-demo__control bf-demo__textarea"
                name="notes"
                rows={5}
                maxLength={1000}
                placeholder={demoPage.fields.notes.placeholder}
              />
            </label>

            <BeatfitCta
              variant="demo-submit"
              className="bf-demo__submit"
              type="submit"
            >
              {demoPage.submitLabel}
            </BeatfitCta>

            {submissionAttempted ? (
              <p className="bf-demo__submission-status" role="alert">
                ثبت آنلاین درخواست دمو هنوز فعال نیست؛ اطلاعات فرم ارسال نشده‌اند.
              </p>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  );
}
