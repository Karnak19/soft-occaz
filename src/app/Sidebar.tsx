'use client';

import { Fragment, useEffect, useState } from 'react';
import Image from 'next/image';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { Dialog, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Type } from '@prisma/client';

import { cn } from '$/utils/cn';
import { Pill } from '$/components/Pill';
import UserPanel from '$/components/UserPanel';

import { footerNavigation } from './Footer';
import Navbar from './Navbar';
import SidebarDashboardMenu from './SidebarDashbordMenu';
import { SidebarItem } from './SidebarItem';
import { Button } from '$/components/ui/button';
import { isBefore } from 'date-fns';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '$/components/ui/card';

const types = Object.values(Type);

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(isBefore(new Date(), new Date('2024-11-25T12:00:00')));

  const pathname = usePathname();

  useEffect(() => {
    if (sidebarOpen) {
      setSidebarOpen(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div>
      <Transition.Root show={showWarningModal} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setShowWarningModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel as={Card} className="rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-sm">
                  <CardHeader>
                    <Dialog.Title as={CardTitle}>Problème technique résolu 🎉</Dialog.Title>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Le problème concernant le téléchargement des images a été résolu. Vous pouvez à nouveau télécharger vos
                      images correctement.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button type="button" className="w-full" onClick={() => setShowWarningModal(false)}>
                      Compris
                    </Button>
                  </CardFooter>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon className="size-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-primary px-6 pb-4 dark:bg-card">
                  <div className="flex h-16 shrink-0 items-center">
                    <NextLink href="/">
                      <Image src="/logo.png" alt="Airsoft Market" height={36} width={36} />
                    </NextLink>
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" className="-mx-2 space-y-1">
                          <li>
                            <NextLink
                              href="/annonces"
                              className={cn(
                                pathname === '/annonces'
                                  ? 'text-white'
                                  : 'text-primary-foreground hover:bg-black/30 hover:text-white dark:text-muted-foreground',
                                'group relative flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                              )}
                            >
                              {pathname === '/annonces' && <Pill />}
                              <span className="relative z-10">Toutes les annonces</span>
                            </NextLink>
                          </li>
                          {types.map((item) => {
                            return <SidebarItem key={item} item={item} />;
                          })}
                        </ul>
                      </li>
                      <li>
                        <SidebarDashboardMenu />
                      </li>
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-52 lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-r-muted bg-primary px-6 pb-4 dark:bg-background">
          <div className="flex h-16 shrink-0 items-center">
            <NextLink href="/">
              <Image src="/logo.png" alt="Airsoft Market" height={36} width={36} />
            </NextLink>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  <li>
                    <NextLink
                      href="/annonces"
                      className={cn(
                        pathname === '/annonces'
                          ? 'text-white dark:text-foreground'
                          : 'text-primary-foreground hover:bg-black/30 hover:text-white dark:text-muted-foreground dark:hover:bg-primary dark:hover:text-foreground',
                        'group relative flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                      )}
                    >
                      {pathname === '/annonces' && <Pill />}
                      <span className="relative z-10">Toutes les annonces</span>
                    </NextLink>
                  </li>
                  {types.map((item) => {
                    return <SidebarItem key={item} item={item} />;
                  })}
                </ul>
              </li>
              <li>
                <SidebarDashboardMenu />
              </li>
            </ul>
            <ul className="flex gap-2 pt-12">
              {footerNavigation.social.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-muted dark:text-muted-foreground">
                    <span className="sr-only">{item.name}</span>
                    <item.icon className="size-6" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <Navbar
        burgerSlot={
          <button type="button" className="-m-2.5 p-2.5 text-foreground lg:hidden" onClick={() => setSidebarOpen(true)}>
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="size-6" aria-hidden="true" />
          </button>
        }
        profileSlot={<UserPanel />}
      >
        {/* <div className="px-4 sm:px-6 lg:px-8">{children}</div> */}
        {children}
      </Navbar>
    </div>
  );
}
