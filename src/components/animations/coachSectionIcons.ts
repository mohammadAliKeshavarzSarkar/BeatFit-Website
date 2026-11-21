import type { Animation } from "react-useanimations";
import activity from "react-useanimations/lib/activity";
import explore from "react-useanimations/lib/explore";
import heart from "react-useanimations/lib/heart";
import monitor from "react-useanimations/lib/monitor";
import trendingUp from "react-useanimations/lib/trendingUp";
import users from "react-useanimations/lib/users";
import visibility from "react-useanimations/lib/visibility";

export type CoachGuideIconId = "pulse" | "heartOff" | "shoe" | "users";
export type CoachClarityIconId = "binoculars" | "monitor" | "biceps";

export const COACH_GUIDE_ANIM: Record<CoachGuideIconId, Animation> = {
  pulse: activity,
  heartOff: heart,
  shoe: explore,
  users,
};

export const COACH_CLARITY_ANIM: Record<CoachClarityIconId, Animation> = {
  binoculars: visibility,
  monitor,
  biceps: trendingUp,
};
