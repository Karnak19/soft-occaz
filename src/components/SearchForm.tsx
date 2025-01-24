'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';

import { useSearch } from '$/hooks/useSearch';

import { Button } from './ui/button';
import { Input } from './ui/input';

function SearchForm() {
  const { q, setQ, handleSubmit } = useSearch();

  return (
    <form onSubmit={handleSubmit} className="col-span-full row-start-2 flex sm:col-span-1 sm:row-start-auto">
      <Input
        type="text"
        value={q}
        onChange={(e) => {
          const value = e.target.value;
          // Only trim if the value ends with a space and it's not actively being typed
          const shouldTrim = value.endsWith(' ') && value.length > 1 && value[value.length - 2] === ' ';
          setQ(shouldTrim ? value.replace(/\s+$/, ' ') : value);
        }}
        placeholder="Rechercher une annonce"
        className="peer rounded-r-none border border-r-0 bg-background"
      />
      <Button className="rounded-l-none rounded-r border border-l-0 border-input peer-focus:ring-1 peer-focus:ring-ring">
        <span>
          <MagnifyingGlassIcon className="size-4 text-foreground" />
        </span>
        <span className="sr-only">Rechercher</span>
      </Button>
    </form>
  );
}

export default SearchForm;
