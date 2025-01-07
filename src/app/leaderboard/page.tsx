import { Medal, Trophy, UserPlusIcon, UsersIcon } from 'lucide-react';

import { cn } from '$/utils/cn';
import { createServerClient } from '$/utils/pocketbase/server';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$/components/ui/card';
import TierBadge from '$/components/badges/TierBadge';
import StepsCard from '$/components/StepsCard';
import UserAvatar from '$/components/UserAvatar';

export const metadata = {
  title: 'Classement des parrainages',
};

const steps = [
  {
    title: 'Invitez vos amis',
    description: 'Partagez votre code de parrainage avec vos amis',
    icon: UserPlusIcon,
  },
  {
    title: 'Ils rejoignent',
    description: "Ils s'inscrivent en utilisant votre code",
    icon: UsersIcon,
  },
  {
    title: 'Gagnez des badges',
    description: 'Débloquez des badges exclusifs selon votre nombre de parrainages',
    icon: Medal,
  },
] as const;

const tiers = [
  {
    tier: 'master' as const,
    required: 25,
    icon: Trophy,
    gradient: 'bg-gradient-to-br from-purple-500/10 to-purple-900/20',
  },
  {
    tier: 'gold' as const,
    required: 10,
    icon: Medal,
    gradient: 'bg-gradient-to-br from-yellow-400/10 to-yellow-600/20',
  },
  {
    tier: 'silver' as const,
    required: 5,
    icon: Medal,
    gradient: 'bg-gradient-to-br from-gray-300/10 to-gray-500/20',
  },
  {
    tier: 'bronze' as const,
    required: 1,
    icon: Medal,
    gradient: 'bg-gradient-to-br from-amber-600/10 to-amber-800/20',
  },
] as const;

export default async function LeaderboardPage() {
  const pb = await createServerClient();

  const topReferrers = await pb.collection('referral_tiers').getFullList({
    sort: '-referral_count',
    expand: 'user',
    filter: 'referral_count > 0',
  });

  return (
    <div className="container mx-auto space-y-8 px-4 py-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Programme de parrainage</h1>
        <p className="text-lg text-muted-foreground">
          Invitez vos amis à rejoindre Airsoft Market et gagnez des badges exclusifs. Plus vous parrainez, plus votre statut est
          élevé !
        </p>
      </div>

      <StepsCard title="Comment ça marche ?" description="Suivez ces étapes simples pour commencer à parrainer" steps={steps} />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {tiers.map((tier) => (
          <Card key={tier.tier} className={cn('transition-all duration-300 hover:scale-105', tier.gradient)}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <tier.icon className="size-5" />
                <TierBadge tier={tier.tier} showLabel />
              </CardTitle>
              <CardDescription>
                {tier.required} {tier.required > 1 ? 'parrainages requis' : 'parrainage requis'}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Classement</CardTitle>
          <CardDescription>Les meilleurs parrains de la communauté</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {topReferrers.map((referrer, index) => {
              if (!referrer.expand?.user) return null;
              const user = referrer.expand.user;

              return (
                <div
                  key={referrer.id}
                  className={cn('flex items-center justify-between py-4 transition-colors', {
                    'rounded-t-lg': index === 0,
                    'rounded-b-lg': index === topReferrers.length - 1,
                  })}
                >
                  <div className="flex items-center gap-4">
                    <UserAvatar user={user} />
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {referrer.referral_count} parrainage{referrer.referral_count > 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                  <TierBadge tier={referrer.tier} />
                </div>
              );
            })}

            {!topReferrers.length && (
              <div className="py-8 text-center">
                <p className="text-sm text-muted-foreground">Aucun parrainage pour le moment</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
