import { Type } from '@prisma/client';

import { prisma } from '$/utils/db';

import ProductCard, { FakeLoadingProductCardList } from './product/ProductCard';

async function ProductList({ filter }: { filter?: Type }) {
  const annonces = await prisma.listing.findMany({
    where: { type: { equals: filter as Type }, sold: { equals: false } },
    orderBy: { createdAt: 'desc' },
    include: { user: true },
  });

  const isEmpty = !annonces.length;

  if (isEmpty) {
    return <p className="text-center">Aucune annonce trouvée</p>;
  }

  return (
    // This padding is to ensure the vanilla-tilt gyroscope is not cut off
    <div className="flex gap-4 flex-col px-6 sm:px-0">
      <div>{annonces.length} annonces trouvées</div>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(theme(width.72),1fr))] gap-8">
        {annonces.map((ad) => (
          <li key={ad.id}>
            <ProductCard {...{ href: `/annonces/details/${ad.id}`, ...ad }} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function FakeLoadingProductList() {
  return (
    <div>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(theme(width.72),1fr))] gap-8">
        <FakeLoadingProductCardList count={10} />
      </ul>
    </div>
  );
}

export default ProductList;
