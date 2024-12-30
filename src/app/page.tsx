import HeroSection from '$/components/HeroSection';
import CategoriesSection from '$/components/home/CategoriesSection';
import LastAds from '$/components/home/LastAds';
import RegisterCTA from '$/components/home/RegisterCTA';
import ReversedRegisterCTA from '$/components/home/ReversedRegisterCTA';
import SearchSection from '$/components/home/SearchSection';

export default async function Home() {
  return (
    <div className="font-roboto">
      <HeroSection />
      <SearchSection />
      <LastAds />
      <CategoriesSection />
      <RegisterCTA />
      <ReversedRegisterCTA />
      {/* <PricingSection /> */}
    </div>
  );
}
