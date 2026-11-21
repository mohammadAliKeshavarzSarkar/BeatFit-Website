import { forwardRef, type ReactNode } from "react";
import { cn } from "../lib/cn";

type ContainerProps = {
  children: ReactNode;
  wide?: boolean;
  className?: string;
};

export function Container({ children, wide = false, className }: ContainerProps) {
  return (
    <div className={cn(wide ? "bf-container--wide" : "bf-container", className)}>
      {children}
    </div>
  );
}

type SectionProps = {
  id?: string;
  labelledBy: string;
  children: ReactNode;
  className?: string;
};

export const Section = forwardRef<HTMLElement, SectionProps>(
  function Section({ id, labelledBy, children, className }, ref) {
    return (
      <section
        ref={ref}
        id={id}
        className={cn("bf-section", className)}
        aria-labelledby={labelledBy}
      >
        {children}
      </section>
    );
  },
);

type SectionHeadProps = {
  titleId: string;
  title: string;
  subtitle?: string;
};

export function SectionHead({ titleId, title, subtitle }: SectionHeadProps) {
  return (
    <div className="bf-section__head">
      <h2 id={titleId} className="bf-section__title">
        {title}
      </h2>
      {subtitle ? <p className="bf-section__sub">{subtitle}</p> : null}
    </div>
  );
}
