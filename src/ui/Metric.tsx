import type { CSSProperties, ReactNode } from "react";
import { cn } from "../lib/cn";

type MetricProps = {
  value: string | number;
  label: string;
  live?: boolean;
  forest?: boolean;
  className?: string;
  labelClassName?: string;
};

export function Metric({
  value,
  label,
  live = false,
  forest = false,
  className,
  labelClassName,
}: MetricProps) {
  return (
    <div className={cn("bf-metric", className)}>
      <span
        className={cn(
          "bf-metric__value",
          live && "bf-metric__value--live",
          forest && "bf-metric__value--forest",
        )}
      >
        {value}
      </span>
      <span className={cn("bf-metric__label", labelClassName)}>{label}</span>
    </div>
  );
}

type ChipProps = {
  children: ReactNode;
  className?: string;
  live?: boolean;
  style?: CSSProperties;
};

export function Chip({ children, className, live = false, style }: ChipProps) {
  return (
    <span className={cn("bf-chip", className)} style={style}>
      {live ? <span className="bf-chip__dot" /> : null}
      {children}
    </span>
  );
}
