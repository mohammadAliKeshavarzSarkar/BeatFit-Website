import {
  Footer,
  Header,
  ResourcesCatalog,
  ResourcesHero,
} from "../components";
import { DocumentSeo } from "../seo/DocumentSeo";
import { resourcesDocument } from "../seo/marketing";

export function ResourcesPage() {
  return (
    <>
      <DocumentSeo document={resourcesDocument} />
      <Header solid />
      <main className="bf-resources-page">
        <ResourcesHero />
        <ResourcesCatalog />
      </main>
      <Footer />
    </>
  );
}
