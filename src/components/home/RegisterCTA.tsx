import { ArrowRightIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '../ui/button';
import RegisterImage from './RegisterCTAImage.png';

const benefits = ['Publiez des annonces illimitées', "Communauté d'airsofteurs actifs", 'Support réactif'];

export default function RegisterCTA() {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
      <div className="relative isolate overflow-hidden bg-gradient-to-br from-primary to-primary/80 text-center shadow-2xl rounded-3xl">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-7 lg:items-center lg:text-left">
          <div className="backdrop-blur-sm px-6 py-24 sm:px-16 col-span-4">
            <h2 className="mx-auto max-w-2xl font-brand text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl lg:mx-0">
              Rejoignez la communauté Airsoft Market
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-primary-foreground/90 lg:mx-0">
              Créez votre compte gratuitement et commencez à vendre votre matériel d'airsoft dès aujourd'hui.
            </p>

            <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 text-left">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-2 text-primary-foreground/90">
                  <CheckCircleIcon className="size-5 text-white" aria-hidden="true" />
                  {benefit}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center lg:justify-start sm:gap-x-6">
              <Button size="lg" variant="secondary" asChild className="font-medium">
                <Link href="/sign-up">
                  Créer un compte gratuitement
                  <ArrowRightIcon className="ml-2 size-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button variant="link" className="text-primary-foreground hover:text-primary-foreground/90" asChild>
                <Link href="/annonces">Voir les annonces</Link>
              </Button>
            </div>
          </div>
          <div className="absolute right-0 bottom-0 -z-[1]">
            <Image src={RegisterImage} alt="Airsoft Market" width={500} height={500} />
          </div>
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
