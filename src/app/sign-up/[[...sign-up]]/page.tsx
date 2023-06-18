import { SignUp } from '@clerk/nextjs';

function page() {
  return (
    <div className="mt-8 grid place-items-center">
      <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
    </div>
  );
}

export default page;
