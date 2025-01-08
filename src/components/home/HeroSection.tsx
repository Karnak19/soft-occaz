import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '../ui/button';
import BannerSection from './BannerSection';

export default function HeroSection() {
  return (
    <div className="">
      <BannerSection />
      <div className="relative isolate overflow-hidden">
        <Image src="/hero.png" fill alt="" className="absolute inset-0 -z-10 size-full object-cover opacity-80" />
        <div className="absolute inset-0 -z-10 size-full bg-gradient-to-t from-background object-cover" />
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-primary opacity-60 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
            <h1 className="mt-10 max-w-xl font-brand text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
              La nouvelle marketplace française 🇫🇷 de l&apos;airsoft
            </h1>
            <p className="mt-6 text-lg leading-8 text-foreground/80">
              Une plateforme moderne et sécurisée, conçue par des passionnés d&apos;airsoft. Profitez d&apos;une expérience
              d&apos;achat et de vente simple, rapide et transparente.
            </p>
            <div className="mt-10 flex flex-col items-center gap-y-6 sm:flex-row sm:gap-x-6">
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
      </div>
    </div>
  );
}
