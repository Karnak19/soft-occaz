'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import ProductsListFilter from '$/app/annonces/list-filters';
import { usePocketbase } from '$/app/pocketbase-provider';
import { ListingsTypeOptions } from '$/utils/pocketbase/pocketbase-types';

function getSearchFilters(q?: string) {
  if (!q) return { typeFilters: [], searchTerms: [] };

  const words = q.split(' ');
  const types = Object.values(ListingsTypeOptions);

  // Separate words into types and search terms
  const typeFilters: string[] = [];
  const searchTerms = words.filter((word) => {
    const isType = types.includes(word.toLowerCase() as ListingsTypeOptions);
    if (isType) {
      typeFilters.push(word.toLowerCase());
    }
    return !isType;
  });

  return { typeFilters, searchTerms };
}

function Layout({ children }: { children: React.ReactNode }) {
  const { pb } = usePocketbase();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 10000 });

  const filter = searchParams.get('type') as ListingsTypeOptions | null;
  const { typeFilters } = getSearchFilters(searchParams.get('q') ?? undefined);

  // Combine type from path and search query
  const allTypeFilters = filter ? Array.from(new Set([...typeFilters, filter])) : typeFilters;
  const typeFilter = allTypeFilters.length > 0 ? `(${allTypeFilters.map((type) => `type = '${type}'`).join(' || ')})` : '';
  const soldFilter = 'sold_to = null';

  useEffect(() => {
    async function fetchPriceRange() {
      const [mostExpensiveListingInCategory, leastExpensiveListingInCategory] = await Promise.all([
        pb
          .collection('listings')
          .getFirstListItem(
            pb.filter([typeFilter, soldFilter].filter(Boolean).join(' && '), {
              ...(filter && { filter: filter as ListingsTypeOptions }),
            }),
            { sort: '-price', requestKey: 'mostExpensiveListingInCategory' },
          )
          .catch(() => null),
        pb
          .collection('listings')
          .getFirstListItem(
            pb.filter([typeFilter, soldFilter].filter(Boolean).join(' && '), {
              ...(filter && { filter: filter as ListingsTypeOptions }),
            }),
            { sort: 'price', requestKey: 'leastExpensiveListingInCategory' },
          )
          .catch(() => null),
      ]);

      setPriceRange({
        min: leastExpensiveListingInCategory?.price ?? 0,
        max: mostExpensiveListingInCategory?.price ?? 10000,
      });
    }

    void fetchPriceRange();
  }, [filter, pb, soldFilter, typeFilter]);

  return (
    <div className="flex flex-col gap-4 px-4 py-10 sm:px-6 lg:px-8">
      {!pathname.includes('details') && <ProductsListFilter minPrice={priceRange.min} maxPrice={priceRange.max} />}
      {children}
    </div>
  );
}

export default Layout;
