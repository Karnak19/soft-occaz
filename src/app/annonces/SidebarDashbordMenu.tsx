'use client';

import { useUser } from '@clerk/nextjs';
import { SidebarItemWithIcon } from './SidebarItem';
import { ComponentProps } from 'react';
import { AdjustmentsVerticalIcon, ComputerDesktopIcon, DocumentPlusIcon, ListBulletIcon } from '@heroicons/react/24/outline';

export default function SidebarDashboardMenu() {
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return null;
  }

  const nav = [
    { name: 'Dashboard', href: '/dashboard', Icon: ComputerDesktopIcon },
    { name: 'Mes annonces', href: '/dashboard/annonces', Icon: ListBulletIcon },
    { name: 'Créer une annonce', href: '/dashboard/annonces/new', Icon: DocumentPlusIcon },
    { name: 'Settings', href: '/dashboard/settings', Icon: AdjustmentsVerticalIcon },
  ] satisfies ComponentProps<typeof SidebarItemWithIcon>[];

  return (
    <>
      <div className="text-xs font-semibold leading-6 text-rg-200">Dashboard</div>
      <ul role="list" className="-mx-2 mt-2 space-y-1">
        {nav.map((item) => (
          <SidebarItemWithIcon key={item.name} {...item} />
        ))}
      </ul>
    </>
  );
}
