import { cache } from 'react';
import { type Metadata } from 'next';
import dynamic from 'next/dynamic';

import type { ListingsResponse, UsersResponse } from '$/utils/pocketbase/pocketbase-types';
import { createStaticClient } from '$/utils/pocketbase/static';
import sanitizer from '$/utils/sanitizer';
import ProductDetails from '$/components/details/ProductDetails';
import BreadcrumbJsonLd from '$/components/structured-data/BreadcrumbJsonLd';
import ListingJsonLd from '$/components/structured-data/ListingJsonLd';

const SeenTracker = dynamic(() => import('$/components/details/SeenTracker'), { ssr: false });

const getListing = cache(async (id: string) => {
  const pb = await createStaticClient();
  return pb.collection('listings').getOne<ListingsResponse<string[], { user: UsersResponse }>>(id, {
    expand: 'user',
  });
});

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const ad = await getListing(params.id);
  const titleAndDesc = {
    title: ad.title,
    description: sanitizer(ad.description).substring(0, 150),
  };

  return {
    ...titleAndDesc,
    openGraph: { images: ad.images ? [{ url: ad.images[0] }] : [] },
    twitter: { ...titleAndDesc, card: 'summary_large_image', images: ad.images ? [ad.images[0]] : [] },
  };
}

async function page({ params }: { params: { id: string } }) {
  const ad = await getListing(params.id);

  return (
    <>
      <ListingJsonLd listing={ad} />
      <BreadcrumbJsonLd type={ad.type} title={ad.title} />
      <SeenTracker id={params.id} />
      <ProductDetails {...ad} />
    </>
  );
}

export default page;
