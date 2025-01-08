'use client';

import { SidebarTrigger, useSidebar } from '$/components/ui/sidebar';
import { useDashboardNav } from '$/hooks/useDashboardNav';

export function AppSidebarTrigger() {
  const { open } = useSidebar();
  const { notificationsCount } = useDashboardNav();
  return (
    <div className="sticky top-0 z-50 inline-flex h-0">
      <SidebarTrigger className="rounded-none rounded-br-md border-l-0" />
      {!open && notificationsCount > 0 && <div className="-ml-2 size-3 rounded-full bg-red-500" />}
    </div>
  );
}
