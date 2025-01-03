import Link from 'next/link';
import { ArrowRightIcon, HeartIcon, ShieldCheckIcon, SparklesIcon, UserGroupIcon } from '@heroicons/react/24/outline';

import { Button } from '$/components/ui/button';
import FavoritesSection from '$/components/about/FavoritesSection';
import MessagingSection from '$/components/about/MessagingSection';
import RatingSection from '$/components/about/RatingSection';

const values = [
  {
    name: 'Une plateforme moderne',
    description:
      'Développée avec les dernières technologies, notre plateforme offre une expérience fluide et intuitive pour tous les airsofteurs.',
    icon: SparklesIcon,
  },
  {
    name: 'La sécurité avant tout',
    description:
      'Chaque utilisateur est vérifié et noté par la communauté. Notre système de notation et de vérification assure des transactions sécurisées.',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Une communauté soudée',
    description:
      'Nous construisons une communauté active et bienveillante, où les airsofteurs peuvent échanger en toute confiance.',
    icon: UserGroupIcon,
  },
  {
    name: "La passion de l'airsoft",
    description:
      'Créée par des airsofteurs pour des airsofteurs, notre équipe est passionnée et s&apos;engage à offrir la meilleure expérience possible.',
    icon: HeartIcon,
  },
];

export default function AboutPage() {
  return (
    <main className="relative isolate min-h-[calc(100vh-4rem)]">
      {/* Background */}
      <div
        className="absolute inset-x-0 top-0 -z-10 h-[640px] overflow-hidden bg-gradient-to-b from-amber-100/20"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl lg:mx-0">
          <p className="text-base font-semibold leading-7 text-amber-600">À propos</p>
          <h1 className="mt-2 font-brand text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Une nouvelle vision du marché de l&apos;airsoft
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Face à l&apos;indisponibilité prolongée de France-Airsoft et aux limites des plateformes existantes, nous avons créé
            une alternative moderne et sécurisée pour la communauté airsoft française.
          </p>
        </div>

        {/* Mission */}
        <div className="mx-auto mt-16 max-w-2xl lg:mx-0">
          <h2 className="font-brand text-3xl font-bold tracking-tight text-foreground">Notre mission</h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Nous voulons offrir à la communauté airsoft une plateforme de confiance où chacun peut acheter et vendre son matériel
            en toute sécurité. Notre approche combine technologies modernes et valeurs communautaires pour créer un environnement
            transparent et sécurisé.
          </p>
          <p className="mt-8 text-lg leading-8 text-muted-foreground">
            Contrairement aux plateformes généralistes comme Leboncoin, nous comprenons les besoins spécifiques des airsofteurs.
            Notre système de notation, la vérification des utilisateurs et nos outils spécialisés assurent une expérience adaptée
            à notre passion commune.
          </p>
        </div>

        {/* Values */}
        <div className="mx-auto mt-32 max-w-7xl">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="font-brand text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Nos valeurs</h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Chaque aspect de notre plateforme est guidé par des valeurs fortes, centrées sur la communauté et la confiance.
            </p>
          </div>
          <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-base leading-7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:gap-x-16">
            {values.map((value) => (
              <div key={value.name} className="relative pl-9">
                <dt className="inline font-semibold text-foreground">
                  <value.icon className="absolute left-1 top-1 size-5 text-amber-600" aria-hidden="true" />
                  {value.name}
                </dt>{' '}
                <dd className="inline text-muted-foreground">{value.description}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Rating Section */}
        <RatingSection />

        {/* Favorites Section */}
        <FavoritesSection />

        {/* Messaging Section */}
        <MessagingSection />

        {/* CTA */}
        <div className="mx-auto mt-32 max-w-2xl lg:mx-0">
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
            <Button size="lg" asChild>
              <Link href="/sign-up">
                Rejoindre la communauté
                <ArrowRightIcon className="ml-2 size-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/annonces">Explorer les annonces</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
