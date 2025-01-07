import { Check, CheckCheck, Reply } from 'lucide-react';

import { cn } from '$/utils/cn';
import { type MessagesResponse, type UsersResponse } from '$/utils/pocketbase/pocketbase-types';
import { Button } from '$/components/ui/button';
import UserAvatar from '$/components/UserAvatar';

type ChatMessageProps = {
  message: MessagesResponse<{ sender: UsersResponse }>;
  isOwnMessage: boolean;
  replyToMessage?: MessagesResponse;
  onReply: (message: MessagesResponse) => void;
};

export function ChatMessage({ message, isOwnMessage, replyToMessage, onReply }: ChatMessageProps) {
  return (
    <div
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
