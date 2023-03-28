import { getListAds } from '$/utils/getters/getListAds';

import ProductCard, { FakeLoadingProductCard } from './ProductCard';

async function ProductList({ filter }: { filter?: string }) {
  const annonces = await getListAds({ filter });

  const isEmpty = !annonces.items.length;

  if (isEmpty) {
    return <p className="text-center">Aucune annonce trouvée</p>;
  }

  return (
    <div>
      <ul className="flex flex-col gap-3 border-slate-600">
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
      <ul className="flex flex-col gap-3 border-slate-600">
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
