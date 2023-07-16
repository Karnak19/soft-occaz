import { ChartBarSquareIcon, DocumentIcon, PresentationChartLineIcon } from '@heroicons/react/24/outline';

import { useMe } from '$/hooks/useMe';
import { cn } from '$/utils/cn';
import { getMaxListingsCount } from '$/utils/getMaxListingsCount';

export default function Stats({ views, listingCount }: { views: number; listingCount: number }) {
  const { data: me } = useMe();

  const maxCount = getMaxListingsCount(me?.sub ?? null);

  const stats = [
    { id: 1, name: 'Annonces', value: `${listingCount} / ${maxCount}`, unit: 'max', icon: DocumentIcon },
    { id: 2, name: 'Vues totales', value: views, unit: 'vues', icon: ChartBarSquareIcon },
    { id: 3, name: 'Vues moyennes', value: Math.round(views / listingCount), unit: 'vues', icon: PresentationChartLineIcon },
  ];

  return (
    <div className="bg-rg-lightest border-b-rg-lightest border-b">
      <div className="mx-auto">
        <div className="flex flex-wrap gap-px bg-white/5">
          {stats.map((item) => (
            <div key={item.id} className="relative flex-grow overflow-hidden bg-white px-4 pt-5 sm:px-6 sm:pt-6">
              <dt>
                <div className="absolute rounded-md bg-rg p-3">
                  <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <p className="ml-16 truncate text-sm font-medium text-gray-500">{item.name}</p>
              </dt>
              <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                <p className="text-2xl font-semibold text-gray-900">{item.value}</p>
                <p className={cn('ml-2 flex text-gray-500 items-baseline text-sm')}>{item.unit}</p>
              </dd>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
