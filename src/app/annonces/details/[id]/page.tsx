import { type Metadata } from 'next';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';

import ProductDetails from '$/components/details/ProductDetails';
import { prisma } from '$/utils/db';
import { getListing } from '$/utils/cached/getListing';
import sanitizer from '$/utils/sanitizer';

const SeenTracker = dynamic(() => import('$/components/details/SeenTracker'), { ssr: false });

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  try {
    const ad = await prisma.listing.findUniqueOrThrow({
      where: { id: params.id },
      include: { user: true, rating: true },
    });

    const titleAndDesc = {
      title: ad.title,
      description: sanitizer(ad.description).substring(0, 150),
    };

    return {
      ...titleAndDesc,
      openGraph: { images: [{ url: ad.images[0] }] },
      twitter: { ...titleAndDesc, card: 'summary_large_image', images: [ad.images[0]] },
    };
  } catch (error) {
    return notFound();
  }
}

async function page({ params }: { params: { id: string } }) {
  const ad = await getListing(params.id);

  return (
    <>
      <SeenTracker />
      <ProductDetails {...ad} />
    </>
  );
}

export default page;
