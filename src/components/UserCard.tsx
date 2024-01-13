'use client';

import { CheckBadgeIcon, EnvelopeOpenIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { Rating, User } from '@prisma/client';

import { cn } from '$/utils/cn';

import Avatar from './Avatar';
import SubLink from './SubLink';
import { useQuery } from '@tanstack/react-query';
import StarsDisplayer from './StarsDisplayer';
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
        className={cn('flex items-center justify-between w-full p-6 space-x-6', {
          'bg-gradient-to-b from-teal-100/30': props.sub === 'HOBBY',
          'bg-gradient-to-b from-violet-100/30': props.sub === 'GEARDO',
          'bg-gradient-to-b from-amber-100/30': props.sub === 'PREMIUM',
        })}
      >
        <div className="flex-1 truncate">
          <div className={'flex items-center space-x-3'}>
            <h3 className="font-bold truncate text-rg-900 dark:text-foreground">{props.username}</h3>
            <CheckBadgeIcon
              className={cn('w-6 h-6 text-white', {
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
          className={cn('flex-shrink-0 w-10 h-10 rounded-full border-2 border-rg-500 bg-muted', {
            'border-amber-500': props.sub === 'PREMIUM',
            'border-violet-500': props.sub === 'GEARDO',
          })}
        />
      </div>
      <div>
        <div className="flex -mt-px divide-x divide-muted">
          <div className="relative flex flex-1 w-0">
            <form
              action={props.action}
              className="relative inline-flex items-center justify-center flex-1 w-0 py-4 -mr-px font-semibold border border-transparent rounded-bl-lg hover:bg-rg-500 hover:text-rg-100 group gap-x-3 disabled:opacity-20 disabled:hover:cursor-not-allowed"
            >
              <button
                type="submit"
                className="absolute inset-0 inline-flex items-center justify-center py-4 font-semibold border border-transparent rounded-bl-lg hover:bg-rg-500 dark:hover:bg-primary dark:hover:text-primary-foreground group gap-x-3 disabled:opacity-20 disabled:hover:cursor-not-allowed"
              >
                <EnvelopeOpenIcon
                  className={cn(
                    'w-5 h-5 text-rg-500 dark:text-primary dark:group-hover:text-primary-foreground group-hover:text-rg-100',
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
          <div className="flex flex-1 w-0 -ml-px">
            <a
              href={`/profile/${props.id}`}
              className="relative inline-flex items-center justify-center flex-1 w-0 py-4 font-semibold border border-transparent rounded-br-lg dark:hover:bg-primary dark:hover:text-primary-foreground group gap-x-3 hover:bg-rg-500 hover:text-rg-100"
            >
              <MagnifyingGlassIcon
                className={cn(
                  'w-5 h-5 text-rg-500 dark:text-primary dark:group-hover:text-primary-foreground group-hover:text-rg-100',
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
