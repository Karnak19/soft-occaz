import {
  ChatBubbleLeftRightIcon,
  CodeBracketIcon,
  HeartIcon,
  PhotoIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import { type ComponentType } from 'react';

interface Feature {
  name: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
}

const features: Feature[] = [
  {
    name: 'Interface moderne',
    description:
      'Une expérience utilisateur fluide et intuitive, conçue avec les dernières technologies web pour une navigation sans effort.',
    icon: SparklesIcon,
  },
  {
    name: 'Sécurité renforcée',
    description: "Profitez d'une plateforme robuste et sécurisée. Chaque utilisateur est vérifié.",
    icon: ShieldCheckIcon,
  },
  {
    name: 'Messagerie instantanée',
    description:
      'Communiquez directement avec les vendeurs via notre système de messagerie moderne. Négociez et organisez vos transactions simplement.',
    icon: ChatBubbleLeftRightIcon,
  },
  {
    name: 'Technologie de pointe',
    description:
      'Développée avec les technologies les plus modernes, notre plateforme offre des performances optimales et une fiabilité à toute épreuve.',
    icon: CodeBracketIcon,
  },
  {
    name: 'Galerie HD interactive',
    description: 'Présentez vos articles sous leur meilleur jour avec notre système de galerie photos HD.',
    icon: PhotoIcon,
  },
  {
    name: 'Support réactif',
    description: 'Une équipe passionnée à votre écoute. Nous sommes là pour vous accompagner et assurer une expérience parfaite.',
    icon: HeartIcon,
  },
];

export default function FeaturesSection() {
  return (
    <div className="bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">Une plateforme nouvelle génération</h2>
          <p className="mt-2 font-brand text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Conçue pour les airsofteurs d&apos;aujourd&apos;hui
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Découvrez une expérience d&apos;achat et de vente moderne, sécurisée et optimisée pour la communauté airsoft.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-foreground">
                  <feature.icon className="size-5 flex-none text-primary" aria-hidden="true" />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
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
