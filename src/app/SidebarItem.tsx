'use client';

import NextLink from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '$/utils/cn';
import { Pill } from '$/components/Pill';

const className = cn(
  'text-primary-foreground hover:bg-black/30 hover:text-white dark:text-muted-foreground dark:hover:bg-primary dark:hover:text-foreground',
  'group relative flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
);

export function SidebarItem({ item }: { item: string }) {
  const pathname = usePathname();
  const isActive = pathname === `/annonces/${item.toLowerCase()}`;
  return (
    <li>
      <NextLink
        href={`/annonces/${item.toLowerCase()}`}
        className={cn(className, {
          'text-white dark:text-foreground': isActive,
        })}
      >
        {isActive && <Pill />}
        <span className="relative z-10">{item}</span>
      </NextLink>
    </li>
  );
}

export function SidebarItemWithIcon({
  name,
  href,
  Icon,
}: {
  name: string;
  href: string;
  Icon?: React.ForwardRefExoticComponent<
    React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & {
      title?: string;
      titleId?: string;
    } & React.RefAttributes<SVGSVGElement>
  >;
}) {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <li>
      <NextLink href={href} className={className}>
        {isActive && <Pill />}
        <span className="relative z-10 flex shrink-0 items-center justify-center rounded-lg text-[0.625rem] font-medium text-white">
          {Icon && <Icon className="size-5" aria-hidden="true" />}
        </span>
        <span className="relative z-10 truncate">{name}</span>
      </NextLink>
    </li>
  );
}
