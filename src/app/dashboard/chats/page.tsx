'use client';
import { useAuth } from '@clerk/nextjs';
import { useSearchParams } from 'next/navigation';
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
      <div className="h-full flex flex-col">
        <ClientSideChat user={user} />
      </div>
    );
  }
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 bg-muted flex items-center justify-center text-2xl font-semibold">
        Aucune conversation sélectionnée
      </div>
    </div>
  );
}
