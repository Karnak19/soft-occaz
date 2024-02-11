import Link from 'next/link';
import { CheckBadgeIcon } from '@heroicons/react/20/solid';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { User } from '@prisma/client';

import { cn } from '$/utils/cn';
import { prisma } from '$/utils/db';

async function ProductCardUserInfos({ avatar, username, id, sub }: User) {
  const reviews = await prisma.rating.findMany({
    where: { userId: id },
  });
  const totalCount = reviews.length;
  const average = reviews.reduce((acc, { rating }) => acc + rating, 0) / totalCount;

  return (
    <div
      className={cn(
        'pointer-events-none relative flex items-center justify-between rounded p-1 hover:bg-rg-300 dark:hover:bg-muted',
        {
          'hover:bg-violet-300': sub === 'GEARDO',
          'hover:bg-amber-300': sub === 'PREMIUM',
        },
      )}
    >
      <div
        className={cn('size-8 overflow-hidden rounded-sm ring-2 ring-rg-100', {
          'ring-amber-500': sub === 'PREMIUM',
          'ring-violet-500': sub === 'GEARDO',
        })}
      >
        {avatar && <img src={avatar} alt="" />}
      </div>
      <div className="flex-1 pl-3">
        <Link href={`/profile/${id}`} className="line-clamp-1 flex-1">
          <span className="pointer-events-auto absolute inset-0 z-50" aria-hidden />
          {username}
        </Link>
        <div className="flex">
          {[0, 1, 2, 3, 4].map((rating) => (
            <StarIconSolid
              key={rating}
              className={cn('size-4 shrink-0', rating < average ? 'text-yellow-400' : 'text-gray-400')}
              aria-hidden="true"
            />
          ))}
        </div>
      </div>
      <span>
        <CheckBadgeIcon className="size-5 text-green-600" />
      </span>
    </div>
  );
}

export default ProductCardUserInfos;
