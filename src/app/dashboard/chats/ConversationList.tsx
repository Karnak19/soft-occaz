'use client';

import { useParams, useRouter } from 'next/navigation';
import { UserCircle2Icon } from 'lucide-react';

import { cn } from '$/utils/cn';
import { pb } from '$/utils/pocketbase/client';
import { UsersResponse } from '$/utils/pocketbase/pocketbase-types';
import { useConversations, type ExpandedConversation } from '$/hooks/useConversations';
import { useMe } from '$/hooks/useMe';
import { Avatar } from '$/components/ui/avatar';
import { Badge } from '$/components/ui/badge';
import { ScrollArea } from '$/components/ui/scroll-area';
import { Skeleton } from '$/components/ui/skeleton';

export function ConversationList() {
  const router = useRouter();
  const { chatId } = useParams();
  const { data: user } = useMe();
  const { conversations, isLoading, unreadMessages } = useConversations();

  if (isLoading) {
    return (
      <ScrollArea className="h-full">
        <div className="space-y-2 p-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center space-x-4 p-2">
              <Skeleton className="size-12 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-[120px]" />
                <Skeleton className="h-3 w-[80px]" />
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    );
  }

  if (!conversations?.length) {
    return (
      <ScrollArea className="h-full">
        <div className="flex h-full items-center justify-center p-4">
          <p className="text-center text-sm text-muted-foreground">No conversations yet</p>
        </div>
      </ScrollArea>
    );
  }

  return (
    <ScrollArea className="h-full">
      <div className="space-y-2 p-2">
        {conversations?.map((conversation: ExpandedConversation) => {
          const otherUser = conversation.expand?.participants.find((p: UsersResponse) => p.clerkId !== user?.clerkId);
          const avatar = otherUser?.avatar ? pb.files.getURL(otherUser, otherUser.avatar) : undefined;

          return (
            <button
              key={conversation.id}
              onClick={() => router.push(`/dashboard/chats/${conversation.id}`)}
              className={cn(
                'relative flex w-full items-center space-x-4 rounded-lg p-2 text-left transition-colors hover:bg-muted',
                chatId === conversation.id && 'bg-muted',
              )}
            >
              <Avatar className="size-12">
                {avatar ? (
                  <img
                    src={avatar}
                    alt={conversation.name || otherUser?.name || 'Unnamed Chat'}
                    className="size-full object-cover"
                  />
                ) : (
                  <UserCircle2Icon className="size-full" />
                )}
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">{conversation.name || otherUser?.name || 'Unnamed Chat'}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(conversation.updated).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
              {Boolean(unreadMessages[conversation.id]) && (
                <Badge size="xs" className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full p-0">
                  {unreadMessages[conversation.id]}
                </Badge>
              )}
            </button>
          );
        })}
      </div>
    </ScrollArea>
  );
}
