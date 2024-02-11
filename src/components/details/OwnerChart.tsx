'use client';

import { useParams } from 'next/navigation';
import { ExclamationTriangleIcon } from '@heroicons/react/20/solid';
import { History } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { AreaChart, Callout, Card } from '@tremor/react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

import { useMe } from '$/hooks/useMe';

export default function OwnerChart() {
  const { data: me } = useMe();
  const params = useParams();

  const { data: history, isLoading } = useQuery({
    queryKey: ['history', params.id],
    queryFn: () =>
      fetch(`/api/listings/${params.id}/history`)
        .then((res) => {
          if (!res.ok || res.status >= 400) throw new Error('Error fetching last ads');
          return res;
        })
        .then((res) => res.json() as Promise<History[]>),
    enabled: !!me?.id && !!params.id,
    retry: false,
  });

  if (isLoading) {
    return <div className="flex items-center gap-2 border-b border-rg-500 py-4 italic">Chargement du graphique...</div>;
  }

  if (!me || !history) return null;

  return (
    <div className="flex items-center gap-2 border-b border-rg-500 py-4">
      <Card>
        <Callout icon={ExclamationTriangleIcon} color="amber" title="Graphique des vues">
          Seul vous pouvez voir ce graphique. Il montre le nombre de vues de votre annonce chaque jour depuis sa mise en ligne.
        </Callout>
        <AreaChart
          className="mt-4 h-72"
          data={history?.map((h) => ({
            date: format(new Date(h.createdAt), 'dd/MM', {
              locale: fr,
            }),
            vues: h.seenCount,
          }))}
          index="date"
          categories={['vues']}
          colors={['amber']}
          // valueFormatter={dataFormatter}
        />
      </Card>
    </div>
  );
}
