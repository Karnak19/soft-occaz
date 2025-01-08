import ProductCard from '$/components/product/ProductCard';
import { Card } from '$/components/ui/card';
import type { FavoritesResponse, ListingsResponse, UsersResponse } from '$/utils/pocketbase/pocketbase-types';
import { auth, createServerClient } from '$/utils/pocketbase/server';

export const metadata = {
  title: 'Mes favoris',
};

export default async function FavoritesPage() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const pb = await createServerClient();

  const favorites = await pb
    .collection('favorites')
    .getFullList<FavoritesResponse<{ listing: ListingsResponse<string[], { user: UsersResponse }> }>>({
      filter: `user = "${userId}"`,
      expand: 'listing.user',
      sort: '-created',
    });

  if (!favorites.length) {
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
        {favorites.map((fav) => {
          if (!fav.expand?.listing) return null;

          return (
            <li key={fav.id}>
              <ProductCard {...fav.expand?.listing} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
