import { currentUser } from '@clerk/nextjs';
import { BanknotesIcon, ScaleIcon, ChartBarIcon, ChartPieIcon, CircleStackIcon } from '@heroicons/react/24/outline';

import { Card, CardHeader, CardTitle, CardContent } from '$/components/ui/card';
import { prisma } from '$/utils/db';
import { getMaxListingsCount } from '$/utils/getMaxListingsCount';
import { cn } from '$/utils/cn';

export async function Cards({ user }: { user: NonNullable<Awaited<ReturnType<typeof currentUser>>> }) {
  const { Listing: listings, ...me } = await prisma.user.findUniqueOrThrow({
    where: { clerkId: user.id },
    include: { Listing: true },
  });

  const count = listings.length;
  const maxCount = getMaxListingsCount(me.sub);

  const sold = listings.filter((listing) => listing.sold);
  const pending = listings.filter((listing) => !listing.sold);

  const soldValue = sold.reduce((acc, listing) => acc + listing.price, 0);
  const pendingValue = pending.reduce((acc, listing) => acc + listing.price, 0);

  const views = listings.reduce((acc, listing) => acc + listing.seenCount, 0);
  const averageViews = views / listings.length;

  const cards = [
    {
      icon: BanknotesIcon,
      name: 'Revenus totaux',
      content: `${soldValue.toFixed(2)} €`,
      description: 'Somme total de toutes vos ventes',
    },
    {
      icon: ScaleIcon,
      name: 'Encours',
      content: `${pendingValue.toFixed(2)} €`,
      description: 'Valeur totale des annonces en cours de vente',
    },
    {
      icon: ChartBarIcon,
      name: 'Vues totales',
      content: `${views} vues`,
    },
    {
      icon: ChartPieIcon,
      name: 'Vues moyennes',
      content: `${averageViews.toFixed(1)} vues`,
    },
    {
      icon: CircleStackIcon,
      name: "Nombre d'annonces",
      content: `${count}/${maxCount} annonces`,
      classNames: {
        text: cn({
          'text-amber-500': count <= (typeof maxCount === 'number' ? maxCount * 0.5 : 0),
          'text-red-500': count <= (typeof maxCount === 'number' ? maxCount * 0.8 : 0),
        }),
        ring: cn({
          'ring-1 ring-amber-500': count <= (typeof maxCount === 'number' ? maxCount * 0.5 : 0),
          'ring-1 ring-red-500': count <= (typeof maxCount === 'number' ? maxCount * 0.8 : 0),
        }),
      },
    },
  ];
  return (
    <section aria-labelledby="quick-links-title">
      <div className="overflow-y-visible rounded-lg sm:grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 sm:gap-5">
        <h2 className="sr-only" id="quick-links-title">
          Quick links
        </h2>
        {cards.map((action, actionIdx) => (
          <Card key={actionIdx} className={action.classNames?.ring}>
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>{action.name}</CardTitle>
              <action.icon className="flex-shrink-0 w-5 h-5 text-muted-foreground" aria-hidden="true" />
            </CardHeader>
            <CardContent>
              <div className={cn('text-2xl font-bold', action.classNames?.text)}>{action.content}</div>
              {action.description && <p className="text-xs tracking-tight text-muted-foreground">{action.description}</p>}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
