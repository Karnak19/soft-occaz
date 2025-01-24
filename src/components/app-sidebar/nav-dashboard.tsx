import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useUser } from '$/app/pocketbase-provider';
import { useDashboardNav } from '$/hooks/useDashboardNav';
import { cn } from '$/utils/cn';
import { Badge } from '../ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../ui/sidebar';

export function NavDashboard() {
  const user = useUser();
  const pathname = usePathname();
  const { dashboardNav, notificationsCount } = useDashboardNav();

  if (!user) return null;

  return (
    <Collapsible defaultOpen className="group/collapsible mb-2">
      <SidebarGroup>
        <SidebarGroupLabel asChild>
          <CollapsibleTrigger>
            <>Dashboard</>
            <div className="ml-auto flex items-center gap-2">
              {notificationsCount > 0 && (
                <Badge size="xs" variant="notification">
                  {notificationsCount}
                </Badge>
              )}
              <ChevronDown className="transition-transform group-data-[state=open]/collapsible:rotate-180" />
            </div>
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarGroupContent>
            <SidebarMenu>
              {dashboardNav.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        'flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                        {
                          'bg-accent text-accent-foreground': pathname === item.href,
                        },
                      )}
                    >
                      {item.Icon && <item.Icon className="size-5" />}
                      <span className="flex-1">{item.name}</span>
                      {item.badge ? (
                        <Badge size="xs" variant="notification" className="ml-auto">
                          {item.badge}
                        </Badge>
                      ) : null}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  );
}
