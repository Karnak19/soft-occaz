'use client';

import { useUser } from '@clerk/nextjs';
import { Popover, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment, useMemo } from 'react';

import { cn } from '$/utils/cn';

import { Pill } from '../Pill';

const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
];

function DashboardHeader() {
  const { user } = useUser();
  const pathname = usePathname();

  const navigation = useMemo(() => {
    return [
      { name: 'Dashboard', href: '/dashboard', current: pathname === '/dashboard' },
      { name: 'Annonces', href: '/dashboard/annonces', current: pathname === '/dashboard/annonces' },
      { name: 'Créer une annonce', href: '/dashboard/annonces/create', current: pathname === '/dashboard/annonces/create' },
      { name: 'Chats', href: '/dashboard/chats', current: pathname === '/dashboard/chats' },
      { name: 'Settings', href: '/dashboard/settings', current: pathname === '/dashboard/settings' },
    ];
  }, [pathname]);

  return (
    <Popover as="header" className="bg-gradient-to-b from-rg to-rg-light pb-24">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="relative flex flex-wrap items-center justify-center lg:justify-between">
              <div className="w-full py-5">
                <div className="lg:grid lg:grid-cols-3 lg:items-center lg:gap-8">
                  {/* Left nav */}
                  <div className="hidden lg:col-span-2 lg:block">
                    <nav className="flex space-x-4">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={cn(
                            item.current ? 'text-rg-darkest' : 'text-rg-light',
                            'relative rounded-md bg-white bg-opacity-0 px-3 py-2 text-sm font-medium hover:bg-opacity-10',
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.current && <Pill />}
                          <span className="relative z-20">{item.name}</span>
                        </Link>
                      ))}
                    </nav>
                  </div>
                </div>
              </div>

              {/* Menu button */}
              <div className="absolute right-0 flex-shrink-0 lg:hidden">
                {/* Mobile menu button */}
                <Popover.Button className="inline-flex items-center justify-center rounded-md bg-transparent p-2 text-rg-light hover:bg-white hover:bg-opacity-10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Popover.Button>
              </div>
            </div>
          </div>

          <Transition.Root as={Fragment}>
            <div className="lg:hidden">
              <Transition.Child
                as={Fragment}
                enter="duration-150 ease-out"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="duration-150 ease-in"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Popover.Overlay className="fixed inset-0 z-20 bg-black bg-opacity-25" />
              </Transition.Child>

              <Transition.Child
                as={Fragment}
                enter="duration-150 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-150 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Popover.Panel
                  focus
                  className="absolute inset-x-0 top-0 z-30 mx-auto w-full max-w-3xl origin-top transform p-2 transition"
                >
                  <div className="divide-y divide-gray-200 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="pb-2 pt-3">
                      <div className="flex items-center justify-end px-4">
                        <div className="-mr-2">
                          <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-rg">
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </Popover.Button>
                        </div>
                      </div>
                      <div className="mt-3 space-y-1 px-2">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800"
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                    <div className="pb-2 pt-4">
                      <div className="flex items-center px-5">
                        <div className="flex-shrink-0">
                          {user && (
                            <img
                              className="h-10 w-10 rounded-full"
                              // src={pb.getFileUrl(user, user.avatar, {
                              //   thumb: Thumb.avatar,
                              // })}
                              alt=""
                            />
                          )}
                        </div>
                        <div className="ml-3 min-w-0 flex-1">
                          {/* <div className="truncate text-base font-medium text-gray-800">{user.name}</div>
                          <div className="truncate text-sm font-medium text-gray-500">{user.email}</div> */}
                        </div>
                        <button
                          type="button"
                          className="ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-rg focus:ring-offset-2"
                        >
                          <span className="sr-only">View notifications</span>
                          <BellIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                      <div className="mt-3 space-y-1 px-2">
                        {userNavigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800"
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition.Child>
            </div>
          </Transition.Root>
        </>
      )}
    </Popover>
  );
}

export default DashboardHeader;
