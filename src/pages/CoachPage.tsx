import {
  CoachBannerB,
  CoachClarity,
  CoachDecisions,
  CoachGuide,
  CoachHero,
  CoachTools,
  Footer,
  Header,
} from "../components";
import { DocumentSeo } from "../seo/DocumentSeo";
import { coachDocument } from "../seo/marketing";

export function CoachPage() {
  return (
    <>
      <DocumentSeo document={coachDocument} />
      <Header />
      <main>
        <CoachHero />
        <CoachGuide />
        <CoachClarity />
        <CoachTools />
        <CoachDecisions />
        <CoachBannerB />
      </main>
      <Footer />
    </>
  );
}
