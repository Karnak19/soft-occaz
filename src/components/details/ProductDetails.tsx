import {
  Battery0Icon,
  BoltIcon,
  ChartBarIcon,
  CpuChipIcon,
  FireIcon,
  FunnelIcon,
  ShieldExclamationIcon,
  SwatchIcon,
  TruckIcon,
} from '@heroicons/react/24/outline';
import { Prisma, Type } from '@prisma/client';

import { cn } from '$/utils/cn';

import { variants } from '../Badge';
import BigBadge from '../BigBadge';
import UserCard from '../UserCard';
import ProductImageGallery from './ProductImageGallery';

const iconsMap: Record<Type, JSX.Element> = {
  [Type.PTW]: <Battery0Icon className={cn('h-6 w-6 mx-auto', variants[Type.PTW])} />,
  [Type.AEG]: <BoltIcon className={cn('h-6 w-6 mx-auto', variants[Type.AEG])} />,
  [Type.AEP]: <BoltIcon className={cn('h-6 w-6 mx-auto', variants[Type.AEP])} />,
  [Type.GBB]: <FunnelIcon className={cn('h-6 w-6 mx-auto', variants[Type.GBB])} />,
  [Type.GBBR]: <FireIcon className={cn('h-6 w-6 mx-auto', variants[Type.GBBR])} />,
  [Type.HPA]: <CpuChipIcon className={cn('h-6 w-6 mx-auto', variants[Type.HPA])} />,
  [Type.GEAR]: <ShieldExclamationIcon className={cn('h-6 w-6 mx-auto', variants[Type.GEAR])} />,
  [Type.Sniper]: <TruckIcon className={cn('h-6 w-6 mx-auto', variants[Type.Sniper])} />,
  [Type.Other]: <SwatchIcon className={cn('h-6 w-6 mx-auto', variants[Type.Other])} />,
};

export default function ProductDetails(
  props: Prisma.ListingGetPayload<{
    include: { user: true };
  }>,
) {
  return (
    <div className="pt-6 pb-16 sm:pb-24">
      <div className="px-4 mx-auto mt-8 sm:px-6 lg:px-8">
        <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-5 lg:col-start-8">
            <h1 className="text-3xl tracking-tight text-gray-900">{props.title}</h1>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl font-bold tracking-tight text-gray-900 font-roboto">{props.price} €</p>
            </div>
          </div>

          {/* Image gallery */}
          <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
            <h2 className="sr-only">Images</h2>

            <ProductImageGallery images={props.images} />
          </div>

          <div className="flex flex-col my-5 lg:col-span-5">
            <UserCard {...props.user} />

            <div className="flex gap-2 items-center border-rg font-title border-t py-4">
              <ChartBarIcon className="h-5 w-5 text-rg" aria-hidden="true" />
              <span>vues: {props.seenCount}</span>
            </div>

            {/* Policies */}
            <section aria-labelledby="policies-heading">
              <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
                {props.delivery ? (
                  <BigBadge
                    variant={Type.AEG}
                    className="text-green-800 bg-green-200"
                    title="Envoi"
                    description="Ce vendeur propose un envoi"
                    icon={<TruckIcon className="w-6 h-6 mx-auto text-green-800" aria-hidden="true" />}
                  />
                ) : (
                  <BigBadge
                    variant={Type.AEG}
                    className="text-red-800 bg-red-200"
                    title="Envoi"
                    description="Ce vendeur ne propose pas d'envoi"
                    icon={<TruckIcon className="w-6 h-6 mx-auto text-red-800" aria-hidden="true" />}
                  />
                )}

                <BigBadge variant={props.type} icon={iconsMap[props.type]} className="uppercase" title={props.type} />
              </dl>
            </section>
            {/* Product details */}
            <div className="prose-sm prose prose-zinc" dangerouslySetInnerHTML={{ __html: props.description }} />
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
            <div className="flex w-full h-10 space-x-4 bg-rg-dark animate-pulse"></div>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <div className="flex w-full h-8 space-x-4 bg-rg-dark animate-pulse"></div>
            </div>
          </div>

          {/* Image gallery */}
          <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
            <h2 className="sr-only">Images</h2>

            <div className="flex flex-col gap-4">
              <div className="w-full rounded aspect-square bg-rg-dark animate-pulse"></div>
              <div className="flex flex-row gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-1/4 h-24 rounded bg-rg animate-pulse"></div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8 my-5 lg:col-span-5">
            {/* Policies */}
            <section aria-labelledby="policies-heading" className="flex flex-col gap-6">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="grid h-32 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  <dl className="px-6 py-3 text-center border rounded-lg border-rg-dark bg-rg animate-pulse">
                    <dt>
                      <span className="mt-4 font-medium"></span>
                    </dt>
                    <dd className="mt-1 text-rg-darkest"></dd>
                  </dl>
                </div>
              ))}
            </section>
            {/* Product details */}
            <div className="flex flex-col gap-1">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className={cn('w-full h-2 bg-rg-darkest animate-pulse', {
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
