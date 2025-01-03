import { cache } from 'react';
import { notFound } from 'next/navigation';

import { ListingsResponse, UsersResponse } from '$/utils/pocketbase/pocketbase-types';
import { createStaticClient } from '$/utils/pocketbase/static';
import ProductCard from '$/components/product/ProductCard';

import Aside from './Aside';
import Reviews from './Reviews';

const getUser = cache(async (userId: string) => {
  const pb = await createStaticClient();
  return pb
    .collection('users')
    .getOne<UsersResponse<{ listings_via_user: ListingsResponse<string[], { user: UsersResponse }>[] }>>(userId, {
      expand: 'listings_via_user.user',
    });
});

export default async function Profile({ params }: { params: { userId: string } }) {
  const user = await getUser(params.userId);

  return (
    <>
      <div className="flex h-full">
        {/* Content area */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Main content */}
          <div className="flex flex-col-reverse lg:flex-1 lg:flex-row lg:items-stretch lg:overflow-hidden">
            <main className="lg:flex-1 lg:overflow-y-auto">
              <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
                {/* Gallery */}
                <section className="mt-8 pb-16" aria-labelledby="gallery-heading">
                  <ul className="grid grid-cols-[repeat(auto-fill,minmax(theme(width.64),1fr))] gap-x-4 gap-y-8 xl:gap-x-5">
                    {user.expand?.listings_via_user?.map((ad) => <ProductCard key={ad.id} {...ad} />)}
                  </ul>
                </section>

                <section className="mt-8 pb-16">
                  <Reviews userId={params.userId} />
                </section>
              </div>
            </main>

            {/* Details sidebar */}
            <Aside user={user} />
          </div>
        </div>
      </div>
    </>
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
  } catch (error) {
    return notFound();
  }
}
