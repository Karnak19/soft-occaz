'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

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
  });

  // Mark messages as read when they become visible
  useEffect(() => {
    if (!user || !messages.length) return;

    // Find unread messages from other users
    const unreadMessages = messages.filter((message) => message.sender !== user.id && message.status !== 'read');

    if (unreadMessages.length > 0) {
      markAsReadMutation.mutate(unreadMessages.map((m) => m.id));
    }
  }, [messages, user]);

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <ChatHeader chatId={chatId as string} title={title} recipient={recipient} />

      <MessageList
        messages={messages}
        isLoading={isLoading}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        onReply={setReplyingTo}
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
