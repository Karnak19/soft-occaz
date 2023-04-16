import { SignInButton, UserButton, useUser } from '@clerk/nextjs';

function ClerkUserButton() {
  const { isSignedIn } = useUser();

  return <div className="col-start-3 flex justify-end">{isSignedIn ? <UserButton /> : <SignInButton />}</div>;
}

export default ClerkUserButton;
