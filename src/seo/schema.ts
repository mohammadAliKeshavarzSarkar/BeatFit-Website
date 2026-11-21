import { absoluteAsset, SITE_ORIGIN } from "../config/site";
import type { BlogPost, BlogRichText } from "../content/blog";
import type { JsonLd, JsonLdNode } from "./types";

const ORGANIZATION_ID = `${SITE_ORIGIN}/#organization`;
const WEBSITE_ID = `${SITE_ORIGIN}/#website`;
const LOGO = absoluteAsset("/assets/brand/beatfit-logo-horizontal.webp");

export function organizationNode(): JsonLdNode {
  return {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: "بیت‌فیت",
    url: `${SITE_ORIGIN}/`,
    email: "hello@beatfit.ir",
    logo: {
      "@type": "ImageObject",
      url: LOGO,
    },
  };
}

export function websiteNode(): JsonLdNode {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${SITE_ORIGIN}/`,
    name: "بیت‌فیت",
    inLanguage: "fa-IR",
    publisher: { "@id": ORGANIZATION_ID },
  };
}

export function marketingJsonLd(input: {
  canonical: string;
  title: string;
  description: string;
  faq?: readonly { question: string; answer: string }[];
}): JsonLd {
  const graph: JsonLdNode[] = [
    organizationNode(),
    websiteNode(),
    {
      "@type": "WebPage",
      "@id": `${input.canonical}#webpage`,
      url: input.canonical,
      name: input.title,
      description: input.description,
      inLanguage: "fa-IR",
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": ORGANIZATION_ID },
    },
  ];

  if (input.faq && input.faq.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${input.canonical}#faq`,
      url: input.canonical,
      inLanguage: "fa-IR",
      mainEntity: input.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

function answerText(answer: BlogRichText): string {
  if (typeof answer === "string") return answer;
  return answer.map((part) => part.text).join("");
}

export function articleJsonLd(post: BlogPost, canonical: string, description: string, image: string): JsonLd {
  const graph: JsonLdNode[] = [
    organizationNode(),
    websiteNode(),
    {
      "@type": "BlogPosting",
      "@id": `${canonical}#article`,
      headline: post.title,
      description,
      image,
      datePublished: post.datePublished,
      inLanguage: "fa-IR",
      mainEntityOfPage: canonical,
      author: {
        "@type": "Organization",
        name: "تیم محتوای بیت‌فیت",
        url: `${SITE_ORIGIN}/`,
      },
      publisher: { "@id": ORGANIZATION_ID },
    },
  ];

  const faq = "content" in post ? post.content?.find((block) => block.kind === "faq") : undefined;
  if (faq && faq.kind === "faq") {
    graph.push({
      "@type": "FAQPage",
      "@id": `${canonical}#faq`,
      url: canonical,
      inLanguage: "fa-IR",
      mainEntity: faq.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: answerText(item.answer),
        },
      })),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}
