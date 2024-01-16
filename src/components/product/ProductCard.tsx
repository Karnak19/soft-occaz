import { formatDistance } from 'date-fns';
import { fr } from 'date-fns/locale';
import Link from 'next/link';

import { cn } from '$/utils/cn';
import { imgKitUrlLow, imgKitUrlThumbnail } from '$/utils/imgKitUrl';
import Badge from '../Badge';
import Tilt from '../Tilt';
import AnimatedPrice from './AnimatedPrice';
import ProductCardUserInfos from './ProductCardUserInfos';

import { type ListingWithUser } from '$/utils/db';

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// ListingWithUser but user is optional
type ListingWithOptionalUser = PartialBy<ListingWithUser, 'user'>;

function ProductCard(product: ListingWithOptionalUser & { href: string; isHighlighted?: boolean }) {
  const createdRelative = formatDistance(new Date(product.createdAt), new Date(), { addSuffix: true, locale: fr });

  const firstImage = product.images[0];
  const firstImageUrlLow = imgKitUrlLow(firstImage);
  const firstImageUrl = imgKitUrlThumbnail(firstImage);

  return (
    <Tilt>
      <div
        key={product.id}
        className={cn(
          'group dark:opacity-80 relative grid grid-cols-1 grid-rows-[2fr,1fr] overflow-hidden rounded-lg shadow dark:shadow-none hover:shadow-md hover:shadow-gray-400 aspect-square shadow-gray-400 text-card-foreground dark:ring-2 dark:ring-muted',
          {
            'ring-2 dark:ring-violet-400 ring-violet-400 bg-gradient-to-tr dark:from-transparent from-violet-100':
              product.user?.sub === 'GEARDO',
            'ring-2 dark:ring-amber-400 ring-amber-400 g-gradient-to-tr dark:from-transparent from-amber-100':
              product.user?.sub === 'PREMIUM',
          },
        )}
      >
        <div className={cn('overflow-hidden relative')}>
          <img src={firstImageUrlLow} alt={product.title} className="object-cover object-center w-full h-full inset-0 absolute" />
          <img
            src={firstImageUrl}
            alt={product.title}
            className="object-cover object-center w-full h-full group-hover:scale-125 duration-500 inset-0 absolute"
            loading="lazy"
          />
        </div>
        <div className={cn('p-2 flex flex-col')}>
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold line-clamp-1">
              <Link href={product.href}>
                <span aria-hidden="true" className="absolute inset-0 z-40" />
                {product.title}
              </Link>
            </h3>
            {product.isHighlighted ? (
              <AnimatedPrice price={product.price} />
            ) : (
              <p className="text-lg font-bold font-roboto whitespace-nowrap">{product.price} €</p>
            )}
          </div>
          <div className="flex flex-col justify-between flex-1 h-full">
            {/* <p className="line-clamp-1">{sanitizer(product.description)}</p> */}
            <p className="text-xs italic text-rg-500 dark:text-muted-foreground">Publié {createdRelative}</p>
          </div>
          {/* @ts-ignore Async server component */}
          {product.user && <ProductCardUserInfos {...product.user} />}
        </div>
        <div className={cn('flex justify-between absolute top-0 w-full')}>
          <Badge variant={product.type} className="rounded-none rounded-tl shadow" />
        </div>
        {product.sold && (
          <div className="absolute inset-0 flex items-center transition-colors justify-center backdrop-blur-[2px] group-hover:backdrop-blur-0 bg-rg-100/70 group-hover:bg-transparent">
            <span className="font-bold -rotate-45 uppercase text-5xl text-rg-700 group-hover:text-rg-700/50">Vendu</span>
          </div>
        )}
      </div>
    </Tilt>
  );
}

export function FakeLoadingProductCard() {
  return (
    <div className="group relative grid grid-cols-1 grid-rows-[2fr,1fr] duration-100 hover:grid-rows-[1fr,1fr] overflow-hidden rounded shadow hover:shadow-md hover:shadow-gray-400 aspect-square shadow-gray-400">
      <div
        className={cn(
          'w-full h-full overflow-hidden aspect-video transition-opacity bg-rg/60 group-hover:opacity-75 animate-pulse',
        )}
      />
      <div className={cn('flex flex-col gap-2 p-2')}>
        <div className="flex gap-4">
          <div className="w-3/4 h-6 rounded bg-rg/60 animate-pulse" />
          <div className="w-1/4 h-6 rounded bg-rg/60 animate-pulse" />
        </div>
        <div className="w-1/2 h-4 rounded bg-rg/40 animate-pulse" />
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
