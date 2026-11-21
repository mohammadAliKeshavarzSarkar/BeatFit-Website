import type { Animation } from "react-useanimations";
import activity from "react-useanimations/lib/activity";
import explore from "react-useanimations/lib/explore";
import refresh from "react-useanimations/lib/refresh";

export type GymLeaveIconId = "refresh" | "spark" | "pulse";

export const GYM_LEAVE_ANIM: Record<GymLeaveIconId, Animation> = {
  refresh,
  spark: explore,
  pulse: activity,
};
