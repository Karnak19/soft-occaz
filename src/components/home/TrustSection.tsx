import { type ComponentType } from 'react';
import { HeartIcon, ShieldCheckIcon, SparklesIcon } from '@heroicons/react/24/outline';

interface Value {
  name: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
}

const values: Value[] = [
  {
    name: 'Transparence totale',
    description:
      'Pas de frais cachés, pas de mauvaises surprises. Nous privilégions une communication claire et honnête avec notre communauté.',
    icon: SparklesIcon,
  },
  {
    name: 'Sécurité avant tout',
    description: 'Chaque utilisateur est vérifié. Nous mettons tout en œuvre pour créer un environnement de confiance.',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Passion & Engagement',
    description:
      "Créée par des airsofteurs pour des airsofteurs. Notre équipe est passionnée et s'engage à offrir la meilleure expérience possible.",
    icon: HeartIcon,
  },
];

export default function TrustSection() {
  return (
    <div className="overflow-hidden bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-primary">Nos engagements</h2>
              <p className="mt-2 font-brand text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Une communauté basée sur la confiance
              </p>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Nous construisons une plateforme où chaque utilisateur peut acheter et vendre en toute confiance. Découvrez nos
                valeurs et nos engagements.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-muted-foreground lg:max-w-none">
                {values.map((value) => (
                  <div key={value.name} className="relative pl-9">
                    <dt className="inline font-semibold text-foreground">
                      <value.icon className="absolute left-1 top-1 size-5 text-primary" aria-hidden="true" />
                      {value.name}
                    </dt>{' '}
                    <dd className="inline">{value.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
