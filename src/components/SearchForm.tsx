'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';

import Button from './Button';
import { useSearch } from '$/hooks/useSearch';

function SearchForm() {
  const { ref, handleSubmit, defaultValue } = useSearch();

  return (
    <form onSubmit={handleSubmit} className="flex row-start-2 col-span-full sm:row-start-auto sm:col-span-1">
      <input
        ref={ref}
        defaultValue={defaultValue}
        type="text"
        className="flex-1 py-1 text-sm rounded-l form-input bg-rg-100 border-rg-100 text-rg-700"
        placeholder="Rechercher une annonce"
      />
      <Button className="border rounded-l-none rounded-r bg-rg-300 border-rg-100">
        <span>
          <MagnifyingGlassIcon className="w-4 h-4 text-rg-900" />
        </span>
        <span className="sr-only">Rechercher</span>
      </Button>
    </form>
  );
}

export default SearchForm;
