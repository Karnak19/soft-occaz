import { notFound } from 'next/navigation';

import ProductCard from '$/components/product/ProductCard';
import { prisma } from '$/utils/db';
import { isHighlighted } from '$/utils/isHighlighted';

import Aside from './Aside';
import Reviews from './Reviews';

export async function generateMetadata({ params }: { params: { userId: string } }) {
  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: { id: params.userId },
    });

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

export default async function Profile({ params }: { params: { userId: string } }) {
  const { Listing, ...user } = await prisma.user
    .findUniqueOrThrow({
      where: { id: params.userId },
      include: {
        Listing: { orderBy: { createdAt: 'desc' } },
      },
    })
    .catch(() => {
      return notFound();
    });

  return (
    <>
      <div className="flex h-full">
        {/* Content area */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Main content */}
          <div className="flex flex-1 items-stretch overflow-hidden">
            <main className="flex-1 overflow-y-auto">
              <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
                {/* Gallery */}
                <section className="mt-8 pb-16" aria-labelledby="gallery-heading">
                  <ul className="grid grid-cols-[repeat(auto-fill,minmax(theme(width.64),1fr))] gap-x-4 gap-y-8 xl:gap-x-5">
                    {Listing.map((ad) => (
                      <ProductCard
                        key={ad.id}
                        {...{ href: `/annonces/details/${ad.id}`, ...ad, isHighlighted: isHighlighted(user.sub) }}
                      />
                    ))}
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
