'use client';

import { createContext, useContext, useEffect, useRef } from 'react';
import { useQueries, useQuery } from '@tanstack/react-query';
import { AuthRecord } from 'pocketbase';

import { createBrowserClient } from '$/utils/pocketbase/client';
import { ConversationsResponse, MessagesResponse, TypedPocketBase, UsersResponse } from '$/utils/pocketbase/pocketbase-types';

const PocketBaseContext = createContext<{
  pb: TypedPocketBase;
  conversations: ExpandedConversation[];
  isLoading: boolean;
  unreadMessages: Record<string, number>;
  totalUnreadMessages: number;
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

  const { data: conversations = [], isLoading } = useQuery({
    queryKey: ['conversations', initialUser?.id],
    queryFn: async () => {
      const records = await clientRef.current.collection('conversations').getList<ExpandedConversation>(1, 50, {
        sort: '-updated',
        expand: 'participants',
      });
      return records.items;
    },
    enabled: !!initialUser?.id,
    refetchInterval: 10 * 1000,
  });

  const unreadMessages = useQueries({
    queries:
      conversations?.map((conversation) => ({
        queryKey: ['messages', conversation.id, 'unread'],
        queryFn: () =>
          clientRef.current.collection('messages').getList<MessagesResponse<{ sender: UsersResponse }>>(1, 50, {
            filter: `conversation="${conversation.id}" && deletedAt = null`,
            expand: 'sender',
          }),
        select: (data: { items: MessagesResponse<{ sender: UsersResponse }>[] }) => {
          return [
            conversation.id,
            data?.items?.filter((m) => m.status !== 'read' && m.sender !== initialUser?.id).length,
          ] as const;
        },
        enabled: !!initialUser?.id,
        refetchInterval: 10 * 1000,
      })) ?? [],
  });

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
        conversations,
        isLoading,
        unreadMessages: Object.fromEntries(unreadMessages.map((m) => m.data ?? [])),
        totalUnreadMessages: unreadMessages.reduce((acc, m) => acc + (m.data?.[1] ?? 0), 0),
      }}
    >
      {children}
    </PocketBaseContext.Provider>
  );
}
