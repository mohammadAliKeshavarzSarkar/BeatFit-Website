import arrowLeft from "react-useanimations/lib/arrowLeft";
import { UseAnimationIcon } from "./UseAnimationIcon";

type ResourcesMoreIconProps = {
  className?: string;
  size?: number;
};

/** «ادامه مطلب» chevron; replays on hover */
export function ResourcesMoreIcon({
  className,
  size = 14,
}: ResourcesMoreIconProps) {
  return (
    <UseAnimationIcon
      animation={arrowLeft}
      size={size}
      className={className}
      interaction="hover-replay"
    />
  );
}
