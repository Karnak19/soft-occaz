import { useCallback, useEffect, useRef, useState } from 'react';

import { useUser } from '$/app/pocketbase-provider';
import { Button } from '$/components/ui/button';
import { type MessagesResponse, type UsersResponse } from '$/utils/pocketbase/pocketbase-types';

import { ChatMessage } from './ChatMessage';

type MessageListProps = {
  messages: MessagesResponse<{ sender: UsersResponse }>[];
  isLoading: boolean;
  hasNextPage?: boolean;
  fetchNextPage?: () => void;
  onReply: (message: MessagesResponse) => void;
  onMarkAsRead: (messageIds: string[]) => void;
};

const PAGE_SIZE = 20;

export function MessageList({ messages, isLoading, hasNextPage, fetchNextPage, onReply, onMarkAsRead }: MessageListProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const isAtBottomRef = useRef(true);
  const user = useUser();
  const pendingReadMessages = useRef<Set<string>>(new Set());
  const [processingRead, setProcessingRead] = useState(false);
  const processTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastProcessedMessagesRef = useRef<string[]>([]);

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

  // Process messages that need to be marked as read
  const processReadMessages = useCallback(() => {
    if (pendingReadMessages.current.size === 0 || processingRead) return;

    setProcessingRead(true);
    const messageIds = Array.from(pendingReadMessages.current);

    // Only mark messages as read if they're not from the current user and not already read
    const unreadMessagesToMark = messageIds.filter((id) => {
      const message = messages.find((m) => m.id === id);
      return message && message.sender !== user?.id && message.status !== 'read';
    });

    // Don't process the same messages again
    const newMessagesToMark = unreadMessagesToMark.filter((id) => !lastProcessedMessagesRef.current.includes(id));

    if (newMessagesToMark.length > 0) {
      lastProcessedMessagesRef.current = [...lastProcessedMessagesRef.current, ...newMessagesToMark];
      onMarkAsRead(newMessagesToMark);
    }

    pendingReadMessages.current.clear();
    setProcessingRead(false);
  }, [messages, onMarkAsRead, processingRead, user?.id]);

  // Schedule processing with debounce to avoid too many calls
  const scheduleProcessing = useCallback(
    (delay = 300) => {
      if (processTimeoutRef.current) {
        clearTimeout(processTimeoutRef.current);
      }

      processTimeoutRef.current = setTimeout(() => {
        processReadMessages();
        processTimeoutRef.current = null;
      }, delay);
    },
    [processReadMessages],
  );

  // Check for initially visible messages on mount and when messages change
  useEffect(() => {
    if (!user || isLoading) return;

    // Add unread messages from others to the pending list
    const newUnreadMessages = messages.filter((message) => message.sender !== user.id && message.status !== 'read');

    if (newUnreadMessages.length > 0) {
      newUnreadMessages.forEach((message) => {
        pendingReadMessages.current.add(message.id);
      });

      // Process immediately for initial load with a slight delay
      scheduleProcessing(500);
    }

    if (isAtBottomRef.current) {
      scrollToBottom(messages.length <= PAGE_SIZE ? 'auto' : 'smooth');
    }

    return () => {
      if (processTimeoutRef.current) {
        clearTimeout(processTimeoutRef.current);
      }
    };
  }, [messages, user, isLoading, scheduleProcessing]);

  // Update lastProcessedMessages when messages are updated (e.g., marked as read)
  useEffect(() => {
    // Remove messages that are now marked as read from the lastProcessedMessages
    lastProcessedMessagesRef.current = lastProcessedMessagesRef.current.filter((id) => {
      const message = messages.find((m) => m.id === id);
      return message && message.status !== 'read';
    });
  }, [messages]);

  // Set up interval to process read messages periodically
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (pendingReadMessages.current.size > 0 && !processTimeoutRef.current) {
        scheduleProcessing(0);
      }
    }, 3000);

    return () => {
      clearInterval(intervalId);
      if (processTimeoutRef.current) {
        clearTimeout(processTimeoutRef.current);
      }
    };
  }, [scheduleProcessing]);

  const handleMessageVisible = useCallback(
    (messageId: string) => {
      pendingReadMessages.current.add(messageId);
      scheduleProcessing();
    },
    [scheduleProcessing],
  );

  return (
    <div ref={scrollAreaRef} onScroll={onScroll} className="flex-1 overflow-y-auto scroll-smooth">
      <div className="flex flex-col space-y-4 p-4">
        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-muted-foreground">Chargement des messages...</p>
          </div>
        ) : (
          <>
            {hasNextPage && (
              <div className="pb-4 text-center">
                <Button variant="ghost" size="sm" onClick={() => fetchNextPage?.()}>
                  Charger plus de messages
                </Button>
              </div>
            )}
            {messages.map((message) => {
              const isOwnMessage = message.sender === user?.id;
              const replyToMessage = message.replyTo ? messages.find((m) => m.id === message.replyTo) : undefined;

              return (
                <ChatMessage
                  key={message.id}
                  message={message}
                  isOwnMessage={isOwnMessage}
                  replyToMessage={replyToMessage}
                  onReply={onReply}
                  onVisible={handleMessageVisible}
                />
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
