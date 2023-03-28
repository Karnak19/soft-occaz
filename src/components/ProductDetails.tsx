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

import { variants } from './Badge';
import BigBadge from './BigBadge';
import { usePocket } from './PocketContext';
import ProductImageGallery from './ProductImageGallery';
import UserCard from './UserCard';

const iconsMap: Record<AnnoncesTypeOptions, JSX.Element> = {
  [AnnoncesTypeOptions.ptw]: <Battery0Icon className={cn('h-6 w-6 mx-auto', variants[AnnoncesTypeOptions.ptw])} />,
  [AnnoncesTypeOptions.aeg]: <BoltIcon className={cn('h-6 w-6 mx-auto', variants[AnnoncesTypeOptions.aeg])} />,
  [AnnoncesTypeOptions.gbb]: <FunnelIcon className={cn('h-6 w-6 mx-auto', variants[AnnoncesTypeOptions.gbb])} />,
  [AnnoncesTypeOptions.gbbr]: <FireIcon className={cn('h-6 w-6 mx-auto', variants[AnnoncesTypeOptions.gbbr])} />,
  [AnnoncesTypeOptions.hpa]: <CpuChipIcon className={cn('h-6 w-6 mx-auto', variants[AnnoncesTypeOptions.hpa])} />,
  [AnnoncesTypeOptions.gear]: <ShieldExclamationIcon className={cn('h-6 w-6 mx-auto', variants[AnnoncesTypeOptions.gear])} />,
  [AnnoncesTypeOptions.autres]: <SwatchIcon className={cn('h-6 w-6 mx-auto', variants[AnnoncesTypeOptions.autres])} />,
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
    <div className="pt-6 pb-16 sm:pb-24">
      <div className="px-4 mx-auto mt-8 sm:px-6 lg:px-8">
        <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-5 lg:col-start-8">
            <h1 className="text-3xl font-bold tracking-tight text-slate-50">{props.title}</h1>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-slate-50">{props.price} €</p>
            </div>
          </div>

          {/* Image gallery */}
          <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
            <h2 className="sr-only">Images</h2>

            <ProductImageGallery ad={props} />
          </div>

          <div className="flex flex-col gap-8 my-5 lg:col-span-5">
            <UserCard user={data?.expand?.user} />
            {/* Policies */}
            <section aria-labelledby="policies-heading">
              <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {props.envoi ? (
                  <BigBadge
                    variant={AnnoncesTypeOptions.aeg}
                    className="text-green-800 bg-green-200"
                    title="Envoi"
                    description="Ce vendeur propose un envoi"
                    icon={<TruckIcon className="w-6 h-6 mx-auto text-green-800" aria-hidden="true" />}
                  />
                ) : (
                  <BigBadge
                    variant={AnnoncesTypeOptions.aeg}
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
            <div
              className="prose-sm prose prose-zinc dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: props.description }}
            />
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
            <div className="flex w-full h-10 space-x-4 bg-slate-700 animate-pulse"></div>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <div className="flex w-full h-8 space-x-4 bg-slate-700 animate-pulse"></div>
            </div>
          </div>

          {/* Image gallery */}
          <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
            <h2 className="sr-only">Images</h2>

            <div className="flex flex-col gap-4">
              <div className="w-full rounded aspect-square bg-slate-700 animate-pulse"></div>
              <div className="flex flex-row gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-1/4 h-24 rounded bg-slate-600 animate-pulse"></div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8 my-5 lg:col-span-5">
            {/* Policies */}
            <section aria-labelledby="policies-heading" className="flex flex-col gap-6">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="grid h-32 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  <dl className="px-6 py-3 text-center border rounded-lg border-slate-700 bg-slate-600 animate-pulse">
                    <dt>
                      <span className="mt-4 text-sm font-medium"></span>
                    </dt>
                    <dd className="mt-1 text-sm text-slate-800"></dd>
                  </dl>
                </div>
              ))}
            </section>
            {/* Product details */}
            <div className="flex flex-col gap-1">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className={cn('w-full h-2 bg-slate-800 animate-pulse', {
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
