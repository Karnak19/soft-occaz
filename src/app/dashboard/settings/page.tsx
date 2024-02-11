'use client';

import { UserProfile } from '@clerk/nextjs';
import { dark } from '@clerk/themes';

import { useIsDark } from '$/hooks/useIsDark';

function Page() {
  const isDark = useIsDark();

  return (
    <UserProfile
      path="/dashboard/settings"
      appearance={{
        baseTheme: isDark ? dark : undefined,
        elements: {
          rootBox: '-mx-[1rem] sm:mx-auto',
          pageScrollBox: 'p-4',
          card: 'rounded-xl border bg-card text-card-foreground shadow border-muted',
        },
      }}
    />
  );
}

export default Page;
