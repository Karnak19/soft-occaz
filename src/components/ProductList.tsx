import { Type } from '@prisma/client';

import { prisma } from '$/utils/db';

import ProductCard, { FakeLoadingProductCardList } from './product/ProductCard';
import ProductsListFilter from './ProductsListFilter';

async function ProductList({
  filter,
  searchParams,
}: {
  filter?: Type;
  searchParams?: {
    min: string;
    max: string;
  };
}) {
  const annonces = await prisma.listing.findMany({
    where: { type: { equals: filter as Type }, sold: { equals: false } },
    orderBy: { createdAt: 'desc' },
    include: { user: true },
  });

  const filteredAnnonces = annonces.filter((annonce) => {
    if (!searchParams) return true;
    const { min, max } = searchParams;
    if (!min || !max) return true;
    return annonce.price >= parseInt(min) && annonce.price <= parseInt(max);
  });

  const isEmpty = !filteredAnnonces.length;

  const minPrice = Math.min(...annonces.map((a) => a.price));
  const maxPrice = Math.max(...annonces.map((a) => a.price));

  return (
    // This padding is to ensure the vanilla-tilt gyroscope is not cut off
    <div className="flex gap-4 flex-col px-6 sm:px-0">
      <ProductsListFilter minPrice={minPrice} maxPrice={maxPrice} total={annonces.length} current={filteredAnnonces.length} />
      {isEmpty ? <p className="text-center">Aucune annonce trouvée</p> : null}
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(theme(width.60),1fr))] gap-8">
        {filteredAnnonces.map((props) => (
          <li key={props.id}>
            <ProductCard
              {...{ href: `/annonces/details/${props.id}`, ...props }}
              isHighlighted={['hobby', 'geardo', 'premium'].includes(props.user.sub?.toLowerCase() ?? '')}
            />
          </li>
        ))}
      </ul>
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
