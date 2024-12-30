import { ListingsResponse, ListingsTypeOptions, UsersResponse } from '$/utils/pocketbase/pocketbase-types';
import { createServerClient } from '$/utils/pocketbase/server';
import { FakeLoadingProductCardList } from '$/components/product/ProductCard';
import ProductsListFilter from '$/app/annonces/list-filters';
import { ProductListGrid } from '$/app/annonces/product-list-grid';
import { ProductListTable } from '$/app/annonces/product-list-table';

async function ProductList({
  filter,
  searchParams,
}: {
  filter?: ListingsTypeOptions;
  searchParams?: {
    min: string;
    max: string;
    layout: 'list' | 'grid';
  };
}) {
  const pb = await createServerClient();

  const typeFilter = filter ? `type = {:filter}` : '';
  const minFilter = searchParams?.min ? 'price >= {:min}' : '';
  const maxFilter = searchParams?.max ? 'price <= {:max}' : '';
  const soldFilter = 'sold_to = null';
  const filters = [typeFilter, minFilter, maxFilter, soldFilter].filter(Boolean).join(' && ');
  const pb_filter = pb.filter(filters, {
    ...(filter && { filter: filter as ListingsTypeOptions }),
    ...(searchParams?.min && { min: searchParams?.min }),
    ...(searchParams?.max && { max: searchParams?.max }),
  });

  const annonces = await pb.collection('listings').getFullList<ListingsResponse<string[], { user: UsersResponse }>>({
    filter: pb_filter,
    sort: '-created',
    expand: 'user',
  });

  const minPrice = Math.max(Math.min(...annonces.map((a) => a.price)), 0);
  const maxPrice = Math.max(...annonces.map((a) => a.price));

  return (
    <div className="flex flex-col gap-4">
      <ProductsListFilter minPrice={minPrice} maxPrice={maxPrice} total={annonces.length} current={annonces.length} />
      {annonces.length === 0 ? <p className="text-center">Aucune annonce trouvée</p> : null}
      {searchParams?.layout === 'list' ? (
        <ProductListTable pb={pb} annonces={annonces} />
      ) : (
        <ProductListGrid annonces={annonces} />
      )}
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
