'use client';
import { dark } from '@clerk/themes';
import { useTheme } from 'next-themes';
import { SignUp } from '@clerk/nextjs';

function Page() {
  const { theme } = useTheme();

  const isDark = theme === 'dark' || window.matchMedia('(prefers-color-scheme: dark)').matches;

  return (
    <div className="mt-8 grid place-items-center">
      <SignUp appearance={{ baseTheme: isDark ? dark : undefined }} path="/sign-up" routing="path" signInUrl="/sign-in" />
    </div>
  );
}

export default Page;
