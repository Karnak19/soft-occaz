import { useEffect, useRef } from 'react';

import { type MessagesResponse, type UsersResponse } from '$/utils/pocketbase/pocketbase-types';
import { Button } from '$/components/ui/button';

import { ChatMessage } from './ChatMessage';

type MessageListProps = {
  messages: MessagesResponse<{ sender: UsersResponse }>[];
  isLoading: boolean;
  hasNextPage?: boolean;
  fetchNextPage?: () => void;
  onReply: (message: MessagesResponse) => void;
  userClerkId?: string;
};

const PAGE_SIZE = 20;

export function MessageList({ messages, isLoading, hasNextPage, fetchNextPage, onReply, userClerkId }: MessageListProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const isAtBottomRef = useRef(true);

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

  return (
    <div ref={scrollAreaRef} onScroll={onScroll} className="flex-1 overflow-y-auto scroll-smooth">
      <div className="flex flex-col space-y-4 p-4">
        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-muted-foreground">Loading messages...</p>
          </div>
        ) : (
          <>
            {hasNextPage && (
              <div className="pb-4 text-center">
                <Button variant="ghost" size="sm" onClick={() => fetchNextPage?.()}>
                  Load more messages
                </Button>
              </div>
            )}
            {messages.map((message) => {
              const isOwnMessage = message.expand?.sender.clerkId === userClerkId;
              const replyToMessage = message.replyTo ? messages.find((m) => m.id === message.replyTo) : undefined;

              return (
                <ChatMessage
                  key={message.id}
                  message={message}
                  isOwnMessage={isOwnMessage}
                  replyToMessage={replyToMessage}
                  onReply={onReply}
                />
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
