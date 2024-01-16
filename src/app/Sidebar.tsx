'use client';
import Image from 'next/image';
import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { cn } from '$/utils/cn';
import NextLink from 'next/link';
import Navbar from './Navbar';
import { usePathname } from 'next/navigation';
import { Type } from '@prisma/client';
import { Pill } from '$/components/Pill';
import UserPanel from '$/components/UserPanel';
import { SidebarItem } from './SidebarItem';
import SidebarDashboardMenu from './SidebarDashbordMenu';

const types = Object.values(Type);

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    if (sidebarOpen) {
      setSidebarOpen(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div>
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
                      <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-rg-600 px-6 pb-4">
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
                                pathname === '/annonces' ? 'text-white' : 'text-rg-200 hover:text-white hover:bg-rg-700',
                                'group flex gap-x-3 relative rounded-md p-2 text-sm leading-6 font-semibold',
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
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-rg-600 dark:bg-background border-r border-r-muted px-6 pb-4">
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
                          : 'text-rg-200 hover:text-white dark:text-muted-foreground dark:hover:text-foreground dark:hover:bg-muted hover:bg-rg-700',
                        'group flex gap-x-3 relative rounded-md p-2 text-sm leading-6 font-semibold',
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
      </div>

      <Navbar
        burgerSlot={
          <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden" onClick={() => setSidebarOpen(true)}>
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
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