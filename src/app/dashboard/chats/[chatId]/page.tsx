'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';

import { pb } from '$/utils/pocketbase/client';
import {
  Collections,
  type ConversationsResponse,
  type MessagesResponse,
  type UsersResponse,
} from '$/utils/pocketbase/pocketbase-types';
import { useMe } from '$/hooks/useMe';
import { useMessages } from '$/hooks/useMessages';

import { ChatHeader } from './ChatHeader';
import { MessageForm } from './MessageForm';
import { MessageList } from './MessageList';

async function markMessagesAsRead(messageIds: string[]) {
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
  const { data: user } = useMe();
  const { messages, isLoading, fetchNextPage, hasNextPage } = useMessages(chatId as string);
  const [replyingTo, setReplyingTo] = useState<MessagesResponse | undefined>();

  const { data: chat } = useQuery({
    queryKey: ['chats', chatId],
    queryFn: () =>
      pb
        .collection<ConversationsResponse<{ participants: UsersResponse[] }>>(Collections.Conversations)
        .getOne(chatId as string, { expand: 'participants' }),
  });

  const recipient = chat?.expand?.participants.find((p) => p.clerkId !== user?.clerkId);
  const title = chat?.name || recipient?.name || 'Chat';

  // Mark messages as read when they are visible
  const markAsReadMutation = useMutation({
    mutationFn: markMessagesAsRead,
  });

  // Mark messages as read when they become visible
  useEffect(() => {
    if (!user || !messages.length) return;

    // Find unread messages from other users
    const unreadMessages = messages.filter(
      (message) => message.expand?.sender.clerkId !== user.clerkId && message.status !== 'read',
    );

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
        userClerkId={user?.clerkId}
      />

      <div className="pt-safe flex-none bg-background">
        <MessageForm
          chatId={chatId as string}
          recipientClerkId={recipient?.clerkId}
          replyTo={replyingTo}
          onCancelReply={() => setReplyingTo(undefined)}
        />
      </div>
    </div>
  );
}
