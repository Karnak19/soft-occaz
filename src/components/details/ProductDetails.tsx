'use client';

import dynamic from 'next/dynamic';
import { ChartBarIcon, TagIcon } from '@heroicons/react/24/outline';
import { useQuery } from '@tanstack/react-query';

import { cn } from '$/utils/cn';
import { type ListingWithUserAndRating } from '$/utils/db';
import { useMe } from '$/hooks/useMe';
import { createChatAction } from '$/app/dashboard/chats/action';

import Badge from '../Badge';
import UserCard from '../UserCard';
import ProductImageGallery from './ProductImageGallery';

const OwnerChart = dynamic(() => import('./OwnerChart'), { ssr: false });

export default function ProductDetails(
  props: ListingWithUserAndRating & {
    withoutPT?: boolean;
  },
) {
  const { data: me } = useMe();

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
      className={cn('pb-16 pt-6 sm:pb-24', {
        'pt-0': props.withoutPT,
      })}
    >
      <div
        className={cn('mx-auto mt-8 px-4 sm:px-6 lg:px-8', {
          'mt-0': props.withoutPT,
        })}
      >
        <div className="relative lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-5 lg:col-start-8">
            <h1 className="text-3xl tracking-tight text-foreground">{data.title}</h1>

            <div className="mt-3 flex items-center gap-2">
              <h2 className="sr-only">Product information</h2>
              <p
                className={cn('font-roboto text-3xl font-bold tracking-tight text-foreground', {
                  'line-through': data.sold,
                })}
              >
                {data.price} €
              </p>
              {data.sold && (
                <div className="flex items-center">
                  <span className="rounded border-2 border-red-500 p-1 text-2xl font-bold uppercase text-red-500">Vendu</span>
                </div>
              )}
            </div>
          </div>

          {/* Image gallery */}
          <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
            <h2 className="sr-only">Images</h2>

            <ProductImageGallery images={data.images} />
          </div>

          <div className="my-5 flex flex-col lg:col-span-5">
            <UserCard {...data.user} listingTitle={data.title} action={openChat} />

            <div className="my-4 flex flex-col">
              <div className="flex items-center gap-2 border-y border-primary py-4 dark:border-muted">
                <ChartBarIcon className="size-5 text-primary dark:text-primary" aria-hidden="true" />
                <span>vues: {data.seenCount}</span>
              </div>
              {me?.id === data.user.id && <OwnerChart />}

              <div className="flex items-center gap-2 border-b border-primary py-4 dark:border-muted">
                <TagIcon className="size-5 text-primary dark:text-primary" aria-hidden="true" />
                <span>
                  type: <Badge variant={data.type} className="ml-2 ring-1 ring-rg-900" />
                </span>
              </div>
            </div>

            {/* Product details */}
            <div className="prose prose-sm prose-gray dark:prose-invert" dangerouslySetInnerHTML={{ __html: data.description }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function FakeLoadingProductDetails() {
  return (
    <div className="pb-16 pt-6 sm:pb-24">
      <div className="mx-auto mt-8 px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-5 lg:col-start-8">
            <div className="flex h-10 w-full animate-pulse space-x-4 bg-rg-700"></div>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <div className="flex h-8 w-full animate-pulse space-x-4 bg-rg-700"></div>
            </div>
          </div>

          {/* Image gallery */}
          <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
            <h2 className="sr-only">Images</h2>

            <div className="flex flex-col gap-4">
              <div className="aspect-square w-full animate-pulse rounded bg-rg-700"></div>
              <div className="flex flex-row gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-24 w-1/4 animate-pulse rounded bg-primary"></div>
                ))}
              </div>
            </div>
          </div>

          <div className="my-5 flex flex-col gap-8 lg:col-span-5">
            {/* Policies */}
            <section aria-labelledby="policies-heading" className="flex flex-col gap-6">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="grid h-32 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  <dl className="animate-pulse rounded-lg border border-rg-700 bg-primary px-6 py-3 text-center">
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
                  className={cn('h-2 w-full animate-pulse bg-rg-900', {
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
