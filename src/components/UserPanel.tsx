'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import Button from './Button';
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
          thumb: '32x32',
        }),
      );
    } else {
      setIsLoggedIn(false);
    }
  }, [user]);

  return (
    <div>
      {isLoggedIn ? (
        <div className="flex gap-2">
          <Button variant="secondary" onClick={logout}>
            Logout
          </Button>
          {avatar && (
            <div className="w-8 h-8 overflow-hidden border rounded-full border-sky-500">
              <img className="object-cover w-full h-full" src={avatar} alt="avatar" />
            </div>
          )}
        </div>
      ) : (
        <div>
          <Link href="/login">Login</Link>
        </div>
      )}
    </div>
  );
}

export default UserPanel;
