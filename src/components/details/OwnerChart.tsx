'use client';

import { useParams } from 'next/navigation';
import { ExclamationTriangleIcon } from '@heroicons/react/20/solid';
import { History } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

import { useMe } from '$/hooks/useMe';
import { Alert, AlertDescription, AlertTitle } from '$/components/ui/alert';
import { Card } from '$/components/ui/card';
import OwnerAreaChart from '$/components/charts/OwnerAreaChart';

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
    return <div className="flex items-center gap-2 border-b border-primary py-4 italic">Chargement du graphique...</div>;
  }

  if (!me || !history) return null;

  const chartData = history?.map((h) => ({
    date: format(new Date(h.createdAt), 'dd/MM', {
      locale: fr,
    }),
    clics: h.seenCount,
  }));

  return (
    <div className="flex items-center gap-2 border-b border-primary py-4">
      <Card className="w-full">
        <Alert>
          <ExclamationTriangleIcon className="size-4" />
          <AlertTitle>Graphique des clics</AlertTitle>
          <AlertDescription>
            Seul vous pouvez voir ce graphique. Il montre le nombre de clics de votre annonce chaque jour depuis sa mise en ligne.
          </AlertDescription>
        </Alert>
        <OwnerAreaChart data={chartData} />
      </Card>
    </div>
  );
}
