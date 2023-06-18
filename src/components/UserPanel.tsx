'use client';

import { UserButton, useUser } from '@clerk/nextjs';

import Link from './Link';

function UserPanel() {
  const { isSignedIn } = useUser();

  return (
    <div className="col-start-3 flex justify-end">
      {isSignedIn ? (
        <UserButton
          afterSignOutUrl="/"
          userProfileMode="navigation"
          userProfileUrl={typeof window !== 'undefined' ? `${window.location.origin}/dashboard` : undefined}
        />
      ) : (
        <div>
          <Link href="/sign-in" className="text-white" variant="secondary">
            Sign in
          </Link>
        </div>
      )}
    </div>
  );
}

export default UserPanel;
