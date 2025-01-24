import { ChevronDown, CrosshairIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '$/utils/cn';
import { ListingsTypeOptions } from '$/utils/pocketbase/pocketbase-types';
import {
  Battery50Icon,
  BoltIcon,
  CircleStackIcon,
  CubeIcon,
  CubeTransparentIcon,
  RocketLaunchIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
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

const listingTypes = [
  {
    name: ListingsTypeOptions.aeg.toUpperCase(),
    Icon: BoltIcon,
  },
  {
    name: ListingsTypeOptions.aep.toUpperCase(),
    Icon: BoltIcon,
    new: true,
  },
  {
    name: ListingsTypeOptions.gbbr.toUpperCase(),
    Icon: RocketLaunchIcon,
  },
  {
    name: ListingsTypeOptions.gbb.toUpperCase(),
    Icon: RocketLaunchIcon,
  },
  {
    name: ListingsTypeOptions.hpa.toUpperCase(),
    Icon: SparklesIcon,
  },
  {
    name: ListingsTypeOptions.ptw.toUpperCase(),
    Icon: Battery50Icon,
  },
  {
    name: ListingsTypeOptions.sniper.toUpperCase(),
    Icon: CrosshairIcon,
  },
  {
    name: ListingsTypeOptions.shotgun.toUpperCase(),
    Icon: BoltIcon,
    new: true,
  },
  {
    name: ListingsTypeOptions.gear.toUpperCase(),
    Icon: CubeIcon,
  },
  {
    name: ListingsTypeOptions.other.toUpperCase(),
    Icon: CubeTransparentIcon,
  },
];

export function NavMain() {
  const pathname = usePathname();

  return (
    <Collapsible defaultOpen className="group/listings">
      <SidebarGroup>
        <SidebarGroupLabel asChild>
          <CollapsibleTrigger>
            <>Annonces</>
            <ChevronDown className="ml-auto transition-transform group-data-[state=open]/listings:rotate-180" />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    href="/annonces"
                    className={cn(
                      'flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                      {
                        'bg-accent text-accent-foreground': pathname === '/annonces',
                      },
                    )}
                  >
                    <CircleStackIcon className="mr-3 size-5" />
                    <span>Toutes les annonces</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {listingTypes.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={`/annonces/${item.name.toLowerCase()}`}
                      className={cn(
                        'flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                        {
                          'bg-accent text-accent-foreground': pathname === `/annonces/${item.name.toLowerCase()}`,
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
