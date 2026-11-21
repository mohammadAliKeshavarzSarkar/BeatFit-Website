import chevronDown from "react-useanimations/lib/chevronDown";
import { UseAnimationIcon } from "./UseAnimationIcon";

type DemoSelectChevronProps = {
  className?: string;
};

export function DemoSelectChevron({ className }: DemoSelectChevronProps) {
  return (
    <UseAnimationIcon
      animation={chevronDown}
      size={18}
      className={className}
      interaction="hover-replay"
    />
  );
}
