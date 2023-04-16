'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { useRouter, useSearchParams } from 'next/navigation';
import { useRef } from 'react';

import Button from './Button';

function SearchForm() {
  const router = useRouter();
  const ref = useRef<HTMLInputElement>(null);
  const search = useSearchParams();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (ref.current?.value) {
      router.push(`/search?q=${ref.current.value}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="col-span-full row-start-2 flex sm:col-span-1 sm:row-start-auto">
      <input
        ref={ref}
        defaultValue={search.get('q') || ''}
        type="text"
        className="form-input flex-1 rounded-l border-rg-lightest bg-rg-lightest py-1 text-sm"
        placeholder="Rechercher une annonce"
      />
      <Button className="rounded-l-none rounded-r border border-rg-lightest bg-rg-light">
        <span>
          <MagnifyingGlassIcon className="h-4 w-4 text-rg-darkest" />
        </span>
        <span className="sr-only">Rechercher</span>
      </Button>
    </form>
  );
}

export default SearchForm;
