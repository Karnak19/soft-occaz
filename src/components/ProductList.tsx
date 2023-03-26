import { pb } from '$/utils/pocketbase';
import { AnnoncesResponse, Collections } from '$/utils/pocketbase-types';

import ProductCard from './ProductCard';

async function getData(filter = '') {
  const annonces = await pb.collection(Collections.Annonces).getList<AnnoncesResponse>(1, 30, {
    sort: '-created',
    filter,
  });
  return annonces;
}

async function ProductList({ filter, card = 'horizontal' }: { filter?: string; card?: 'horizontal' | 'vertical' }) {
  const annonces = await getData(filter);

  const isEmpty = !annonces.items.length;

  if (isEmpty) {
    return <p className="text-center">Aucune annonce trouvée</p>;
  }

  return (
    <ul className="flex flex-col gap-3 border-slate-600">
      {annonces.items.map((ad) => (
        <li key={ad.id}>
          <ProductCard
            display={card}
            {...{
              href: `/annonces/details/${ad.id}`,
              ...ad,
            }}
          />
        </li>
      ))}
    </ul>
  );
}

export default ProductList;
