'use client';

import { CheckBadgeIcon, EnvelopeOpenIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { Rating, User } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';

import { cn } from '$/utils/cn';

import Avatar from './Avatar';
import StarsDisplayer from './StarsDisplayer';
import SubLink from './SubLink';
import { Card } from './ui/card';

function UserCard(props: User & { listingTitle: string; action: () => void }) {
  const { data: ratings = [] } = useQuery({
    queryKey: ['user', props.id, 'ratings'],
    queryFn: () => fetch(`/api/users/${props.id}/ratings`).then((res) => res.json()) as Promise<Rating[]>,
    enabled: !!props.id,
  });

  const average = ratings?.reduce((acc, rating) => acc + rating.rating, 0) / ratings?.length;

  return (
    <Card
      className={cn('col-span-1 divide-y divide-muted', {
        'ring-1 ring-teal-400': props.sub === 'HOBBY',
        'ring-1 ring-violet-400': props.sub === 'GEARDO',
        'ring-1 ring-amber-400': props.sub === 'PREMIUM',
      })}
    >
      <div
        className={cn('flex w-full items-center justify-between space-x-6 p-6', {
          'bg-gradient-to-b from-teal-100/30': props.sub === 'HOBBY',
          'bg-gradient-to-b from-violet-100/30': props.sub === 'GEARDO',
          'bg-gradient-to-b from-amber-100/30': props.sub === 'PREMIUM',
        })}
      >
        <div className="flex-1 truncate">
          <div className={'flex items-center space-x-3'}>
            <h3 className="text-rg-900 truncate font-bold dark:text-foreground">{props.username}</h3>
            <CheckBadgeIcon
              className={cn('size-6 text-white', {
                'text-teal-500': props.sub === 'HOBBY',
                'text-violet-500': props.sub === 'GEARDO',
                'text-amber-500': props.sub === 'PREMIUM',
              })}
            />
            <SubLink sub={props.sub ?? 'FREE'} />
          </div>
          <StarsDisplayer average={average} />
        </div>
        <Avatar
          src={props.avatar}
          className={cn('size-10 shrink-0 rounded-full border-2 border-primary bg-muted', {
            'border-amber-500': props.sub === 'PREMIUM',
            'border-violet-500': props.sub === 'GEARDO',
          })}
        />
      </div>
      <div>
        <div className="-mt-px flex divide-x divide-muted">
          <div className="relative flex w-0 flex-1">
            <form
              action={props.action}
              className="hover:text-rg-100 group relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 font-semibold hover:bg-primary disabled:opacity-20 disabled:hover:cursor-not-allowed"
            >
              <button
                type="submit"
                className="group absolute inset-0 inline-flex items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 font-semibold hover:bg-primary disabled:opacity-20 disabled:hover:cursor-not-allowed dark:hover:bg-primary dark:hover:text-primary-foreground"
              >
                <EnvelopeOpenIcon
                  className={cn(
                    'group-hover:text-rg-100 size-5 text-primary dark:text-primary dark:group-hover:text-primary-foreground',
                    {
                      'text-amber-500': props.sub === 'PREMIUM',
                      'text-violet-500': props.sub === 'GEARDO',
                    },
                  )}
                  aria-hidden="true"
                />
                Contacter
              </button>
            </form>
          </div>
          <div className="-ml-px flex w-0 flex-1">
            <a
              href={`/profile/${props.id}`}
              className="hover:text-rg-100 group relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 font-semibold hover:bg-primary dark:hover:bg-primary dark:hover:text-primary-foreground"
            >
              <MagnifyingGlassIcon
                className={cn(
                  'group-hover:text-rg-100 size-5 text-primary dark:text-primary dark:group-hover:text-primary-foreground',
                  {
                    'text-amber-500': props.sub === 'PREMIUM',
                    'text-violet-500': props.sub === 'GEARDO',
                  },
                )}
                aria-hidden="true"
              />
              Profil
            </a>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default UserCard;
