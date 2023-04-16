import dynamic from 'next/dynamic';

import CategoriesSection from '$/components/home/CategoriesSection';
import LastAds from '$/components/home/LastAds';
import RegisterCTA from '$/components/home/RegisterCTA';
import SearchSection from '$/components/home/SearchSection';

const Warning = dynamic(() => import('$/components/home/Warning'), { ssr: false });

export default async function Home() {
  return (
    <div className="font-roboto">
      <Warning />
      <RegisterCTA />
      <SearchSection />
      <CategoriesSection />
      <LastAds />
    </div>
  );
}
