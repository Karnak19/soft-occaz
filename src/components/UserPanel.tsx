'use client';

import { UserButton, useUser } from '@clerk/nextjs';

import Link from './Link';
import { StarIcon } from '@heroicons/react/20/solid';

function UserPanel() {
  const { isSignedIn } = useUser();

  return (
    <div className="col-start-3 flex justify-end gap-2 items-center">
      <div>
        <Link href="/pricing" size="sm" variant="premium">
          <StarIcon className="w-3 h-3 mr-1" />
          Premium
        </Link>
      </div>
      {isSignedIn ? (
        <UserButton
          afterSignOutUrl="/"
          userProfileMode="navigation"
          userProfileUrl={typeof window !== 'undefined' ? `${window.location.origin}/dashboard` : undefined}
        />
      ) : (
        <div>
          <Link size="sm" href="/sign-in">
            Connexion
          </Link>
        </div>
      )}
    </div>
  );
}

export default UserPanel;
