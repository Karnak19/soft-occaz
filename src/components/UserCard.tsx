import { CheckBadgeIcon, EnvelopeOpenIcon, MagnifyingGlassIcon, StarIcon } from '@heroicons/react/20/solid';
import { User } from '@prisma/client';
import Link from 'next/link';

import { cn } from '$/utils/cn';
import { isHighlighted as highlight } from '$/utils/isHighlighted';

import Avatar from './Avatar';

function UserCard(props: User & { listingTitle: string }) {
  const isHighlighted = highlight(props.sub);

  return (
    <div
      className={cn('col-span-1 divide-y rounded-lg shadow-sm shadow-gray-400 divide-rg-dark bg-white', {
        'bg-gradient-to-tr from-amber-100': isHighlighted,
      })}
    >
      <div className="flex items-center justify-between w-full p-6 space-x-6">
        <div className="flex-1 truncate">
          <div className="flex items-center space-x-3">
            <h3 className="font-bold truncate text-rg-darkest font-roboto">{props.username}</h3>
            <CheckBadgeIcon
              className={cn('w-6 h-6 text-white', {
                'text-amber-500': isHighlighted,
              })}
            />
            <Link
              href="/dashboard/plans"
              className="inline-flex flex-shrink-0 items-center rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700 ring-1 ring-inset ring-amber-600/20"
            >
              <span>
                <StarIcon className="h-3 w-3 text-amber-400 mr-0.5" aria-hidden="true" />
              </span>
              {props.sub}
            </Link>
          </div>
        </div>
        <Avatar
          src={props.avatar}
          className={cn('flex-shrink-0 w-10 h-10 rounded-full border-2 border-rg bg-rg-dark', {
            'border-amber-500': isHighlighted,
          })}
        />
      </div>
      <div>
        <div className="flex -mt-px divide-x divide-rg-dark">
          <div className="relative flex flex-1 w-0">
            <a
              // disabled
              // onClick={() => createChatAndRedirect(user.id)}
              href={`mailto:${props.email}?subject=[Airsoft-market]: ${props.listingTitle}`}
              className="relative inline-flex items-center justify-center flex-1 w-0 py-4 -mr-px font-semibold border border-transparent rounded-bl-lg hover:bg-rg hover:text-rg-lightest group gap-x-3 disabled:opacity-20 disabled:hover:cursor-not-allowed"
            >
              {/* {mutation.isLoading && <Spinner />} */}
              {/* <ChatBubbleLeftRightIcon className="w-5 h-5 text-rg group-hover:text-rg-lightest" aria-hidden="true" /> */}
              <EnvelopeOpenIcon
                className={cn('w-5 h-5 text-rg group-hover:text-rg-lightest', {
                  'text-amber-500': isHighlighted,
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
              Profile
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
