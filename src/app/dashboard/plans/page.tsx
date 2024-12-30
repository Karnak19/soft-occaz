'use client';

import { useUser } from '$/app/pocketbase-provider';

function Page() {
  const user = useUser();

  return null;

  // if (!user) {
  //   return <div>Loading...</div>;
  // }

  // if (user.sub === 'FREE') {
  //   return <PricingTable {...user} />;
  // }

  // return <MyPlan {...user} />;
}

export default Page;
