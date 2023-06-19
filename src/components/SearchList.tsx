'use client';

import type { Listing } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import ProductCard from './product/ProductCard';

function SearchList() {
  const p = useSearchParams();

  const { data } = useQuery(['search', p.get('q')], async () => {
    const res = await fetch(`/api/listings/search?q=${p.get('q')}`);
    return res.json() as Promise<Listing[]>;
  });

  return (
    <div className="mx-auto w-1080">
      <header>
        <p>
          {data?.length} résultats pour « {p.get('q')} »
        </p>
      </header>

      <ul className="grid grid-cols-[repeat(auto-fill,minmax(theme(width.72),1fr))] gap-8">
        {data?.map((ad) => (
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
