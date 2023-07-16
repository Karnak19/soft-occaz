import { SignUp } from '@clerk/nextjs';

function Page() {
  return (
    <div className="mt-8 grid place-items-center">
      <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
    </div>
  );
}

export default Page;
