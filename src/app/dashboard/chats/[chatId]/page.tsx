'use client';

import { useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { ArrowLeft, Check, CheckCheck, UserCircle2Icon } from 'lucide-react';

import { cn } from '$/utils/cn';
import { pb } from '$/utils/pocketbase/client';
import { Collections } from '$/utils/pocketbase/pocketbase-types';
import { useIsMobile } from '$/hooks/use-mobile';
import { useMe } from '$/hooks/useMe';
import { useMessages } from '$/hooks/useMessages';
import { Avatar } from '$/components/ui/avatar';
import { Button } from '$/components/ui/button';
import { ScrollArea } from '$/components/ui/scroll-area';

import { MessageForm } from './MessageForm';

const PAGE_SIZE = 20;

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
  const isMobile = useIsMobile();
  const router = useRouter();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const isAtBottomRef = useRef(true);
  const { messages, isLoading, fetchNextPage, hasNextPage } = useMessages(chatId as string);

  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current;
      scrollContainer.scrollTo({
        top: scrollContainer.scrollHeight,
        behavior,
      });
    }
  };

  // Handle scroll position tracking
  const onScroll = () => {
    if (!scrollAreaRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollAreaRef.current;
    const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);
    isAtBottomRef.current = distanceFromBottom < 100;
  };

  // Scroll to bottom on initial load and when sending messages
  useEffect(() => {
    if (isAtBottomRef.current) {
      scrollToBottom(messages.length <= PAGE_SIZE ? 'auto' : 'smooth');
    }
  }, [messages]);

  // Mark messages as read when they are visible
  const markAsReadMutation = useMutation({
    mutationFn: markMessagesAsRead,
  });

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
    <div className="flex h-full flex-col rounded-none border-0">
      {/* Chat header */}
      <div className="border-b p-4">
        <div className="flex items-center space-x-4">
          {isMobile && chatId && (
            <Button variant="ghost" size="icon" className="size-10" onClick={() => router.push('/dashboard/chats')}>
              <ArrowLeft className="size-6" />
            </Button>
          )}
          <Avatar className="size-10">
            <UserCircle2Icon className="size-full" />
          </Avatar>
          <div>
            <h2 className="text-lg font-semibold">Chat Title</h2>
            <p className="text-sm text-muted-foreground">2 participants</p>
          </div>
        </div>
      </div>

      {/* Messages area */}
      <ScrollArea ref={scrollAreaRef} onScroll={onScroll} className="flex-1">
        <div className="flex flex-col space-y-4 p-4">
          {isLoading ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-sm text-muted-foreground">Loading messages...</p>
            </div>
          ) : (
            <>
              {hasNextPage && (
                <div className="pb-4 text-center">
                  <Button variant="ghost" size="sm" onClick={() => fetchNextPage()}>
                    Load more messages
                  </Button>
                </div>
              )}
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn('flex items-start space-x-2', {
                    'flex-row-reverse space-x-reverse': message.expand?.sender.clerkId === user?.clerkId,
                  })}
                >
                  <Avatar className="size-8">
                    {message.expand?.sender.avatar ? (
                      <img
                        src={pb.files.getURL(message.expand.sender, message.expand.sender.avatar)}
                        alt=""
                        className="size-full object-cover"
                      />
                    ) : (
                      <UserCircle2Icon className="size-full" />
                    )}
                  </Avatar>
                  <div
                    className={cn('rounded-lg px-4 py-2', {
                      'bg-primary text-primary-foreground': message.expand?.sender.clerkId === user?.clerkId,
                      'bg-muted': message.expand?.sender.clerkId !== user?.clerkId,
                    })}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                  <div className="mt-1 flex items-center gap-1">
                    <p className="text-xs opacity-70">
                      {new Date(message.created).toLocaleTimeString('fr-FR', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>

                    <span
                      className={cn('transition-opacity', {
                        'text-primary': message.status === 'read',
                        'text-muted-foreground': message.status !== 'read',
                        'opacity-70': true,
                      })}
                    >
                      {message.status === 'read' || message.status === 'delivered' ? (
                        <CheckCheck className="size-3" />
                      ) : (
                        <Check className="size-3" />
                      )}
                    </span>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </ScrollArea>

      {/* Message input */}
      <MessageForm chatId={chatId as string} />
    </div>
  );
}
