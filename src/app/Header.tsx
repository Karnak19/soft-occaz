'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import UserPanel from '$/components/UserPanel';

export function Header() {
  const pathname = usePathname();

  // Hide header except on these pages
  if (!['/', '/sign-in', '/sign-up'].includes(pathname) && !pathname.startsWith('/dashboard')) {
    return null;
  }

  return (
    <header className="sticky top-0 z-20 bg-gradient-to-r from-rg-600 via-rg-600 to-rg-400 px-4 text-white shadow-black">
      <div className="grid grid-cols-3 gap-5 py-3 lg:px-10">
        <div className="col-span-2 flex items-center sm:col-span-1">
          <Link href="/annonces">
            <Image src="/logo.png" alt="Airsoft Market" height={36} width={36} />
          </Link>
        </div>
        <UserPanel />
      </div>
    </header>
  );
}
