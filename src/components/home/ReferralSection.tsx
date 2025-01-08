import { Medal, Trophy, UserPlusIcon, UsersIcon } from 'lucide-react';
import Link from 'next/link';

import StepsCard from '$/components/StepsCard';
import TierBadge from '$/components/badges/TierBadge';
import { Button } from '$/components/ui/button';

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

export default function ReferralSection() {
  return (
    <section className="container space-y-8">
      <div className="mx-auto max-w-3xl space-y-4 text-center">
        <h2 className="text-4xl font-bold">Programme de parrainage</h2>
        <p className="text-lg text-muted-foreground">
          Invitez vos amis à rejoindre Airsoft Market et gagnez des badges exclusifs. Plus vous parrainez, plus votre statut est
          élevé !
        </p>
      </div>

      <StepsCard title="Comment ça marche ?" description="Suivez ces étapes simples pour commencer à parrainer" steps={steps} />

      <div className="grid gap-4 md:grid-cols-4">
        {tiers.map((tier) => (
          <div key={tier.tier} className={`rounded-lg p-6 transition-all duration-300 hover:scale-105 ${tier.gradient}`}>
            <div className="flex items-center gap-2">
              <tier.icon className="size-5" />
              <TierBadge tier={tier.tier} showLabel />
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              {tier.required} {tier.required > 1 ? 'parrainages requis' : 'parrainage requis'}
            </p>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Button asChild size="lg">
          <Link href="/leaderboard">Voir le classement</Link>
        </Button>
      </div>
    </section>
  );
}
