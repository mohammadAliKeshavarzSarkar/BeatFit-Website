import { JOURNEY_ANIM } from "./animations/homeSectionIcons";
import { UseAnimationIcon } from "./animations";
import type { JourneyIconId } from "../types/persona";
import enter from "../assets/icons/journey/enter.svg?raw";
import wristband from "../assets/icons/journey/wristband.svg?raw";
import heartPulse from "../assets/icons/journey/heart-pulse.svg?raw";
import monitor from "../assets/icons/journey/monitor.svg?raw";
import clipboard from "../assets/icons/journey/clipboard.svg?raw";
import chartUp from "../assets/icons/journey/chart-up.svg?raw";
import sliders from "../assets/icons/journey/sliders.svg?raw";
import users from "../assets/icons/journey/users.svg?raw";
import play from "../assets/icons/journey/play.svg?raw";
import heartGrid from "../assets/icons/journey/heart-grid.svg?raw";
import gauge from "../assets/icons/journey/gauge.svg?raw";
import analytics from "../assets/icons/journey/analytics.svg?raw";
import coach from "../assets/icons/journey/coach.svg?raw";
import usersCalendar from "../assets/icons/journey/users-calendar.svg?raw";
import device from "../assets/icons/journey/device.svg?raw";
import liveMonitor from "../assets/icons/journey/live-monitor.svg?raw";
import history from "../assets/icons/journey/history.svg?raw";
import settings from "../assets/icons/journey/settings.svg?raw";

const ICONS: Record<JourneyIconId, string> = {
  enter,
  wristband,
  "heart-pulse": heartPulse,
  monitor,
  clipboard,
  "chart-up": chartUp,
  sliders,
  users,
  play,
  "heart-grid": heartGrid,
  gauge,
  analytics,
  coach,
  "users-calendar": usersCalendar,
  device,
  "live-monitor": liveMonitor,
  history,
  settings,
};

type JourneyIconProps = {
  id: JourneyIconId;
  className?: string;
  /** Home personas: Lottie when we have a close match, else custom SVG */
  motion?: boolean;
  size?: number;
};

export function JourneyIcon({
  id,
  className,
  motion = false,
  size = 28,
}: JourneyIconProps) {
  const lottie = motion ? JOURNEY_ANIM[id] : undefined;

  if (lottie) {
    return (
      <span
        className={["bf-journey-icon", "bf-journey-icon--motion", className]
          .filter(Boolean)
          .join(" ")}
      >
        <UseAnimationIcon
          animation={lottie}
          size={size}
          interaction="hover-replay"
        />
      </span>
    );
  }

  const markup = ICONS[id];
  if (!markup) return null;

  return (
    <span
      className={["bf-journey-icon", className].filter(Boolean).join(" ")}
      dangerouslySetInnerHTML={{ __html: markup }}
      aria-hidden="true"
    />
  );
}
