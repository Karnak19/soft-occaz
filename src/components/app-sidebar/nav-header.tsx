import Image from 'next/image';
import Link from 'next/link';

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar';

export function NavHeader() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" asChild>
          <Link href="/">
            <Image src="/logo.png" alt="Airsoft Market" height={36} width={36} />
            <span className="text-lg font-bold">Airsoft Market</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
