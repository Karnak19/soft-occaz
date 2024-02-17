'use client';

import { useUser } from '@clerk/nextjs';

import { dashboardNav } from '$/utils/dashboardNav';

import { SidebarItemWithIcon } from './SidebarItem';

export default function SidebarDashboardMenu() {
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return null;
  }

  return (
    <>
      <div className="text-xs font-semibold leading-6 text-background dark:text-foreground">Dashboard</div>
      <ul role="list" className="-mx-2 mt-2 space-y-1">
        {dashboardNav.map((item) => (
          <SidebarItemWithIcon key={item.name} {...item} />
        ))}
      </ul>
    </>
  );
}
