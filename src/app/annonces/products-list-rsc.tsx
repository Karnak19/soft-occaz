import { ListingsResponse, ListingsTypeOptions, UsersResponse } from '$/utils/pocketbase/pocketbase-types';
import { createServerClient } from '$/utils/pocketbase/server';
import { FakeLoadingProductCardList } from '$/components/product/ProductCard';
import ProductsListFilter from '$/app/annonces/list-filters';
import { ProductListGrid } from '$/app/annonces/product-list-grid';
import { ProductListTable } from '$/app/annonces/product-list-table';

import { LoadMoreButton } from './load-more-button';

async function ProductList({ filter, searchParams }: { filter?: ListingsTypeOptions; searchParams?: Record<string, string> }) {
  const pb = await createServerClient();

  const sort = searchParams?.sort ?? 'created-desc';
  const layout = searchParams?.layout ?? 'grid';
  const min = searchParams?.min ? parseInt(searchParams.min) : undefined;
  const max = searchParams?.max ? parseInt(searchParams.max) : undefined;
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const perPage = searchParams?.perPage ? parseInt(searchParams.perPage) : 24;

  const typeFilter = filter ? `type = {:filter}` : '';
  const minFilter = min ? 'price >= {:min}' : '';
  const maxFilter = max ? 'price <= {:max}' : '';
  const soldFilter = 'sold_to = null';
  const filters = [typeFilter, minFilter, maxFilter, soldFilter].filter(Boolean).join(' && ');
  const pb_filter = pb.filter(filters, {
    ...(filter && { filter: filter as ListingsTypeOptions }),
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
    pb.collection('listings').getList<ListingsResponse<string[], { user: UsersResponse }>>(page, perPage, {
      filter: pb_filter,
      sort: pbSort,
      expand: 'user',
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
        page={page}
        perPage={perPage}
        totalPages={annoncesResult.totalPages}
      />
      {annoncesResult.items.length === 0 ? <p className="text-center">Aucune annonce trouvée</p> : null}
      {layout === 'list' ? (
        <ProductListTable pb={pb} annonces={annoncesResult.items} />
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

export default ProductList;
