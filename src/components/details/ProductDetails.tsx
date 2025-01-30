import { formatDistance } from 'date-fns';
import { fr } from 'date-fns/locale';

import Badge from '$/components/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '$/components/ui/card';
import { cn } from '$/utils/cn';
import type { ListingsResponse, ReportsResponse, UsersResponse } from '$/utils/pocketbase/pocketbase-types';
import { AlertCircleIcon } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import ProductImageGallery from './ProductImageGallery';
import SellerHeader from './SellerHeader';
import ShareButton from './ShareButton';
import SimilarListings from './SimilarListings';
import { FavoriteButton } from './favorite-button';
import LatestUserListings from './latest-user-listings';
import ReportModal from './report-modal';
import '$/components/Form/core/tiptap/styles/index.css';

interface ProductDetailsProps
  extends ListingsResponse<string[], { user: UsersResponse; reports_via_listing: ReportsResponse[] }> {
  withoutPT?: boolean;
}

export default function ProductDetails({ withoutPT = false, ...ad }: ProductDetailsProps) {
  const createdRelative = formatDistance(new Date(ad.created), new Date(), { addSuffix: true, locale: fr });

  const reportsCount = ad.expand?.reports_via_listing?.length ?? 0;

  return (
    <div className={cn({ 'pt-16': !withoutPT })}>
      {/* Seller Header */}
      {ad.expand?.user && <SellerHeader user={ad.expand.user} />}

      {/* Hero Section */}
      <div className="relative py-4">
        <div className="lg:grid lg:grid-cols-2 lg:gap-4">
          {reportsCount > 0 && (
            <div className="col-span-full">
              <Alert variant={reportsCount > 2 ? 'destructive' : 'warning'}>
                <AlertCircleIcon className="size-4" />
                <AlertTitle>Attention</AlertTitle>
                <AlertDescription>Cette annonce a été signalée {reportsCount} fois.</AlertDescription>
              </Alert>
            </div>
          )}
          {/* Left Column - Image Gallery */}
          <div className="relative lg:col-span-1">
            <ProductImageGallery images={ad.images ?? []} />
          </div>

          {/* Right Column - Product Info */}
          <div className="mt-10 sm:mt-16 sm:px-0 lg:mt-0">
            <div className="flex items-center justify-between">
              <Badge variant={ad.type} className="mb-4" />
              <div className="flex items-center gap-2">
                <FavoriteButton id={ad.id} />
                <ShareButton title={ad.title} />
              </div>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-foreground">{ad.title}</h1>

            <div className="mt-6">
              <h2 className="sr-only">Product information</h2>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <p className="text-5xl font-bold tracking-tight text-primary">{ad.price} €</p>
                  {ad.sold_to && (
                    <span className="rounded-full bg-red-100 px-4 py-1 text-sm font-semibold text-red-800">Vendu</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">Publié {createdRelative}</p>
              </div>
            </div>

            {/* Description */}
            <div className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Description</CardTitle>
                </CardHeader>
                <CardContent
                  className="prose prose-sm prose-gray dark:prose-invert p-2 md:p-6"
                  dangerouslySetInnerHTML={{ __html: ad.description }}
                />
              </Card>
            </div>

            {/* Actions */}
            <div className="mt-8 space-y-4">
              <ReportModal listingId={ad.id} />
            </div>
          </div>
        </div>
      </div>

      {/* Similar Listings */}
      {!withoutPT && <LatestUserListings currentListingId={ad.id} userId={ad.user} />}

      {/* Similar Listings */}
      {!withoutPT && <SimilarListings currentListingId={ad.id} type={ad.type} />}
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
