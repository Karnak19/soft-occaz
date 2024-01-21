'use client';
import { SignIn } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { useTheme } from 'next-themes';

function Page() {
  const { theme } = useTheme();

  const isDark = theme === 'dark' || window.matchMedia('(prefers-color-scheme: dark)').matches;

  return (
    <div className="mt-8 grid place-items-center">
      <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" appearance={{ baseTheme: isDark ? dark : undefined }} />
    </div>
  );
}

export default Page;
