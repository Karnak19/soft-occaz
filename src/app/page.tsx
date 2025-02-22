import CategoriesSection from '$/components/home/CategoriesSection';
import CommunitySection from '$/components/home/CommunitySection';
import DepartmentsMapSection from '$/components/home/DepartmentsMapSection';
import FeaturesSection from '$/components/home/FeaturesSection';
import HeroSection from '$/components/home/HeroSection';
import ImportSection from '$/components/home/ImportSection';
import LastAds from '$/components/home/LastAds';
import ReferralSection from '$/components/home/ReferralSection';
import RegisterCTA from '$/components/home/RegisterCTA';
import SearchSection from '$/components/home/SearchSection';
import StatsSection from '$/components/home/StatsSection';
import TrustSection from '$/components/home/TrustSection';
import { ListingsTypeOptions } from '$/utils/pocketbase/pocketbase-types';

export default async function Home() {
  return (
    <div className="flex flex-col gap-16 pb-24 font-roboto sm:gap-24">
      <HeroSection />
      <DepartmentsMapSection />
      <LastAds limit={10} />
      <CategoriesSection />
      <LastAds limit={10} type={ListingsTypeOptions.aeg} />
      <LastAds limit={10} type={ListingsTypeOptions.gbb} />
      <CommunitySection />
      <ImportSection />
      <SearchSection />
      <FeaturesSection />
      <ReferralSection />
      <StatsSection />
      <TrustSection />
      <RegisterCTA />
    </div>
  );
}
