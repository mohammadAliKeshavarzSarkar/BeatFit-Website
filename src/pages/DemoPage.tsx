import { DemoForm, Footer, Header } from "../components";
import { DocumentSeo } from "../seo/DocumentSeo";
import { demoDocument } from "../seo/marketing";

export function DemoPage() {
  return (
    <div className="bf-demo-page">
      <DocumentSeo document={demoDocument} />
      <Header appearance="overlay" />
      <main>
        <DemoForm />
      </main>
      <Footer />
    </div>
  );
}
