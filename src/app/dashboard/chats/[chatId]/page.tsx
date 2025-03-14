'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useCallback, useState } from 'react';

import { usePocketbase, useUser } from '$/app/pocketbase-provider';
import { useMessages } from '$/hooks/useMessages';
import {
  Collections,
  type ConversationsResponse,
  type MessagesResponse,
  TypedPocketBase,
  type UsersResponse,
} from '$/utils/pocketbase/pocketbase-types';

import { ChatHeader } from './ChatHeader';
import { MessageForm } from './MessageForm';
import { MessageList } from './MessageList';

async function markMessagesAsRead(pb: TypedPocketBase, messageIds: string[]) {
  if (!messageIds.length) return [];

  return Promise.all(
    messageIds.map((id) =>
      pb.collection(Collections.Messages).update(id, {
        status: 'read',
      }),
    ),
  );
}

export default function ChatPage() {
  const { chatId } = useParams();
  const user = useUser();
  const { pb } = usePocketbase();
  const { messages, isLoading, fetchNextPage, hasNextPage } = useMessages(chatId as string);
  const [replyingTo, setReplyingTo] = useState<MessagesResponse | undefined>();
  const [pendingReadIds, setPendingReadIds] = useState<Set<string>>(new Set());

  const { data: chat } = useQuery({
    queryKey: ['chats', chatId],
    queryFn: () =>
      pb
        .collection<ConversationsResponse<{ participants: UsersResponse[] }>>(Collections.Conversations)
        .getOne(chatId as string, { expand: 'participants' }),
  });

  const recipient = chat?.expand?.participants.find((p) => p.id !== user?.id);
  const title = chat?.name || recipient?.name || 'Chat';

  // Mark messages as read when they are visible
  const markAsReadMutation = useMutation({
    mutationFn: (messageIds: string[]) => markMessagesAsRead(pb, messageIds),
    onMutate: (messageIds) => {
      // Add to pending set to prevent duplicate requests
      messageIds.forEach((id) => setPendingReadIds((prev) => new Set([...Array.from(prev), id])));
    },
    onError: (error, variables) => {
      // Remove from pending set
      variables.forEach((id) =>
        setPendingReadIds((prev) => {
          const newSet = new Set(Array.from(prev));
          newSet.delete(id);
          return newSet;
        }),
      );

      console.error('Failed to mark messages as read:', error);
    },
    onSuccess: (data, variables) => {
      // Remove from pending set on success
      variables.forEach((id) =>
        setPendingReadIds((prev) => {
          const newSet = new Set(Array.from(prev));
          newSet.delete(id);
          return newSet;
        }),
      );
    },
  });

  const handleMarkAsRead = useCallback(
    (messageIds: string[]) => {
      if (!user || !messageIds.length) return;

      // Filter out messages that are already being processed
      const newMessageIds = messageIds.filter((id) => !pendingReadIds.has(id));

      if (newMessageIds.length > 0) {
        markAsReadMutation.mutate(newMessageIds);
      }
    },
    [user, markAsReadMutation, pendingReadIds],
  );

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <ChatHeader chatId={chatId as string} title={title} recipient={recipient} />

      <MessageList
        messages={messages}
        isLoading={isLoading}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        onReply={setReplyingTo}
        onMarkAsRead={handleMarkAsRead}
      />

      <div className="flex-none bg-background">
        <MessageForm
          chatId={chatId as string}
          recipientId={recipient?.id}
          replyTo={replyingTo}
          onCancelReply={() => setReplyingTo(undefined)}
        />
      </div>
    </div>
  );
}
