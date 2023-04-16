import { formatDistance } from 'date-fns';
import { fr } from 'date-fns/locale';
import Link from 'next/link';

import { cn } from '$/utils/cn';
import { pb } from '$/utils/pocketbase';
import { AnnoncesResponse, UsersResponse } from '$/utils/pocketbase-types';
import sanitizer from '$/utils/sanitizer';
import { Thumb } from '$/utils/thumbs';

import Badge from '../Badge';
import { SendBadge } from '../SendBadge';
import Tilt from '../Tilt';
import ProductCardUserInfos from './ProductCardUserInfos';

function ProductCard(product: AnnoncesResponse<{ user: UsersResponse }> & { href: string }) {
  const imageSrc = product.images?.[0]
    ? pb.getFileUrl(product, product.images?.[0], {
        thumb: Thumb.extended,
      })
    : 'https://i1.wp.com/www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg?ssl=1';

  const createdRelative = formatDistance(new Date(product.created), new Date(), { addSuffix: true, locale: fr });

  return (
    <Tilt>
      <div
        key={product.id}
        className="relative grid aspect-square grid-cols-1 grid-rows-2 overflow-hidden rounded shadow shadow-gray-400 hover:shadow-md hover:shadow-gray-400"
      >
        <div className={cn('overflow-hidden')}>
          <img src={imageSrc} alt={product.title} className="w-full object-cover object-center" />
        </div>
        <div className={cn('flex flex-col p-2')}>
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold ">
              <Link href={product.href}>
                <span aria-hidden="true" className="absolute inset-0" />
                {product.title}
              </Link>
            </h3>
            <p className="font-roboto text-lg font-bold">{product.price} EUR</p>
          </div>
          <div className="flex h-full flex-col justify-between">
            <p className="line-clamp-2">{sanitizer(product.description)}</p>
            <p className="text-xs italic text-rg">Publié {createdRelative}</p>
          </div>
          <ProductCardUserInfos {...product.expand!.user} />
        </div>
        <div className={cn('absolute top-1 flex w-full justify-between px-1')}>
          <Badge variant={product.type} className="rounded shadow" />
          <SendBadge send={product.envoi} className="rounded shadow" />
        </div>
      </div>
    </Tilt>
  );
}

export function FakeLoadingProductCard() {
  return (
    <div className="group relative grid grid-cols-6 gap-4 rounded-2xl border border-rg p-2">
      <div
        className={cn(
          'col-span-2 aspect-video h-full w-full animate-pulse overflow-hidden rounded-l-lg bg-rg transition-opacity group-hover:opacity-75',
        )}
      />
      <div className={cn('col-span-3 flex flex-col gap-2')}>
        <div className="h-6 w-3/4 animate-pulse rounded bg-rg" />
        <div className="h-6 w-full animate-pulse rounded bg-rg" />
        <div className="h-6 w-1/2 animate-pulse rounded bg-rg" />
      </div>
      <div className={cn('flex flex-col items-end gap-2')}>
        <div className="h-6 w-6 animate-pulse rounded-full bg-rg" />
        <div className="h-6 w-6 animate-pulse rounded-full bg-rg" />
      </div>
    </div>
  );
}

export default ProductCard;
