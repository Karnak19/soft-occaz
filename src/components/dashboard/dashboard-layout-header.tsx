import { Suspense } from 'react';
import { BanknotesIcon, ScaleIcon } from '@heroicons/react/24/outline';
import { BadgeCheckIcon, DatabaseIcon, StarIcon } from 'lucide-react';

import { cn } from '$/utils/cn';
import { TypedPocketBase, UsersResponse } from '$/utils/pocketbase/pocketbase-types';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

export async function DashboardLayoutHeader({ pb, user }: { pb: TypedPocketBase; user: UsersResponse }) {
  return (
    <header className="grid grid-cols-2 gap-2 sm:grid-cols-5">
      <Suspense fallback={<CardSkeleton />}>
        <Profile pb={pb} user={user} />
      </Suspense>

      <Suspense fallback={<CardSkeleton />}>
        <TotalMoneyWon pb={pb} userId={user.id} />
      </Suspense>

      <Suspense fallback={<CardSkeleton />}>
        <OutstandingListings pb={pb} userId={user.id} />
      </Suspense>

      <Suspense fallback={<CardSkeleton />}>
        <ListingsCount pb={pb} userId={user.id} />
      </Suspense>
    </header>
  );
}

async function Profile({ pb, user }: { pb: TypedPocketBase; user: UsersResponse }) {
  const ratings = await pb.collection('ratings').getFullList({
    filter: `user = "${user.id}"`,
  });

  const rating = ratings.reduce((acc, rating) => acc + rating.rating, 0) / ratings.length;

  return (
    <Card className="col-span-full sm:col-span-2">
      <CardHeader className="flex flex-row items-center gap-2">
        <Avatar className="size-12">
          <AvatarImage src={pb.files.getURL(user, user.avatar)} />
          <AvatarFallback>{user.name?.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <CardTitle>{user.name}</CardTitle>
          <CardDescription>{user.email}</CardDescription>
        </div>
        <div>{user.verified ? <BadgeCheckIcon className="size-5 text-primary" /> : null}</div>
      </CardHeader>
      <CardContent className="flex flex-row items-center justify-between gap-2">
        <div className="flex flex-row items-center gap-1 ">
          {new Array(5).fill(0).map((_, index) => (
            <StarIcon
              key={index}
              className={cn('size-5', index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground')}
            />
          ))}
        </div>
        <div className="">
          <p className="text-2xl font-bold">{rating.toFixed(2)}</p>
          <p className="text-xs text-muted-foreground">Note moyenne</p>
        </div>
      </CardContent>
    </Card>
  );
}

async function TotalMoneyWon({ pb, userId }: { pb: TypedPocketBase; userId: string }) {
  const totalMoneyWon = await pb.collection('listings').getFullList({
    filter: `user = "${userId}" && sold_to != null`,
    requestKey: 'total-money-won',
  });

  const total = totalMoneyWon.reduce((acc, listing) => acc + listing.price, 0);

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row items-center justify-between">
          <CardTitle>Revenus générés</CardTitle>
          <BanknotesIcon className="size-5 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{total.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</p>
        <p className="text-xs text-muted-foreground">Somme totale de toutes vos ventes ({totalMoneyWon.length} ventes)</p>
      </CardContent>
    </Card>
  );
}

async function OutstandingListings({ pb, userId }: { pb: TypedPocketBase; userId: string }) {
  const outstandingListings = await pb.collection('listings').getFullList({
    filter: `user = "${userId}" && sold_to = null`,
    requestKey: 'outstanding-listings',
  });

  const total = outstandingListings.reduce((acc, listing) => acc + listing.price, 0);

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row items-center justify-between">
          <CardTitle>Encours</CardTitle>
          <ScaleIcon className="size-5 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{total.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</p>
        <p className="text-xs text-muted-foreground">Valeur totale de vos annonces en attente de vente</p>
      </CardContent>
    </Card>
  );
}

async function ListingsCount({ pb, userId }: { pb: TypedPocketBase; userId: string }) {
  const listingsCount = await pb.collection('listings').getList(1, 1, {
    filter: `user = "${userId}"`,
    requestKey: 'listings-count',
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row items-center justify-between">
          <CardTitle>Annonces</CardTitle>
          <DatabaseIcon className="size-5 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{listingsCount.totalItems}</p>
        <p className="text-xs text-muted-foreground">Nombre d&apos;annonces</p>
      </CardContent>
    </Card>
  );
}

function CardSkeleton() {
  return <Skeleton className="size-full rounded-xl border border-border bg-card" />;
}
