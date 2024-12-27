import { useEffect, useMemo } from 'react';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';

import { pb } from '$/utils/pocketbase/client';
import { Collections, MessagesResponse, UsersResponse } from '$/utils/pocketbase/pocketbase-types';
import { useMe } from '$/hooks/useMe';
import { useMessageSounds } from '$/hooks/useMessagesSounds';

const PAGE_SIZE = 20;

type ExpandedMessage = MessagesResponse<{
  sender: UsersResponse;
}>;

type MessagesQueryResponse = {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  items: ExpandedMessage[];
};

async function getMessages({ chatId, page }: { chatId: string; page: number }) {
  return pb.collection(Collections.Messages).getList<ExpandedMessage>(page, PAGE_SIZE, {
    filter: `conversation="${chatId}" && deletedAt = null`,
    sort: '-created',
    expand: 'sender',
  });
}

export function useMessages(chatId: string | undefined) {
  const queryClient = useQueryClient();
  const { data: user } = useMe();
  const { playMessageReceived, playMessageSent } = useMessageSounds();

  const {
    data: messagesPages,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['messages', chatId],
    queryFn: ({ pageParam = 1 }) => getMessages({ chatId: chatId as string, page: pageParam }),
    getNextPageParam: (lastPage: MessagesQueryResponse) => (lastPage.totalPages > lastPage.page ? lastPage.page + 1 : undefined),
    enabled: !!chatId,
    refetchOnWindowFocus: false,
    initialPageParam: 1,
  });

  const messages = useMemo(() => messagesPages?.pages.flatMap((page) => page.items).reverse() ?? [], [messagesPages?.pages]);

  // Subscribe to real-time updates
  useEffect(() => {
    if (!chatId || !user) return;

    let unsubscribe: (() => void) | undefined;

    // Subscribe to new messages
    pb.collection(Collections.Messages)
      .subscribe<ExpandedMessage>(
        '*',
        async (e) => {
          if (e.action === 'create') {
            // Only play sound for new messages from others
            if (e.record.expand?.sender.clerkId !== user.clerkId) {
              playMessageReceived();
            } else {
              playMessageSent();
            }
          }
          queryClient.invalidateQueries({ queryKey: ['messages', chatId] });
        },
        { filter: `conversation="${chatId}" && deletedAt = null`, expand: 'sender' },
      )
      .then((u) => {
        unsubscribe = u;
      });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [chatId, queryClient, user, playMessageReceived, playMessageSent]);

  return {
    messages,
    isLoading,
    fetchNextPage,
    hasNextPage,
  };
}
