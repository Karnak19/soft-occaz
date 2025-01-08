import { formatDistance } from 'date-fns';
import { fr } from 'date-fns/locale';
import dynamic from 'next/dynamic';
import Link from 'next/link';

import { cn } from '$/utils/cn';
import { imgKitUrlLow, imgKitUrlThumbnail } from '$/utils/imgKitUrl';
import { ListingsResponse } from '$/utils/pocketbase/pocketbase-types';

import Badge from '../Badge';
import AnimatedPrice from './AnimatedPrice';

const ProductCardUserInfos = dynamic(() => import('./ProductCardUserInfos'));

function ProductCard(product: ListingsResponse<string[]>) {
  const createdRelative = formatDistance(new Date(product.created), new Date(), { addSuffix: true, locale: fr });

  const firstImage = product.images?.[0];
  const firstImageUrlLow = imgKitUrlLow(firstImage);
  const firstImageUrl = imgKitUrlThumbnail(firstImage);

  const href = `/annonces/details/${product.id}`;

  return (
    <div
      key={product.id}
      className="group relative grid aspect-square grid-cols-1 grid-rows-[2fr,1fr] overflow-hidden rounded-lg text-card-foreground shadow shadow-gray-400 hover:shadow-md hover:shadow-gray-400 dark:opacity-80 dark:shadow-none dark:ring-2 dark:ring-muted"
    >
      <div className={cn('relative overflow-hidden')}>
        <img src={firstImageUrlLow} alt={product.title} className="absolute inset-0 size-full object-cover object-center" />
        <img
          src={firstImageUrl}
          alt={product.title}
          className="absolute inset-0 size-full object-cover object-center duration-500 group-hover:scale-125"
          loading="lazy"
        />
      </div>
      <div className={cn('flex flex-col p-2')}>
        <div className="flex items-center justify-between">
          <h3 className="line-clamp-1 text-base font-bold">
            <Link href={href}>
              <span aria-hidden="true" className="absolute inset-0 z-40" />
              {product.title}
            </Link>
          </h3>
          <AnimatedPrice price={product.price} />
        </div>
        <div className="flex h-full flex-1 flex-col justify-between">
          <p className="text-xs italic text-primary dark:text-muted-foreground">Publié {createdRelative}</p>
        </div>
        {/* @ts-ignore Async server component */}
        {product.expand?.user && <ProductCardUserInfos {...product.expand.user} />}
      </div>
      <div className={cn('absolute top-0 flex w-full justify-between')}>
        <Badge variant={product.type} className="rounded-none rounded-tl shadow" />
      </div>
      {product.sold_to && (
        <div className="absolute inset-0 flex items-center justify-center bg-rg-100/70 backdrop-blur-[2px] transition-colors group-hover:bg-transparent group-hover:backdrop-blur-0">
          <span className="-rotate-45 text-5xl font-bold uppercase text-rg-700 group-hover:text-rg-700/50">Vendu</span>
        </div>
      )}
    </div>
  );
}

function FakeLoadingProductCard() {
  return (
    <div className="group relative grid aspect-square grid-cols-1 grid-rows-[2fr,1fr] overflow-hidden rounded shadow shadow-gray-400 duration-100 hover:grid-rows-[1fr,1fr] hover:shadow-md hover:shadow-gray-400">
      <div
        className={cn('aspect-video size-full animate-pulse overflow-hidden bg-muted transition-opacity group-hover:opacity-75')}
      />
      <div className={cn('flex flex-col gap-2 p-2')}>
        <div className="flex gap-4">
          <div className="h-6 w-3/4 animate-pulse rounded bg-rg-400/60" />
          <div className="h-6 w-1/4 animate-pulse rounded bg-rg-400/60" />
        </div>
        <div className="h-4 w-1/2 animate-pulse rounded bg-rg-400/40" />
      </div>
    </div>
  );
}

export function FakeLoadingProductCardList({ count = 4 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <FakeLoadingProductCard key={index} />
      ))}
    </>
  );
}

export default ProductCard;
