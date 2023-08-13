'use client';

import { CheckBadgeIcon, EnvelopeOpenIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { Rating, User } from '@prisma/client';

import { cn } from '$/utils/cn';

import Avatar from './Avatar';
import SubLink from './SubLink';
import { useQuery } from '@tanstack/react-query';
import StarsDisplayer from './StarsDisplayer';

function UserCard(props: User & { listingTitle: string }) {
  const { data: ratings = [] } = useQuery(
    ['user', props.id, 'ratings'],
    () => fetch(`/api/users/${props.id}/ratings`).then((res) => res.json()) as Promise<Rating[]>,
    { enabled: !!props.id },
  );

  const average = ratings?.reduce((acc, rating) => acc + rating.rating, 0) / ratings?.length;

  return (
    <div
      className={cn('col-span-1 divide-y rounded-lg shadow-sm shadow-gray-400 divide-rg-dark bg-white', {
        'bg-gradient-to-tr from-teal-100': props.sub === 'HOBBY',
        'bg-gradient-to-tr from-violet-100': props.sub === 'GEARDO',
        'bg-gradient-to-tr from-amber-100': props.sub === 'PREMIUM',
      })}
    >
      <div className="flex items-center justify-between w-full p-6 space-x-6">
        <div className="flex-1 truncate">
          <div className="flex items-center space-x-3">
            <h3 className="font-bold truncate text-rg-darkest font-roboto">{props.username}</h3>
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
          className={cn('flex-shrink-0 w-10 h-10 rounded-full border-2 border-rg bg-rg-dark', {
            'border-amber-500': props.sub === 'PREMIUM',
            'border-violet-500': props.sub === 'GEARDO',
          })}
        />
      </div>
      <div>
        <div className="flex -mt-px divide-x divide-rg-dark">
          <div className="relative flex flex-1 w-0">
            <a
              href={`mailto:${props.email}?subject=[Airsoft-market]: ${props.listingTitle}`}
              className="relative inline-flex items-center justify-center flex-1 w-0 py-4 -mr-px font-semibold border border-transparent rounded-bl-lg hover:bg-rg hover:text-rg-lightest group gap-x-3 disabled:opacity-20 disabled:hover:cursor-not-allowed"
            >
              <EnvelopeOpenIcon
                className={cn('w-5 h-5 text-rg group-hover:text-rg-lightest', {
                  'text-amber-500': props.sub === 'PREMIUM',
                  'text-violet-500': props.sub === 'GEARDO',
                })}
                aria-hidden="true"
              />
              Contacter
            </a>
          </div>
          <div className="flex flex-1 w-0 -ml-px">
            <a
              href={`/profile/${props.id}`}
              className="relative inline-flex items-center justify-center flex-1 w-0 py-4 font-semibold border border-transparent rounded-br-lg hover:bg-rg hover:text-rg-lightest group gap-x-3"
            >
              <MagnifyingGlassIcon className="w-5 h-5 text-rg group-hover:text-rg-lightest" aria-hidden="true" />
              Profil
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
