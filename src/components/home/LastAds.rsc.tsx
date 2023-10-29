import { prisma } from '$/utils/db';

import ProductCard from '../product/ProductCard';

async function LastAdsRSC() {
  const listings = await prisma.listing.findMany({
    take: 4,
    orderBy: { createdAt: 'desc' },
    include: { user: true },
  });

  return (
    <ul className="inline-flex py-5 mx-4 space-x-8 lg:mx-0 lg:px-4 sm:mx-6 lg:grid lg:grid-cols-4 lg:gap-x-8 lg:space-x-0">
      {listings.map((ad) => (
        <li key={ad.id} className="w-64 lg:w-auto">
          <ProductCard
            {...{
              ...ad,
              href: `/annonces/details/${ad.id}`,
            }}
          />
        </li>
      ))}
    </ul>
  );
}

export default LastAdsRSC;
