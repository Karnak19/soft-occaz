'use client';

import { UserButton, useUser } from '@clerk/nextjs';
import { dark } from '@clerk/themes';

import Link from 'next/link';
import { StarIcon } from '@heroicons/react/20/solid';
import { DarkModeToggle } from './dark-mode-toggler';
import { Button } from './ui/button';
import { useIsDark } from '$/hooks/useIsDark';

function UserPanel() {
  const { isSignedIn } = useUser();

  const isDark = useIsDark();

  return (
    <div className="col-start-3 flex items-center justify-end gap-2">
      <div>
        <Button asChild size="sm" variant="premium">
          <Link href="/pricing" prefetch={false}>
            <StarIcon className="mr-1 size-3" />
            Premium
          </Link>
        </Button>
      </div>
      {isSignedIn ? (
        <UserButton
          appearance={{ baseTheme: isDark ? dark : undefined }}
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
