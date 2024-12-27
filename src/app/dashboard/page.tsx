import { currentUser } from '@clerk/nextjs';
import { ArrowTrendingUpIcon, CalendarIcon, EyeIcon, StarIcon } from '@heroicons/react/24/outline';

import { prisma } from '$/utils/db';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$/components/ui/card';

import Charts from './Charts';

async function Page() {
  const user = await currentUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  const dbUser = await prisma.user.findUnique({
    where: { clerkId: user.id },
    include: {
      Listing: {
        include: {
          History: true,
        },
      },
      ratings: {
        include: {
          from: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: 5,
      },
    },
  });

  if (!dbUser) {
    throw new Error('User not found');
  }

  const totalListings = dbUser.Listing.length;
  const activeListings = dbUser.Listing.filter((l) => !l.sold).length;
  const soldListings = dbUser.Listing.filter((l) => l.sold).length;
  const averageRating =
    dbUser.ratings.length > 0 ? dbUser.ratings.reduce((acc, r) => acc + r.rating, 0) / dbUser.ratings.length : 0;

  // Calculate average views per listing
  const avgViewsPerListing =
    totalListings > 0 ? Math.round(dbUser.Listing.reduce((acc, l) => acc + l.seenCount, 0) / totalListings) : 0;

  const stats = [
    {
      name: 'Annonces vendues',
      value: soldListings,
      description: `${((soldListings / totalListings) * 100).toFixed(0)}% de vos annonces`,
      icon: ArrowTrendingUpIcon,
    },
    {
      name: 'Vues moyennes',
      value: avgViewsPerListing,
      description: 'par annonce',
      icon: EyeIcon,
    },
    {
      name: 'Note moyenne',
      value: averageRating.toFixed(1),
      description: `basée sur ${dbUser.ratings.length} évaluations`,
      icon: StarIcon,
    },
    {
      name: 'Dernière annonce',
      value:
        dbUser.Listing.length > 0
          ? new Date(Math.max(...dbUser.Listing.map((l) => l.createdAt.getTime()))).toLocaleDateString('fr-FR')
          : '-',
      description: 'date de création',
      icon: CalendarIcon,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
              <stat.icon className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Vue d&apos;ensemble</CardTitle>
            <CardDescription>Nombre de vues sur vos annonces au fil du temps</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <Charts />
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Dernières évaluations</CardTitle>
            <CardDescription>Les 5 dernières évaluations reçues</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {dbUser.ratings.map((rating) => (
                <div key={rating.id} className="flex items-center">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{rating.from.username || rating.from.firstName}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <StarIcon
                            key={i}
                            className={`size-4 ${i < rating.rating ? 'fill-primary text-primary' : 'text-muted-foreground'}`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">{new Date(rating.createdAt).toLocaleDateString()}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{rating.text}</p>
                  </div>
                </div>
              ))}
              {dbUser.ratings.length === 0 && <p className="text-sm text-muted-foreground">Aucune évaluation pour le moment</p>}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Page;
