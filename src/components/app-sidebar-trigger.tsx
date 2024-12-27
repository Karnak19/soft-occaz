'use client';

import { useDashboardNav } from '$/hooks/useDashboardNav';
import { SidebarTrigger } from '$/components/ui/sidebar';

export function AppSidebarTrigger() {
  const { totalUnreadMessages } = useDashboardNav();
  return (
    <div className="relative size-7">
      {totalUnreadMessages > 0 && <div className="absolute right-0 top-1 size-2 rounded-full bg-red-500" />}
      <SidebarTrigger className="sticky top-4 z-50" />
    </div>
  );
}
