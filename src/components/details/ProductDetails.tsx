'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { ChartBarIcon, FlagIcon, HeartIcon, ShareIcon, TagIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { useQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';

import { cn } from '$/utils/cn';
import { type ListingWithUserAndRating } from '$/utils/db';
import { useMe } from '$/hooks/useMe';
import { createChatAction } from '$/app/dashboard/chats/action';

import Badge from '../Badge';
import UserCard from '../UserCard';
import ProductImageGallery from './ProductImageGallery';
import ReportModal from './ReportModal';
import ShareModal from './ShareModal';
import SimilarListings from './SimilarListings';

const OwnerChart = dynamic(() => import('./OwnerChart'), { ssr: false });

export default function ProductDetails(
  props: ListingWithUserAndRating & {
    withoutPT?: boolean;
  },
) {
  const { data: me } = useMe();
  const [isFavorite, setIsFavorite] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  const { data, refetch } = useQuery({
    queryKey: ['listings', props.id, 'details'],
    queryFn: () => fetch(`/api/listings/${props.id}`).then((res) => res.json()),
    enabled: !!props.id,
    initialData: props,
  });

  // Check if the listing is in user's favorites
  useQuery({
    queryKey: ['favorites', props.id],
    queryFn: async () => {
      const res = await fetch(`/api/favorites?listingId=${props.id}`);
      const data = await res.json();
      setIsFavorite(data.isFavorite);
      return data;
    },
    enabled: !!me?.id && !!props.id,
  });

  const openChat = createChatAction.bind(null, {
    targetId: props.user.clerkId,
    listingTitle: props.title,
  });

  const handleShare = () => {
    setShowShareModal(true);
  };

  const handleReport = () => {
    setShowReportModal(true);
  };

  const toggleFavorite = async () => {
    if (!me?.id) {
      // TODO: Show login modal
      return;
    }

    try {
      const res = await fetch('/api/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ listingId: props.id }),
      });
      const data = await res.json();
      setIsFavorite(data.isFavorite);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
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
            {data.sold && (
              <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
                <div className="flex items-center justify-center">
                  <span className="text-lg font-semibold text-red-800 dark:text-red-200">
                    Cette annonce n&apos;est plus disponible
                  </span>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <h1 className="text-3xl tracking-tight text-foreground">{data.title}</h1>
              <div className="flex items-center gap-2">
                <motion.button
                  onClick={toggleFavorite}
                  className="rounded-full p-2 hover:bg-muted"
                  title={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <AnimatePresence mode="wait">
                    {isFavorite ? (
                      <motion.div key="filled" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                        <HeartIconSolid className="size-6 text-red-500" />
                      </motion.div>
                    ) : (
                      <motion.div key="outline" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                        <HeartIcon className="size-6 text-muted-foreground" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
                <button onClick={handleShare} className="rounded-full p-2 hover:bg-muted" title="Partager l'annonce">
                  <ShareIcon className="size-6 text-muted-foreground" />
                </button>
              </div>
            </div>

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
            {/* User card and actions */}
            <div className="mb-6">
              <UserCard {...data.user} listingTitle={data.title} action={openChat} />
              <button
                onClick={handleReport}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-md border border-red-200 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20"
              >
                <FlagIcon className="size-5" />
                Signaler cette annonce
              </button>
            </div>

            {/* Product stats */}
            <div className="rounded-lg border border-muted bg-card p-4">
              <div className="flex flex-col divide-y divide-muted">
                <div className="flex items-center gap-2 py-3">
                  <ChartBarIcon className="size-5 text-primary" aria-hidden="true" />
                  <span className="text-sm">Vues: {data.seenCount}</span>
                </div>
                {me?.id === data.user.id && (
                  <div className="py-3">
                    <OwnerChart />
                  </div>
                )}
                <div className="flex items-center gap-2 py-3">
                  <TagIcon className="size-5 text-primary" aria-hidden="true" />
                  <span className="text-sm">
                    Type: <Badge variant={data.type} className="ml-2 ring-1 ring-rg-900" />
                  </span>
                </div>
              </div>
            </div>

            {/* Product description */}
            <div className="mt-6">
              <h3 className="mb-4 text-lg font-medium">Description</h3>
              <div
                className="prose prose-sm prose-gray rounded-lg border border-muted bg-card p-4 dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: data.description }}
              />
            </div>
          </div>
        </div>

        {/* Share Modal */}
        {showShareModal && <ShareModal title={data.title} onClose={() => setShowShareModal(false)} />}

        {/* Report Modal */}
        {showReportModal && <ReportModal onClose={() => setShowReportModal(false)} />}
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
