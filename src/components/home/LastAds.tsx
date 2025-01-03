'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import Autoplay from 'embla-carousel-autoplay';

import { ListingsResponse, ListingsTypeOptions, UsersResponse } from '$/utils/pocketbase/pocketbase-types';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '$/components/ui/carousel';
import { usePocketbase } from '$/app/pocketbase-provider';

import ProductCard from '../product/ProductCard';
import { Skeleton } from '../ui/skeleton';

function LastAds({ limit = 4, type }: { limit?: number; type?: ListingsTypeOptions }) {
  const { pb } = usePocketbase();

  const { data, isLoading } = useQuery({
    queryKey: ['lastAds', limit, type],
    queryFn: async () =>
      pb.collection('listings').getList<ListingsResponse<string[], { user: UsersResponse }>>(1, limit, {
        sort: '-created',
        expand: 'user',
        filter: type ? `type = "${type}"` : '',
      }),
  });

  const plugin = useMemo(() => Autoplay({ delay: 4000, stopOnInteraction: true }), []);

  return (
    <section aria-labelledby="trending-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h2 id="trending-heading" className="font-brand text-2xl font-bold tracking-tight text-foreground">
            Dernières annonces
          </h2>
          <Link href="/annonces" className="hidden text-sm font-semibold text-primary hover:text-primary/90 sm:block">
            Tout voir
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>

        <div className="relative mt-8">
          {!isLoading ? (
            <Carousel
              opts={{
                align: 'start',
                loop: true,
              }}
              plugins={[plugin]}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {data?.items.map((ad) => (
                  <CarouselItem key={ad.id} className="pl-2 md:basis-1/2 md:pl-4 lg:basis-1/4">
                    <ProductCard {...ad} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </Carousel>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: limit }).map((_, index) => (
                <Skeleton key={index} className="h-64" />
              ))}
            </div>
          )}
        </div>

        <div className="mt-12 px-4 sm:hidden">
          <Link href="/annonces" className="text-sm font-semibold text-primary hover:text-primary/90">
            Tout voir
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default LastAds;
