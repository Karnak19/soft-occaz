'use client';

import { ChartBarSquareIcon, DocumentIcon, PresentationChartLineIcon } from '@heroicons/react/24/outline';

import { cn } from '$/utils/cn';
import { getMaxListingsCount } from '$/utils/getMaxListingsCount';
import { useMe } from '$/hooks/useMe';

export default function Stats({ views, listingCount }: { views: number; listingCount: number }) {
  const { data: me } = useMe();

  const maxCount = getMaxListingsCount(me?.sub ?? null);

  const stats = [
    {
      id: 1,
      name: 'Annonces',
      value: `${listingCount} / ${maxCount}`,
      unit: 'max',
      icon: DocumentIcon,
      className: {
        text: cn({
          'text-amber-500': listingCount >= (typeof maxCount === 'number' ? maxCount * 0.5 : 0),
          'text-red-500': listingCount >= (typeof maxCount === 'number' ? maxCount * 0.8 : 0),
        }),
      },
    },
    { id: 2, name: 'Vues totales', value: views, unit: 'vues', icon: ChartBarSquareIcon },
    {
      id: 3,
      name: 'Vues moyennes',
      value: (views / listingCount).toFixed(2),
      unit: 'vues',
      icon: PresentationChartLineIcon,
    },
  ];

  return (
    <div className="border-b border-muted">
      <div className="mx-auto">
        <div className="flex flex-wrap gap-px divide-x divide-muted">
          {stats.map((item) => (
            <div key={item.id} className="relative grow overflow-hidden px-4 pt-5 sm:px-6 sm:pt-6">
              <dt>
                <div className="absolute rounded-md bg-rg-400 p-3 dark:bg-muted">
                  <item.icon className="size-6 text-white dark:text-foreground" aria-hidden="true" />
                </div>
                <p className="ml-16 truncate text-sm font-medium text-rg-800 dark:text-muted-foreground">{item.name}</p>
              </dt>
              <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                <p className={cn('text-2xl font-semibold text-foreground', item.className?.text)}>{item.value}</p>
                <p className={cn('ml-2 flex items-baseline text-sm text-muted-foreground')}>{item.unit}</p>
              </dd>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
