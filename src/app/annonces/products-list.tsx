'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { ProductListGrid } from '$/app/annonces/product-list-grid';
import { usePocketbase } from '$/app/pocketbase-provider';
import { FakeLoadingProductCardList } from '$/components/product/ProductCard';
import {
  ListingsResponse,
  ListingsTypeOptions,
  UsersAverageRatingResponse,
  UsersResponse,
} from '$/utils/pocketbase/pocketbase-types';
import { useParams } from 'next/navigation';
import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs';
import { ListResult } from 'pocketbase';
import { ProductListList } from './product-list-list';

const ITEMS_PER_PAGE = 24;

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

type ListingsResponseWithUser = ListingsResponse<
  string[],
  {
    user: UsersResponse<{
      users_average_rating_via_user: UsersAverageRatingResponse<number>[];
    }>;
  }
>;

type QueryFnData = {
  annoncesResult: ListResult<ListingsResponseWithUser>;
};

type _Type = Lowercase<ListingsTypeOptions>;

function ProductList() {
  const { pb } = usePocketbase();
  const { ref, inView } = useInView();
  const params = useParams<{ type: _Type[] }>();

  const [{ sort, min, max, q, department, layout }] = useQueryStates({
    sort: parseAsString.withDefault('created-desc'),
    min: parseAsInteger.withDefault(0),
    max: parseAsInteger.withDefault(10000),
    q: parseAsString.withDefault(''),
    layout: parseAsString.withDefault(localStorage.getItem('annonces-layout') ?? 'grid'),
    department: parseAsInteger,
  });

  const { typeFilters, searchTerms } = getSearchFilters(q);

  // Combine type from path and search query
  const allTypeFilters = params.type ? Array.from(new Set([...typeFilters, ...params.type])) : typeFilters;
  const typeFilter = allTypeFilters.length > 0 ? `(${allTypeFilters.map((type) => `type = '${type}'`).join(' || ')})` : '';

  const minFilter = min ? 'price >= {:min}' : '';
  const maxFilter = max ? 'price <= {:max}' : '';
  const soldFilter = 'sold_to = null';
  const departmentFilter = department ? 'user.departement = {:department}' : '';
  // Build word filter from search terms
  const wordsFilter = searchTerms.length > 0 ? `(${searchTerms.map((word) => `title ~ '${word}'`).join(' || ')})` : '';

  const filters = [soldFilter, typeFilter, minFilter, maxFilter, wordsFilter, departmentFilter].filter(Boolean).join(' && ');
  const pb_filter = pb.filter(filters, {
    ...(min && { min }),
    ...(max && { max }),
    ...(department && { department }),
  });

  const sortMap = {
    'created-desc': '-created',
    'created-asc': '+created',
    'price-desc': '-price',
    'price-asc': '+price',
  } as const;

  const pbSort = sortMap[sort as keyof typeof sortMap] ?? '-created';

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } = useInfiniteQuery<QueryFnData>({
    queryKey: ['listings', { pb_filter, pbSort }],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const annoncesResult = await pb
        .collection('listings')
        .getList<ListingsResponseWithUser>(pageParam as number, ITEMS_PER_PAGE, {
          filter: pb_filter,
          sort: pbSort,
          expand: 'user.users_average_rating_via_user',
        });

      return {
        annoncesResult,
      };
    },
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.annoncesResult.page + 1;
      return nextPage <= lastPage.annoncesResult.totalPages ? nextPage : undefined;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return <FakeLoadingProductList />;
  }

  if (isError) {
    return <p className="text-center">Une erreur est survenue lors du chargement des annonces</p>;
  }

  if (!data?.pages[0]) {
    return null;
  }

  const allItems = data.pages.flatMap((page) => page.annoncesResult.items);

  return (
    <div className="flex flex-col gap-4">
      {allItems.length === 0 ? <p className="text-center">Aucune annonce trouvée</p> : null}
      {layout === 'grid' ? <ProductListGrid annonces={allItems} /> : <ProductListList annonces={allItems} />}
      <div ref={ref} className="h-8">
        {isFetchingNextPage && (
          <div className="mt-4">
            <FakeLoadingProductList />
          </div>
        )}
      </div>
    </div>
  );
}

export function FakeLoadingProductList() {
  return (
    <div>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(theme(width.56),1fr))] gap-8">
        <FakeLoadingProductCardList count={10} />
      </ul>
    </div>
  );
}

export default ProductList;
