import UseAnimations from "react-useanimations";
import type { Animation, Interaction } from "react-useanimations";

type UseAnimationIconProps = {
  animation: Animation;
  size?: number;
  className?: string;
  interaction?: Interaction;
  active?: boolean;
  autoplay?: boolean;
  loop?: boolean | number;
  "aria-hidden"?: boolean;
  "aria-label"?: string;
};

export function UseAnimationIcon({
  animation,
  size = 24,
  className,
  interaction,
  active,
  autoplay,
  loop,
  "aria-hidden": ariaHidden = true,
  "aria-label": ariaLabel,
}: UseAnimationIconProps) {
  return (
    <UseAnimations
      animation={animation}
      size={size}
      className={className}
      interaction={interaction}
      active={active}
      autoplay={autoplay}
      loop={loop}
      aria-hidden={ariaHidden}
      aria-label={ariaLabel}
    />
  );
}
