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
    <form onSubmit={handleSubmit} className="flex row-start-2 col-span-full sm:row-start-auto sm:col-span-1">
      <input
        ref={ref}
        defaultValue={search.get('q') || ''}
        type="text"
        className="flex-1 text-sm rounded-l form-input bg-slate-900"
        placeholder="Rechercher une annonce"
      />
      <Button className="rounded-l-none rounded-r">
        <span>
          <MagnifyingGlassIcon className="w-4 h-4" />
        </span>
        <span className="sr-only">Rechercher</span>
      </Button>
    </form>
  );
}

export default SearchForm;
