'use client';

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
    <form onSubmit={handleSubmit} className="flex gap-4 mt-4">
      <input
        ref={ref}
        defaultValue={search.get('q') || ''}
        type="text"
        className="flex-1 p-2 border rounded-md border-slate-300 bg-slate-900"
        placeholder="Rechercher une annonce"
      />
      <Button>Rechercher</Button>
    </form>
  );
}

export default SearchForm;
