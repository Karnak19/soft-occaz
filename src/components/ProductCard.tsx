import { formatDistance } from 'date-fns';
import { fr } from 'date-fns/locale';
import Link from 'next/link';

import { pb } from '$/utils/pocketbase';
import { AdsResponse } from '$/utils/pocketbase-types';
import sanitizer from '$/utils/sanitizer';

import Badge from './Badge';
import { SendBadge } from './SendBadge';

function ProductCard(product: AdsResponse & { href: string }) {
  const imageSrc = product.images?.[0]
    ? pb.getFileUrl(product, product.images?.[0])
    : 'https://i1.wp.com/www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg?ssl=1';

  const createdRelative = formatDistance(new Date(product.created), new Date(), { addSuffix: true, locale: fr });

  return (
    <div key={product.id} className="relative grid grid-cols-6 gap-4 p-4 border group border-zinc-600 sm:p-2 rounded-2xl">
      <div className="col-span-2 overflow-hidden rounded-l-lg aspect-video bg-zinc-600 group-hover:opacity-75">
        <img src={imageSrc} alt={product.title} className="object-cover object-center w-full h-full" />
      </div>
      <div className="flex flex-col col-span-3 gap-2">
        <h3 className="text-xl font-medium text-zinc-200 ">
          <Link href={product.href}>
            <span aria-hidden="true" className="absolute inset-0" />
            {product.title}
          </Link>
        </h3>
        <p className="flex-1 text-sm line-clamp-3">{sanitizer(product.description).substring(0, 200)}</p>
        <p className="text-sm text-zinc-400">Publié {createdRelative}</p>
        <p className="text-lg font-medium text-zinc-50">{product.price} EUR</p>
      </div>
      <div className="flex flex-col items-end gap-2">
        <SendBadge send={product.envoi} />
        <Badge variant={product.type} />
      </div>
    </div>
  );
}

export default ProductCard;
