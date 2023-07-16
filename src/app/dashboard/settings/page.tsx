import { UserProfile } from '@clerk/nextjs';

function Page() {
  return <UserProfile path="/dashboard/settings" />;
}

export default Page;
