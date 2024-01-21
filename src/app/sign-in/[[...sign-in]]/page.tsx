'use client';
import { useIsDark } from '$/hooks/useIsDark';
import { SignIn } from '@clerk/nextjs';
import { dark } from '@clerk/themes';

function Page() {
  const isDark = useIsDark();

  return (
    <div className="mt-8 grid place-items-center">
      <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" appearance={{ baseTheme: isDark ? dark : undefined }} />
    </div>
  );
}

export default Page;
