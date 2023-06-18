import { SignIn } from '@clerk/nextjs';

function page() {
  return (
    <div className="mt-8 grid place-items-center">
      <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
    </div>
  );
}

export default page;
