'use client';

import { useQuery } from '@tanstack/react-query';
import { AuthRecord } from 'pocketbase';
import { createContext, useContext, useEffect, useRef } from 'react';

import { Button } from '$/components/ui/button';
import { createBrowserClient } from '$/utils/pocketbase/client';
import {
  ConversationsResponse,
  ReferralTiersResponse,
  TypedPocketBase,
  UsersResponse,
} from '$/utils/pocketbase/pocketbase-types';
import Link from 'next/link';
import { usePostHog } from 'posthog-js/react';
import { toast } from 'sonner';

const PocketBaseContext = createContext<{
  pb: TypedPocketBase;
} | null>(null);

export type ExpandedConversation = ConversationsResponse<{ participants: UsersResponse[] }>;

export function usePocketbase() {
  return useContext(PocketBaseContext)!;
}

export function useUser() {
  const { pb } = usePocketbase();
  return pb.authStore.record as UsersResponse;
}

export function useUserPreferences() {
  const { pb } = usePocketbase();
  const user = useUser();
  return useQuery({
    queryKey: ['user_preferences', user?.id],
    queryFn: () => pb.collection('user_preferences').getFirstListItem(`user = "${user?.id}"`),
    enabled: !!user?.id,
  });
}

export function useUserReferrals(id?: string) {
  const { pb } = usePocketbase();
  const user = useUser();

  const userId = id || user?.id;

  return useQuery({
    queryKey: ['user_referrals', userId],
    queryFn: () =>
      pb.collection('referral_tiers').getOne<ReferralTiersResponse<'master' | 'gold' | 'silver' | 'bronze' | 'none'>>(userId),
    enabled: !!userId,
  });
}

export function PocketBaseProvider({
  initialToken,
  initialUser,
  children,
}: {
  initialToken: string;
  initialUser: AuthRecord;
  children?: React.ReactNode;
}) {
  const posthog = usePostHog();
  const clientRef = useRef<TypedPocketBase>(createBrowserClient());

  if (initialToken && initialUser) {
    clientRef.current.authStore.save(initialToken, initialUser);
  }

  useEffect(() => {
    async function authRefresh() {
      if (clientRef.current.authStore.isValid) {
        try {
          await clientRef.current.collection('users').authRefresh();

          if (clientRef.current.authStore.record?.id) {
            await clientRef.current.collection('users').update(clientRef.current.authStore.record?.id, {
              lastOnline: new Date().toISOString(),
            });
            const user = clientRef.current.authStore.record as UsersResponse;

            if (user) {
              posthog.identify(user.id, { email: user.email, name: user.name });
            }

            if (user && (!user.departement || user.departement === 0 || !user.payment || !user.shipping)) {
              const missingFields = [];
              if (!user.departement || user.departement === 0) missingFields.push('département');
              if (!user.payment) missingFields.push('méthode de paiement');
              if (!user.shipping) missingFields.push('méthode de livraison');

              toast.warning('Informations manquantes', {
                description: `Configurez dans vos paramètres votre ${missingFields.join(', ')}.`,
                action: (
                  <Button asChild variant="outline" size="sm">
                    <Link href="/dashboard/settings">Configurer</Link>
                  </Button>
                ),
              });
            }
          }
        } catch {
          clientRef.current.authStore.clear();
        }
      }
    }

    authRefresh();
  }, [initialToken, initialUser]);

  return (
    <PocketBaseContext.Provider
      value={{
        pb: clientRef.current,
      }}
    >
      {children}
    </PocketBaseContext.Provider>
  );
}
