import { useEffect } from 'react';
import { useQueries, useQuery, useQueryClient } from '@tanstack/react-query';

import { pb } from '$/utils/pocketbase/client';
import { Collections, ConversationsResponse, MessagesResponse, UsersResponse } from '$/utils/pocketbase/pocketbase-types';
import { useMe } from '$/hooks/useMe';

export type ExpandedConversation = ConversationsResponse<{ participants: UsersResponse[] }>;

export function useConversations() {
  const { data: user } = useMe();
  const queryClient = useQueryClient();

  const { data: conversations, isLoading } = useQuery({
    queryKey: ['conversations', user?.clerkId],
    queryFn: async () => {
      const records = await pb.collection(Collections.Conversations).getList<ExpandedConversation>(1, 50, {
        sort: '-updated',
        expand: 'participants',
      });
      return records.items;
    },
    enabled: !!user?.id,
  });

  const unreadMessages = useQueries({
    queries:
      conversations?.map((conversation) => ({
        queryKey: ['messages', conversation.id, 'unread'],
        queryFn: () =>
          pb.collection(Collections.Messages).getList<MessagesResponse<{ sender: UsersResponse }>>(1, 50, {
            filter: `conversation="${conversation.id}" && deletedAt = null`,
            expand: 'sender',
          }),
        select: (data: { items: MessagesResponse<{ sender: UsersResponse }>[] }) => {
          return [
            conversation.id,
            data?.items?.filter((m) => m.status !== 'read' && m.expand?.sender.clerkId !== user?.clerkId).length,
          ] as const;
        },
        enabled: !!user?.clerkId,
        refetchInterval: 10 * 1000,
      })) ?? [],
  });

  useEffect(() => {
    if (!user?.id) return;

    let unsubscribe: (() => void) | undefined;

    pb.collection(Collections.Conversations)
      .subscribe('*', () => {
        queryClient.invalidateQueries({ queryKey: ['conversations'] });
      })
      .then((u) => {
        unsubscribe = u;
      });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [queryClient, user?.id]);

  return {
    conversations,
    isLoading,
    unreadMessages: Object.fromEntries(unreadMessages.map((m) => m.data ?? [])),
    totalUnreadMessages: unreadMessages.reduce((acc, m) => acc + (m.data?.[1] ?? 0), 0),
  };
}
