import {
  AthleteBanner,
  AthleteGlance,
  AthleteHero,
  AthleteLiveAwareness,
  AthleteMotivation,
  AthleteProgress,
  Footer,
  Header,
} from "../components";
import { DocumentSeo } from "../seo/DocumentSeo";
import { athleteDocument } from "../seo/marketing";

export function AthletePage() {
  return (
    <>
      <DocumentSeo document={athleteDocument} />
      <Header />
      <main>
        <AthleteHero />
        <AthleteMotivation />
        <AthleteLiveAwareness />
        <AthleteProgress />
        <AthleteGlance />
        <AthleteBanner />
      </main>
      <Footer />
    </>
  );
}
