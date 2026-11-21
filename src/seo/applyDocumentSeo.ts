import { headTags, managedMetaKeys } from "./html";
import type { SeoDocument } from "./types";

type Restore = () => void;

function upsertMeta(attr: "name" | "property", key: string, content: string | null): Restore {
  const selector = `meta[${attr}="${key}"]`;
  const existing = document.head.querySelector<HTMLMetaElement>(selector);

  if (content == null) {
    if (!existing) return () => undefined;
    const parent = existing.parentNode;
    const next = existing.nextSibling;
    existing.remove();
    return () => {
      parent?.insertBefore(existing, next);
    };
  }

  const element = existing ?? document.createElement("meta");
  const previous = existing?.getAttribute("content") ?? null;
  element.setAttribute(attr, key);
  element.setAttribute("content", content);
  if (!existing) document.head.appendChild(element);

  return () => {
    if (!existing) {
      element.remove();
      return;
    }
    if (previous == null) element.removeAttribute("content");
    else element.setAttribute("content", previous);
  };
}

function upsertCanonical(href: string | null): Restore {
  const existing = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (href == null) {
    if (!existing) return () => undefined;
    const parent = existing.parentNode;
    const next = existing.nextSibling;
    existing.remove();
    return () => {
      parent?.insertBefore(existing, next);
    };
  }

  const element = existing ?? document.createElement("link");
  const previous = existing?.getAttribute("href") ?? null;
  element.setAttribute("rel", "canonical");
  element.setAttribute("href", href);
  if (!existing) document.head.appendChild(element);

  return () => {
    if (!existing) {
      element.remove();
      return;
    }
    if (previous == null) element.removeAttribute("href");
    else element.setAttribute("href", previous);
  };
}

function upsertJsonLd(json: string | null): Restore {
  const existing = document.getElementById("bf-jsonld");

  if (json == null) {
    if (!existing) return () => undefined;
    const parent = existing.parentNode;
    const next = existing.nextSibling;
    existing.remove();
    return () => {
      parent?.insertBefore(existing, next);
    };
  }

  const created = !existing;
  const script = existing ?? document.createElement("script");
  const previous = existing?.textContent ?? null;
  script.id = "bf-jsonld";
  script.setAttribute("type", "application/ld+json");
  script.textContent = json;
  if (!existing) document.head.appendChild(script);

  return () => {
    if (created) script.remove();
    else script.textContent = previous;
  };
}

export function applyDocumentSeo(doc: SeoDocument): Restore {
  const previousTitle = document.title;
  document.title = doc.title;

  const content = new Map<string, string>();
  let canonical: string | null = null;
  let json: string | null = null;

  for (const tag of headTags(doc)) {
    if (tag.kind === "meta") {
      const key = tag.name ? `name:${tag.name}` : `property:${tag.property ?? ""}`;
      content.set(key, tag.content);
    } else if (tag.kind === "canonical") {
      canonical = tag.href;
    } else if (tag.kind === "jsonld") {
      json = tag.json;
    }
  }

  const restores = managedMetaKeys().map((item) =>
    upsertMeta(item.attr, item.key, content.get(`${item.attr}:${item.key}`) ?? null),
  );
  restores.push(upsertCanonical(canonical));
  restores.push(upsertJsonLd(json));

  return () => {
    document.title = previousTitle;
    for (let index = restores.length - 1; index >= 0; index -= 1) {
      restores[index]?.();
    }
  };
}
