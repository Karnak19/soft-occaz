'use client';

import { Avatar, AvatarFallback, AvatarImage } from '$/components/ui/avatar';
import { ScrollArea } from '$/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipTrigger } from '$/components/ui/tooltip';
import { cn } from '$/utils/cn';
import { User, UsersChat } from '@prisma/client';
import { TooltipArrow } from '@radix-ui/react-tooltip';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export function ChatsList(props: {
  chats: (UsersChat & {
    user: User;
  })[];
}) {
  const params = useSearchParams();

  const isActive = (id: string) => params.get('chat') === id;

  return (
    <ScrollArea>
      <ul className="flex flex-col gap-2">
        {props.chats.map((chat) => {
          return (
            <li key={chat.id}>
              <Link
                href={`?chat=${chat.firebaseCollectionId}`}
                className={cn(
                  'group flex rounded-xl text-muted-foreground hover:text-foreground font-semibold items-center p-1 gap-2',
                  {
                    'bg-muted text-rg-600 dark:text-primary font-bold': isActive(chat.firebaseCollectionId),
                  },
                )}
              >
                <TooltipedAvatar
                  isActive={isActive(chat.firebaseCollectionId)}
                  user={chat.user}
                  className={cn({ 'opacity-100': isActive(chat.firebaseCollectionId) })}
                />
                <div className="overflow-hidden">{chat.user.username}</div>
              </Link>
            </li>
          );
        })}
      </ul>
    </ScrollArea>
  );
}

export function CollapsedChatsList(props: {
  chats: (UsersChat & {
    user: User;
  })[];
}) {
  const params = useSearchParams();

  const isActive = (id: string) => params.get('chat') === id;

  return (
    <ScrollArea>
      <ul className="flex flex-col gap-2">
        {props.chats.map((chat) => {
          return (
            <li key={chat.id}>
              <Link href={`?chat=${chat.firebaseCollectionId}`} className="p-1 flex">
                <TooltipedAvatar isActive={isActive(chat.firebaseCollectionId)} user={chat.user} />
              </Link>
            </li>
          );
        })}
      </ul>
    </ScrollArea>
  );
}

function TooltipedAvatar({ isActive, user, className }: { isActive: boolean; user: User; className?: string }) {
  return (
    <Tooltip delayDuration={200}>
      <TooltipTrigger asChild>
        <Avatar className={cn('rounded-lg opacity-50 group-hover:opacity-100', { 'ring-2 ring-primary': isActive }, className)}>
          <AvatarImage src={user.avatar ?? undefined} />
          <AvatarFallback>{user.firstName[0]}</AvatarFallback>
        </Avatar>
      </TooltipTrigger>
      <TooltipContent className="bg-muted text-muted-foreground hover:text-primary-foreground hover:bg-primary group hover:scale-105 transition-transform">
        <TooltipArrow className="fill-muted group-hover:fill-primary group-hover:scale-105" />
        <Link
          href={`/profile/${user.id}`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          Voir le profil
        </Link>
      </TooltipContent>
    </Tooltip>
  );
}
