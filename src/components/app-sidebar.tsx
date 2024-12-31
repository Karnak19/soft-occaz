'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { ChevronDownIcon, LogOutIcon } from 'lucide-react';

import { cn } from '$/utils/cn';
import { ListingsTypeOptions } from '$/utils/pocketbase/pocketbase-types';
import { useDashboardNav } from '$/hooks/useDashboardNav';
import { useSearch } from '$/hooks/useSearch';
import { useServerActionMutation } from '$/hooks/zsa';
import { Avatar, AvatarFallback, AvatarImage } from '$/components/ui/avatar';
import { Button } from '$/components/ui/button';
import { Input } from '$/components/ui/input';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '$/components/ui/sidebar';
import { footerNavigation } from '$/app/Footer';
import { usePocketbase, useUser } from '$/app/pocketbase-provider';

import { logout } from './auth/actions';
import { Badge } from './ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

const types = Object.values(ListingsTypeOptions);

export function AppSidebar() {
  const user = useUser();
  const { pb } = usePocketbase();
  const pathname = usePathname();
  const { ref, handleSubmit, defaultValue } = useSearch();
  const { dashboardNav, notificationsCount } = useDashboardNav();

  const { mutate, isPending } = useServerActionMutation(logout);

  return (
    <Sidebar className="border-r border-border bg-background">
      <SidebarHeader className="h-16 justify-center px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Airsoft Market" height={36} width={36} />
          <span className="text-lg font-bold">Airsoft Market</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="px-2">
        <form onSubmit={handleSubmit} className="mb-2 px-2">
          <div className="relative">
            <Input ref={ref} defaultValue={defaultValue} type="search" placeholder="Rechercher une annonce" className="pr-8" />
            <Button type="submit" variant="ghost" size="icon" className="absolute right-0 top-0 size-10">
              <MagnifyingGlassIcon className="size-4" />
              <span className="sr-only">Rechercher</span>
            </Button>
          </div>
        </form>

        {Boolean(user) && (
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
                    <ChevronDownIcon className="transition-transform group-data-[state=open]/collapsible:rotate-180" />
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
        )}

        <Collapsible defaultOpen className="group/listings">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                <>Annonces</>
                <ChevronDownIcon className="ml-auto transition-transform group-data-[state=open]/listings:rotate-180" />
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
                        <span>Toutes les annonces</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  {types.map((item) => (
                    <SidebarMenuItem key={item}>
                      <SidebarMenuButton asChild>
                        <Link
                          href={`/annonces/${item.toLowerCase()}`}
                          className={cn(
                            'flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                            {
                              'bg-accent text-accent-foreground': pathname === `/annonces/${item.toLowerCase()}`,
                            },
                          )}
                        >
                          <span>{item}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>

      <SidebarSeparator />
      <SidebarFooter className="">
        <div className="flex flex-col gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={pb.files.getURL(user, user.avatar)} />
                <AvatarFallback>{user.name?.[0]}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-medium">{user.name}</span>
                <span className="text-xs text-muted-foreground">{user.email}</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <Button variant="default" className="w-full" asChild>
                <Link href="/sign-in">Se connecter</Link>
              </Button>
              <Button variant="ghost" className="w-full" asChild>
                <Link href="/sign-up">Créer un compte</Link>
              </Button>
            </div>
          )}
          <ul className="flex gap-2">
            {footerNavigation.social.map((item) => (
              <li key={item.name} className="flex items-center">
                <a href={item.href} className="text-muted-foreground hover:text-foreground">
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="size-6" aria-hidden="true" />
                </a>
              </li>
            ))}
            {user && (
              <li className="ml-auto">
                <Button variant="ghost" size="icon" onClick={() => mutate(undefined)} disabled={isPending}>
                  <LogOutIcon className="size-4" />
                </Button>
              </li>
            )}
          </ul>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
