export type JsonLdNode = { [key: string]: unknown };

export type JsonLd = {
  "@context": "https://schema.org";
  "@graph": JsonLdNode[];
};

export type SeoDocument = {
  id: string;
  /** Public pathname, always without a trailing slash except for `/`. */
  path: string;
  /** ASCII file name used under route-html. Absent for home and the 404 shell. */
  fileId?: string;
  title: string;
  description: string;
  robots: string;
  ogType: "website" | "article";
  imagePath: string;
  imageAlt: string;
  h1: string;
  summary: string;
  publishedTime?: string;
  /** Absolute canonical. Omitted on the 404 shell, which is served for many URLs. */
  canonical: string | null;
  jsonLd: JsonLd | null;
  indexable: boolean;
  /** Significant content change date (YYYY-MM-DD). Omit when unknown — never use build time. */
  lastmod?: string;
  /**
   * Important destinations for brand sitelink readiness (home).
   * Rendered in the JS-off SEO shell and SiteNavigationElement JSON-LD.
   */
  primaryDestinations?: readonly { path: string; name: string }[];
};

export type HeadTag =
  | { kind: "title"; text: string }
  | { kind: "meta"; name?: string; property?: string; content: string }
  | { kind: "canonical"; href: string }
  | { kind: "jsonld"; json: string };
