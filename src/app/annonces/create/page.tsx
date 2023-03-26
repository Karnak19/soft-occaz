'use client';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { usePocket } from '$/components/PocketContext';

const CreateAdForm = dynamic(() => import('$/components/CreateAdForm'), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

function Page() {
  const router = useRouter();
  const { user } = usePocket();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, []);

  return (
    <div>
      <CreateAdForm />
    </div>
  );
}

export default Page;
