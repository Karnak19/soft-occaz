'use client';

import { UserButton, useUser } from '@clerk/nextjs';

import Link from 'next/link';
import { StarIcon } from '@heroicons/react/20/solid';
import { DarkModeToggle } from './dark-mode-toggler';
import { Button } from './ui/button';

function UserPanel() {
  const { isSignedIn } = useUser();

  return (
    <div className="col-start-3 flex justify-end gap-2 items-center">
      <div>
        <Button asChild size="sm" variant="premium">
          <Link href="/pricing" prefetch={false}>
            <StarIcon className="w-3 h-3 mr-1" />
            Premium
          </Link>
        </Button>
      </div>
      {isSignedIn ? (
        <UserButton
          afterSignOutUrl="/"
          userProfileMode="navigation"
          userProfileUrl={typeof window !== 'undefined' ? `${window.location.origin}/dashboard` : undefined}
        />
      ) : (
        <div>
          <Button variant="default" size="sm" asChild>
            <Link href="/sign-in">Connexion</Link>
          </Button>
        </div>
      )}
      <div>
        <DarkModeToggle />
      </div>
    </div>
  );
}

export default UserPanel;
