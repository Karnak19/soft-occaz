import { Gift, Medal, Star, Trophy, UserPlusIcon, UsersIcon } from 'lucide-react';

import StepsCard from '$/components/StepsCard';
import UserAvatar from '$/components/UserAvatar';
import RecommendedBadge from '$/components/badges/RecommendedBadge';
import TierBadge from '$/components/badges/TierBadge';
import { Alert, AlertDescription, AlertTitle } from '$/components/ui/alert';
import { Badge } from '$/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '$/components/ui/card';
import { Separator } from '$/components/ui/separator';
import { cn } from '$/utils/cn';
import type { ReferralTiersResponse, UsersResponse } from '$/utils/pocketbase/pocketbase-types';
import { createServerClient } from '$/utils/pocketbase/server';

export const metadata = {
  title: 'Programme de parrainage - Airsoft Market',
  description:
    'Parrainez vos amis sur Airsoft Market et gagnez des récompenses exclusives. Plus vous parrainez, plus vous gagnez !',
};

const steps = [
  {
    title: 'Partagez votre code',
    description: "Trouvez votre code de parrainage unique dans votre profil et partagez-le avec vos amis passionnés d'airsoft",
    icon: UserPlusIcon,
  },
  {
    title: "Vos amis s'inscrivent",
    description: 'Ils créent leur compte en utilisant votre code de parrainage lors de leur inscription',
    icon: UsersIcon,
  },
  {
    title: 'Vous êtes récompensés',
    description: 'Vous gagnez des avantages exclusifs et votre filleul obtient des fonctionnalités spéciales pour bien démarrer',
    icon: Gift,
  },
] as const;

const benefits = [
  {
    title: 'Pour le parrain',
    icon: Trophy,
    items: [
      'Badges exclusifs selon votre nombre de parrainages',
      "Photos supplémentaires par annonce (jusqu'à 9 photos)",
      "D'autres avantages à venir...",
    ],
  },
  {
    title: 'Pour le filleul',
    icon: Star,
    items: [
      '5 photos pour votre première annonce',
      {
        text: 'Badge "Nouveau membre recommandé"',
        badge: <RecommendedBadge size="xs" />,
      },
      "D'autres avantages à venir...",
    ],
  },
];

const tiers = [
  {
    tier: 'master' as const,
    required: 25,
    icon: Trophy,
    gradient: 'bg-gradient-to-br from-purple-500/20 to-purple-900/30 hover:from-purple-500/30 hover:to-purple-900/40',
    benefits: '9 photos par annonce',
    description: 'Le niveau ultime pour les parrains les plus actifs',
  },
  {
    tier: 'gold' as const,
    required: 10,
    icon: Medal,
    gradient: 'bg-gradient-to-br from-yellow-400/20 to-yellow-600/30 hover:from-yellow-400/30 hover:to-yellow-600/40',
    benefits: '7 photos par annonce',
    description: 'Un statut prestigieux avec des avantages conséquents',
  },
  {
    tier: 'silver' as const,
    required: 5,
    icon: Medal,
    gradient: 'bg-gradient-to-br from-gray-300/20 to-gray-500/30 hover:from-gray-300/30 hover:to-gray-500/40',
    benefits: '5 photos par annonce',
    description: 'Des avantages significatifs pour vos annonces',
  },
  {
    tier: 'bronze' as const,
    required: 1,
    icon: Medal,
    gradient: 'bg-gradient-to-br from-amber-600/20 to-amber-800/30 hover:from-amber-600/30 hover:to-amber-800/40',
    benefits: '4 photos par annonce',
    description: 'Vos premiers pas dans le programme de parrainage',
  },
] as const;

type Tier = 'master' | 'gold' | 'silver' | 'bronze' | 'none';

export const revalidate = 86400; // 1 day

export default async function LeaderboardPage() {
  const pb = await createServerClient();

  const topReferrers = await pb.collection('referral_tiers').getFullList<ReferralTiersResponse<Tier, { user: UsersResponse }>>({
    sort: '-referral_count',
    expand: 'user',
    filter: 'referral_count > 0',
  });

  return (
    <div className="container mx-auto space-y-12 px-4 py-12">
      <div className="mx-auto max-w-3xl space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">Programme de parrainage</h1>
        <p className="text-lg text-muted-foreground">
          Faites grandir la communauté Airsoft Market en invitant vos amis. Gagnez des avantages exclusifs et aidez vos filleuls à
          démarrer avec des fonctionnalités spéciales !
        </p>
      </div>

      <Alert className="mx-auto max-w-3xl border-2 border-primary/20 bg-primary/5">
        <AlertTitle className="flex items-center gap-2">
          <UserPlusIcon className="h-4 w-4" />
          Comment commencer ?
        </AlertTitle>
        <AlertDescription className="mt-2">
          Rendez-vous sur votre profil pour trouver votre code de parrainage unique. Partagez-le avec vos amis pour qu'ils
          puissent l'utiliser lors de leur inscription.
        </AlertDescription>
      </Alert>

      <div className="mx-auto max-w-4xl">
        <StepsCard
          title="Comment ça marche ?"
          description="Un processus simple en 3 étapes pour parrainer vos amis"
          steps={steps}
        />
      </div>

      <Separator className="mx-auto my-8 max-w-md" />

      <div className="mx-auto max-w-4xl space-y-4 text-center">
        <h2 className="text-3xl font-bold">Avantages du parrainage</h2>
        <p className="text-muted-foreground">Découvrez ce que vous et vos amis pouvez gagner</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {benefits.map((section) => (
          <Card key={section.title} className="overflow-hidden transition-all duration-300 hover:shadow-md">
            <CardHeader className="bg-muted/50 pb-4">
              <CardTitle className="flex items-center gap-2">
                <section.icon className="h-5 w-5 text-primary" />
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-3">
                {section.items.map((item, index) => (
                  <li key={typeof item === 'string' ? item : `item-${index}`} className="flex items-start gap-2">
                    <span className="mt-1 text-primary">•</span>
                    {typeof item === 'string' ? (
                      <span>{item}</span>
                    ) : (
                      <div className="flex flex-col gap-1.5">
                        <span>{item.text}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">Exemple:</span>
                          {item.badge}
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <Separator className="mx-auto my-8 max-w-md" />

      <div className="mx-auto max-w-4xl space-y-4 text-center">
        <h2 className="text-3xl font-bold">Niveaux de parrainage</h2>
        <p className="text-muted-foreground">Plus vous parrainez, plus vos avantages sont importants</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {tiers.map((tier) => (
          <Card
            key={tier.tier}
            className={cn('relative overflow-hidden transition-all duration-300 hover:scale-102 hover:shadow-lg', tier.gradient)}
          >
            <div className="absolute right-3 top-3">
              <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
                {tier.required} {tier.required > 1 ? 'parrainages' : 'parrainage'}
              </Badge>
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <tier.icon className="h-5 w-5" />
                <TierBadge tier={tier.tier} showLabel />
              </CardTitle>
              <CardDescription>{tier.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-medium">{tier.benefits}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Separator className="mx-auto my-8 max-w-md" />

      <div className="mx-auto max-w-4xl space-y-4 text-center">
        <h2 className="text-3xl font-bold">Classement des parrains</h2>
        <p className="text-muted-foreground">Découvrez les membres les plus actifs de notre communauté</p>
      </div>

      <Card className="mx-auto max-w-4xl overflow-hidden" id="leaderboard">
        <CardHeader className="bg-muted/50">
          <CardTitle>Top des parrains</CardTitle>
          <CardDescription>Les membres qui contribuent le plus à la croissance de la communauté</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {topReferrers.map((referrer, index) => {
              if (!referrer.expand?.user) return null;
              const user = referrer.expand.user;

              return (
                <div
                  key={referrer.id}
                  className={cn('flex items-center justify-between p-4 transition-colors hover:bg-muted/50', {
                    'bg-gradient-to-r from-yellow-500/10 to-transparent': index === 0,
                    'bg-gradient-to-r from-gray-400/10 to-transparent': index === 1,
                    'bg-gradient-to-r from-amber-700/10 to-transparent': index === 2,
                  })}
                >
                  <div className="flex items-center gap-4">
                    {index < 3 && (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                        <span className="text-sm font-bold">{index + 1}</span>
                      </div>
                    )}
                    <UserAvatar user={user} />
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {referrer.referral_count} parrainage
                        {referrer.referral_count > 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                  {referrer.tier && <TierBadge tier={referrer.tier} />}
                </div>
              );
            })}

            {!topReferrers.length && (
              <div className="py-12 text-center">
                <Gift className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
                <p className="text-lg font-medium">Soyez le premier à parrainer un ami !</p>
                <p className="mt-2 text-sm text-muted-foreground">Commencez dès maintenant et prenez la tête du classement</p>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="bg-muted/30 py-3 text-center text-sm text-muted-foreground">
          Le classement est mis à jour quotidiennement
        </CardFooter>
      </Card>
    </div>
  );
}
