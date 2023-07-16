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
        'inline-flex flex-shrink-0 items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset capitalize',
        {
          'bg-cyan-50 text-cyan-700 ring-cyan-600/20': sub === 'HOBBY',
          'bg-lime-50 text-lime-700 ring-lime-600/20': sub === 'GEARDO',
          'bg-amber-50 text-amber-700 ring-amber-600/20': sub === 'PREMIUM',
        },
      )}
    >
      <span>
        <StarIcon
          className={cn('h-3 w-3 mr-0.5', {
            'text-cyan-400': sub === 'HOBBY',
            'text-lime-400': sub === 'GEARDO',
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
