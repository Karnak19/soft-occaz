import CategoriesSection from '$/components/home/CategoriesSection';
import CommunitySection from '$/components/home/CommunitySection';
import FeaturesSection from '$/components/home/FeaturesSection';
import HeroSection from '$/components/home/HeroSection';
import ImportSection from '$/components/home/ImportSection';
import LastAds from '$/components/home/LastAds';
import RegisterCTA from '$/components/home/RegisterCTA';
import SearchSection from '$/components/home/SearchSection';
import StatsSection from '$/components/home/StatsSection';
import TrustSection from '$/components/home/TrustSection';

export default async function Home() {
  return (
    <div className="flex flex-col gap-24 pb-24 font-roboto sm:gap-32">
      <HeroSection />
      <CommunitySection />
      <ImportSection />
      <SearchSection />
      <LastAds limit={5} />
      <CategoriesSection />
      <FeaturesSection />
      <StatsSection />
      <TrustSection />
      <RegisterCTA />
    </div>
  );
}
