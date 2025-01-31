import { Check, CheckCheck, Reply } from 'lucide-react';
import { useEffect, useRef } from 'react';

import UserAvatar from '$/components/UserAvatar';
import { Button } from '$/components/ui/button';
import { cn } from '$/utils/cn';
import { type MessagesResponse, type UsersResponse } from '$/utils/pocketbase/pocketbase-types';

type ChatMessageProps = {
  message: MessagesResponse<{ sender: UsersResponse }>;
  isOwnMessage: boolean;
  replyToMessage?: MessagesResponse;
  onReply: (message: MessagesResponse) => void;
  onVisible?: (messageId: string) => void;
};

export function ChatMessage({ message, isOwnMessage, replyToMessage, onReply, onVisible }: ChatMessageProps) {
  const messageRef = useRef<HTMLDivElement>(null);
  const visibilityTimeoutRef = useRef<NodeJS.Timeout>(undefined);

  useEffect(() => {
    if (!messageRef.current || !onVisible || isOwnMessage || message.status === 'read') return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Clear any pending visibility timeout when tab becomes hidden
        if (visibilityTimeoutRef.current) {
          clearTimeout(visibilityTimeoutRef.current);
        }
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !document.hidden) {
            // Only mark as read if the message is visible for at least 1 second
            // and the tab is active
            visibilityTimeoutRef.current = setTimeout(() => {
              onVisible(message.id);
              observer.disconnect();
            }, 1000);
          } else {
            // Clear timeout if message becomes hidden or tab becomes inactive
            if (visibilityTimeoutRef.current) {
              clearTimeout(visibilityTimeoutRef.current);
            }
          }
        });
      },
      { threshold: 0.5 }, // Message needs to be 50% visible to be considered "read"
    );

    document.addEventListener('visibilitychange', handleVisibilityChange);
    observer.observe(messageRef.current);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (visibilityTimeoutRef.current) {
        clearTimeout(visibilityTimeoutRef.current);
      }
    };
  }, [message.id, isOwnMessage, message.status, onVisible]);

  return (
    <div
      ref={messageRef}
      className={cn('flex items-start space-x-2', {
        'flex-row-reverse space-x-reverse': isOwnMessage,
      })}
    >
      {message.expand?.sender && <UserAvatar user={message.expand?.sender} size="sm" />}
      <div className="flex flex-col gap-1">
        {replyToMessage && (
          <div
            className={cn('flex items-center gap-1 rounded-lg px-4 py-1 text-xs text-muted-foreground', {
              'bg-primary/10': isOwnMessage,
              'bg-muted': !isOwnMessage,
            })}
          >
            <Reply className="size-3" />
            <span className="line-clamp-1">{replyToMessage.content}</span>
          </div>
        )}
        <div
          className={cn('group relative rounded-lg px-4 py-2', {
            'bg-primary text-primary-foreground': isOwnMessage,
            'bg-muted': !isOwnMessage,
          })}
        >
          <p className="text-sm">{message.content}</p>
          <Button
            variant="ghost"
            size="icon"
            className={cn('absolute -top-3 size-6 opacity-0 transition-opacity group-hover:opacity-100', {
              '-left-3': !isOwnMessage,
              '-right-3': isOwnMessage,
            })}
            onClick={() => onReply(message)}
          >
            <Reply className="size-3" />
          </Button>
        </div>
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
  );
}
