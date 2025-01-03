'use client';

import Link from 'next/link';
import { CheckBadgeIcon } from '@heroicons/react/20/solid';
import { useQuery } from '@tanstack/react-query';
import { StarIcon } from 'lucide-react';

import { cn } from '$/utils/cn';
import { UsersResponse } from '$/utils/pocketbase/pocketbase-types';
import { usePocketbase } from '$/app/pocketbase-provider';

function ProductCardUserInfos(props: UsersResponse) {
  const { pb } = usePocketbase();
  const { data: average = 0 } = useQuery({
    queryKey: ['reviews', props.id],
    queryFn: () =>
      pb.collection('ratings').getFullList({
        filter: `user = "${props.id}"`,
      }),
    enabled: !!props.id,
    select: (data) => data.reduce((acc, { rating }) => acc + rating, 0) / data.length,
  });

  return (
    <div
      className={cn(
        'pointer-events-none relative flex items-center justify-between rounded p-1 hover:bg-rg-300 dark:hover:bg-muted',
      )}
    >
      <div className={cn('size-8 overflow-hidden rounded-sm ring-2 ring-rg-100', {})}>
        {props.avatar && <img src={pb.files.getURL(props, props.avatar, { thumb: '100x100' })} alt="" />}
      </div>
      <div className="flex-1 pl-3">
        <Link href={`/profile/${props.id}`} className="line-clamp-1 flex-1">
          <span className="pointer-events-auto absolute inset-0 z-50" aria-hidden />
          {props.name}
        </Link>
        <div className="flex">
          {[0, 1, 2, 3, 4].map((rating) => (
            <StarIcon
              key={rating}
              className={cn('size-4 shrink-0', rating < average ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400')}
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
