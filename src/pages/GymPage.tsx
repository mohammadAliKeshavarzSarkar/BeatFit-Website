import {
  Footer,
  GymBannerA,
  GymBannerB,
  GymClosing,
  GymEcosystem,
  GymHero,
  GymLeave,
  GymQuote,
  GymSeen,
  Header,
} from "../components";
import { DocumentSeo } from "../seo/DocumentSeo";
import { gymDocument } from "../seo/marketing";

export function GymPage() {
  return (
    <>
      <DocumentSeo document={gymDocument} />
      <Header />
      <main>
        <GymHero />
        <GymLeave />
        <GymBannerA />
        <GymSeen />
        <GymQuote />
        <GymEcosystem />
        <GymBannerB />
        <GymClosing />
      </main>
      <Footer />
    </>
  );
}
