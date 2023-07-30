import PricingSection from '$/components/PricingSection';
import CategoriesSection from '$/components/home/CategoriesSection';
import LastAds from '$/components/home/LastAds';
import RegisterCTA from '$/components/home/RegisterCTA';
import SearchSection from '$/components/home/SearchSection';

export default async function Home() {
  return (
    <div className="font-roboto">
      <RegisterCTA />
      <LastAds />
      <SearchSection />
      <CategoriesSection />
      <PricingSection />
    </div>
  );
}
