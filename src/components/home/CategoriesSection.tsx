import { BoltIcon, CubeIcon, RocketLaunchIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { CrosshairIcon } from 'lucide-react';
import Link from 'next/link';

import { cn } from '$/utils/cn';
import { ListingsTypeOptions } from '$/utils/pocketbase/pocketbase-types';

const categories = [
  {
    name: 'AEG',
    description: 'Répliques électriques automatiques, le choix le plus populaire pour leur fiabilité et performance.',
    href: `/annonces/${ListingsTypeOptions.aeg.toLowerCase()}`,
    icon: BoltIcon,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'GBBR',
    description: 'Répliques à gaz avec un réalisme accru grâce au système de recul et au fonctionnement blow-back.',
    href: `/annonces/${ListingsTypeOptions.gbbr.toLowerCase()}`,
    icon: RocketLaunchIcon,
    color: 'from-pink-500 to-purple-500',
  },
  {
    name: 'GBB',
    description: 'Répliques à gaz avec un réalisme accru grâce au système de recul et au fonctionnement blow-back.',
    href: `/annonces/${ListingsTypeOptions.gbb.toLowerCase()}`,
    icon: RocketLaunchIcon,
    color: 'from-purple-500 to-pink-500',
  },
  {
    name: 'HPA',
    description: 'Systèmes haute pression offrant une performance et une fiabilité exceptionnelles.',
    href: `/annonces/${ListingsTypeOptions.hpa.toLowerCase()}`,
    icon: SparklesIcon,
    color: 'from-orange-500 to-yellow-500',
  },
  {
    name: 'Sniper',
    description: "Répliques de précision, à gaz ou spring pour les tireurs d'élite, parfaites pour les parties en extérieur.",
    href: `/annonces/${ListingsTypeOptions.sniper.toLowerCase()}`,
    icon: CrosshairIcon,
    color: 'from-green-500 to-emerald-500',
  },
  {
    name: 'Gear',
    description: 'Équipements tactiques, protections, vestes, holsters et accessoires pour compléter votre loadout.',
    href: `/annonces/${ListingsTypeOptions.gear.toLowerCase()}`,
    icon: CubeIcon,
    color: 'from-red-500 to-rose-500',
  },
];

export default function CategoriesSection() {
  return (
    <div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">Catégories</h2>
          <p className="mt-2 font-brand text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Trouvez l&apos;équipement qui vous correspond
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Des répliques aux accessoires, découvrez notre large sélection d&apos;équipements d&apos;airsoft d&apos;occasion.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="relative isolate flex flex-col justify-between overflow-hidden rounded-2xl bg-muted/50 px-8 pb-8 pt-20 hover:bg-muted/80"
              >
                <div
                  className={cn(
                    'absolute inset-0 -z-10 bg-gradient-to-br opacity-10 transition-opacity duration-300',
                    category.color,
                  )}
                />
                <div
                  className={cn(
                    'absolute left-0 top-0 size-24 -translate-x-8 -translate-y-8 rounded-full bg-gradient-to-br opacity-50',
                    category.color,
                  )}
                />
                <category.icon className="size-8 text-foreground" aria-hidden="true" />
                <div>
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-foreground">
                    <span className="absolute inset-0" />
                    {category.name}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{category.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
