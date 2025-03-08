import { LogOut } from 'lucide-react';
import Link from 'next/link';

import { useUser } from '$/app/pocketbase-provider';
import { useServerActionMutation } from '$/hooks/zsa';
import UserAvatar from '../UserAvatar';
import { logout } from '../auth/actions';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '../ui/sidebar';

export function NavUser() {
  const { isMobile } = useSidebar();
  const user = useUser();
  const { mutate, isPending } = useServerActionMutation(logout);

  if (!user) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <Button variant="default" className="w-full" asChild>
            <Link href="/sign-in">Se connecter</Link>
          </Button>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <Button variant="ghost" className="w-full" asChild>
            <Link href="/sign-up">Créer un compte</Link>
          </Button>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg">
              <UserAvatar user={user} size="md" />
              <div className="flex flex-col">
                <span className="font-medium">{user.name}</span>
                <span className="text-xs text-muted-foreground">{user.email}</span>
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
          >
            <DropdownMenuItem>
              <Link href="/dashboard">Tableau de bord</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => mutate(undefined)} disabled={isPending}>
              <LogOut className="size-4" />
              <span>Déconnexion</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
