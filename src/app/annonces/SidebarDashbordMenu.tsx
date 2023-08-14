'use client';

import { useUser } from '@clerk/nextjs';
import { SidebarItemWithInitial } from './SidebarItem';

export default function SidebarDashboardMenu() {
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return null;
  }

  const nav = [
    { id: 1, name: 'Mes annonces', href: '/dashboard/annonces', initial: 'A', current: false },
    { id: 2, name: 'Créer une annonce', href: '/dashboard/annonces/new', initial: 'C', current: false },
    { id: 3, name: 'Settings', href: '/dashboard/settings', initial: 'S', current: false },
  ];

  return (
    <>
      <div className="text-xs font-semibold leading-6 text-rg-200">Dashboard</div>
      <ul role="list" className="-mx-2 mt-2 space-y-1">
        {nav.map((item) => (
          <SidebarItemWithInitial key={item.name} {...item} />
        ))}
      </ul>
    </>
  );
}
