import { ArrowRightIcon, ArrowsPointingInIcon, PhotoIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { MousePointerClickIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '../ui/button';

export default function ImportSection() {
  return (
    <div className="overflow-hidden bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:ml-auto lg:pl-4 lg:pt-4">
            <div className="lg:max-w-xl">
              <h6 className="text-base font-semibold leading-7 text-amber-600">Nouveau</h6>
              <p className="mt-2 font-brand text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Importez vos annonces en un clic
                <span className="ml-3 inline-block">
                  <MousePointerClickIcon className="size-8" />
                </span>
              </p>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Vous vendez déjà sur Airsoft-occasion ? Importez vos annonces automatiquement et profitez d&apos;une plus grande
                visibilité sur notre plateforme moderne.
              </p>
              <div className="mt-8 space-y-8 text-base leading-7 text-muted-foreground">
                <div className="flex gap-x-3">
                  <SparklesIcon className="mt-1 size-5 flex-none text-amber-600" />
                  <div>
                    <strong className="font-semibold text-foreground">Import automatique.</strong> Copiez simplement l&apos;URL de
                    votre annonce et laissez-nous faire le reste.
                  </div>
                </div>
                <div className="flex gap-x-3">
                  <PhotoIcon className="mt-1 size-5 flex-none text-amber-600" />
                  <div>
                    <strong className="font-semibold text-foreground">Tout est importé.</strong> Photos, description, prix et
                    caractéristiques sont automatiquement récupérés.
                  </div>
                </div>
                <div className="flex gap-x-3">
                  <ArrowsPointingInIcon className="mt-1 size-5 flex-none text-amber-600" />
                  <div>
                    <strong className="font-semibold text-foreground">Double visibilité.</strong> Augmentez vos chances de vente
                    en étant présent sur les deux plateformes.
                  </div>
                </div>
              </div>
              <div className="mt-10">
                <Button variant="premium" size="lg" asChild>
                  <Link href="/dashboard/annonces/new">
                    Essayer maintenant
                    <ArrowRightIcon className="ml-2 size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          <div className="flex items-start justify-start">
            <div className="relative">
              <Image
                src="/import-preview.jpg"
                alt="Aperçu de l'import"
                width={1824}
                height={1080}
                className="relative z-10 w-[48rem] max-w-none rounded-xl bg-white/5 shadow-2xl ring-1 ring-white/10 sm:w-[57rem]"
              />
              <div className="absolute -right-8 -top-8 size-72 bg-linear-to-br from-amber-500 to-amber-100 opacity-20 blur-3xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
