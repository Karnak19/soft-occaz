'use client';

import { useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/20/solid';
import { cn } from '$/utils/cn';
import Link from 'next/link';

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
    features: ['5 annonces', '3 photos par annonce'],
    mostPopular: false,
    cta: "S'inscrire",
  },
  {
    name: 'Hobby',
    id: 'tier-hobby',
    href: '/dashboard/plans',
    price: { monthly: '3 €', annually: '30 €' },
    description: '',
    features: ['10 annonces', '5 photos par annonce', 'Import automatique depuis Airsoft-occasion'],
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
];

export default function PricingSection() {
  const [frequency, setFrequency] = useState(frequencies[0]);

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-rg">Abonnements</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Abonnements pour les particuliers</p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
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
                  cn(checked ? 'bg-rg text-white' : 'text-gray-500', 'cursor-pointer rounded-full px-2.5 py-1')
                }
              >
                <span>{option.label}</span>
              </RadioGroup.Option>
            ))}
          </RadioGroup>
        </div>
        <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 md:max-w-2xl md:grid-cols-2 lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-4">
          {tiers.map((tier) => (
            <div key={tier.id} className={cn(tier.mostPopular ? 'ring-2 ring-rg' : 'ring-1 ring-gray-200', 'rounded-3xl p-8')}>
              <h3 id={tier.id} className={cn(tier.mostPopular ? 'text-rg' : 'text-gray-900', 'text-lg font-semibold leading-8')}>
                {tier.name}
              </h3>
              <p className="mt-4 text-sm leading-6 text-gray-600">{tier.description}</p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-gray-900">{tier.price[frequency.value]}</span>
                <span className="text-sm font-semibold leading-6 text-gray-600">{frequency.priceSuffix}</span>
              </p>
              <Link
                href={tier.href}
                aria-describedby={tier.id}
                className={cn(
                  tier.mostPopular
                    ? 'bg-rg text-white shadow-sm hover:bg-rg-dark'
                    : 'text-rg ring-1 ring-inset ring-rg-light hover:ring-rg',
                  'mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rg',
                )}
              >
                {tier.cta}
              </Link>
              <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <CheckIcon className="h-6 w-5 flex-none text-rg" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-6 max-w-3xl text-center italic leading-8 text-rg-light">
          Pourquoi un système d&apos;abonnement ? Airsoft-Market est un projet sur lequel je travaille seul, sur mon temps libre
          et personnel. Les abonnements me permettent de financer du café, mais aussi et surtout les frais d&apos;hébergement.
          Merci pour votre soutien !
        </p>
      </div>
    </div>
  );
}
