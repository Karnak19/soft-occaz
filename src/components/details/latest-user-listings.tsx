'use client';

import { useQuery } from '@tanstack/react-query';

import { usePocketbase } from '$/app/pocketbase-provider';
import type { ListingsResponse, UsersResponse } from '$/utils/pocketbase/pocketbase-types';

import ProductCard, { FakeLoadingProductCardList } from '../product/ProductCard';

interface SimilarListingsProps {
  userId: string;
  currentListingId: string;
}

export default function LatestUserListings({ userId, currentListingId }: SimilarListingsProps) {
  const { pb } = usePocketbase();

  const { data: similarListings, isLoading } = useQuery({
    queryKey: ['listings', 'latest', { currentListingId, userId }],
    queryFn: async () =>
      pb.collection('listings').getList<ListingsResponse<string[], { user: UsersResponse }>>(1, 4, {
        filter: `user="${userId}" && id!="${currentListingId}"`,
        expand: 'user',
        sort: '-created',
      }),
  });

  return (
    <section>
      <div className="mx-auto max-w-2xl py-8 sm:py-12 lg:max-w-7xl">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Autres annonces de ce membre</h2>

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
