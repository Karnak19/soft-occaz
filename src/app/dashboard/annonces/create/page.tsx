'use client';

import { useUser } from '@clerk/nextjs';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const CreateAdForm = dynamic(() => import('$/components/CreateAdForm'), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

function Page() {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (!user) {
      router.push('/sign-in');
    }
  }, []);

  return <CreateAdForm />;
}

export default Page;
