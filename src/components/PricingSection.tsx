'use client';

import { useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/20/solid';
import { cn } from '$/utils/cn';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

const frequencies = [
  { value: 'monthly', label: 'Mensuel', priceSuffix: '/mois' },
  { value: 'annually', label: 'Annuel', priceSuffix: '/an' },
] as const;

const tiers = [
  {
    name: 'Free',
    id: 'tier-free',
    href: '/sign-up',
    price: { monthly: '0 €', annually: '0 €' },
    description: '',
    features: ['10 annonces', '3 photos par annonce'],
    mostPopular: false,
    cta: "S'inscrire",
  },
  {
    name: 'Hobby',
    id: 'tier-hobby',
    href: '/dashboard/plans',
    price: { monthly: '3 €', annually: '30 €' },
    description: '',
    features: ['20 annonces', '5 photos par annonce', 'Import automatique depuis Airsoft-occasion'],
    mostPopular: false,
    cta: "S'abonner",
  },
  {
    name: 'Geardo',
    id: 'tier-geardo',
    href: '/dashboard/plans',
    price: { monthly: '5 €', annually: '50 €' },
    description: '',
    features: ['50 annonces', '5 photos par annonce', 'Import automatique depuis Airsoft-occasion', 'Annonces stylisées'],
    mostPopular: false,
    cta: "S'abonner",
  },
  {
    name: 'Premium',
    id: 'tier-premium',
    href: '/dashboard/plans',
    price: { monthly: '7 €', annually: '70 €' },
    description: '',
    features: [
      "Pas de limite d'annonces",
      '7 photos par annonce',
      'Import automatique depuis Airsoft-occasion',
      'Annonces stylisées',
      'Annonces qui remontent en tête de liste de recherche',
    ],
    mostPopular: true,
    cta: "S'abonner",
  },
] as const;

export default function PricingSection() {
  const [frequency, setFrequency] = useState(frequencies[0]);

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Abonnements pour les particuliers</p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-muted-foreground">
          Choisissez l&apos;abonnement qui convient le mieux à vos besoins. Vous pouvez changer d&apos;abonnement à tout moment.
        </p>
        <div className="mt-16 flex justify-center">
          <RadioGroup
            value={frequency}
            onChange={setFrequency}
            className="grid grid-cols-2 gap-x-1 rounded-full p-1 text-center text-xs font-semibold leading-5 ring-1 ring-inset ring-gray-200"
          >
            <RadioGroup.Label className="sr-only">Payment frequency</RadioGroup.Label>
            {frequencies.map((option) => (
              <RadioGroup.Option
                key={option.value}
                value={option}
                className={({ checked }) =>
                  cn(
                    checked ? 'bg-rg-500 dark:bg-primary text-background' : 'text-muted-foreground',
                    'cursor-pointer rounded-full px-2.5 py-1',
                  )
                }
              >
                <span>{option.label}</span>
              </RadioGroup.Option>
            ))}
          </RadioGroup>
        </div>
        <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 md:max-w-2xl md:grid-cols-2 lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-4">
          {tiers.map((tier) => {
            const colorMap = {
              'tier-premium': {
                ring: 'ring-2 ring-amber-500 dark:ring-amber-400',
                bg: 'bg-gradient-to-b via-transparent from-amber-300/50',
                buttonClassNames: null,
                text: 'text-amber-600',
                buttonVariant: 'premium',
              },
              'tier-geardo': {
                ring: null,
                bg: 'bg-gradient-to-b via-transparent from-violet-400/30',
                buttonClassNames: 'bg-violet-400 text-black',
                text: 'text-violet-600',
                buttonVariant: 'secondary',
              },
              'tier-hobby': {
                ring: null,
                bg: 'bg-gradient-to-b via-transparent from-teal-400/30',
                buttonClassNames: 'bg-teal-400 text-black',
                text: 'text-teal-600',
                buttonVariant: 'secondary',
              },
              'tier-free': {
                ring: null,
                bg: null,
                buttonClassNames: null,
                text: 'text-gray-600',
                buttonVariant: 'ghost',
              },
            } as const;

            return (
              <Card key={tier.id} className={cn(colorMap[tier.id].ring, colorMap[tier.id].bg)}>
                <CardHeader>
                  <CardTitle className="text-2xl">{tier.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  {tier.description && <p className="mt-4 text-sm leading-6 text-gray-600">{tier.description}</p>}
                  <p className="flex items-baseline gap-x-1">
                    <span className="text-4xl font-bold tracking-tight">{tier.price[frequency.value]}</span>
                    <span className="text-sm font-semibold leading-6 ">{frequency.priceSuffix}</span>
                  </p>
                  <Button
                    variant={colorMap[tier.id].buttonVariant}
                    asChild
                    className={cn('block mt-6 text-center text-sm font-semibold', colorMap[tier.id].buttonClassNames)}
                  >
                    <Link href={tier.href} aria-describedby={tier.id}>
                      {tier.cta}
                    </Link>
                  </Button>
                  <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-muted-foreground">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex gap-x-3">
                        <CheckIcon className="h-6 w-5 flex-none text-accent-foreground" aria-hidden="true" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
        <p className="mx-auto mt-12 text-pretty max-w-3xl text-center italic leading-8 text-rg-300 dark:text-primary/50">
          Pourquoi un système d&apos;abonnement ? Airsoft-Market est un projet sur lequel je travaille seul, sur mon temps libre
          et personnel. Les abonnements me permettent de financer du café, mais aussi et surtout les frais d&apos;hébergement.
          Merci pour votre soutien !
        </p>
      </div>
    </div>
  );
}
