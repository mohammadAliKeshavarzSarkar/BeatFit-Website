import { useLayoutEffect } from "react";
import { applyDocumentSeo } from "./applyDocumentSeo";
import type { SeoDocument } from "./types";

export function DocumentSeo({ document }: { document: SeoDocument }) {
  useLayoutEffect(() => applyDocumentSeo(document), [document]);
  return null;
}
