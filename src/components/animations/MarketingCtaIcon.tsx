import arrowUpLeft from "react-useanimations/lib/arrowUpLeft";
import { UseAnimationIcon } from "./UseAnimationIcon";

type MarketingCtaIconProps = {
  className?: string;
  size?: number;
};

/** Outbound CTA chevron (RTL); replays on hover */
export function MarketingCtaIcon({
  className,
  size = 14,
}: MarketingCtaIconProps) {
  return (
    <UseAnimationIcon
      animation={arrowUpLeft}
      size={size}
      className={className}
      interaction="hover-replay"
    />
  );
}
