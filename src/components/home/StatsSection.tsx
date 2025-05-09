import { Suspense } from 'react';

import { createStaticClient } from '$/utils/pocketbase/static';
import { Skeleton } from '../ui/skeleton';

export default function StatsSection() {
  return (
    <div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="font-brand text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Une nouvelle plateforme en pleine croissance
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Lancée en 2024, notre plateforme grandit chaque jour grâce à la confiance de nos utilisateurs.
            </p>
          </div>
          <Suspense fallback={<Skeleton className="bg-muted h-40" />}>
            <StatsTable />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

async function StatsTable() {
  const pb = await createStaticClient();

  const stats = await pb.collection('stats').getOne<{ users_count: number; listings_count: number }>('1');

  return (
    <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
      <div className="flex flex-col bg-muted/50 p-8">
        <dt className="text-sm font-semibold leading-6 text-muted-foreground">Utilisateurs inscrits</dt>
        <dd className="order-first font-brand text-3xl font-semibold tracking-tight text-foreground">
          {stats.users_count?.toLocaleString('fr-FR')}
        </dd>
      </div>
      <div className="flex flex-col bg-muted/50 p-8">
        <dt className="text-sm font-semibold leading-6 text-muted-foreground">Annonces en ligne</dt>
        <dd className="order-first font-brand text-3xl font-semibold tracking-tight text-foreground">
          {stats.listings_count?.toLocaleString('fr-FR')}
        </dd>
      </div>
      <div className="flex flex-col bg-muted/50 p-8">
        <dt className="text-sm font-semibold leading-6 text-muted-foreground">Temps de réponse moyen</dt>
        <dd className="order-first font-brand text-3xl font-semibold tracking-tight text-foreground">&lt; 24h</dd>
      </div>
      <div className="flex flex-col bg-muted/50 p-8">
        <dt className="text-sm font-semibold leading-6 text-muted-foreground">Disponibilité plateforme</dt>
        <dd className="order-first font-brand text-3xl font-semibold tracking-tight text-foreground">99.9%</dd>
      </div>
    </dl>
  );
}
