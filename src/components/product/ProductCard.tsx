import formatDistance from 'date-fns/formatDistance';
import fr from 'date-fns/locale/fr';
import Link from 'next/link';

import { cn } from '$/utils/cn';
import { ListingWithUser } from '$/utils/db';
import sanitizer from '$/utils/sanitizer';

import Badge from '../Badge';
import Tilt from '../Tilt';
import ProductCardUserInfos from './ProductCardUserInfos';

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// ListingWithUser but user is optional
type ListingWithOptionalUser = PartialBy<ListingWithUser, 'user'>;

function ProductCard(product: ListingWithOptionalUser & { href: string }) {
  const createdRelative = formatDistance(new Date(product.createdAt), new Date(), { addSuffix: true, locale: fr });

  return (
    <Tilt>
      <div
        key={product.id}
        className="group relative grid grid-cols-1 grid-rows-[2fr,1fr] duration-100 hover:grid-rows-[1fr,1fr] overflow-hidden rounded shadow hover:shadow-md hover:shadow-gray-400 aspect-square shadow-gray-400"
      >
        <div className={cn('overflow-hidden')}>
          <img
            src={product.images[0]}
            alt={product.title}
            className="object-cover object-center w-full h-full group-hover:scale-125 duration-[2000ms]"
          />
        </div>
        <div className={cn('p-2 flex flex-col')}>
          <div className="grid grid-cols-7">
            <h3 className="text-base font-bold col-span-5 line-clamp-1">
              <Link href={product.href}>
                <span aria-hidden="true" className="absolute inset-0 z-40" />
                {product.title}
              </Link>
            </h3>
            <p className="text-lg font-bold col-span-2 font-roboto">{product.price} EUR</p>
          </div>
          <div className="flex flex-col justify-between flex-1 h-full">
            <p className="line-clamp-1">{sanitizer(product.description)}</p>
            <p className="text-xs italic text-rg">Publié {createdRelative}</p>
          </div>
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
          {/* @ts-ignore Async server component */}
          {product.user && <ProductCardUserInfos {...product.user} />}
        </div>
        <div className={cn('flex justify-between absolute top-0 w-full')}>
          <Badge variant={product.type} className="rounded-none rounded-tl shadow" />
        </div>
        {product.sold && (
          <div className="absolute inset-0 flex items-center transition-colors justify-center backdrop-blur-[2px] group-hover:backdrop-blur-0 bg-rg-lightest/70 group-hover:bg-transparent">
            <span className="font-bold -rotate-45 uppercase text-5xl text-rg-dark group-hover:text-rg-dark/50">Vendu</span>
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
