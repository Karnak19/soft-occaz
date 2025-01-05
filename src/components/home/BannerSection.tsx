'use client';

import { useState } from 'react';
import Link from 'next/link';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { SparklesIcon } from '@heroicons/react/24/outline';

import { Button } from '../ui/button';

export default function BannerSection() {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="flex items-center gap-x-6 bg-primary px-6 py-1.5 sm:px-3.5 sm:before:flex-1">
      <p className="text-sm leading-6 text-primary-foreground">
        <SparklesIcon className="mr-2 inline-block size-5 text-white" />
        <strong className="font-semibold text-white">Nouvelle fonctionnalité !</strong>
        <svg viewBox="0 0 2 2" aria-hidden="true" className="mx-2 inline size-0.5 fill-current">
          <circle cx={1} cy={1} r={1} />
        </svg>
        Retrouvez maintenant toutes les annonces d&apos;Airsoft-Occasion directement sur notre plateforme
        <Link href="/annonces" className="ml-2 font-semibold">
          Voir les annonces<span aria-hidden="true">&rarr;</span>
        </Link>
      </p>
      <div className="flex flex-1 justify-end">
        <Button type="button" variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
          <XMarkIcon className="size-5" />
        </Button>
      </div>
    </div>
  );
}
