'use client';

import { useQuery } from '@tanstack/react-query';
import Autoplay from 'embla-carousel-autoplay';
import Link from 'next/link';
import { useMemo } from 'react';

import { usePocketbase } from '$/app/pocketbase-provider';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '$/components/ui/carousel';
import { ListingsResponse, ListingsTypeOptions, UsersResponse } from '$/utils/pocketbase/pocketbase-types';

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
        requestKey: `lastAds_${type}`,
      }),
  });

  const plugin = useMemo(() => Autoplay({ delay: 4000, stopOnInteraction: true }), []);

  // Get display name based on type
  const getTypeDisplayName = () => {
    switch (type) {
      case ListingsTypeOptions.aeg:
        return 'AEG';
      case ListingsTypeOptions.gbb:
        return 'GBB';
      case ListingsTypeOptions.gbbr:
        return 'GBBR';
      case ListingsTypeOptions.hpa:
        return 'HPA';
      case ListingsTypeOptions.sniper:
        return 'Sniper';
      case ListingsTypeOptions.gear:
        return 'Équipements';
      default:
        return '';
    }
  };

  const getCTAText = () => {
    switch (type) {
      case ListingsTypeOptions.aeg:
        return 'Voir tous les AEGs';
      case ListingsTypeOptions.gbb:
        return 'Voir tous les GBB';
      case ListingsTypeOptions.gbbr:
        return 'Voir tous les GBBR';
      case ListingsTypeOptions.hpa:
        return 'Voir tous les HPA';
      case ListingsTypeOptions.sniper:
        return 'Voir tous les Snipers';
      case ListingsTypeOptions.gear:
        return 'Voir tous les équipements';
      default:
        return '';
    }
  };

  const typeDisplayName = getTypeDisplayName();
  const ctaText = getCTAText();

  return (
    <section aria-labelledby="trending-heading" className="bg-muted/30 py-10 rounded-lg border border-border/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h2 id="trending-heading" className="font-brand text-2xl font-bold tracking-tight text-foreground">
              {typeDisplayName}
            </h2>
          </div>
          <Link
            href={type ? `/annonces/${type.toLowerCase()}` : '/annonces'}
            className="text-sm font-semibold text-primary hover:text-primary/90 flex items-center gap-1 group self-start"
          >
            {ctaText}
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
              {' '}
              &rarr;
            </span>
          </Link>
        </div>

        <div className="relative mt-4">
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
                  <CarouselItem key={ad.id} className="pl-2 basis-full md:basis-1/2 md:pl-4 lg:basis-1/2 py-1">
                    <div className="h-full">
                      <ProductCard {...ad} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0 lg:-left-8 bg-background/80 backdrop-blur-sm" />
              <CarouselNext className="right-0 lg:-right-8 bg-background/80 backdrop-blur-sm" />
            </Carousel>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {Array.from({ length: 2 }).map((_, index) => (
                <Skeleton key={index} className="h-64" />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default LastAds;
