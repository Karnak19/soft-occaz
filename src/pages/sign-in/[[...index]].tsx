import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="grid place-items-center pt-5">
      <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
    </div>
  );
}
