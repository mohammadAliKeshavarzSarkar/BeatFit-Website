import searchToX from "react-useanimations/lib/searchToX";
import { UseAnimationIcon } from "./UseAnimationIcon";

type ResourcesSearchIconProps = {
  className?: string;
  /** Toggles search ↔ close in the icon animation */
  active?: boolean;
  size?: number;
};

export function ResourcesSearchIcon({
  className,
  active,
  size = 18,
}: ResourcesSearchIconProps) {
  return (
    <UseAnimationIcon
      animation={searchToX}
      size={size}
      className={className}
      interaction="hover-replay"
      active={active}
    />
  );
}
