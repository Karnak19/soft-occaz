'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

import { ListingWithUser } from '$/utils/db';

import ProductCard, { FakeLoadingProductCardList } from '../product/ProductCard';

function LastAds() {
  const { data, isLoading } = useQuery({
    queryKey: ['lastAds'],
    queryFn: () => fetch(`/api/listings?limit=4`).then((res) => res.json()) as Promise<ListingWithUser[]>,
  });

  return (
    <section aria-labelledby="trending-heading">
      <div className="py-16 sm:py-24 lg:mx-auto lg:max-w-7xl lg:py-32 lg:px-8">
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-0">
          <h2 id="trending-heading" className="text-2xl font-bold tracking-tight text-black">
            Dernières annonces
          </h2>
          <Link href="/annonces" className="hidden font-semibold text-rg-dark hover:text-rg sm:block">
            Tout voir
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>

        <div className="relative mt-8">
          <div className="relative w-full overflow-x-auto">
            <ul className="inline-flex py-5 mx-4 space-x-8 lg:mx-0 lg:px-4 sm:mx-6 lg:grid lg:grid-cols-4 lg:gap-x-8 lg:space-x-0">
              {!isLoading ? (
                data?.map((ad) => (
                  <li key={ad.id} className="w-64 lg:w-auto">
                    <ProductCard
                      {...{
                        ...ad,
                        href: `/annonces/details/${ad.id}`,
                      }}
                    />
                  </li>
                ))
              ) : (
                <FakeLoadingProductCardList />
              )}
            </ul>
          </div>
        </div>

        <div className="px-4 mt-12 sm:hidden">
          <Link href="#" className="font-semibold text-rg-dark hover:text-rg">
            Tout voir
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default LastAds;
