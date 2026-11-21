import type { Animation } from "react-useanimations";
import activity from "react-useanimations/lib/activity";
import clock from "react-useanimations/lib/clock";
import trendingUp from "react-useanimations/lib/trendingUp";

export type AthleteProgressIconId = "trend" | "history" | "load";

export const ATHLETE_PROGRESS_ANIM: Record<AthleteProgressIconId, Animation> = {
  trend: trendingUp,
  history: clock,
  load: activity,
};
