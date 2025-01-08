'use client';

import { useQuery } from '@tanstack/react-query';
import { AuthRecord } from 'pocketbase';
import { createContext, useContext, useEffect, useRef } from 'react';

import { createBrowserClient } from '$/utils/pocketbase/client';
import {
  ConversationsResponse,
  ReferralTiersResponse,
  TypedPocketBase,
  UsersResponse,
} from '$/utils/pocketbase/pocketbase-types';

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
    queryKey: ['user_preferences', user.id],
    queryFn: () => pb.collection('user_preferences').getFirstListItem(`user = "${user.id}"`),
    enabled: !!user,
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
  const clientRef = useRef<TypedPocketBase>(createBrowserClient());
  clientRef.current.authStore.save(initialToken, initialUser);

  useEffect(() => {
    async function authRefresh() {
      if (clientRef.current.authStore.isValid) {
        try {
          await clientRef.current.collection('users').authRefresh();

          if (clientRef.current.authStore.record?.id) {
            await clientRef.current.collection('users').update(clientRef.current.authStore.record?.id, {
              lastOnline: new Date().toISOString(),
            });
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
