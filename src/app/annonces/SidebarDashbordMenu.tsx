'use client';

import { useUser } from '@clerk/nextjs';
import { SidebarItemWithIcon } from './SidebarItem';
import { dashboardNav } from '$/utils/dashboardNav';

export default function SidebarDashboardMenu() {
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return null;
  }

  return (
    <>
      <div className="text-xs font-semibold leading-6 text-rg-200">Dashboard</div>
      <ul role="list" className="-mx-2 mt-2 space-y-1">
        {dashboardNav.map((item) => (
          <SidebarItemWithIcon key={item.name} {...item} />
        ))}
      </ul>
    </>
  );
}
