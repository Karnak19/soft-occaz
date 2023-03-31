'use client';

import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import { AnnoncesResponse, Collections, UsersResponse } from '$/utils/pocketbase-types';
import { searchFilterGenerator } from '$/utils/searchFilterGenerator';

import { usePocket } from './PocketContext';
import ProductCard from './product/ProductCard';

function SearchList() {
  const { pb } = usePocket();
  const params = useSearchParams();

  const { data, isLoading } = useQuery({
    queryKey: ['search', params.get('q')],
    queryFn: () => {
      return pb.collection(Collections.Annonces).getList<AnnoncesResponse<{ user: UsersResponse }>>(1, 30, {
        sort: '-created',
        expand: 'user',
        filter: searchFilterGenerator(params.get('q')),
      });
    },
    staleTime: 0,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="mx-auto w-1080">
      <header>
        <p>
          {data?.totalItems} résultats pour « {params.get('q')} »
        </p>
      </header>

      <ul className="grid grid-cols-[repeat(auto-fill,minmax(theme(width.72),1fr))] gap-8">
        {data?.items.map((ad) => (
          <li key={ad.id}>
            <ProductCard
              {...{
                href: `/annonces/details/${ad.id}`,
                ...ad,
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchList;
