'use client';

import { createContext, useContext, useEffect, useRef } from 'react';
import { AuthRecord } from 'pocketbase';

import { createBrowserClient } from '$/utils/pocketbase/client';
import { ConversationsResponse, TypedPocketBase, UsersResponse } from '$/utils/pocketbase/pocketbase-types';

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
