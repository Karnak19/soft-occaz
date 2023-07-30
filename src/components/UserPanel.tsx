'use client';

import { UserButton, useUser } from '@clerk/nextjs';

import Link from './Link';
import { StarIcon } from '@heroicons/react/20/solid';

function UserPanel() {
  const { isSignedIn } = useUser();

  return (
    <div className="col-start-3 flex justify-end gap-2">
      <div>
        <Link href="/pricing" className="bg-gradient-to-bl from-amber-500" variant="tertiary">
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
          <Link href="/sign-in" className="text-white" variant="secondary">
            Connexion
          </Link>
        </div>
      )}
    </div>
  );
}

export default UserPanel;
