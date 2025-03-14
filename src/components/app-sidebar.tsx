'use client';

import { NavDashboard } from './app-sidebar/nav-dashboard';
import { NavFooter } from './app-sidebar/nav-footer';
import { NavHeader } from './app-sidebar/nav-header';
import { NavMain } from './app-sidebar/nav-main';
import { NavOther } from './app-sidebar/nav-other';
import { Sidebar, SidebarContent, SidebarHeader, SidebarSeparator } from './ui/sidebar';

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-border bg-background" collapsible="icon">
      <SidebarHeader className="h-16 justify-center">
        <NavHeader />
      </SidebarHeader>
      <SidebarContent>
        <NavDashboard />
        <NavMain />
        <NavOther />
      </SidebarContent>
      <SidebarSeparator />
      <NavFooter />
    </Sidebar>
  );
}
