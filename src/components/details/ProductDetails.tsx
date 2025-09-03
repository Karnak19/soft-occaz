import { formatDistance } from 'date-fns';
import { fr } from 'date-fns/locale';

import Badge from '$/components/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '$/components/ui/card';
import { Separator } from '$/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '$/components/ui/tooltip';
import { cn } from '$/utils/cn';
import {
  ListingsFeesOptions,
  ListingsResponse,
  ReportsResponse,
  UsersPaymentOptions,
  UsersResponse,
} from '$/utils/pocketbase/pocketbase-types';
import { AlertCircleIcon, CheckCircle2Icon, ClockIcon, EuroIcon, HelpCircleIcon, InfoIcon, XCircleIcon } from 'lucide-react';

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
    <>
      {/* Seller Header */}
      {ad.expand?.user && (
        <div>
          <SellerHeader user={ad.expand.user} />
        </div>
      )}

      {/* Main Content Container */}
      <div className="relative px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Reports Alert */}
          {reportsCount > 0 && (
            <div className="mb-8">
              <Alert variant={reportsCount > 2 ? 'destructive' : 'warning'} className="border-l-4">
                <AlertCircleIcon className="size-4" />
                <AlertTitle>Attention</AlertTitle>
                <AlertDescription>Cette annonce a été signalée {reportsCount} fois.</AlertDescription>
              </Alert>
            </div>
          )}

          {/* Hero Grid */}
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Left Column - Image Gallery */}
            <div className="lg:col-span-7">
              <ProductImageGallery images={ad.images ?? []} />
            </div>

            {/* Right Column - Product Info */}
            <div className="lg:col-span-5">
              <div className="space-y-8">
                {/* Header Section */}
                <div className="space-y-6">
                  {/* Badge and Actions */}
                  <div className="flex items-start justify-between">
                    <div>
                      <Badge variant={ad.type} className="shadow-sm" />
                    </div>
                    <div className="flex items-center gap-3">
                      <FavoriteButton id={ad.id} />
                      <ShareButton title={ad.title} />
                    </div>
                  </div>

                  {/* Title */}
                  <h1 className="text-3xl font-bold leading-tight tracking-tight text-foreground lg:text-4xl">{ad.title}</h1>

                  {/* Publication Date */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <ClockIcon className="size-4" />
                    <span>Publié {createdRelative}</span>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Pricing Section */}
                <div>
                  <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 shadow-lg">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        {/* Main Price */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <EuroIcon className="size-8 text-primary" />
                            <div>
                              <p className="text-4xl font-bold text-primary lg:text-5xl">{ad.price}</p>
                              <p className="text-sm text-muted-foreground">Prix de vente</p>
                            </div>
                          </div>
                          {ad.sold_to && (
                            <span className="rounded-full bg-destructive px-4 py-2 text-sm font-semibold text-destructive-foreground shadow-sm">
                              VENDU
                            </span>
                          )}
                        </div>

                        {/* PayPal Fees */}
                        {shouldShowPaypalFees && (
                          <div className="space-y-3 rounded-lg border border-amber-200 bg-amber-50/50 p-4 dark:border-amber-800 dark:bg-amber-900/20">
                            <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300">
                              <InfoIcon className="size-4" />
                              <span className="text-sm font-medium">Frais PayPal estimés: +{paypalFee.toFixed(2)} €</span>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <button className="inline-flex">
                                      <HelpCircleIcon className="size-4 text-muted-foreground hover:text-foreground transition-colors" />
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

                            <div className="flex items-center justify-between rounded-md bg-amber-100 p-3 dark:bg-amber-900/30">
                              <span className="font-medium text-amber-900 dark:text-amber-200">Total estimé</span>
                              <span className="text-lg font-bold text-amber-900 dark:text-amber-100">
                                {totalWithPaypalFee.toFixed(2)} €
                              </span>
                            </div>

                            {shouldShowShippingWarning && (
                              <div className="flex items-start gap-2 rounded-md bg-amber-100 p-3 text-xs text-amber-800 dark:bg-amber-900/40 dark:text-amber-200">
                                <AlertCircleIcon className="mt-0.5 size-3 shrink-0" />
                                <p>
                                  Les frais de port ne sont pas inclus. Les frais PayPal réels seront calculés sur le montant
                                  total incluant les frais de port.
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Fees Information */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-muted-foreground">Frais inclus/exclus</h3>
                  <div className="flex flex-wrap gap-2">
                    {includedFees.map((fee) => (
                      <div
                        key={fee}
                        className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1.5 text-sm font-medium text-green-800 shadow-sm dark:bg-green-900/30 dark:text-green-300"
                      >
                        <CheckCircle2Icon className="size-4" />
                        {getFeeLabel(fee)}
                      </div>
                    ))}
                    {notIncludedFees.map((fee) => (
                      <div
                        key={fee}
                        className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-600 shadow-sm dark:bg-gray-800 dark:text-gray-400"
                      >
                        <XCircleIcon className="size-4" />
                        {getFeeLabel(fee).replace('inclus', 'non inclus')}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <Card className="border-0 bg-card/50 shadow-lg backdrop-blur-sm">
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <div className="size-2 rounded-full bg-primary"></div>
                        Description
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div
                        className="prose prose-sm prose-gray max-w-none dark:prose-invert prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-primary"
                        dangerouslySetInnerHTML={{ __html: ad.description }}
                      />
                    </CardContent>
                  </Card>
                </div>

                {/* Actions */}
                <div className="pt-4">
                  <ReportModal listingId={ad.id} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Sections */}
      <div className="space-y-12 py-12">
        {/* Latest User Listings */}
        <LatestUserListings currentListingId={ad.id} userId={ad.user} />

        {/* Similar Listings */}
        <SimilarListings currentListingId={ad.id} type={ad.type} />
      </div>
    </>
  );
}

export function FakeLoadingProductDetails() {
  return (
    <div className="pb-16 pt-6 sm:pb-24">
      <div className="mx-auto mt-8 px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-5 lg:col-start-8">
            <div className="flex h-10 w-full animate-pulse space-x-4 bg-muted"></div>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <div className="flex h-8 w-full animate-pulse space-x-4 bg-muted"></div>
            </div>
          </div>

          {/* Image gallery */}
          <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
            <h2 className="sr-only">Images</h2>

            <div className="flex flex-col gap-4">
              <div className="aspect-square w-full animate-pulse rounded bg-muted"></div>
              <div className="flex flex-row gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-24 w-1/4 animate-pulse rounded bg-muted"></div>
                ))}
              </div>
            </div>
          </div>

          <div className="my-5 flex flex-col gap-8 lg:col-span-5">
            {/* Policies */}
            <section aria-labelledby="policies-heading" className="flex flex-col gap-6">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="grid h-32 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  <dl className="animate-pulse rounded-lg border border-muted bg-muted px-6 py-3 text-center">
                    <dt>
                      <span className="mt-4 font-medium"></span>
                    </dt>
                    <dd className="mt-1 text-muted"></dd>
                  </dl>
                </div>
              ))}
            </section>
            {/* Product details */}
            <div className="flex flex-col gap-1">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className={cn('h-2 w-full animate-pulse bg-muted', {
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
