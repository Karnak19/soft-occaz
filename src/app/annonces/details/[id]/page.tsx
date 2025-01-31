import { type Metadata } from 'next';
import nextdynamic from 'next/dynamic';

import ProductDetails from '$/components/details/ProductDetails';
import BreadcrumbJsonLd from '$/components/structured-data/BreadcrumbJsonLd';
import ListingJsonLd from '$/components/structured-data/ListingJsonLd';
import type { ListingsResponse, ReportsResponse, UsersResponse } from '$/utils/pocketbase/pocketbase-types';
import { createStaticClient } from '$/utils/pocketbase/static';
import sanitizer from '$/utils/sanitizer';

const SeenTracker = nextdynamic(() => import('$/components/details/SeenTracker'));

type GetListing = ListingsResponse<string[], { user: UsersResponse; reports_via_listing: ReportsResponse[] }>;

async function getListing(id: string) {
  const pb = await createStaticClient();
  return pb.collection('listings').getOne<GetListing>(id, {
    expand: 'user,reports_via_listing',
  });
}

export const dynamic = 'force-static';
export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const ad = await getListing(params.id);

  return (
    <>
      <ListingJsonLd listing={ad} />
      <BreadcrumbJsonLd type={ad.type} title={ad.title} />
      <SeenTracker id={params.id} />

      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <ProductDetails {...ad} />
        </div>
      </div>
    </>
  );
}

export async function generateMetadata(props: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const params = await props.params;
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
