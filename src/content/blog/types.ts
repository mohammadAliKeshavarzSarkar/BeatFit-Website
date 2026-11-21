export type BlogInline = {
  text: string;
  strong?: boolean;
  emphasis?: boolean;
  href?: string;
};

export type BlogRichText = string | readonly BlogInline[];

export type BlogPostSection = {
  heading?: string;
  paragraphs: readonly string[];
};

export type BlogContentBlock =
  | {
      kind: "paragraph";
      content: BlogRichText;
      tone?: "default" | "note" | "warning";
    }
  | {
      kind: "heading";
      level: 2 | 3;
      text: string;
    }
  | {
      kind: "list";
      items: readonly BlogRichText[];
    }
  | {
      kind: "table";
      caption?: string;
      headers: readonly BlogRichText[];
      rows: readonly (readonly BlogRichText[])[];
    }
  | {
      kind: "figure";
      src: string;
      alt: string;
      caption?: string;
      layout?: "default" | "portrait";
    }
  | {
      kind: "chart";
      title: string;
      subtitle?: string;
      ariaLabel: string;
      max: number;
      values: readonly {
        label: string;
        value: number;
        displayValue: string;
        color: string;
      }[];
      metrics?: readonly {
        label: string;
        value: string;
      }[];
      note?: string;
    }
  | {
      kind: "process";
      title: string;
      subtitle?: string;
      ariaLabel: string;
      steps: readonly {
        title: string;
        body: string;
      }[];
      note?: string;
    }
  | {
      kind: "faq";
      title: string;
      items: readonly {
        question: string;
        answer: BlogRichText;
      }[];
    }
  | {
      kind: "sources";
      title: string;
      items: readonly {
        label: string;
        href: string;
      }[];
    }
  | {
      kind: "cta";
      title?: string;
      body?: string;
      label: string;
      href: string;
    };

type BlogPostBase = {
  slug: string;
  eyebrow: string;
  title: string;
  summary: string;
  seoTitle?: string;
  metaDescription?: string;
  image: string;
  imageAlt: string;
  published: boolean;
  datePublished: string;
  relatedSlugs?: readonly string[];
};

export type RichBlogPost = BlogPostBase & {
  content: readonly BlogContentBlock[];
  sections?: never;
};

export type LegacyBlogPost = BlogPostBase & {
  sections: readonly BlogPostSection[];
  content?: never;
};

export type BlogPost = RichBlogPost | LegacyBlogPost;

