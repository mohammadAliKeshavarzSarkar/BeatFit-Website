import type { Animation } from "react-useanimations";
import activity from "react-useanimations/lib/activity";
import barChart from "react-useanimations/lib/barChart";
import clipboard from "react-useanimations/lib/clipboard";
import clock from "react-useanimations/lib/clock";
import monitor from "react-useanimations/lib/monitor";
import playPause from "react-useanimations/lib/playPause";
import refresh from "react-useanimations/lib/refresh";
import settings from "react-useanimations/lib/settings";
import smartphone from "react-useanimations/lib/smartphone";
import trendingUp from "react-useanimations/lib/trendingUp";
import user from "react-useanimations/lib/user";
import users from "react-useanimations/lib/users";
import type { JourneyIconId } from "../../types/persona";

/** Ecosystem chart markers — generic metaphors, home only */
export const ECOSYSTEM_POINT_ANIM: Record<string, Animation> = {
  progress: trendingUp,
  attention: users,
  repeat: refresh,
  value: barChart,
};

/** Journey steps with a close catalog match; unlisted ids keep custom SVG */
export const JOURNEY_ANIM: Partial<Record<JourneyIconId, Animation>> = {
  "heart-pulse": activity,
  "heart-grid": activity,
  monitor,
  "live-monitor": monitor,
  clipboard,
  "chart-up": trendingUp,
  analytics: barChart,
  users,
  "users-calendar": users,
  play: playPause,
  settings,
  history: clock,
  device: smartphone,
  wristband: smartphone,
  coach: user,
};
