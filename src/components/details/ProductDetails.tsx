import { formatDistance } from 'date-fns';
import { fr } from 'date-fns/locale';

import Badge from '$/components/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '$/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '$/components/ui/tooltip';
import { cn } from '$/utils/cn';
import {
  ListingsFeesOptions,
  ListingsResponse,
  ReportsResponse,
  UsersPaymentOptions,
  UsersResponse,
} from '$/utils/pocketbase/pocketbase-types';
import { AlertCircleIcon, CheckCircle2Icon, HelpCircleIcon, InfoIcon, XCircleIcon } from 'lucide-react';

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
  extends ListingsResponse<string[], { user: UsersResponse; reports_via_listing: ReportsResponse[] }> {}

export default function ProductDetails(ad: ProductDetailsProps) {
  const createdRelative = formatDistance(new Date(ad.created), new Date(), { addSuffix: true, locale: fr });

  const reportsCount = ad.expand?.reports_via_listing?.length ?? 0;

  // Get fee labels for display
  const getFeeLabel = (fee: ListingsFeesOptions) => {
    switch (fee) {
      case ListingsFeesOptions.paypal_in:
        return 'Frais PayPal inclus';
      case ListingsFeesOptions.shipping_in:
        return 'Frais de port inclus';
      default:
        return '';
    }
  };

  // Check which fees are included and which are not
  const includedFees = ad.fees || [];
  const notIncludedFees = Object.values(ListingsFeesOptions).filter((fee) => !includedFees.includes(fee));

  // Calculate PayPal fees if applicable
  const hasPaypalPayment = ad.expand?.user?.payment === UsersPaymentOptions.paypal;
  const includesPaypalFees = includedFees.includes(ListingsFeesOptions.paypal_in);
  const includesShippingFees = includedFees.includes(ListingsFeesOptions.shipping_in);
  const shouldShowPaypalFees = hasPaypalPayment && !includesPaypalFees;
  const shouldShowShippingWarning = shouldShowPaypalFees && !includesShippingFees;

  // PayPal fee calculation (2.9% + 0.35€)
  const calculatePaypalFee = (price: number) => {
    return price * 0.029 + 0.35;
  };

  const paypalFee = shouldShowPaypalFees ? calculatePaypalFee(ad.price) : 0;
  const totalWithPaypalFee = shouldShowPaypalFees ? ad.price + paypalFee : ad.price;

  return (
    <div className="pt-16">
      {/* Seller Header */}
      {ad.expand?.user && <SellerHeader user={ad.expand.user} />}

      {/* Hero Section */}
      <div className="relative py-4">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
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
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-4">
                    <p className="text-5xl font-bold tracking-tight text-primary">{ad.price} €</p>
                    {ad.sold_to && (
                      <span className="rounded-full bg-red-100 px-4 py-1 text-sm font-semibold text-red-800">Vendu</span>
                    )}
                  </div>

                  {shouldShowPaypalFees && (
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-500">
                        <InfoIcon className="size-4" />
                        <span>Frais PayPal estimés: +{paypalFee.toFixed(2)} €</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button className="inline-flex">
                                <HelpCircleIcon className="size-4 text-muted-foreground hover:text-foreground" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-sm">
                              <p>Les frais PayPal sont calculés selon la formule suivante :</p>
                              <p className="mt-1 font-medium">2,9% du montant + 0,35€</p>
                              <p className="mt-1 text-xs text-muted-foreground">
                                Pour {ad.price}€ : {(ad.price * 0.029).toFixed(2)}€ + 0,35€ = {paypalFee.toFixed(2)}€
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <div className="text-sm font-medium text-amber-700 dark:text-amber-400">
                        Total estimé: {totalWithPaypalFee.toFixed(2)} €
                      </div>

                      {shouldShowShippingWarning && (
                        <div className="mt-2 flex items-start gap-2 rounded-md bg-amber-50 p-2 text-xs text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                          <AlertCircleIcon className="mt-0.5 size-3 shrink-0" />
                          <p>
                            Les frais de port ne sont pas inclus. Les frais PayPal réels seront calculés sur le montant total
                            incluant les frais de port.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">Publié {createdRelative}</p>
              </div>
            </div>

            {/* Fees Information */}
            <div className="mt-4">
              <div className="flex flex-wrap gap-2">
                {includedFees.map((fee) => (
                  <div
                    key={fee}
                    className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400"
                  >
                    <CheckCircle2Icon className="size-4" />
                    {getFeeLabel(fee)}
                  </div>
                ))}
                {notIncludedFees.map((fee) => (
                  <div
                    key={fee}
                    className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 dark:bg-gray-800/50 dark:text-gray-400"
                  >
                    <XCircleIcon className="size-4" />
                    {getFeeLabel(fee).replace('inclus', 'non inclus')}
                  </div>
                ))}
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

      {/* Latest User Listings */}
      <LatestUserListings currentListingId={ad.id} userId={ad.user} />

      {/* Similar Listings */}
      <SimilarListings currentListingId={ad.id} type={ad.type} />
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
