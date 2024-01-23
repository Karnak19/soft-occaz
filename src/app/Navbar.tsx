'use client';

import { useSearch } from '$/hooks/useSearch';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

type NavbarProps = {
  profileSlot?: React.ReactNode;
  burgerSlot?: React.ReactNode;
  children?: React.ReactNode;
};

export default function Navbar({ children, burgerSlot, profileSlot }: NavbarProps) {
  const { ref, defaultValue, handleSubmit } = useSearch();

  return (
    <div className="lg:pl-52">
      <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-muted bg-background px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
        {burgerSlot}

        {/* Separator */}
        <div className="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" />

        <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
          <form className="relative flex flex-1" onSubmit={handleSubmit}>
            <label htmlFor="search-field" className="sr-only">
              Search
            </label>
            <MagnifyingGlassIcon
              className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-muted-foreground"
              aria-hidden="true"
            />
            <input
              ref={ref}
              defaultValue={defaultValue}
              id="search-field"
              className="block size-full border-0 bg-background py-0 pl-8 pr-0 text-foreground placeholder:text-muted-foreground focus:ring-0 sm:text-sm"
              placeholder="Rechercher..."
              type="search"
              name="search"
            />
          </form>
          <div className="flex items-center gap-x-4 lg:gap-x-6">
            {/* Separator */}
            <div className="hidden text-foreground/10 lg:block lg:h-6 lg:w-px lg:bg-foreground" aria-hidden="true" />

            {/* Profile dropdown */}
            {profileSlot}
          </div>
        </div>
      </div>
      {children && <main className="">{children}</main>}
    </div>
  );
}
