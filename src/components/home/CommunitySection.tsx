import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { StarIcon } from 'lucide-react';
import Link from 'next/link';

import { Button } from '../ui/button';

export default function CommunitySection() {
  return (
    <div className="relative isolate overflow-hidden bg-muted/50">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <div className="flex items-center gap-x-2">
            <StarIcon className="size-5 text-amber-600" />
            <h2 className="text-base font-semibold leading-7 text-amber-600">La communauté avant tout</h2>
          </div>
          <p className="mt-2 font-brand text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Une alternative moderne et sécurisée
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Avec l&apos;indisponibilité prolongée de France-Airsoft, la communauté a besoin d&apos;une nouvelle plateforme de
            confiance. Notre système de notation et de vérification des utilisateurs assure des transactions sécurisées entre
            airsofteurs.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:gap-6">
            <Button size="lg" asChild>
              <Link href="/sign-up">
                Rejoindre la communauté
                <ArrowRightIcon className="ml-2 size-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/about">En savoir plus</Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute left-1/2 top-0 -z-10 h-[640px] w-[1280px] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-amber-100/20 opacity-30" />
      </div>
    </div>
  );
}
