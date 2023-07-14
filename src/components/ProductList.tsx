import { Type } from '@prisma/client';

import { ListingWithUser, prisma } from '$/utils/db';

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
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(theme(width.60),1fr))] gap-8">
        {annonces.map((ad) => (
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //  @ts-ignore async server component
          <ListItemWithStripeInfos key={ad.id} {...ad} />
        ))}
      </ul>
    </div>
  );
}

async function ListItemWithStripeInfos(props: ListingWithUser) {
  return (
    <li>
      <ProductCard
        {...{ href: `/annonces/details/${props.id}`, ...props }}
        isHighlighted={['geardo', 'premium'].includes(props.user.sub?.toLowerCase() ?? '')}
      />
    </li>
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
