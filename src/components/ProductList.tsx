import { getListAds } from '$/utils/getters/getListAds';

import ProductCard, { FakeLoadingProductCard } from './product/ProductCard';

async function ProductList({ filter }: { filter?: string }) {
  const annonces = await getListAds({ filter });

  const isEmpty = !annonces.items.length;

  if (isEmpty) {
    return <p className="text-center">Aucune annonce trouvée</p>;
  }

  return (
    // This padding is to ensure the vanilla-tilt gyroscope is not cut off
    <div className="flex flex-col px-6 sm:px-0">
      <div>{annonces.totalItems} annonces trouvées</div>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(theme(width.72),1fr))] gap-8">
        {annonces.items.map((ad) => (
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

export function FakeLoadingProductList() {
  return (
    <div>
      <ul className="flex flex-col gap-3 mx-auto border-rg">
        {[...Array(10)].map((_, i) => (
          <li key={i}>
            <FakeLoadingProductCard />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
