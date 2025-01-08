import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';

import { usePocketbase, useUser } from '$/app/pocketbase-provider';
import { useMessageSounds } from '$/hooks/useMessagesSounds';
import {
  Collections,
  type MessagesResponse,
  type TypedPocketBase,
  type UsersResponse,
} from '$/utils/pocketbase/pocketbase-types';

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

async function getMessages({ pb, chatId, page }: { pb: TypedPocketBase; chatId: string; page: number }) {
  return pb.collection(Collections.Messages).getList<ExpandedMessage>(page, PAGE_SIZE, {
    filter: `conversation="${chatId}" && deletedAt = null`,
    sort: '-created',
    expand: 'sender',
  });
}

export function useMessages(chatId: string | undefined) {
  const user = useUser();
  const { pb } = usePocketbase();
  const { playMessageReceived, playMessageSent } = useMessageSounds();
  const [realtimeMessages, setRealtimeMessages] = useState<ExpandedMessage[]>([]);

  const {
    data: messagesPages,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['messages', chatId],
    queryFn: ({ pageParam = 1 }) => getMessages({ pb, chatId: chatId as string, page: pageParam }),
    getNextPageParam: (lastPage: MessagesQueryResponse) => (lastPage.totalPages > lastPage.page ? lastPage.page + 1 : undefined),
    enabled: !!chatId,
    refetchOnWindowFocus: false,
    initialPageParam: 1,
  });

  // Combine fetched messages with realtime messages
  const messages = useMemo(() => {
    const fetchedMessages = messagesPages?.pages.flatMap((page) => page.items) ?? [];
    const allMessages = [...realtimeMessages, ...fetchedMessages];

    // Remove duplicates (in case a realtime message was also fetched)
    const uniqueMessages = allMessages.filter((message, index, self) => index === self.findIndex((m) => m.id === message.id));

    // Sort by creation date, newest first
    return uniqueMessages.sort((a, b) => new Date(a.created).getTime() - new Date(b.created).getTime());
  }, [messagesPages?.pages, realtimeMessages]);

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
            if (e.record.sender !== user.id) {
              playMessageReceived();
            } else {
              playMessageSent();
            }

            setRealtimeMessages((prev) => [e.record, ...prev]);
          } else if (e.action === 'update') {
            setRealtimeMessages((prev) =>
              prev.map((message) => (message.id === e.record.id ? { ...message, ...e.record } : message)),
            );
          } else if (e.action === 'delete') {
            setRealtimeMessages((prev) => prev.filter((message) => message.id !== e.record.id));
          }
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
  }, [chatId, user, playMessageReceived, playMessageSent]);

  return {
    messages,
    isLoading,
    fetchNextPage,
    hasNextPage,
  };
}
