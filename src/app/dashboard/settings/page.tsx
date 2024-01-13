'use client';
import { UserProfile } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { useTheme } from 'next-themes';

function Page() {
  const { theme } = useTheme();
  return (
    <UserProfile
      path="/dashboard/settings"
      appearance={{
        baseTheme: theme === 'dark' ? dark : undefined,
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
