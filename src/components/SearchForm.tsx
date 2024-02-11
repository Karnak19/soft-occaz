'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';

import { useSearch } from '$/hooks/useSearch';

import Button from './Button';

function SearchForm() {
  const { ref, handleSubmit, defaultValue } = useSearch();

  return (
    <form onSubmit={handleSubmit} className="col-span-full row-start-2 flex sm:col-span-1 sm:row-start-auto">
      <input
        ref={ref}
        defaultValue={defaultValue}
        type="text"
        className="form-input flex-1 rounded-l border-rg-100 bg-rg-100 py-1 text-sm text-rg-700"
        placeholder="Rechercher une annonce"
      />
      <Button className="rounded-l-none rounded-r border border-rg-100 bg-rg-300">
        <span>
          <MagnifyingGlassIcon className="size-4 text-rg-900" />
        </span>
        <span className="sr-only">Rechercher</span>
      </Button>
    </form>
  );
}

export default SearchForm;
