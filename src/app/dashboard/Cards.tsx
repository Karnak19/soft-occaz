import { currentUser } from '@clerk/nextjs';
import { BanknotesIcon, ChartBarIcon, ChartPieIcon, CircleStackIcon, ScaleIcon } from '@heroicons/react/24/outline';

import { cn } from '$/utils/cn';
import { prisma } from '$/utils/db';
import { getMaxListingsCount } from '$/utils/getMaxListingsCount';
import { Card, CardContent, CardHeader, CardTitle } from '$/components/ui/card';

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
      description: 'Somme totale de toutes vos ventes',
    },
    {
      icon: ScaleIcon,
      name: 'Encours',
      content: `${pendingValue.toFixed(2)} €`,
      description: 'Valeur totale des annonces en cours de vente',
    },
    {
      icon: ChartBarIcon,
      name: 'Clics totaux',
      content: `${views} clics`,
    },
    {
      icon: ChartPieIcon,
      name: 'Clics moyens',
      content: `${averageViews.toFixed(1)} clics`,
    },
    {
      icon: CircleStackIcon,
      name: "Nombre d'annonces",
      content: `${count}/${maxCount} annonces`,
      classNames: {
        text: cn({
          'text-amber-500': count >= (typeof maxCount === 'number' ? maxCount * 0.7 : Infinity),
          'text-red-500': count >= (typeof maxCount === 'number' ? maxCount * 0.9 : Infinity),
        }),
        ring: cn({
          'ring-1 ring-amber-500': count >= (typeof maxCount === 'number' ? maxCount * 0.7 : Infinity),
          'ring-1 ring-red-500': count >= (typeof maxCount === 'number' ? maxCount * 0.9 : Infinity),
        }),
      },
    },
  ];

  return (
    <section className="col-span-full sm:col-span-3" aria-labelledby="quick-links-title">
      <div className="grid grid-cols-2 gap-2 overflow-y-visible rounded-lg sm:gap-3 sm:space-y-0 lg:grid-cols-6">
        {cards.map((action, actionIdx) => {
          const isFirst = actionIdx === 0;
          const isSecond = actionIdx === 1;

          return (
            <Card
              key={actionIdx}
              className={cn('lg:col-span-2', action.classNames?.ring, {
                'col-span-2': isFirst,
                'lg:col-span-3': isFirst || isSecond,
              })}
            >
              <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle>{action.name}</CardTitle>
                <action.icon className="size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
              </CardHeader>
              <CardContent>
                <div className={cn('text-2xl font-bold', action.classNames?.text)}>{action.content}</div>
                {action.description && <p className="text-xs tracking-tight text-muted-foreground">{action.description}</p>}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
