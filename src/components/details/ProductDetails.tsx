'use client';

import dynamic from 'next/dynamic';
import { useQuery } from '@tanstack/react-query';
import { useUser } from '@clerk/nextjs';
import { ChartBarIcon, TagIcon } from '@heroicons/react/24/outline';

import { cn } from '$/utils/cn';
import { type ListingWithUserAndRating } from '$/utils/db';
import { useMe } from '$/hooks/useMe';

import Badge from '../Badge';
import UserCard from '../UserCard';
import ProductImageGallery from './ProductImageGallery';
import { createChatAction } from '$/app/dashboard/chats/action';

const OwnerChart = dynamic(() => import('./OwnerChart'), { ssr: false });
const ListingRating = dynamic(() => import('./ListingRating'), { ssr: true });
const RatingSlideOver = dynamic(() => import('$/app/annonces/details/[id]/RatingSlideOver'), { ssr: true });

export default function ProductDetails(
  props: ListingWithUserAndRating & {
    withoutPT?: boolean;
  },
) {
  const { data: me } = useMe();
  const { isSignedIn } = useUser();

  const { data } = useQuery({
    queryKey: ['listings', props.id, 'details'],
    queryFn: () => fetch(`/api/listings/${props.id}`).then((res) => res.json()),
    enabled: !!props.id,
    initialData: props,
  });

  const openChat = createChatAction.bind(null, {
    targetId: props.user.clerkId,
    listingTitle: props.title,
  });

  return (
    <div
      className={cn('pt-6 pb-16 sm:pb-24', {
        'pt-0': props.withoutPT,
      })}
    >
      <div
        className={cn('px-4 mx-auto mt-8 sm:px-6 lg:px-8', {
          'mt-0': props.withoutPT,
        })}
      >
        <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8 relative">
          <div className="lg:col-span-5 lg:col-start-8">
            <h1 className="text-3xl tracking-tight text-foreground">{data.title}</h1>

            <div className="mt-3 flex items-center gap-2">
              <h2 className="sr-only">Product information</h2>
              <p
                className={cn('text-3xl font-bold tracking-tight text-foreground font-roboto', {
                  'line-through': data.sold,
                })}
              >
                {data.price} €
              </p>
              {data.sold && (
                <div className="flex items-center">
                  <span className="font-bold uppercase text-2xl text-red-500 rounded border-red-500 border-2 p-1">Vendu</span>
                </div>
              )}
            </div>
          </div>

          {/* Image gallery */}
          <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
            <h2 className="sr-only">Images</h2>

            <ProductImageGallery images={data.images} />
          </div>

          <div className="flex flex-col my-5 lg:col-span-5">
            <UserCard {...data.user} listingTitle={data.title} action={openChat} />

            <div className="flex flex-col my-4">
              <div className="flex gap-2 items-center border-rg-500 dark:border-muted font-title border-y py-4">
                <ChartBarIcon className="h-5 w-5 text-rg-500 dark:text-primary " aria-hidden="true" />
                <span>vues: {data.seenCount}</span>
              </div>
              {me?.id === data.user.id && <OwnerChart />}

              <div className="flex gap-2 items-center border-rg-500 dark:border-muted font-title border-b py-4">
                <TagIcon className="h-5 w-5 text-rg-500 dark:text-primary " aria-hidden="true" />
                <span>
                  type: <Badge variant={data.type} className="ring-1 ring-rg-900 ml-2" />
                </span>
              </div>
              <div
                className={cn('flex flex-col gap-2 border-rg-500 dark:border-muted font-title border-b py-4', {
                  'border-b-0 py-0': !isSignedIn,
                })}
              >
                {/* {me?.id !== data.userId && !props.rating ? (
                  isSignedIn ? (
                    <RatingSlideOver ownerId={data.userId} />
                  ) : null
                ) : (
                  <>
                    <span>note de l&apos;acheteur: </span>
                    <ListingRating {...data.rating} />
                  </>
                )} */}
              </div>
            </div>

            {/* Product details */}
            <div className="prose-sm dark:prose-invert prose prose-gray" dangerouslySetInnerHTML={{ __html: data.description }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function FakeLoadingProductDetails() {
  return (
    <div className="pt-6 pb-16 sm:pb-24">
      <div className="px-4 mx-auto mt-8 sm:px-6 lg:px-8">
        <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-5 lg:col-start-8">
            <div className="flex w-full h-10 space-x-4 bg-rg-700 animate-pulse"></div>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <div className="flex w-full h-8 space-x-4 bg-rg-700 animate-pulse"></div>
            </div>
          </div>

          {/* Image gallery */}
          <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
            <h2 className="sr-only">Images</h2>

            <div className="flex flex-col gap-4">
              <div className="w-full rounded aspect-square bg-rg-700 animate-pulse"></div>
              <div className="flex flex-row gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-1/4 h-24 rounded bg-rg-500 animate-pulse"></div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8 my-5 lg:col-span-5">
            {/* Policies */}
            <section aria-labelledby="policies-heading" className="flex flex-col gap-6">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="grid h-32 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  <dl className="px-6 py-3 text-center border rounded-lg border-rg-700 bg-rg-500 animate-pulse">
                    <dt>
                      <span className="mt-4 font-medium"></span>
                    </dt>
                    <dd className="mt-1 text-rg-900"></dd>
                  </dl>
                </div>
              ))}
            </section>
            {/* Product details */}
            <div className="flex flex-col gap-1">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className={cn('w-full h-2 bg-rg-900 animate-pulse', {
                    'h-10': i % Math.floor(Math.random() * 10) === 0,
                  })}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
