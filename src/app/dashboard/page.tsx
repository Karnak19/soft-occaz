import { currentUser } from '@clerk/nextjs';
import { BanknotesIcon, ScaleIcon } from '@heroicons/react/24/outline';
import { ChatBubbleLeftEllipsisIcon, PencilSquareIcon } from '@heroicons/react/20/solid';

import { Card, CardContent, CardHeader, CardTitle } from '$/components/ui/card';
import { prisma } from '$/utils/db';

async function Page() {
  const _user = await currentUser();

  if (!_user) {
    throw new Error('Unauthorized');
  }

  const listings = await prisma.listing.findMany({
    where: { user: { clerkId: _user.id } },
    orderBy: { createdAt: 'desc' },
  });

  const sold = listings.filter((listing) => listing.sold);
  const pending = listings.filter((listing) => !listing.sold);

  const soldValue = sold.reduce((acc, listing) => acc + listing.price, 0);
  const pendingValue = pending.reduce((acc, listing) => acc + listing.price, 0);

  const cards = [
    {
      icon: BanknotesIcon,
      name: 'Revenues totaux',
      content: `${soldValue.toFixed(2)} €`,
    },
    {
      icon: ScaleIcon,
      name: 'Encours',
      content: `${pendingValue.toFixed(2)} €`,
      description: 'Valeur totale des annonces en cours de vente',
    },
    {
      icon: ChatBubbleLeftEllipsisIcon,
      name: 'Chats',
    },
    {
      icon: PencilSquareIcon,
      name: 'Éditer mes informations',
    },
  ];

  return (
    <section aria-labelledby="quick-links-title">
      <div className="overflow-hidden rounded-lg sm:grid sm:grid-cols-4 sm:gap-5 p-2">
        <h2 className="sr-only" id="quick-links-title">
          Quick links
        </h2>
        {cards.map((action, actionIdx) => (
          <Card key={actionIdx}>
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>{action.name}</CardTitle>
              <action.icon className="flex-shrink-0 w-5 h-5 text-gray-400" aria-hidden="true" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{action.content}</div>
              {action.description && <p className="text-xs tracking-tight text-muted-foreground">{action.description}</p>}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default Page;
