import { Footer, Header } from "../components";
import { DocumentSeo } from "../seo/DocumentSeo";
import { notFoundDocument } from "../seo/marketing";
import { Button, Container } from "../ui";

export function NotFoundPage() {
  return (
    <>
      <DocumentSeo document={notFoundDocument} />
      <Header solid />
      <main>
        <section className="bf-section" aria-labelledby="not-found-title">
          <Container>
            <div className="bf-section__head">
              <h1 id="not-found-title" className="bf-section__title">
                {notFoundDocument.h1}
              </h1>
              <p className="bf-section__sub">{notFoundDocument.summary}</p>
              <div className="bf-not-found__action">
                <Button href="/" variant="primary">
                  بازگشت به صفحه اصلی
                </Button>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
