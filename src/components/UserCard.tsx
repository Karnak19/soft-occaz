'use client';

import { useQuery } from '@tanstack/react-query';
import { AlertCircleIcon, BadgeCheckIcon, Loader2Icon, MessagesSquareIcon, UserRoundSearchIcon } from 'lucide-react';
import { useRouter } from 'nextjs-toploader/app';
import { useState } from 'react';

import { usePocketbase, useUser } from '$/app/pocketbase-provider';
import { getMarketBotDisabledMessage, isMarketBot } from '$/utils/market-bot';
import { UsersResponse } from '$/utils/pocketbase/pocketbase-types';

import { useCreateChat } from '$/hooks/use-create-chat';
import StarsDisplayer from './StarsDisplayer';
import UserAvatar from './UserAvatar';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Textarea } from './ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

function UserCard(props: UsersResponse) {
  const router = useRouter();
  const me = useUser();
  const { pb } = usePocketbase();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState('');
  const isBot = isMarketBot(props.id);

  const { data: ratings = [] } = useQuery({
    queryKey: ['user', props.id, 'ratings'],
    queryFn: () => pb.collection('ratings').getFullList({ filter: `user = "${props.id}"` }),
    enabled: !!props.id,
  });

  const average = ratings?.reduce((acc, rating) => acc + rating.rating, 0) / ratings?.length;

  const isAuthenticated = !!me;

  const { mutate, isPending } = useCreateChat({
    onSuccess: (conversation) => {
      setIsModalOpen(false);
      router.push(`/dashboard/chats/${conversation.id}`);
    },
  });

  const handleContact = async () => {
    if (!message.trim() || !me) return;

    mutate({ recipientId: props.id, initialMessage: message });
  };

  return (
    <>
      <Card className="col-span-1 divide-y divide-muted">
        <div className="flex w-full items-center justify-between space-x-6 p-6">
          <div className="flex-1 truncate">
            <div className={'flex items-center space-x-3'}>
              <h3 className="truncate text-xl font-bold text-foreground">{props.name}</h3>
              {props.verified && <BadgeCheckIcon className="size-6 text-primary" />}
              {isBot && (
                <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                  Bot
                </span>
              )}
            </div>
            <StarsDisplayer average={average} />
          </div>
          <UserAvatar user={props} size="lg" />
        </div>
        <div>
          <div className="-mt-px flex divide-x divide-muted">
            <div className="relative flex w-0 flex-1">
              {isBot ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        className="group relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 font-semibold opacity-70 disabled:opacity-70 disabled:hover:cursor-not-allowed"
                        disabled
                      >
                        <AlertCircleIcon className="size-5 text-primary" aria-hidden="true" />
                        Contacter
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>{getMarketBotDisabledMessage('profile')}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="group relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 font-semibold hover:bg-primary hover:text-rg-100 disabled:opacity-20 disabled:hover:cursor-not-allowed dark:hover:bg-primary dark:hover:text-primary-foreground"
                  disabled={!isAuthenticated || isPending}
                >
                  {isPending ? (
                    <Loader2Icon className="size-5 animate-spin text-primary group-hover:text-rg-100 dark:text-primary dark:group-hover:text-primary-foreground" />
                  ) : (
                    <MessagesSquareIcon
                      className="size-5 text-primary group-hover:text-rg-100 dark:text-primary dark:group-hover:text-primary-foreground"
                      aria-hidden="true"
                    />
                  )}
                  Contacter
                </button>
              )}
            </div>
            <div className="-ml-px flex w-0 flex-1">
              <a
                href={`/profile/${props.id}`}
                className="group relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 font-semibold hover:bg-primary hover:text-rg-100 dark:hover:bg-primary dark:hover:text-primary-foreground"
              >
                <UserRoundSearchIcon
                  className="size-5 text-primary group-hover:text-rg-100 dark:text-primary dark:group-hover:text-primary-foreground"
                  aria-hidden="true"
                />
                Profil
              </a>
            </div>
          </div>
        </div>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Envoyer un message à {props.username}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <Textarea
              placeholder="Votre message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[100px]"
            />
            <div className="flex justify-end">
              <Button onClick={handleContact} disabled={isPending || !message.trim()}>
                {isPending ? 'Envoi...' : 'Envoyer'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default UserCard;
