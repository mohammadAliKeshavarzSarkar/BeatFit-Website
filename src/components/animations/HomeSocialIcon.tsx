import type { Animation } from "react-useanimations";
import instagram from "react-useanimations/lib/instagram";
import linkedin from "react-useanimations/lib/linkedin";
import mail from "react-useanimations/lib/mail";
import telegram from "react-useanimations/lib/telegram";
import { UseAnimationIcon } from "./UseAnimationIcon";

const ANIMATED: Record<string, Animation> = {
  telegram,
  linkedin,
  instagram,
  mail,
};

type HomeSocialIconProps = {
  icon: string;
  size?: number;
  className?: string;
};

export function HomeSocialIcon({ icon, size = 32, className }: HomeSocialIconProps) {
  const animation = ANIMATED[icon];
  if (!animation) return null;

  return (
    <UseAnimationIcon
      animation={animation}
      size={size}
      className={className}
    />
  );
}

export function isHomeAnimatedSocial(icon: string): boolean {
  return icon in ANIMATED;
}
