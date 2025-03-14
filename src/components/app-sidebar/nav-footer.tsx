'use client';

import { SidebarFooter } from '../ui/sidebar';
import { NavUser } from './nav-user';
import { ThemeSelector } from './theme-selector';

export function NavFooter() {
  return (
    <SidebarFooter className="flex flex-col gap-3 p-3">
      <div className="flex justify-center">
        <ThemeSelector />
      </div>
      <NavUser />
    </SidebarFooter>
  );
}
