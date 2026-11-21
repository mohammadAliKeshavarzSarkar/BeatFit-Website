export type PersonaId = "athlete" | "coach" | "club";

export type JourneyIconId =
  | "enter"
  | "wristband"
  | "heart-pulse"
  | "monitor"
  | "clipboard"
  | "chart-up"
  | "sliders"
  | "users"
  | "play"
  | "heart-grid"
  | "gauge"
  | "analytics"
  | "coach"
  | "users-calendar"
  | "device"
  | "live-monitor"
  | "history"
  | "settings";

export type JourneyStep = {
  title: string;
  body: string;
  icon: JourneyIconId;
  /** Optional product UI shot — only when it adds meaning to the step */
  image?: string;
  imageAlt?: string;
};

export type JourneyContent = {
  steps: JourneyStep[];
  message: string;
};
