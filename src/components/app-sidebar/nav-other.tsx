import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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

export function NavOther() {
  const pathname = usePathname();
  const { otherNav } = useDashboardNav();

  return (
    <Collapsible defaultOpen className="group/listings">
      <SidebarGroup>
        <SidebarGroupLabel asChild>
          <CollapsibleTrigger>
            <>Autres</>
            <ChevronDown className="ml-auto transition-transform group-data-[state=open]/listings:rotate-180" />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarGroupContent>
            <SidebarMenu>
              {otherNav.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        'flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                        {
                          'bg-accent text-accent-foreground': pathname === item.href,
                        },
                      )}
                    >
                      {item.Icon && <item.Icon className="mr-3 size-5" />}
                      <span>{item.name}</span>
                      {item.new && (
                        <Badge size="xs" className="ml-auto">
                          New
                        </Badge>
                      )}
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
