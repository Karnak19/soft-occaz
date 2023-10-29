'use client';

import { usePathname } from 'next/navigation';
import NextLink from 'next/link';
import { cn } from '$/utils/cn';
import { Pill } from '$/components/Pill';

export function SidebarItem({ item }: { item: string }) {
  const pathname = usePathname();
  const isActive = pathname === `/annonces/${item.toLowerCase()}`;
  return (
    <li>
      <NextLink
        href={`/annonces/${item.toLowerCase()}`}
        className={cn(
          isActive ? 'bg-rg-700 text-white' : 'text-rg-200 hover:text-white hover:bg-rg-700',
          'relative group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
        )}
      >
        {isActive && <Pill />}
        <span className="relative z-10">{item}</span>
      </NextLink>
    </li>
  );
}

export function SidebarItemWithInitial({ name, href, initial }: { name: string; href: string; initial?: string }) {
  const initialLetter = initial ? initial : name[0].toUpperCase();

  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <li>
      <NextLink
        href={href}
        className={cn(
          'text-rg-200 hover:text-white hover:bg-rg-700',
          'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold relative',
        )}
      >
        {isActive && <Pill />}
        <span className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-rg-400 bg-rg-500 text-[0.625rem] font-medium text-white">
          {initialLetter}
        </span>
        <span className="truncate relative z-10">{name}</span>
      </NextLink>
    </li>
  );
}
