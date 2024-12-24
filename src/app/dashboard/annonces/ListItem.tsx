import Link from 'next/link';
import { CalendarIcon, ChartBarSquareIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import type { Listing } from '@prisma/client';
import { formatDistance } from 'date-fns';
import { fr } from 'date-fns/locale';

import { cn } from '$/utils/cn';
import { prisma } from '$/utils/db';
import AnimatedValue from '$/components/AnimatedValue';
import Badge from '$/components/Badge';
import ListingSparkChart from '$/components/charts/ListingSparkChart';

import DropdownButton from './DropdownButton';
import ListItemImages from './ListItem.Images';

async function ListItem(annonce: Listing) {
  const history = await prisma.history.findMany({
    where: { listingId: annonce.id },
    orderBy: { createdAt: 'asc' },
  });

  const data = history.map((item) => {
    return {
      date: new Date(item.createdAt).toLocaleDateString(),
      value: item.seenCount,
    };
  });

  return (
    <li
      key={annonce.id}
      className={cn('group relative hover:bg-muted', {
        'bg-primary-foreground': annonce.sold,
      })}
    >
      <div className="flex items-center p-4 text-muted-foreground sm:px-6">
        <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
          <div className="truncate">
            <div className="flex items-center text-sm">
              <p className="mr-2 shrink-0">
                <Badge variant={annonce.type} />
              </p>

              <Link href={`/annonces/details/${annonce.id}`}>
                <span className="absolute inset-0" aria-hidden="true" />

                <h1 className="truncate font-medium group-hover:text-foreground">{annonce.title}</h1>
              </Link>
            </div>
            <div className="mt-2 flex flex-col text-sm md:flex-row md:gap-8">
              <div className="flex items-center">
                <CalendarIcon className="mr-1.5 size-5 shrink-0" aria-hidden="true" />
                <p>Créée {formatDistance(new Date(annonce.createdAt), new Date(), { addSuffix: true, locale: fr })}</p>
              </div>
              <div className="flex items-center">
                <ChartBarSquareIcon className="mr-1.5 size-5 shrink-0" aria-hidden="true" />
                <p>
                  <AnimatedValue value={annonce.seenCount} duration={annonce.seenCount / 1000} /> clics
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-1 justify-end">
            <ListingSparkChart data={data} />
          </div>
          {annonce.sold && (
            <div className="absolute ml-20 grid place-items-center text-4xl font-bold uppercase">
              <p className="-rotate-12 text-primary">vendu</p>
            </div>
          )}
          <div className="mt-4 shrink-0 sm:ml-5 sm:mt-0">
            <ListItemImages images={annonce.images} title={annonce.title} />
          </div>
        </div>
        <div className="relative z-20 pl-4">
          <DropdownButton annonce={annonce} />
        </div>
        <div className="ml-5 shrink-0">
          <ChevronRightIcon className="size-5 text-gray-400" aria-hidden="true" />
        </div>
      </div>
    </li>
  );
}

export default ListItem;
