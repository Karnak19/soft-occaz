'use client';

import { Type } from '@prisma/client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '$/utils/cn';

const types = Object.values(Type);

function Navbar() {
  const pathname = usePathname();

  return (
    <ul className="flex p-4 overflow-x-auto capitalize">
      <li>
        <Link
          className={cn(
            pathname === `/annonces` ? 'text-white' : 'text-rg-light',
            'rounded-md bg-white bg-opacity-0 px-3 py-2 text-sm font-medium hover:bg-opacity-10',
          )}
          href="/annonces"
        >
          Tous
        </Link>
      </li>
      {types.map((type) => (
        <li key={type}>
          <Link
            className={cn(
              pathname === `/annonces/${type}` ? 'text-white' : 'text-rg-light',
              'rounded-md bg-white bg-opacity-0 px-3 py-2 text-sm font-medium hover:bg-opacity-10',
            )}
            href={`/annonces/${type.toLowerCase()}`}
          >
            {type}
          </Link>
        </li>
      ))}
      <li>
        <Link
          className={cn(' text-rg-light rounded-md bg-white bg-opacity-0 px-3 py-2 text-sm font-medium hover:bg-opacity-10')}
          href="/dashboard/annonces/create"
        >
          Créer
        </Link>
      </li>
    </ul>
  );
}

export default Navbar;
