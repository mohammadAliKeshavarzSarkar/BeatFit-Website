import { useState, type ReactNode } from "react";
import { Link, type LinkProps } from "react-router-dom";
import send from "react-useanimations/lib/send";
import { MarketingCtaIcon, ResourcesMoreIcon, UseAnimationIcon } from "./animations";

export type BeatfitCtaVariant =
  | "banner-on-dark"
  | "closing-forest"
  | "header-outline"
  | "menu-on-dark"
  | "inline-more"
  | "blog-card"
  | "contact-submit"
  | "blog-foot"
  | "demo-submit"
  | "hero-signup"
  | "icon-circle";

type BeatfitCtaIconKind = "external" | "read-more" | "send" | "none";

type VariantConfig = {
  icon: BeatfitCtaIconKind;
  iconSize: number;
  iconVisual: "leading" | "trailing";
  defaultDir?: "rtl" | "ltr";
};

/** Larger Lottie sizes — pills were visually ~16px in design; 12px svg read too small */
const VARIANT_CONFIG: Record<BeatfitCtaVariant, VariantConfig> = {
  "banner-on-dark": { icon: "external", iconSize: 22, iconVisual: "trailing", defaultDir: "rtl" },
  "closing-forest": {
    icon: "external",
    iconSize: 22,
    iconVisual: "trailing",
    defaultDir: "ltr",
  },
  "header-outline": { icon: "external", iconSize: 20, iconVisual: "trailing", defaultDir: "rtl" },
  "menu-on-dark": { icon: "external", iconSize: 22, iconVisual: "trailing", defaultDir: "rtl" },
  "inline-more": {
    icon: "read-more",
    iconSize: 20,
    iconVisual: "trailing",
    defaultDir: "rtl",
  },
  /* Compact outline CTA for home / resources article cards */
  "blog-card": {
    icon: "external",
    iconSize: 14,
    iconVisual: "trailing",
    defaultDir: "rtl",
  },
  "contact-submit": { icon: "send", iconSize: 22, iconVisual: "trailing", defaultDir: "rtl" },
  /* Larger outline CTA for article footers / in-article blocks */
  "blog-foot": {
    icon: "external",
    iconSize: 20,
    iconVisual: "trailing",
    defaultDir: "rtl",
  },
  "demo-submit": {
    icon: "send",
    iconSize: 22,
    iconVisual: "trailing",
    defaultDir: "rtl",
  },
  "hero-signup": {
    icon: "send",
    iconSize: 18,
    iconVisual: "trailing",
    defaultDir: "ltr",
  },
  "icon-circle": { icon: "external", iconSize: 20, iconVisual: "trailing" },
};

type BeatfitCtaBase = {
  variant: BeatfitCtaVariant;
  icon?: BeatfitCtaIconKind;
  iconSize?: number;
  className?: string;
  dir?: "rtl" | "ltr";
  children?: ReactNode;
};

type BeatfitCtaAsAnchor = BeatfitCtaBase &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    to?: undefined;
    type?: undefined;
  };

type BeatfitCtaAsLink = BeatfitCtaBase &
  Omit<LinkProps, "children" | "className" | "dir"> & {
    href?: undefined;
    type?: undefined;
  };

type BeatfitCtaAsButton = BeatfitCtaBase &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
    to?: undefined;
  };

export type BeatfitCtaProps = BeatfitCtaAsAnchor | BeatfitCtaAsLink | BeatfitCtaAsButton;

function cn(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function BeatfitCtaIconSlot({
  kind = "external",
  size = 20,
  className = "bf-cta__icon",
  replayKey = 0,
}: {
  kind?: BeatfitCtaIconKind;
  size?: number;
  className?: string;
  replayKey?: number;
}) {
  return (
    <CtaIcon
      kind={kind}
      size={size}
      className={className}
      replayKey={replayKey}
    />
  );
}

function CtaIcon({
  kind,
  size,
  className,
  replayKey,
}: {
  kind: BeatfitCtaIconKind;
  size: number;
  className: string;
  replayKey: number;
}) {
  if (kind === "none") return null;

  if (kind === "read-more") {
    return (
      <ResourcesMoreIcon
        key={replayKey}
        className={className}
        size={size}
      />
    );
  }

  if (kind === "send") {
    return (
      <UseAnimationIcon
        key={replayKey}
        animation={send}
        size={size}
        className={className}
        interaction="hover-replay"
      />
    );
  }

  return (
    <MarketingCtaIcon
      key={replayKey}
      className={className}
      size={size}
    />
  );
}

export function BeatfitCta(props: BeatfitCtaProps) {
  const {
    variant,
    icon: iconOverride,
    iconSize: iconSizeOverride,
    className,
    dir,
    children,
    onMouseEnter,
    onFocus,
    ...rest
  } = props;

  const [replayKey, setReplayKey] = useState(0);

  const config = VARIANT_CONFIG[variant];
  const iconKind = iconOverride ?? config.icon;
  const iconSize = iconSizeOverride ?? config.iconSize;
  const resolvedDir = dir ?? config.defaultDir;

  const classes = cn(
    "bf-cta",
    `bf-cta--${variant}`,
    config.iconVisual === "leading" && "bf-cta--icon-leading",
    config.iconVisual === "trailing" && "bf-cta--icon-trailing",
    className,
  );

  const bumpIcon = () => {
    setReplayKey((value) => value + 1);
  };

  const content =
    variant === "icon-circle" ? (
      <CtaIcon
        kind={iconKind}
        size={iconSize}
        className="bf-cta__icon"
        replayKey={replayKey}
      />
    ) : (
      <>
        <span className="bf-cta__label">{children}</span>
        <CtaIcon
          kind={iconKind}
          size={iconSize}
          className="bf-cta__icon"
          replayKey={replayKey}
        />
      </>
    );

  const interactionHandlers = {
    onMouseEnter: (event: React.MouseEvent<HTMLElement>) => {
      bumpIcon();
      onMouseEnter?.(event as React.MouseEvent<HTMLAnchorElement & HTMLButtonElement>);
    },
    onFocus: (event: React.FocusEvent<HTMLElement>) => {
      bumpIcon();
      onFocus?.(event as React.FocusEvent<HTMLAnchorElement & HTMLButtonElement>);
    },
  };

  if ("to" in props && props.to !== undefined) {
    const { to, ...linkRest } = rest as Omit<BeatfitCtaAsLink, keyof BeatfitCtaBase>;
    return (
      <Link
        className={classes}
        dir={resolvedDir}
        to={to}
        {...linkRest}
        {...interactionHandlers}
      >
        {content}
      </Link>
    );
  }

  if ("href" in props && props.href !== undefined) {
    const { href, ...anchorRest } = rest as BeatfitCtaAsAnchor;
    return (
      <a
        className={classes}
        dir={resolvedDir}
        href={href}
        {...anchorRest}
        {...interactionHandlers}
      >
        {content}
      </a>
    );
  }

  const { type = "button", ...buttonRest } = rest as BeatfitCtaAsButton;
  return (
    <button
      type={type}
      className={classes}
      dir={resolvedDir}
      {...buttonRest}
      {...interactionHandlers}
    >
      {content}
    </button>
  );
}
