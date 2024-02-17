'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { StarIcon } from '@heroicons/react/24/solid';
import { Rating, User, UsersChat } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';

import { cn } from '$/utils/cn';
import { useMe } from '$/hooks/useMe';
import { Avatar, AvatarFallback, AvatarImage } from '$/components/ui/avatar';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '$/components/ui/hover-card';
import { ScrollArea } from '$/components/ui/scroll-area';
import StarsDisplayer from '$/components/StarsDisplayer';

import { useChat } from './useChat';

type Chat = UsersChat & {
  user: User;
};

export function ChatsList(props: { chats: Chat[] }) {
  const params = useSearchParams();
  const { data: user } = useMe();

  const isActive = (id: string) => params.get('chat') === id;

  if (!user) return null;

  return (
    <ScrollArea>
      <ul className="flex flex-col gap-2">
        {props.chats.map((chat) => {
          return <ChatListItem key={chat.id} {...chat} isActive={isActive} myId={user.id} />;
        })}
      </ul>
    </ScrollArea>
  );
}

function ChatListItem(props: Chat & { myId: string; isActive: (id: string) => boolean }) {
  const { getNotificationsCount } = useChat({
    id: props.firebaseCollectionId,
    myId: props.myId,
  });

  const lateMessagesCount = getNotificationsCount();
  return (
    <li key={props.id}>
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <Link
            href={`?chat=${props.firebaseCollectionId}`}
            className={cn(
              'group flex items-center justify-between gap-2 rounded-xl p-1 font-semibold text-muted-foreground hover:text-foreground',
              {
                'bg-muted text-primary dark:text-primary font-bold': props.isActive(props.firebaseCollectionId),
              },
            )}
          >
            <TooltipedAvatar isActive={props.isActive(props.firebaseCollectionId)} user={props.user} />
            <div className="flex-1 overflow-hidden">{props.user.username}</div>
            {lateMessagesCount > 0 && (
              <span className={cn('grid place-items-center rounded bg-red-600 px-1 py-0.5 text-xs font-medium text-red-100', {})}>
                {lateMessagesCount}
              </span>
            )}
          </Link>
        </HoverCardTrigger>
      </HoverCard>
    </li>
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
              <HoverCard openDelay={200}>
                <HoverCardTrigger asChild>
                  <Link href={`?chat=${chat.firebaseCollectionId}`} className="flex p-1">
                    <TooltipedAvatar isActive={isActive(chat.firebaseCollectionId)} user={chat.user} />
                  </Link>
                </HoverCardTrigger>
              </HoverCard>
            </li>
          );
        })}
      </ul>
    </ScrollArea>
  );
}

function TooltipedAvatar({ isActive, user }: { isActive: boolean; user: User }) {
  const { data: ratings = [], isLoading } = useQuery({
    queryKey: ['user', user.id, 'ratings'],
    queryFn: () => fetch(`/api/users/${user.id}/ratings`).then((res) => res.json()) as Promise<Rating[]>,
    enabled: !!user.id,
  });

  const average = ratings?.reduce((acc, rating) => acc + rating.rating, 0) / ratings?.length;

  return (
    <>
      <Avatar className={cn('rounded-lg opacity-50 group-hover:opacity-100', { 'ring-2 ring-primary opacity-100': isActive })}>
        <AvatarImage src={user.avatar ?? undefined} />
        <AvatarFallback>{user.firstName[0]}</AvatarFallback>
      </Avatar>
      <HoverCardContent
        align="start"
        className={cn('w-72 transition-colors', {
          'bg-gradient-to-b from-teal-100/30 border-teal-100 dark:border-teal-100/30 hover:to-teal-100/30': user.sub === 'HOBBY',
          'bg-gradient-to-b from-violet-200/30 border-violet-100 dark:border-violet-400/50 hover:to-violet-400/30 ':
            user.sub === 'GEARDO',
          'bg-gradient-to-b from-amber-100/30 border-amber-100 dark:border-amber-400/50 hover:to-amber-400/30':
            user.sub === 'PREMIUM',
        })}
      >
        <Link onClick={(e) => e.stopPropagation()} href={`/profile/${user.id}`} className={cn('flex justify-between gap-4')}>
          <Avatar>
            <AvatarImage src={user.avatar ?? undefined} />
            <AvatarFallback>{user.firstName[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <h4>{user.username ? user.username : `${user.firstName} ${user.lastName}`}</h4>
            <div>
              <Link
                href="/dashboard/plans"
                className={cn(
                  'inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize ring-1 ring-inset',
                  {
                    'bg-teal-50 text-teal-700 ring-teal-600/20': user.sub === 'HOBBY',
                    'bg-violet-50 text-violet-700 ring-violet-600/20': user.sub === 'GEARDO',
                    'bg-amber-50 text-amber-700 ring-amber-600/20': user.sub === 'PREMIUM',
                  },
                )}
              >
                <span>
                  <StarIcon
                    className={cn('mr-0.5 size-3', {
                      'text-teal-400': user.sub === 'HOBBY',
                      'text-violet-400': user.sub === 'GEARDO',
                      'text-amber-400': user.sub === 'PREMIUM',
                    })}
                    aria-hidden="true"
                  />
                </span>
                {user.sub?.toLowerCase()}
              </Link>

              <StarsDisplayer
                average={average}
                iconClassName={cn({
                  'animate-pulse text-muted-foreground': isLoading,
                })}
              />
            </div>
          </div>
        </Link>
      </HoverCardContent>
    </>
  );

  // return (
  //   <Tooltip delayDuration={200}>
  //     <TooltipTrigger asChild>
  //       <Avatar className={cn('rounded-lg opacity-50 group-hover:opacity-100', { 'ring-2 ring-primary opacity-100': isActive })}>
  //         <AvatarImage src={user.avatar ?? undefined} />
  //         <AvatarFallback>{user.firstName[0]}</AvatarFallback>
  //       </Avatar>
  //     </TooltipTrigger>
  //     <TooltipContent className="bg-muted text-muted-foreground hover:text-primary-foreground hover:bg-primary group hover:scale-105 transition-transform">
  //       <TooltipArrow className="fill-muted group-hover:fill-primary group-hover:scale-105" />
  //       <Link
  //         href={`/profile/${user.id}`}
  //         onClick={(e) => {
  //           e.stopPropagation();
  //         }}
  //       >
  //         Voir le profil
  //       </Link>
  //     </TooltipContent>
  //   </Tooltip>
  // );
}
