import ProductsListFilter from '$/app/annonces/list-filters';
import { ProductListGrid } from '$/app/annonces/product-list-grid';
import { ProductListTable } from '$/app/annonces/product-list-table';
import { FakeLoadingProductCardList } from '$/components/product/ProductCard';
import {
  ListingsResponse,
  ListingsTypeOptions,
  UsersAverageRatingResponse,
  UsersResponse,
} from '$/utils/pocketbase/pocketbase-types';
import { createServerClient } from '$/utils/pocketbase/server';

import { LoadMoreButton } from './load-more-button';

async function ProductList({ filter, searchParams }: { filter?: ListingsTypeOptions; searchParams?: Record<string, string> }) {
  const pb = await createServerClient();

  const sort = searchParams?.sort ?? 'created-desc';
  const layout = searchParams?.layout ?? 'grid';
  const min = searchParams?.min ? parseInt(searchParams.min) : undefined;
  const max = searchParams?.max ? parseInt(searchParams.max) : undefined;
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const perPage = searchParams?.perPage ? parseInt(searchParams.perPage) : 24;

  const { typeFilters, searchTerms } = getSearchFilters(searchParams?.q);

  // Combine type from path and search query
  const allTypeFilters = filter ? Array.from(new Set([...typeFilters, filter])) : typeFilters;
  const typeFilter = allTypeFilters.length > 0 ? `(${allTypeFilters.map((type) => `type = '${type}'`).join(' || ')})` : '';

  const minFilter = min ? 'price >= {:min}' : '';
  const maxFilter = max ? 'price <= {:max}' : '';
  const soldFilter = 'sold_to = null';

  // Build word filter from search terms
  const wordsFilter = searchTerms.length > 0 ? `(${searchTerms.map((word) => `title ~ '${word}'`).join(' || ')})` : '';

  const filters = [soldFilter, typeFilter, minFilter, maxFilter, wordsFilter].filter(Boolean).join(' && ');
  const pb_filter = pb.filter(filters, {
    ...(min && { min }),
    ...(max && { max }),
  });

  const sortMap = {
    'created-desc': '-created',
    'created-asc': '+created',
    'price-desc': '-price',
    'price-asc': '+price',
  } as const;

  const pbSort = sortMap[sort as keyof typeof sortMap] ?? '-created';

  const [annoncesResult, mostExpensiveListingInCategory, leastExpensiveListingInCategory] = await Promise.all([
    pb.collection('listings').getList<
      ListingsResponse<
        string[],
        {
          user: UsersResponse<{
            users_average_rating_via_user: UsersAverageRatingResponse<number>[];
          }>;
        }
      >
    >(page, perPage, {
      filter: pb_filter,
      sort: pbSort,
      expand: 'user.users_average_rating_via_user',
    }),
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

  const minPrice = leastExpensiveListingInCategory?.price ?? 0;
  const maxPrice = mostExpensiveListingInCategory?.price ?? 10000;

  const hasMore = page < annoncesResult.totalPages;

  return (
    <div className="flex flex-col gap-4">
      <ProductsListFilter
        minPrice={minPrice}
        maxPrice={maxPrice}
        total={annoncesResult.totalItems}
        current={annoncesResult.items.length}
        totalPages={annoncesResult.totalPages}
      />
      {annoncesResult.items.length === 0 ? <p className="text-center">Aucune annonce trouvée</p> : null}
      {layout === 'list' ? (
        <ProductListTable annonces={annoncesResult.items} />
      ) : (
        <ProductListGrid annonces={annoncesResult.items} />
      )}
      {hasMore ? (
        <div className="mt-4 flex justify-center">
          <LoadMoreButton currentPage={page} />
        </div>
      ) : null}
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

export default ProductList;
