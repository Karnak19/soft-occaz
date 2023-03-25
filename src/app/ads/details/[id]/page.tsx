import { Metadata } from 'next';
import { cache } from 'react';

import ProductDetails from '$/components/ProductDetails';
import { pb } from '$/utils/pocketbase';
import { AdsResponse, Collections } from '$/utils/pocketbase-types';
import sanitizer from '$/utils/sanitizer';

// we cache the data to avoid fetching it twice
// because Pocketbase will cancel the previous request
// https://github.com/pocketbase/js-sdk#auto-cancellation
const getData = cache(async (id: string) => {
  return pb.collection(Collections.Ads).getOne<AdsResponse>(id);
});

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const ad = await getData(params.id);

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
  const ad = await getData(params.id);

  return <ProductDetails {...ad} />;
}

export default page;
