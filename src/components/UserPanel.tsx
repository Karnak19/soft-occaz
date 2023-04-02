'use client';

import { Menu, Transition } from '@headlessui/react';
import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';

import { cn } from '$/utils/cn';
import { UsersResponse } from '$/utils/pocketbase-types';
import { Thumb } from '$/utils/thumbs';

import Avatar from './Avatar';
import { baseButtonClasses } from './Button';
import { usePocket } from './PocketContext';

function UserPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [avatar, setAvatar] = useState('');

  const { user, logout, pb } = usePocket();

  const userNavigation = [
    { name: 'Dashboard', isLink: true, href: '/dashboard' },
    { name: 'Profil Public', isLink: true, href: `/profile/${user?.id}` },
    { name: 'Sign out', isLink: false, action: logout },
  ] as const;

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
      setAvatar(
        pb.getFileUrl(user, user.avatar, {
          thumb: Thumb.avatar,
        }),
      );
    } else {
      setIsLoggedIn(false);
    }
  }, [user]);

  return isLoggedIn ? (
    <div className="flex justify-end col-start-3">
      {avatar && (
        <Menu as="div" className="relative flex-shrink-0 ml-4">
          <div>
            <Menu.Button className="flex text-sm bg-white rounded-full ring-2 ring-white ring-opacity-20 focus:outline-none focus:ring-opacity-100">
              <span className="sr-only">Open user menu</span>
              <Avatar user={user as unknown as UsersResponse} />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute z-10 w-48 py-1 mt-2 origin-top-right bg-gray-100 rounded-md shadow-lg -right-2 ring-1 ring-black ring-opacity-5 focus:outline-none">
              {userNavigation.map((item) => (
                <Menu.Item key={item.name}>
                  {({ active }) =>
                    item.isLink ? (
                      <Link
                        href={item.href}
                        className={cn(active ? 'bg-rg-lightest' : '', 'block px-4 py-2 text-sm text-gray-700')}
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <button
                        className={cn(active ? 'bg-rg-lightest' : '', 'block px-4 py-2 text-sm w-full text-left text-gray-700')}
                        onClick={item.action}
                      >
                        {item.name}
                      </button>
                    )
                  }
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </Menu>
      )}
    </div>
  ) : (
    <div className="flex justify-end col-start-3">
      <Link className={cn(baseButtonClasses, 'bg-rg-dark hover:bg-rg-darkest focus:ring-rg-dark')} href="/login">
        Login
      </Link>
    </div>
  );
}

export default UserPanel;
