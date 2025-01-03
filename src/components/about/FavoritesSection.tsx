import { HeartIcon as HeartOutlineIcon } from '@heroicons/react/24/outline';
import { HeartIcon } from '@heroicons/react/24/solid';
import { ListIcon, SearchIcon } from 'lucide-react';

const features = [
  {
    name: 'Sauvegardez vos annonces préférées',
    description: 'Ajoutez les annonces qui vous intéressent à vos favoris pour les retrouver facilement plus tard.',
    icon: HeartIcon,
  },
  {
    name: 'Comparaison simplifiée',
    description: 'Comparez facilement les annonces sauvegardées pour faire le meilleur choix.',
    icon: SearchIcon,
  },
  {
    name: 'Accès rapide',
    description: 'Retrouvez toutes vos annonces favorites depuis votre tableau de bord.',
    icon: HeartOutlineIcon,
  },
  {
    name: 'Liste organisée',
    description: 'Gardez une vue claire sur les annonces qui vous intéressent, triées par catégorie.',
    icon: ListIcon,
  },
];

export default function FavoritesSection() {
  return (
    <div className="py-24 sm:py-32" id="favorites">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">Annonces favorites</h2>
          <p className="mt-2 font-brand text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Gardez un œil sur les meilleures offres
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Notre système de favoris vous permet de sauvegarder les annonces qui vous intéressent. Comparez facilement les offres
            et retrouvez-les rapidement quand vous êtes prêt à acheter.
          </p>
        </div>

        {/* Example */}
        <div className="mx-auto mt-16 max-w-2xl rounded-3xl bg-muted/50 p-8 ring-1 ring-muted sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
          <div className="mx-auto max-w-xl lg:mx-0 lg:flex-auto">
            <div className="flex items-center gap-x-2">
              <HeartIcon className="size-5 text-red-500" />
              <span className="font-semibold text-foreground">M4 VFC Avalon Calibur - État neuf</span>
            </div>
            <div className="mt-6 space-y-6 text-base leading-7 text-muted-foreground">
              <div className="flex items-center gap-x-2">
                <HeartOutlineIcon className="size-5 text-amber-500" />
                <span className="font-semibold text-foreground">Ajoutée aux favoris</span>
              </div>
              <p>
                Réplique haut de gamme en excellent état, vendue avec 3 chargeurs et une mallette de transport. Upgrades
                Prometheus.
              </p>
              <p className="text-sm">
                <span className="font-semibold text-foreground">450€</span> • Publiée il y a 2 heures
              </p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-foreground">
                  <feature.icon className="size-5 flex-none text-amber-500" aria-hidden="true" />
                  {feature.name}
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
