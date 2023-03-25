'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '$/utils/cn';
import { AdsTypeOptions } from '$/utils/pocketbase-types';

const types = Object.values(AdsTypeOptions);

function Navbar() {
  const pathname = usePathname();

  return (
    <ul className="flex p-4 capitalize text-slate-100">
      <li>
        <Link className="p-4" href="/ads">
          Tous
        </Link>
      </li>
      {types.map((type) => (
        <li key={type}>
          <Link
            className={cn('py-4 px-8', {
              'bg-slate-700': pathname === `/ads/${type}`,
            })}
            href={`/ads/${type}`}
          >
            {type}
          </Link>
        </li>
      ))}
      <li>
        <Link className="p-4" href="/ads/create">
          Créer
        </Link>
      </li>
    </ul>
  );
}

export default Navbar;
