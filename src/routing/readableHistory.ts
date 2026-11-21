import {
  createBrowserHistory,
  createPath,
  parsePath,
  type History,
  type Location,
  type To,
} from "@remix-run/router";
import { decodePathname } from "../seo/pathEncoding";

function asPath(to: To): { pathname: string; search: string; hash: string } {
  if (typeof to === "string") {
    const parsed = parsePath(to);
    return {
      pathname: decodePathname(parsed.pathname || "/"),
      search: parsed.search || "",
      hash: parsed.hash || "",
    };
  }
  return {
    pathname: decodePathname(to.pathname || "/"),
    search: to.search || "",
    hash: to.hash || "",
  };
}

function decodeLocation(location: Location): Location {
  return {
    ...location,
    pathname: decodePathname(location.pathname),
  };
}

/**
 * Browser history that keeps Persian (and other non-ASCII) pathnames decoded
 * in location state, push/replace URLs, and Link hrefs.
 */
export function createReadableBrowserHistory(): History {
  const history = createBrowserHistory({ v5Compat: true });

  return {
    get action() {
      return history.action;
    },
    get location() {
      return decodeLocation(history.location);
    },
    createHref(to) {
      const path = asPath(to);
      return createPath(path);
    },
    createURL(to) {
      const href = createPath(asPath(to));
      const base =
        typeof window !== "undefined" && window.location?.origin && window.location.origin !== "null"
          ? window.location.origin
          : "https://beatfit.ir";
      return new URL(href, base);
    },
    encodeLocation(to) {
      return asPath(to);
    },
    push(to, state) {
      history.push(asPath(to), state);
    },
    replace(to, state) {
      history.replace(asPath(to), state);
    },
    go(n) {
      history.go(n);
    },
    listen(listener) {
      return history.listen((update) => {
        listener({
          ...update,
          location: decodeLocation(update.location),
        });
      });
    },
  };
}
