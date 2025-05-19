import { HeartIcon, ShieldCheckIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { type ComponentType } from 'react';

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
    <div className="overflow-hidden bg-background py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">Nos engagements</h2>
          <p className="mt-2 font-brand text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Une communauté basée sur la confiance
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Nous construisons une plateforme où chaque utilisateur peut acheter et vendre en toute confiance. Découvrez nos
            valeurs et nos engagements.
          </p>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value) => (
            <div
              key={value.name}
              className="relative flex flex-col items-center rounded-xl border border-border bg-card p-8 shadow-sm transition hover:shadow-md"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 mb-4">
                <value.icon className="size-7 text-primary" aria-hidden="true" />
              </div>
              <dt className="text-lg font-semibold text-foreground text-center">{value.name}</dt>
              <dd className="mt-2 text-base text-muted-foreground text-center">{value.description}</dd>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
