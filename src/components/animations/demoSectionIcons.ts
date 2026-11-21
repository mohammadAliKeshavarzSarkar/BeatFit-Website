import type { Animation } from "react-useanimations";
import messageSquare from "react-useanimations/lib/messageSquare";
import monitor from "react-useanimations/lib/monitor";
import users from "react-useanimations/lib/users";

export type DemoFeatureIconId = "presentation" | "users" | "message";

export const DEMO_FEATURE_ANIM: Record<DemoFeatureIconId, Animation> = {
  presentation: monitor,
  users,
  message: messageSquare,
};
