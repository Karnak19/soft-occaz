import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

import { Button } from '../ui/button';

export default function RegisterCTA() {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
      <div className="relative isolate overflow-hidden bg-primary px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
        <h2 className="mx-auto max-w-2xl font-brand text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
          Prêt à rejoindre la communauté ?
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-primary-foreground/80">
          Créez votre compte gratuitement et commencez à vendre votre matériel d&apos;airsoft dès aujourd&apos;hui. Rejoignez des
          milliers d&apos;airsofteurs qui nous font déjà confiance.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center sm:gap-x-6">
          <Button size="lg" variant="secondary" asChild>
            <Link href="/sign-up">
              Créer un compte gratuitement
              <ArrowRightIcon className="ml-2 size-4" aria-hidden="true" />
            </Link>
          </Button>
          <Button variant="link" className="text-primary-foreground hover:text-primary-foreground/90" asChild>
            <Link href="/annonces">Voir les annonces</Link>
          </Button>
        </div>
        <svg
          viewBox="0 0 1024 1024"
          className="absolute left-1/2 top-1/2 -z-10 size-[64rem] -translate-x-1/2 -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
          aria-hidden="true"
        >
          <circle cx={512} cy={512} r={512} fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)" fillOpacity="0.7" />
          <defs>
            <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
              <stop stopColor="#7775D6" />
              <stop offset={1} stopColor="#E935C1" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
