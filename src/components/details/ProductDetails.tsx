'use client';

import { useState } from 'react';
import { ChartBarIcon, FlagIcon, ShareIcon, TagIcon } from '@heroicons/react/24/outline';
import { useQuery } from '@tanstack/react-query';

import { calculateListingHistory } from '$/utils/calculate-listing-history';
import { cn } from '$/utils/cn';
import type { ListingsResponse, UsersResponse } from '$/utils/pocketbase/pocketbase-types';
import { usePocketbase } from '$/app/pocketbase-provider';

import Badge from '../Badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import UserCard from '../UserCard';
import ProductImageGallery from './ProductImageGallery';
import ReportModal from './ReportModal';
import ShareModal from './ShareModal';
import SimilarListings from './SimilarListings';

export default function ProductDetails(
  props: ListingsResponse<string[], { user: UsersResponse }> & {
    withoutPT?: boolean;
  },
) {
  const [showShareModal, setShowShareModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const { pb } = usePocketbase();

  const { data } = useQuery({
    queryKey: ['listings', props.id, 'details'],
    queryFn: () =>
      pb.collection('listings').getOne<ListingsResponse<string[], { user: UsersResponse }>>(props.id, {
        expand: 'user',
      }),
    enabled: !!props.id,
    initialData: props,
  });

  const { data: seenCount = 0 } = useQuery({
    queryKey: ['listings', props.id, 'seenCount'],
    queryFn: () => calculateListingHistory(pb, props.id),
    enabled: !!props.id,
    select: (data) => data.total,
  });

  // Fetch report count
  const { data: reportCount = 0 } = useQuery({
    queryKey: ['reports', props.id, 'count'],
    queryFn: () =>
      pb.collection('reports').getList(1, 1, {
        filter: `listing = "${props.id}"`,
      }),
    enabled: !!props.id,
    select: (data) => data.totalItems,
  });

  const handleShare = () => {
    setShowShareModal(true);
  };

  const handleReport = () => {
    setShowReportModal(true);
  };

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
            {/* Status banner for sold items */}
            {data.sold_to && (
              <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
                <div className="flex items-center justify-center">
                  <span className="text-lg font-semibold text-red-800 dark:text-red-200">
                    Cette annonce n&apos;est plus disponible
                  </span>
                </div>
              </div>
            )}

            {/* Warning banner for frequently reported items */}
            {reportCount >= 5 && (
              <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
                <div className="flex items-center justify-center">
                  <span className="text-lg font-semibold text-yellow-800 dark:text-yellow-200">
                    ⚠️ Cette annonce a été signalée plusieurs fois, soyez vigilant
                  </span>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <h1 className="text-3xl tracking-tight text-foreground">{data.title}</h1>
              <div className="flex items-center gap-2">
                <button onClick={handleShare} className="rounded-full p-2 hover:bg-muted" title="Partager l'annonce">
                  <ShareIcon className="size-6 text-muted-foreground" />
                </button>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-2">
              <h2 className="sr-only">Product information</h2>
              <p
                className={cn('font-roboto text-3xl font-bold tracking-tight text-foreground', {
                  'line-through': data.sold_to,
                })}
              >
                {data.price} €
              </p>
              {data.sold_to && (
                <div className="flex items-center">
                  <span className="rounded border-2 border-red-500 p-1 text-2xl font-bold uppercase text-red-500">Vendu</span>
                </div>
              )}
            </div>
          </div>

          {/* Image gallery */}
          <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
            <h2 className="sr-only">Images</h2>
            <ProductImageGallery images={data.images ?? []} />
          </div>

          <div className="my-5 flex flex-col gap-5 lg:col-span-5">
            {/* User card and actions */}
            {data.expand?.user && <UserCard {...data.expand.user} />}
            <div>
              <Button
                variant="outline"
                onClick={handleReport}
                className="flex w-full items-center justify-center gap-2 rounded-md border border-red-200 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20"
              >
                <FlagIcon className="size-5" />
                Signaler cette annonce
              </Button>
            </div>

            {/* Product stats */}
            <Card>
              <CardHeader>
                <CardTitle>Infos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col divide-y divide-muted">
                  <div className="flex items-center gap-2 py-3">
                    <ChartBarIcon className="size-5 text-primary" aria-hidden="true" />
                    <span className="text-sm">Vues: {seenCount}</span>
                  </div>
                  <div className="flex items-center gap-2 py-3">
                    <TagIcon className="size-5 text-primary" aria-hidden="true" />
                    <span className="text-sm">
                      Type: <Badge variant={data.type} className="ml-2 ring-1 ring-rg-900" />
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Product description */}
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent
                className="prose prose-sm prose-gray dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: data.description }}
              />
            </Card>
          </div>
        </div>

        {/* Share Modal */}
        {showShareModal && <ShareModal title={data.title} onClose={() => setShowShareModal(false)} />}

        {/* Report Modal */}
        {showReportModal && <ReportModal listingId={props.id} onClose={() => setShowReportModal(false)} />}
      </div>

      {/* Similar Listings */}
      {!props.withoutPT && <SimilarListings currentListingId={props.id} type={props.type} />}
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
