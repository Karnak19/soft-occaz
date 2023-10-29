import { Suspense } from 'react';
import Link from 'next/link';

import LastAdsRSC from './LastAds.rsc';
import LastAdsLoading from './LastAds.Loading';

function LastAds() {
  return (
    <section aria-labelledby="trending-heading">
      <div className="py-16 sm:py-24 lg:mx-auto lg:max-w-7xl lg:py-32 lg:px-8">
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-0">
          <h2 id="trending-heading" className="text-2xl font-bold tracking-tight text-black">
            Dernières annonces
          </h2>
          <Link href="/annonces" className="hidden font-semibold text-rg-700 hover:text-rg-500 sm:block">
            Tout voir
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>

        <div className="relative mt-8">
          <div className="relative w-full overflow-x-auto">
            <Suspense fallback={<LastAdsLoading />}>
              <LastAdsRSC />
            </Suspense>
          </div>
        </div>

        <div className="px-4 mt-12 sm:hidden">
          <Link href="/annonces" className="font-semibold text-rg-700 hover:text-rg-500 ">
            Tout voir
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default LastAds;
