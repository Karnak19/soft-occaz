'use client';

import { useQueries, useQuery } from '@tanstack/react-query';
import { UserCircle2Icon } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useRouter } from 'nextjs-toploader/app';

import { ExpandedConversation, usePocketbase, useUser } from '$/app/pocketbase-provider';
import UserAvatar from '$/components/UserAvatar';
import { Badge } from '$/components/ui/badge';
import { ScrollArea } from '$/components/ui/scroll-area';
import { Skeleton } from '$/components/ui/skeleton';
import { cn } from '$/utils/cn';
import { Collections, MessagesResponse, UsersResponse } from '$/utils/pocketbase/pocketbase-types';

export function ConversationList() {
  const { pb } = usePocketbase();
  const router = useRouter();
  const { chatId } = useParams();
  const user = useUser();

  const { data: conversations = [], isLoading: isConversationsLoading } = useQuery<ExpandedConversation[]>({
    queryKey: ['conversations', user?.id],
    queryFn: () => pb.collection(Collections.Conversations).getFullList({ filter: `participants ?= "${user?.id}"` }),
    staleTime: 30000, // 30 seconds
    refetchOnWindowFocus: false,
    refetchInterval: 10000, // Refetch every 10 seconds
  });

  const unreadMessagesQueries = useQueries({
    queries:
      conversations?.map((conversation) => ({
        queryKey: ['messages', conversation.id, 'unread'],
        queryFn: () =>
          pb.collection(Collections.Messages).getList<MessagesResponse<{ sender: UsersResponse }>>(1, 50, {
            filter: `conversation="${conversation.id}" && deletedAt = null && status = "sent" && sender != "${user?.id}"`,
            expand: 'sender',
          }),
        select: (data: { items: MessagesResponse<{ sender: UsersResponse }>[] }) => {
          return [conversation.id, data?.items?.length] as const;
        },
        staleTime: 30000, // 30 seconds
        refetchOnWindowFocus: false,
        refetchInterval: 10000, // Refetch every 10 seconds
      })) ?? [],
  });

  // Create a safe unread messages object
  const unreadMessages: Record<string, number> = {};
  unreadMessagesQueries.forEach((query) => {
    if (query.data && Array.isArray(query.data) && query.data.length === 2) {
      const [convId, count] = query.data;
      unreadMessages[convId] = count;
    }
  });

  // Only show loading state on initial load, not on refetches
  const isInitialLoading = isConversationsLoading && conversations.length === 0;

  if (isInitialLoading) {
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

  if (!conversations || conversations.length === 0) {
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
        {conversations.map((conversation: ExpandedConversation) => {
          const otherUser = conversation.expand?.participants.find((p: UsersResponse) => p.id !== user?.id);
          const avatar = otherUser?.avatar ? pb.files.getURL(otherUser, otherUser.avatar) : undefined;
          const unreadCount = unreadMessages[conversation.id] || 0;

          return (
            <button
              key={conversation.id}
              onClick={() => router.push(`/dashboard/chats/${conversation.id}`)}
              className={cn(
                'relative flex w-full items-center space-x-4 rounded-lg p-2 text-left transition-colors hover:bg-muted',
                chatId === conversation.id && 'bg-muted',
              )}
            >
              {avatar ? otherUser && <UserAvatar user={otherUser} size="lg" /> : <UserCircle2Icon className="size-12" />}
              {Boolean(unreadCount) && (
                <Badge
                  size="xs"
                  variant="notification"
                  className="absolute bottom-1 right-1 grid size-5 place-items-center rounded-full p-0"
                >
                  {unreadCount}
                </Badge>
              )}
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
            </button>
          );
        })}
      </div>
    </ScrollArea>
  );
}
