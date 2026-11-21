import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
  ReactNode,
} from "react";
import { cn } from "../lib/cn";

type BaseProps = {
  children: ReactNode;
  selected?: boolean;
  className?: string;
};

type ArticleCardProps = BaseProps &
  HTMLAttributes<HTMLElement> & {
    as?: "article" | "div";
  };

type ButtonCardProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    as: "button";
  };

export type CardProps = ArticleCardProps | ButtonCardProps;

export function Card(props: CardProps) {
  const { children, selected = false, className, as = "article", ...rest } = props;
  const classes = cn("bf-card", selected && "bf-card--selected", className);

  if (as === "button") {
    const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;
    return (
      <button type="button" className={classes} {...buttonProps}>
        {children}
      </button>
    );
  }

  const elementProps = rest as HTMLAttributes<HTMLElement>;
  if (as === "div") {
    return (
      <div className={classes} {...elementProps}>
        {children}
      </div>
    );
  }

  return (
    <article className={classes} {...elementProps}>
      {children}
    </article>
  );
}
