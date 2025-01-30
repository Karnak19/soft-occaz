import { notFound } from 'next/navigation';
import { cache } from 'react';

import ProductCard from '$/components/product/ProductCard';
import { ListingsResponse, UsersResponse } from '$/utils/pocketbase/pocketbase-types';
import { createStaticClient } from '$/utils/pocketbase/static';

import SellerHeader from '$/components/details/SellerHeader';
import { EXPANDED_USER_WITH_RATINGS } from '$/utils/constants';
import Reviews from './Reviews';

const getUser = cache(async (userId: string) => {
  const pb = await createStaticClient();
  return pb
    .collection('users')
    .getOne<UsersResponse<{ listings_via_user: ListingsResponse<string[], { user: UsersResponse }>[] }>>(userId, {});
});

export default async function Profile({ params }: { params: { userId: string } }) {
  const user = await getUser(params.userId);

  const pb = await createStaticClient();

  const listings = await pb.collection('listings').getList<ListingsResponse<string[], { user: UsersResponse }>>(1, 50, {
    filter: `user = "${user.id}"`,
    sort: '-created',
    expand: EXPANDED_USER_WITH_RATINGS,
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SellerHeader user={user} />

      {/* Gallery */}
      <section className="mt-8 pb-16" aria-labelledby="gallery-heading">
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(theme(width.64),1fr))] gap-x-4 gap-y-8 xl:gap-x-5">
          {listings.items.map((ad) => (
            <ProductCard key={ad.id} {...ad} />
          ))}
        </ul>
      </section>

      <section className="mt-8 pb-16">
        <Reviews userId={params.userId} />
      </section>
    </div>
  );
}

export async function generateMetadata({ params }: { params: { userId: string } }) {
  try {
    const user = await getUser(params.userId);

    const titleAndDesc = {
      title: user.username,
      description: `Profil vendeur de ${user.username}`,
    };

    return {
      ...titleAndDesc,
      openGraph: { images: [{ url: user.avatar }] },
      twitter: { ...titleAndDesc, card: 'summary_large_image', images: [user.avatar] },
    };
  } catch (_error) {
    return notFound();
  }
}
