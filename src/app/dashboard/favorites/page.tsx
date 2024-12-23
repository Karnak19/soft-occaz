import { auth } from '@clerk/nextjs';

import { prisma } from '$/utils/db';
import { Card } from '$/components/ui/card';
import ProductCard from '$/components/product/ProductCard';

export const metadata = {
  title: 'Mes favoris',
};

export default async function FavoritesPage() {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: {
      favorites: {
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  if (!user?.favorites.length) {
    return (
      <Card className="grid place-items-center p-8">
        <div className="text-center">
          <h3 className="mt-2 text-sm font-semibold text-foreground">Aucun favori</h3>
          <p className="mt-1 text-sm text-muted-foreground">Commencez à ajouter des annonces à vos favoris.</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium">Mes favoris</h2>
        <p className="text-sm text-muted-foreground">Retrouvez ici toutes les annonces que vous avez ajoutées à vos favoris.</p>
      </div>

      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {user.favorites.map((listing) => (
          <li key={listing.id}>
            <ProductCard {...listing} href={`/annonces/details/${listing.id}`} />
          </li>
        ))}
      </ul>
    </div>
  );
}
