'use client';

import { Type } from '@prisma/client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '$/utils/cn';

import { Pill } from './Pill';

const types = Object.values(Type);

function Navbar() {
  const pathname = usePathname();

  return (
    <ul className="flex p-4 overflow-x-auto capitalize">
      <li>
        <Link
          className={cn(
            pathname === `/annonces` ? 'text-rg-darkest' : 'text-rg-light',
            'rounded-md bg-white bg-opacity-0 px-3 py-2 relative text-sm font-medium hover:bg-opacity-10',
          )}
          href="/annonces"
        >
          {pathname === `/annonces` && <Pill />}
          <span className="relative z-10">Tous</span>
        </Link>
      </li>
      {types.map((type) => {
        const isActive = pathname === `/annonces/${type.toLowerCase()}`;
        return (
          <li key={type}>
            <Link
              className={cn(
                isActive ? 'text-rg-darkest' : 'text-rg-light',
                'rounded-md bg-white bg-opacity-0 relative px-3 py-2 text-sm font-medium hover:bg-opacity-10',
              )}
              href={`/annonces/${type.toLowerCase()}`}
            >
              {isActive && <Pill />}
              <span className="relative z-10">{type}</span>
            </Link>
          </li>
        );
      })}
      <li>
        <Link
          className={cn(' text-rg-light rounded-md bg-white bg-opacity-0 px-3 py-2 text-sm font-medium hover:bg-opacity-10')}
          href="/dashboard/annonces/new"
        >
          Créer
        </Link>
      </li>
    </ul>
  );
}

export default Navbar;
