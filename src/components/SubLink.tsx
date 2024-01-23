import { cn } from '$/utils/cn';
import { StarIcon } from '@heroicons/react/20/solid';
import { SubScription } from '@prisma/client';
import Link from 'next/link';
import React from 'react';

function SubLink({ sub }: { sub: SubScription }) {
  return (
    <Link
      href="/dashboard/plans"
      className={cn(
        'inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize ring-1 ring-inset',
        {
          'bg-teal-50 text-teal-700 ring-teal-600/20': sub === 'HOBBY',
          'bg-violet-50 text-violet-700 ring-violet-600/20': sub === 'GEARDO',
          'bg-amber-50 text-amber-700 ring-amber-600/20': sub === 'PREMIUM',
        },
      )}
    >
      <span>
        <StarIcon
          className={cn('mr-0.5 size-3', {
            'text-teal-400': sub === 'HOBBY',
            'text-violet-400': sub === 'GEARDO',
            'text-amber-400': sub === 'PREMIUM',
          })}
          aria-hidden="true"
        />
      </span>
      {sub.toLowerCase()}
    </Link>
  );
}

export default SubLink;
