'use client';

import { useQuery } from '@tanstack/react-query';

import { usePocketbase } from '$/app/pocketbase-provider';
import type { ListingsResponse, UsersResponse } from '$/utils/pocketbase/pocketbase-types';

import ProductCard, { FakeLoadingProductCardList } from '../product/ProductCard';

interface SimilarListingsProps {
  currentListingId: string;
  type: string;
}

export default function SimilarListings({ currentListingId, type }: SimilarListingsProps) {
  const { pb } = usePocketbase();

  const { data: similarListings, isLoading } = useQuery({
    queryKey: ['listings', 'similar', { currentListingId }],
    queryFn: async () =>
      pb.collection('listings').getList<ListingsResponse<string[], { user: UsersResponse }>>(1, 4, {
        filter: `type="${type}" && id!="${currentListingId}"`,
        expand: 'user',
        sort: '-created',
      }),
  });

  return (
    <section>
      <div className="mx-auto max-w-2xl py-8 sm:py-12 lg:max-w-7xl">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Annonces similaires</h2>

        <div className="mt-8">
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {isLoading && <FakeLoadingProductCardList />}

            {similarListings?.items.map((listing) => (
              <li key={listing.id}>
                <ProductCard {...listing} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
