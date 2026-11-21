/** Must stay in sync with the boot script in `index.html`. */
export const HOME_INTRO_STORAGE_KEY = "bf-home-intro-seen";

export function shouldPlayHomeIntro() {
  if (typeof window === "undefined") return false;
  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    return window.sessionStorage.getItem(HOME_INTRO_STORAGE_KEY) !== "1";
  } catch {
    return true;
  }
}

export function markHomeIntroSeen() {
  try {
    window.sessionStorage.setItem(HOME_INTRO_STORAGE_KEY, "1");
  } catch {
    /* ignore */
  }
}

/** Apply/remove the pre-React + runtime lock class on <html>/<body>. */
export function setHomeIntroActive(active: boolean) {
  document.documentElement.classList.toggle("bf-intro-active", active);
  document.body.classList.toggle("bf-intro-active", active);
}
