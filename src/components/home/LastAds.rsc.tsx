import { getLatestListings } from '$/utils/cached/getListings';

import ProductCard from '../product/ProductCard';

async function LastAdsRSC() {
  const listings = await getLatestListings();
  return (
    <ul className="mx-4 inline-flex space-x-8 py-5 sm:mx-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-x-8 lg:space-x-0 lg:px-4">
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
