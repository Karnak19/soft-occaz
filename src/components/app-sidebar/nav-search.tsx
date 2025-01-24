import { Search } from 'lucide-react';

import { useSearch } from '$/hooks/useSearch';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { SidebarGroup } from '../ui/sidebar';

export function NavSearch() {
  const { q, setQ, handleSubmit } = useSearch();

  return (
    <SidebarGroup>
      <form onSubmit={handleSubmit} className="mb-2 px-2">
        <div className="relative">
          <Input
            value={q}
            onChange={(e) => {
              const value = e.target.value;
              // Only trim if the value ends with a space and it's not actively being typed
              const shouldTrim = value.endsWith(' ') && value.length > 1 && value[value.length - 2] === ' ';
              setQ(shouldTrim ? value.replace(/\s+$/, ' ') : value);
            }}
            type="search"
            placeholder="Rechercher une annonce"
            className="pr-8"
          />
          <Button type="submit" variant="ghost" size="icon" className="absolute right-0 top-0 size-10">
            <Search className="size-4" />
            <span className="sr-only">Rechercher</span>
          </Button>
        </div>
      </form>
    </SidebarGroup>
  );
}
