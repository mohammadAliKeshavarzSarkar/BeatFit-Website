import { product } from "../content/home";
import { useProductCardsRise } from "../hooks/useProductCardsRise";
import { Card, Container, Section, SectionHead } from "../ui";
import { cn } from "../lib/cn";

type FeatureCard = (typeof product.features)[number];
type SportItem = {
  src: string;
  label: string;
};

const PRODUCT_CARD_COUNT = 3;

function FeatureTags({ items }: { items: readonly string[] }) {
  return (
    <ul className="bf-feature-tags">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function FeatureCardView({ feature, className }: { feature: FeatureCard; className?: string }) {
  return (
    <Card
      className={cn(
        "bf-feature-card",
        "bf-feature-card--full",
        feature.id === "live" && "bf-feature-card--live",
        className,
      )}
    >
      <div className="bf-feature-card__media" aria-hidden={feature.image ? undefined : true}>
        {feature.image ? (
          <img src={feature.image} alt={feature.imageAlt} />
        ) : (
          <div className="bf-feature-card__placeholder" />
        )}
      </div>
      <div className="bf-feature-card__body">
        <h3 className="bf-feature-card__title">{feature.title}</h3>
        <p className="bf-feature-card__lead">{feature.body}</p>
        <FeatureTags items={feature.items} />
      </div>
    </Card>
  );
}

function SportMarquee({
  items,
  speedClass,
}: {
  items: readonly SportItem[];
  speedClass: string;
}) {
  return (
    <div className={cn("bf-sport-marquee", speedClass)} aria-hidden="true">
      <div className="bf-sport-marquee__track">
        <div className="bf-sport-marquee__group">
          {items.map((item) => (
            <figure className="bf-sport-tile" key={`a-${item.src}-${item.label}`}>
              <div className="bf-sport-tile__frame">
                <img src={item.src} alt="" />
              </div>
              <figcaption>{item.label}</figcaption>
            </figure>
          ))}
        </div>
        <div className="bf-sport-marquee__group" aria-hidden="true">
          {items.map((item) => (
            <figure className="bf-sport-tile" key={`b-${item.src}-${item.label}`}>
              <div className="bf-sport-tile__frame">
                <img src={item.src} alt="" />
              </div>
              <figcaption>{item.label}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}

function ActivityShowcase({
  activityRef,
  progressRef,
  progress,
}: {
  activityRef: (node: HTMLElement | null) => void;
  progressRef: (node: HTMLElement | null) => void;
  progress: FeatureCard;
}) {
  const { activityShowcase } = product;

  return (
    <div className="bf-showcase">
      <div className="bf-product-rise" ref={activityRef}>
        <Card className="bf-showcase-card">
          <div className="bf-showcase-card__copy">
            <h3>{activityShowcase.title}</h3>
            <p>{activityShowcase.body}</p>
          </div>
          <div className="bf-showcase-card__visual">
            <SportMarquee items={activityShowcase.rowOne} speedClass="bf-sport-marquee--slow" />
            <SportMarquee items={activityShowcase.rowTwo} speedClass="bf-sport-marquee--fast" />
          </div>
        </Card>
      </div>

      <div className="bf-product-rise" ref={progressRef}>
        <Card className="bf-showcase-card bf-showcase-card--progress">
          <div className="bf-showcase-card__copy">
            <h3>{progress.title}</h3>
            <p>{progress.body}</p>
            <FeatureTags items={progress.items} />
          </div>
          {progress.image ? (
            <div className="bf-showcase-card__media">
              <img src={progress.image} alt={progress.imageAlt} />
            </div>
          ) : null}
        </Card>
      </div>
    </div>
  );
}

export function Product() {
  const liveFeature = product.features.find((feature) => feature.id === "live");
  const progressFeature = product.features.find((feature) => feature.id === "progress");
  const { setCardRef } = useProductCardsRise(PRODUCT_CARD_COUNT);

  return (
    <Section id="product" labelledBy="product-title" className="bf-product-section">
      <Container wide>
        <SectionHead
          titleId="product-title"
          title={product.title}
          subtitle={product.subtitle}
        />

        <div className="bf-feature-grid bf-product-stage">
          {liveFeature ? (
            <div className="bf-product-rise" ref={setCardRef(0)}>
              <FeatureCardView feature={liveFeature} />
            </div>
          ) : null}

          {progressFeature ? (
            <ActivityShowcase
              activityRef={setCardRef(1)}
              progressRef={setCardRef(2)}
              progress={progressFeature}
            />
          ) : null}
        </div>
      </Container>
    </Section>
  );
}
