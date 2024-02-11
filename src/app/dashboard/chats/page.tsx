'use client';

import { useSearchParams } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { useAuth as useFirebaseAuth } from 'reactfire';

import { useMe } from '$/hooks/useMe';

import { ClientSideChat } from './ClientSideChat';

export default function ChatsPage() {
  const { getToken } = useAuth();
  const { data: user, status } = useMe();
  const params = useSearchParams();
  const auth = useFirebaseAuth();

  // useEffect(() => {
  //   const run = async () => {
  //     if (!auth.currentUser) {
  //       const token = await getToken({ template: 'integration_firebase' });
  //       if (!token) {
  //         throw new Error('No token');
  //       }
  //       await signInWithCustomToken(auth, token);
  //     }
  //   };

  //   run();
  // }, []);

  if (params.get('chat') && status === 'success') {
    return (
      <div className="flex h-full flex-col">
        <ClientSideChat user={user} />
      </div>
    );
  }
  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-1 items-center justify-center bg-muted text-2xl font-semibold">
        Aucune conversation sélectionnée
      </div>
    </div>
  );
}
