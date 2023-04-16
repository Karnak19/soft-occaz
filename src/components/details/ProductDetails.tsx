'use client';
import {
  Battery0Icon,
  BoltIcon,
  CpuChipIcon,
  FireIcon,
  FunnelIcon,
  ShieldExclamationIcon,
  SwatchIcon,
  TruckIcon,
} from '@heroicons/react/24/outline';
import { useQuery } from '@tanstack/react-query';

import { cn } from '$/utils/cn';
import { AnnoncesResponse, AnnoncesTypeOptions, Collections, UsersResponse } from '$/utils/pocketbase-types';

import { variants } from '../Badge';
import BigBadge from '../BigBadge';
import { usePocket } from '../PocketContext';
import UserCard from '../UserCard';
import ProductImageGallery from './ProductImageGallery';

const iconsMap: Record<AnnoncesTypeOptions, JSX.Element> = {
  [AnnoncesTypeOptions.ptw]: <Battery0Icon className={cn('mx-auto h-6 w-6', variants[AnnoncesTypeOptions.ptw])} />,
  [AnnoncesTypeOptions.aeg]: <BoltIcon className={cn('mx-auto h-6 w-6', variants[AnnoncesTypeOptions.aeg])} />,
  [AnnoncesTypeOptions.gbb]: <FunnelIcon className={cn('mx-auto h-6 w-6', variants[AnnoncesTypeOptions.gbb])} />,
  [AnnoncesTypeOptions.gbbr]: <FireIcon className={cn('mx-auto h-6 w-6', variants[AnnoncesTypeOptions.gbbr])} />,
  [AnnoncesTypeOptions.hpa]: <CpuChipIcon className={cn('mx-auto h-6 w-6', variants[AnnoncesTypeOptions.hpa])} />,
  [AnnoncesTypeOptions.gear]: <ShieldExclamationIcon className={cn('mx-auto h-6 w-6', variants[AnnoncesTypeOptions.gear])} />,
  [AnnoncesTypeOptions.autres]: <SwatchIcon className={cn('mx-auto h-6 w-6', variants[AnnoncesTypeOptions.autres])} />,
};

export default function ProductDetails(props: AnnoncesResponse) {
  const { pb, user } = usePocket();
  const { data } = useQuery({
    queryKey: ['annonce', props.id],
    queryFn: () =>
      pb.collection(Collections.Annonces).getOne<AnnoncesResponse<{ user: UsersResponse }>>(props.id, {
        expand: 'user',
      }),
    enabled: !!user,
  });

  return (
    <div className="pb-16 pt-6 sm:pb-24">
      <div className="mx-auto mt-8 px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-5 lg:col-start-8">
            <h1 className="text-3xl tracking-tight text-gray-900">{props.title}</h1>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="font-roboto text-3xl font-bold tracking-tight text-gray-900">{props.price} €</p>
            </div>
          </div>

          {/* Image gallery */}
          <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
            <h2 className="sr-only">Images</h2>

            <ProductImageGallery ad={props} />
          </div>

          <div className="my-5 flex flex-col gap-8 lg:col-span-5">
            <UserCard user={data?.expand?.user} />
            {/* Policies */}
            <section aria-labelledby="policies-heading">
              <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {props.envoi ? (
                  <BigBadge
                    variant={AnnoncesTypeOptions.aeg}
                    className="bg-green-200 text-green-800"
                    title="Envoi"
                    description="Ce vendeur propose un envoi"
                    icon={<TruckIcon className="mx-auto h-6 w-6 text-green-800" aria-hidden="true" />}
                  />
                ) : (
                  <BigBadge
                    variant={AnnoncesTypeOptions.aeg}
                    className="bg-red-200 text-red-800"
                    title="Envoi"
                    description="Ce vendeur ne propose pas d'envoi"
                    icon={<TruckIcon className="mx-auto h-6 w-6 text-red-800" aria-hidden="true" />}
                  />
                )}

                <BigBadge variant={props.type} icon={iconsMap[props.type]} className="uppercase" title={props.type} />
              </dl>
            </section>
            {/* Product details */}
            <div className="prose prose-sm prose-zinc" dangerouslySetInnerHTML={{ __html: props.description }} />
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
            <div className="flex h-10 w-full animate-pulse space-x-4 bg-rg-dark"></div>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <div className="flex h-8 w-full animate-pulse space-x-4 bg-rg-dark"></div>
            </div>
          </div>

          {/* Image gallery */}
          <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
            <h2 className="sr-only">Images</h2>

            <div className="flex flex-col gap-4">
              <div className="aspect-square w-full animate-pulse rounded bg-rg-dark"></div>
              <div className="flex flex-row gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-24 w-1/4 animate-pulse rounded bg-rg"></div>
                ))}
              </div>
            </div>
          </div>

          <div className="my-5 flex flex-col gap-8 lg:col-span-5">
            {/* Policies */}
            <section aria-labelledby="policies-heading" className="flex flex-col gap-6">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="grid h-32 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  <dl className="animate-pulse rounded-lg border border-rg-dark bg-rg px-6 py-3 text-center">
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
                  className={cn('h-2 w-full animate-pulse bg-rg-darkest', {
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
