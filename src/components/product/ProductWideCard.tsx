import { formatDistance } from 'date-fns';
import { fr } from 'date-fns/locale';
import dynamic from 'next/dynamic';
import Link from 'next/link';

import { cn } from '$/utils/cn';
import { imgKitUrlLow, imgKitUrlThumbnail } from '$/utils/imgKitUrl';
import { ListingsResponse, UsersResponse } from '$/utils/pocketbase/pocketbase-types';

import Badge from '../Badge';
import { Skeleton } from '../ui/skeleton';
import AnimatedPrice from './AnimatedPrice';

const ProductCardUserInfos = dynamic(() => import('./ProductCardUserInfos'));

function ProductWideCard(product: ListingsResponse<string[], { user: UsersResponse }>) {
  const createdRelative = formatDistance(new Date(product.created), new Date(), { addSuffix: true, locale: fr });

  const firstImage = product.images?.[0];
  const firstImageUrlLow = imgKitUrlLow(firstImage);
  const firstImageUrl = imgKitUrlThumbnail(firstImage);

  const href = `/annonces/details/${product.id}`;

  return (
    <div
      key={product.id}
      className="group relative grid h-32 grid-cols-[100px,1fr] overflow-hidden rounded-lg text-card-foreground shadow shadow-gray-400 hover:shadow-md hover:shadow-gray-400 dark:opacity-80 dark:shadow-none dark:ring-2 dark:ring-muted sm:h-40 sm:grid-cols-[160px,1fr] md:h-48 md:grid-cols-[1fr,2fr]"
    >
      <div className={cn('relative overflow-hidden')}>
        <img src={firstImageUrlLow} alt={product.title} className="absolute inset-0 size-full object-cover object-center" />
        <img
          src={firstImageUrl}
          alt={product.title}
          className="absolute inset-0 size-full object-cover object-center duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className={cn('absolute top-0 left-0')}>
          <Badge variant={product.type} className="rounded-none rounded-tl shadow" />
        </div>
      </div>
      <div className={cn('flex flex-col justify-between p-3 sm:p-4')}>
        <div className="flex items-start justify-between">
          <h3 className="line-clamp-2 text-base font-bold sm:text-lg">
            <Link href={href}>
              <span aria-hidden="true" className="absolute inset-0 z-40" />
              {product.title}
            </Link>
          </h3>
          <div className="text-lg sm:text-xl">
            <AnimatedPrice price={product.price} />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xs italic text-primary dark:text-muted-foreground">Publié {createdRelative}</p>
          {product.expand?.user && <ProductCardUserInfos {...product.expand.user} />}
        </div>
      </div>
      {product.sold_to && (
        <div className="absolute inset-0 flex items-center justify-center bg-rg-100/70 backdrop-blur-[2px] transition-colors group-hover:bg-transparent group-hover:backdrop-blur-0">
          <span className="-rotate-45 text-5xl font-bold uppercase text-rg-700 group-hover:text-rg-700/50">Vendu</span>
        </div>
      )}
    </div>
  );
}

function FakeLoadingProductWideCard() {
  return (
    <div className="group relative grid h-32 grid-cols-[100px,1fr] overflow-hidden rounded-lg border border-border shadow sm:h-40 sm:grid-cols-[160px,1fr] md:h-48 md:grid-cols-[1fr,2fr]">
      <Skeleton className="size-full" />
      <div className="flex flex-col justify-between gap-2 p-3 sm:p-4">
        <div className="flex items-start justify-between">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-6 w-16 sm:h-7 sm:w-20" />
        </div>
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-5 w-20 sm:h-6 sm:w-24" />
        </div>
      </div>
    </div>
  );
}

export function FakeLoadingProductWideCardList({ count = 4 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <FakeLoadingProductWideCard key={index} />
      ))}
    </>
  );
}

export default ProductWideCard;
