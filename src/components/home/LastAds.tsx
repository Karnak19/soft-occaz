'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';

import { ListingsResponse, UsersResponse } from '$/utils/pocketbase/pocketbase-types';
import { usePocketbase } from '$/app/pocketbase-provider';

import ProductCard from '../product/ProductCard';
import LastAdsLoading from './LastAds.Loading';

function LastAds() {
  const { pb } = usePocketbase();

  const { data, isLoading } = useQuery({
    queryKey: ['lastAds'],
    queryFn: async () =>
      pb.collection('listings').getList<ListingsResponse<string[], { user: UsersResponse }>>(1, 4, {
        sort: '-created',
        expand: 'user',
      }),
  });

  return (
    <section aria-labelledby="trending-heading">
      <div className="py-16 sm:py-24 lg:mx-auto lg:max-w-7xl lg:px-8 lg:py-32">
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-0">
          <h2 id="trending-heading" className="text-2xl font-bold tracking-tight text-foreground">
            Dernières annonces
          </h2>
          <Link
            href="/annonces"
            className="hidden font-semibold text-rg-700 hover:text-primary dark:text-muted-foreground dark:hover:text-foreground sm:block"
          >
            Tout voir
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>

        <div className="relative mt-8">
          <div className="relative w-full overflow-x-auto">
            {!isLoading ? (
              <ul className="mx-4 inline-flex space-x-8 py-5 sm:mx-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-x-8 lg:space-x-0 lg:px-4">
                {data?.items.map((ad) => (
                  <li key={ad.id} className="w-64 lg:w-auto">
                    <ProductCard {...ad} />
                  </li>
                ))}
              </ul>
            ) : (
              <LastAdsLoading />
            )}
          </div>
        </div>

        <div className="mt-12 px-4 sm:hidden">
          <Link
            href="/annonces"
            className="font-semibold text-rg-700 hover:text-primary dark:text-muted-foreground dark:hover:text-foreground"
          >
            Tout voir
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default LastAds;
