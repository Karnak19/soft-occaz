import type { Listing } from '@prisma/client';
import formatDistance from 'date-fns/formatDistance';
import { fr } from 'date-fns/locale';
import Link from 'next/link';

import { cn } from '$/utils/cn';
import sanitizer from '$/utils/sanitizer';

import Badge from '../Badge';
import { SendBadge } from '../SendBadge';
import Tilt from '../Tilt';

function ProductCard(product: Listing & { href: string }) {
  const createdRelative = formatDistance(new Date(product.createdAt), new Date(), { addSuffix: true, locale: fr });

  return (
    <Tilt>
      <div
        key={product.id}
        className="relative grid grid-cols-1 grid-rows-2 overflow-hidden rounded shadow hover:shadow-md hover:shadow-gray-400 aspect-square shadow-gray-400"
      >
        <div className={cn('overflow-hidden')}>
          {/* <img src={imageSrc} alt={product.title} className="object-cover object-center w-full" /> */}
        </div>
        <div className={cn('p-2 flex flex-col')}>
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold ">
              <Link href={product.href}>
                <span aria-hidden="true" className="absolute inset-0" />
                {product.title}
              </Link>
            </h3>
            <p className="text-lg font-bold font-roboto">{product.price} EUR</p>
          </div>
          <div className="flex flex-col justify-between h-full">
            <p className="line-clamp-2">{sanitizer(product.description)}</p>
            <p className="text-xs italic text-rg">Publié {createdRelative}</p>
          </div>
          {/* <ProductCardUserInfos {...product.expand!.user} /> */}
        </div>
        <div className={cn('flex justify-between absolute top-0 w-full')}>
          <Badge variant={product.type} className="rounded-none rounded-tl shadow" />
          <SendBadge send={product.delivery} className="rounded-none rounded-tr shadow" />
        </div>
      </div>
    </Tilt>
  );
}

export function FakeLoadingProductCard() {
  return (
    <div className="relative grid grid-cols-6 gap-4 p-2 border group border-rg rounded-2xl">
      <div
        className={cn(
          'w-full h-full col-span-2 overflow-hidden aspect-video transition-opacity rounded-l-lg bg-rg group-hover:opacity-75 animate-pulse',
        )}
      />
      <div className={cn('flex flex-col col-span-3 gap-2')}>
        <div className="w-3/4 h-6 rounded bg-rg animate-pulse" />
        <div className="w-full h-6 rounded bg-rg animate-pulse" />
        <div className="w-1/2 h-6 rounded bg-rg animate-pulse" />
      </div>
      <div className={cn('flex flex-col items-end gap-2')}>
        <div className="w-6 h-6 rounded-full bg-rg animate-pulse" />
        <div className="w-6 h-6 rounded-full bg-rg animate-pulse" />
      </div>
    </div>
  );
}

export default ProductCard;
