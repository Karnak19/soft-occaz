'use client';

import Link from 'next/link';

import Button from './Button';
import { usePocket } from './PocketContext';

function UserPanel() {
  const { user, logout, pb } = usePocket();

  const avatar = user
    ? pb.getFileUrl(user, user.avatar, {
        thumb: '32x32',
      })
    : '';

  return (
    <div>
      {user ? (
        <div className="flex gap-2">
          <Button variant="secondary" onClick={logout}>
            Logout
          </Button>
          {avatar && (
            <div className="h-8 w-8 rounded-full overflow-hidden border border-sky-600">
              <img className="w-full h-full object-cover" src={avatar} alt="avatar" />
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
