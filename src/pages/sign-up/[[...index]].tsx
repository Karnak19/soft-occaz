import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="grid place-items-center pt-5">
      <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
    </div>
  );
}
