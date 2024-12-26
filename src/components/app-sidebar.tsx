'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SignInButton, SignUpButton, useUser } from '@clerk/nextjs';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { Type } from '@prisma/client';
import { ChevronDownIcon } from 'lucide-react';

import { cn } from '$/utils/cn';
import { dashboardNav } from '$/utils/dashboardNav';
import { useSearch } from '$/hooks/useSearch';
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
} from '$/components/ui/sidebar';
import { Skeleton } from '$/components/ui/skeleton';
import { footerNavigation } from '$/app/Footer';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

const types = Object.values(Type);

export function AppSidebar() {
  const { isSignedIn, user, isLoaded } = useUser();
  const pathname = usePathname();
  const { ref, handleSubmit, defaultValue } = useSearch();

  return (
    <Sidebar className="border-r border-border bg-background">
      <SidebarHeader className="h-16 px-6">
        <Link href="/" className="flex items-center">
          <Image src="/logo.png" alt="Airsoft Market" height={36} width={36} />
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

        <SidebarGroup>
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
        </SidebarGroup>

        {isSignedIn && (
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroup>
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger>
                  <>Dashboard</>
                  <ChevronDownIcon className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
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
      </SidebarContent>
      <SidebarFooter className="border-t border-border p-4">
        <div className="flex flex-col gap-4">
          {!isLoaded ? (
            <div className="flex items-center gap-4">
              <Skeleton className="size-10 rounded-full" />
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-32" />
              </div>
            </div>
          ) : isSignedIn && user ? (
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={user.imageUrl} />
                <AvatarFallback>{user.firstName?.[0]}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-medium">{user.fullName}</span>
                <span className="text-xs text-muted-foreground">{user.primaryEmailAddress?.emailAddress}</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <SignInButton mode="modal">
                <Button variant="default" className="w-full">
                  Se connecter
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button variant="ghost" className="w-full">
                  Créer un compte
                </Button>
              </SignUpButton>
            </div>
          )}
          <ul className="flex gap-2">
            {footerNavigation.social.map((item) => (
              <li key={item.name}>
                <a href={item.href} className="text-muted-foreground hover:text-foreground">
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="size-6" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
