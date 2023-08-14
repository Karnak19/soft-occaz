import { CalendarIcon, ChartBarSquareIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { type Listing } from '@prisma/client';
import { formatDistance } from 'date-fns';
import { fr } from 'date-fns/locale';
import Link from 'next/link';

import AnimatedValue from '$/components/AnimatedValue';
import Badge from '$/components/Badge';
import { cn } from '$/utils/cn';

import ListItemImages from './ListItem.Images';

function ListItem(annonce: Listing) {
  return (
    <li key={annonce.id}>
      <Link
        href={`/annonces/details/${annonce.id}`}
        className={cn('block hover:bg-gray-50', {
          'bg-emerald-200 hover:bg-emerald-300': annonce.sold,
        })}
      >
        <div className="flex items-center px-4 py-4 sm:px-6">
          <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
            <div className="truncate relative">
              <div className="flex text-sm">
                <p className="mr-2 flex-shrink-0 font-normal text-gray-500">
                  <Badge variant={annonce.type} />
                </p>
                <p className="truncate font-medium text-rg-500 ">{annonce.title}</p>
              </div>
              <div className="mt-2 flex text-gray-500 text-sm md:gap-8 flex-col md:flex-row">
                <div className="flex items-center">
                  <CalendarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                  <p>Créée {formatDistance(new Date(annonce.createdAt), new Date(), { addSuffix: true, locale: fr })}</p>
                </div>
                <div className="flex items-center">
                  <ChartBarSquareIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                  <p>
                    <AnimatedValue value={annonce.seenCount} duration={annonce.seenCount / 360} /> vues
                  </p>
                </div>
              </div>
            </div>
            {annonce.sold && (
              <div className=" grid place-items-center uppercase text-4xl">
                <p className="-rotate-12 text-emerald-900">vendu</p>
              </div>
            )}
            <div className="mt-4 flex-shrink-0 sm:ml-5 sm:mt-0">
              <ListItemImages images={annonce.images} title={annonce.title} />
            </div>
          </div>
          <div className="pl-4">
            <Link
              href={`/dashboard/annonces/${annonce.id}`}
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-rg-300"
            >
              Edit
            </Link>
          </div>
          <div className="ml-5 flex-shrink-0">
            <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
        </div>
      </Link>
    </li>
  );
}

export default ListItem;
