import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';

const features = [
  {
    name: 'Notation après transaction',
    description:
      "Une fois la transaction terminée, l'acheteur et le vendeur peuvent se noter mutuellement. Cette évaluation reflète leur expérience respective.",
  },
  {
    name: "Critères d'évaluation",
    description:
      'Les utilisateurs sont notés sur la communication, la fiabilité, et le respect des engagements. Pour les vendeurs, la qualité de la description et l&apos;état du produit sont également évalués.',
  },
  {
    name: 'Transparence totale',
    description:
      'Les notes et commentaires sont publics et vérifiés, permettant à la communauté de prendre des décisions éclairées.',
  },
];

export default function RatingSection() {
  return (
    <div className="py-24 sm:py-32" id="ratings">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">Confiance et transparence</h2>
          <p className="mt-2 font-brand text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Un système de notation complet
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Notre système de notation est conçu pour créer un environnement de confiance. Chaque transaction contribue à la
            réputation des utilisateurs, encourageant des échanges honnêtes et transparents.
          </p>
        </div>

        {/* Rating Example */}
        <div className="mx-auto mt-16 max-w-2xl rounded-3xl bg-muted/50 p-8 ring-1 ring-muted sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
          <div className="mx-auto max-w-xl lg:mx-0 lg:flex-auto">
            <div className="flex items-center gap-x-2">
              <div className="flex">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon key={rating} className={rating < 4 ? 'text-amber-500' : 'text-muted/25'} aria-hidden="true" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">(4.0/5 - 42 avis)</p>
            </div>
            <div className="mt-6 space-y-6 text-base leading-7 text-muted-foreground">
              <div className="flex items-center gap-x-2">
                <StarOutlineIcon className="size-5 text-amber-500" />
                <span className="font-semibold text-foreground">Vendeur fiable et sérieux</span>
              </div>
              <p>
                Communication rapide et efficace. La réplique était exactement comme décrite dans l&apos;annonce. Envoi soigné et
                bien protégé. Je recommande vivement ce vendeur !
              </p>
              <p className="text-sm">
                <span className="font-semibold text-foreground">Thomas D.</span> • Transaction du 15 janvier 2024
              </p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="text-base font-semibold leading-7 text-foreground">{feature.name}</dt>
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
