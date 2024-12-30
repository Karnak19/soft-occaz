'use client';

import { useParams } from 'next/navigation';
import { ExclamationTriangleIcon } from '@heroicons/react/20/solid';
import { useQuery } from '@tanstack/react-query';

import { calculateListingHistory } from '$/utils/calculate-listing-history';
import { Alert, AlertDescription, AlertTitle } from '$/components/ui/alert';
import { Card } from '$/components/ui/card';
import OwnerAreaChart from '$/components/charts/OwnerAreaChart';
import { usePocketbase, useUser } from '$/app/pocketbase-provider';

export default function OwnerChart() {
  const me = useUser();
  const params = useParams();
  const { pb } = usePocketbase();

  const { data, isLoading } = useQuery({
    queryKey: ['listing', params.id, 'seenCount'],
    queryFn: () => calculateListingHistory(pb, params.id as string),
    enabled: !!me?.id && !!params.id,
    retry: false,
  });

  if (isLoading) {
    return <div className="flex items-center gap-2 border-b border-primary py-4 italic">Chargement du graphique...</div>;
  }

  if (!me || !history) return null;

  return (
    <Card>
      <Alert className="rounded-b-none rounded-t-xl border-x-0 border-t-0">
        <ExclamationTriangleIcon className="size-4" />
        <AlertTitle>Graphique des clics</AlertTitle>
        <AlertDescription>
          Seul vous pouvez voir ce graphique. Il montre le nombre de clics de votre annonce chaque jour depuis sa mise en ligne.
        </AlertDescription>
      </Alert>
      <OwnerAreaChart data={data?.history} />
    </Card>
  );
}
