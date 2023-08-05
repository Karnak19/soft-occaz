import { CheckBadgeIcon } from '@heroicons/react/20/solid';
import { User } from '@prisma/client';
import Link from 'next/link';

import { cn } from '$/utils/cn';

async function ProductCardUserInfos({ avatar, username, id, sub }: User) {
  return (
    <div
      className={cn('relative flex justify-between items-center gap-5 rounded pointer-events-none hover:bg-rg-light p-1', {
        'hover:bg-violet-300': sub === 'GEARDO',
        'hover:bg-amber-300': sub === 'PREMIUM',
      })}
    >
      <div
        className={cn('w-8 h-8 overflow-hidden rounded-sm ring-2 ring-rg-lightest', {
          'ring-amber-500': sub === 'PREMIUM',
          'ring-violet-500': sub === 'GEARDO',
        })}
      >
        {avatar && <img src={avatar} alt="" />}
      </div>
      <Link href={`/profile/${id}`} className="flex-1">
        <span className="absolute z-50 inset-0 pointer-events-auto" aria-hidden />
        {username}
      </Link>
      <span>
        <CheckBadgeIcon className="w-5 h-5 text-green-600" />
      </span>
    </div>
  );
}

export default ProductCardUserInfos;
