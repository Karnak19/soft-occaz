import { formatDistance } from 'date-fns';
import { fr } from 'date-fns/locale';
import Link from 'next/link';

import { cn } from '$/utils/cn';
import { pb } from '$/utils/pocketbase';
import { AnnoncesResponse } from '$/utils/pocketbase-types';
import sanitizer from '$/utils/sanitizer';

import Badge from './Badge';
import { SendBadge } from './SendBadge';

function ProductCard(product: AnnoncesResponse & { href: string; display?: 'horizontal' | 'vertical' }) {
  const imageSrc = product.images?.[0]
    ? pb.getFileUrl(product, product.images?.[0])
    : 'https://i1.wp.com/www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg?ssl=1';

  const createdRelative = formatDistance(new Date(product.created), new Date(), { addSuffix: true, locale: fr });

  const verticalCn = {
    'lg:col-span-full': product.display === 'vertical',
  };

  return (
    <div key={product.id} className="relative grid grid-cols-6 gap-4 p-2 border sm:p-4 group border-slate-600 rounded-2xl">
      <div
        className={cn(
          'w-full h-full col-span-2 overflow-hidden aspect-video transition-opacity rounded-l-lg bg-slate-600 group-hover:opacity-75',
          verticalCn,
          {
            'lg:rounded-l-none lg:rounded-t-lg': product.display === 'vertical',
          },
        )}
      >
        <img src={imageSrc} alt={product.title} className="object-cover object-center w-full h-full" />
      </div>
      <div className={cn('flex flex-col col-span-3 gap-2', verticalCn)}>
        <h3 className="text-xl font-medium text-slate-200 ">
          <Link href={product.href}>
            <span aria-hidden="true" className="absolute inset-0" />
            {product.title}
          </Link>
        </h3>
        <p className="flex-1 text-sm line-clamp-3">{sanitizer(product.description).substring(0, 200)}</p>
        <p className="text-sm text-slate-400">Publié {createdRelative}</p>
        <p className="text-lg font-medium text-slate-50">{product.price} EUR</p>
      </div>
      <div
        className={cn('flex flex-col items-end gap-2', verticalCn, {
          'lg:items-start lg:flex-row': product.display === 'vertical',
        })}
      >
        <SendBadge send={product.envoi} />
        <Badge variant={product.type} />
      </div>
    </div>
  );
}

export default ProductCard;
