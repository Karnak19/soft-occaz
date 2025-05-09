import AirsoftOccasionSeoSection from '$/components/home/AirsoftOccasionSeoSection';
import CategoriesSection from '$/components/home/CategoriesSection';
import CommunitySection from '$/components/home/CommunitySection';
import DepartmentsMapSection from '$/components/home/DepartmentsMapSection';
import FeaturesSection from '$/components/home/FeaturesSection';
import FullScreenCarousel from '$/components/home/FullScreenCarousel';
import ImportSection from '$/components/home/ImportSection';
import LastAds from '$/components/home/LastAds';
import MarketBotSection from '$/components/home/MarketBotSection';
import { PartnersSection } from '$/components/home/PartnersSection';
import ReferralSection from '$/components/home/ReferralSection';
import RegisterCTA from '$/components/home/RegisterCTA';
import SearchSection from '$/components/home/SearchSection';
import StatsSection from '$/components/home/StatsSection';
import TrustSection from '$/components/home/TrustSection';
import { ListingsTypeOptions } from '$/utils/pocketbase/pocketbase-types';

export default async function Home() {
  return (
    <div className="flex flex-col gap-16 pb-24 font-roboto sm:gap-24">
      <FullScreenCarousel />

      {/* SEO Section for Airsoft Occasion */}
      <AirsoftOccasionSeoSection />

      <DepartmentsMapSection />
      <PartnersSection />
      <MarketBotSection />
      <LastAds limit={10} type={ListingsTypeOptions.aeg} />
      <ReferralSection />
      <LastAds limit={10} type={ListingsTypeOptions.gbb} />
      <CategoriesSection />
      <CommunitySection />
      <ImportSection />
      <SearchSection />
      <FeaturesSection />
      <StatsSection />
      <TrustSection />
      <RegisterCTA />
    </div>
  );
}
