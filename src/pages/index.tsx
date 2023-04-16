import dynamic from 'next/dynamic';
import Head from 'next/head';

import CategoriesSection from '$/components/home/CategoriesSection';
import LastAds from '$/components/home/LastAds';
import RegisterCTA from '$/components/home/RegisterCTA';
import SearchSection from '$/components/home/SearchSection';

const Warning = dynamic(() => import('$/components/home/Warning'), { ssr: false });

function Home() {
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="font-roboto">
        <Warning />
        <RegisterCTA />
        <SearchSection />
        <CategoriesSection />
        <LastAds />
      </div>
    </>
  );
}

export default Home;
