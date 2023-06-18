import { Metadata } from 'next';

import ProductDetails from '$/components/details/ProductDetails';
import { db } from '$/utils/db';
import { getSingleAd } from '$/utils/getters/getSingleAd';
import sanitizer from '$/utils/sanitizer';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const ad = await db.listing.findUniqueOrThrow({ where: { id: params.id } });

  return {
    title: ad.title,
    description: sanitizer(ad.description).substring(0, 150),
    openGraph: {
      images: [{ url: ad.images[0] }],
    },
  };
}

async function page({ params }: { params: { id: string } }) {
  const ad = await getSingleAd(params.id);

  return <ProductDetails {...ad} />;
}

export default page;
