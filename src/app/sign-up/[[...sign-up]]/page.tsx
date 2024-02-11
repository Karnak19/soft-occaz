'use client';

import { SignUp } from '@clerk/nextjs';
import { dark } from '@clerk/themes';

import { useIsDark } from '$/hooks/useIsDark';

function Page() {
  const isDark = useIsDark();

  return (
    <div className="mt-8 grid place-items-center">
      <SignUp appearance={{ baseTheme: isDark ? dark : undefined }} path="/sign-up" routing="path" signInUrl="/sign-in" />
    </div>
  );
}

export default Page;
