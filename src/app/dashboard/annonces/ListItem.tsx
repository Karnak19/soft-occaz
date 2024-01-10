'use client';

import { CalendarIcon, ChartBarSquareIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { type Listing } from '@prisma/client';
import { formatDistance } from 'date-fns';
import { fr } from 'date-fns/locale';
import Link from 'next/link';

import AnimatedValue from '$/components/AnimatedValue';
import Badge from '$/components/Badge';
import { cn } from '$/utils/cn';

import ListItemImages from './ListItem.Images';
import { Button } from '$/components/ui/button';

function ListItem(annonce: Listing) {
  return (
    <li key={annonce.id}>
      <Link
        href={`/annonces/details/${annonce.id}`}
        className={cn('block hover:bg-muted group', {
          'bg-primary-foreground': annonce.sold,
        })}
      >
        <div className="flex items-center px-4 py-4 sm:px-6 text-muted-foreground">
          <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
            <div className="truncate relative">
              <div className="flex text-sm items-center">
                <p className="mr-2 flex-shrink-0">
                  <Badge variant={annonce.type} />
                </p>
                <h1 className="truncate font-medium group-hover:text-foreground">{annonce.title}</h1>
              </div>
              <div className="mt-2 flex text-sm md:gap-8 flex-col md:flex-row">
                <div className="flex items-center">
                  <CalendarIcon className="mr-1.5 h-5 w-5 flex-shrink-0" aria-hidden="true" />
                  <p>Créée {formatDistance(new Date(annonce.createdAt), new Date(), { addSuffix: true, locale: fr })}</p>
                </div>
                <div className="flex items-center">
                  <ChartBarSquareIcon className="mr-1.5 h-5 w-5 flex-shrink-0" aria-hidden="true" />
                  <p>
                    <AnimatedValue value={annonce.seenCount} duration={annonce.seenCount / 500} /> vues
                  </p>
                </div>
              </div>
            </div>
            {annonce.sold && (
              <div className=" grid place-items-center uppercase text-4xl">
                <p className="-rotate-12 text-primary">vendu</p>
              </div>
            )}
            <div className="mt-4 flex-shrink-0 sm:ml-5 sm:mt-0">
              <ListItemImages images={annonce.images} title={annonce.title} />
            </div>
          </div>
          <div className="pl-4">
            <Button asChild variant="outline">
              <Link
                href={`/dashboard/annonces/${annonce.id}`}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                Edit
              </Link>
            </Button>
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
