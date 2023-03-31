'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { cn } from '$/utils/cn';
import { Thumb } from '$/utils/thumbs';

import Button, { baseButtonClasses } from './Button';
import { usePocket } from './PocketContext';

function UserPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [avatar, setAvatar] = useState('');

  const { user, logout, pb } = usePocket();

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
    <div className="flex justify-end col-start-3 gap-2">
      <Button variant="secondary" className="text-gray-900 bg-rg-light" onClick={logout}>
        Logout
      </Button>
      {avatar && (
        <div className="w-8 h-8 overflow-hidden border rounded-full border-rg-lightest">
          <img className="object-cover w-full h-full" src={avatar} alt="avatar" />
        </div>
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
