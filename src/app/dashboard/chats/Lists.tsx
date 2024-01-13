'use client';

import { Avatar, AvatarFallback, AvatarImage } from '$/components/ui/avatar';
import { cn } from '$/utils/cn';
import { User, UsersChat } from '@prisma/client';
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
    <ul>
      {props.chats.map((chat) => {
        return (
          <li key={chat.id}>
            <Link
              href={`?chat=${chat.firebaseCollectionId}`}
              className={cn('flex rounded-xl text-foreground font-semibold items-center p-1 gap-2', {
                'bg-muted text-rg-600 dark:text-primary font-bold': isActive(chat.firebaseCollectionId),
              })}
            >
              <Avatar
                className={cn('rounded-lg', {
                  'ring-2 ring-primary': isActive(chat.firebaseCollectionId),
                })}
              >
                <AvatarImage src={chat.user.avatar ?? undefined} />
                <AvatarFallback>{chat.user.firstName[0]}</AvatarFallback>
              </Avatar>
              <div className="overflow-hidden">{chat.user.username}</div>
            </Link>
          </li>
        );
      })}
    </ul>
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
    <ul>
      {props.chats.map((chat) => {
        return (
          <li key={chat.id}>
            <Link href={`?chat=${chat.firebaseCollectionId}`}>
              <Avatar
                className={cn('rounded-lg', {
                  'ring-2 ring-primary': isActive(chat.firebaseCollectionId),
                })}
              >
                <AvatarImage src={chat.user.avatar ?? undefined} />
                <AvatarFallback>{chat.user.firstName[0]}</AvatarFallback>
              </Avatar>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
