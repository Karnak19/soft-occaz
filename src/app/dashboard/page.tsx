import { Suspense } from 'react';

import { auth, createServerClient } from '$/utils/pocketbase/server';
import { Skeleton } from '$/components/ui/skeleton';
import { MessagesCard } from '$/components/dashboard/MessagesCard';

async function Page() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  const pb = await createServerClient();

  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
      <Suspense fallback={<Fallback />}>
        <MessagesCard userId={userId} pb={pb} />
      </Suspense>
      <div className="col-span-2"></div>
    </div>
  );
}

function Fallback() {
  return <Skeleton className="size-full rounded-xl border border-border bg-card" />;
}

export default Page;
