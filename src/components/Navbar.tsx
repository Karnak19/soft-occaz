'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '$/utils/cn';
import { AnnoncesTypeOptions } from '$/utils/pocketbase-types';

const types = Object.values(AnnoncesTypeOptions);

function Navbar() {
  const pathname = usePathname();

  return (
    <ul className="flex p-4 capitalize text-slate-100">
      <li>
        <Link className="p-4" href="/annonces">
          Tous
        </Link>
      </li>
      {types.map((type) => (
        <li key={type}>
          <Link
            className={cn('py-4 px-8', {
              'bg-slate-700': pathname === `/annonces/${type}`,
            })}
            href={`/annonces/${type}`}
          >
            {type}
          </Link>
        </li>
      ))}
      <li>
        <Link className="p-4" href="/annonces/create">
          Créer
        </Link>
      </li>
    </ul>
  );
}

export default Navbar;
