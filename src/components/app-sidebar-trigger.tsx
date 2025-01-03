'use client';

import { useDashboardNav } from '$/hooks/useDashboardNav';
import { SidebarTrigger } from '$/components/ui/sidebar';

export function AppSidebarTrigger() {
  const { notificationsCount } = useDashboardNav();
  return <SidebarTrigger className="sticky top-0 z-50" />;
}
