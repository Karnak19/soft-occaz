'use client';

import { CheckBadgeIcon } from '@heroicons/react/20/solid';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

import { usePocketbase } from '$/app/pocketbase-provider';
import UserAvatar from '$/components/UserAvatar';
import { cn } from '$/utils/cn';
import { UsersResponse } from '$/utils/pocketbase/pocketbase-types';

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
      <div className="flex flex-1 items-center gap-3">
        <UserAvatar user={props} size="sm" />
        <div className="min-w-0 flex-1">
          <Link href={`/profile/${props.id}`} className="line-clamp-1 flex-1">
            <span className="pointer-events-auto absolute inset-0 z-50" aria-hidden />
            {props.name}
          </Link>
          <div className="flex items-center gap-2">
            <div className="flex">
              {[0, 1, 2, 3, 4].map((rating) => (
                <svg
                  key={rating}
                  className={cn('size-4 shrink-0', rating < average ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400')}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <CheckBadgeIcon className="size-5 text-green-600" />
      </div>
    </div>
  );
}

export default ProductCardUserInfos;
