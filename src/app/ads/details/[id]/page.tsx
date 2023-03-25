import { Metadata } from 'next';

import ProductDetails from '$/components/ProductDetails';
import { getSingleAd } from '$/utils/getters/getSingleAd';
import { pb } from '$/utils/pocketbase';
import sanitizer from '$/utils/sanitizer';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const ad = await getSingleAd(params.id);

  return {
    title: ad.title,
    description: sanitizer(ad.description).substring(0, 150),
    openGraph: {
      images: [
        {
          url: pb.getFileUrl(ad, ad.images?.[0] ?? ''),
        },
      ],
    },
  };
}

export const revalidate = 600;

async function page({ params }: { params: { id: string } }) {
  const ad = await getSingleAd(params.id);

  return <ProductDetails {...ad} />;
}

export default page;
