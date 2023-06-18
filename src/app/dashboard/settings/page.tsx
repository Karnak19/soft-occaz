import { UserProfile } from '@clerk/nextjs';

function page() {
  return <UserProfile path="/dashboard/settings" />;
}

export default page;
