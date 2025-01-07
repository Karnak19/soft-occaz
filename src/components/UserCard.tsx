'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { BadgeCheckIcon, MessagesSquareIcon, UserRoundSearchIcon } from 'lucide-react';

import { Collections, UsersResponse } from '$/utils/pocketbase/pocketbase-types';
import { usePocketbase, useUser } from '$/app/pocketbase-provider';

import StarsDisplayer from './StarsDisplayer';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Textarea } from './ui/textarea';
import UserAvatar from './UserAvatar';

function UserCard(props: UsersResponse) {
  const router = useRouter();
  const me = useUser();
  const { pb } = usePocketbase();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { data: ratings = [] } = useQuery({
    queryKey: ['user', props.id, 'ratings'],
    queryFn: () => pb.collection('ratings').getFullList({ filter: `user = "${props.id}"` }),
    enabled: !!props.id,
  });

  const average = ratings?.reduce((acc, rating) => acc + rating.rating, 0) / ratings?.length;

  const isAuthenticated = !!me;

  const handleContact = async () => {
    if (!message.trim() || !me) return;

    setIsLoading(true);
    try {
      // Ensure user is authenticated to PocketBase
      if (!isAuthenticated) {
        throw new Error('Not authenticated to PocketBase');
      }

      const otherUser = await pb.collection(Collections.Users).getOne(props.id);

      // Create a new conversation
      const conversation = await pb.collection(Collections.Conversations).create({
        participants: [pb.authStore.record?.id, otherUser.id],
        createdBy: pb.authStore.record?.id,
      });

      // Create the initial message
      await pb.collection(Collections.Messages).create({
        content: message,
        conversation: conversation.id,
        sender: pb.authStore.record?.id,
        status: 'sent',
      });

      // Redirect to the chat
      router.push(`/dashboard/chats/${conversation.id}`);
    } catch (error) {
      console.error('Error creating conversation:', error);
      // Reset loading state but keep modal open if there's an error
      setIsLoading(false);
      return;
    }

    // Only close modal and reset loading if everything succeeded
    setIsLoading(false);
    setIsModalOpen(false);
  };

  return (
    <>
      <Card className="col-span-1 divide-y divide-muted">
        <div className="flex w-full items-center justify-between space-x-6 p-6">
          <div className="flex-1 truncate">
            <div className={'flex items-center space-x-3'}>
              <h3 className="truncate text-xl font-bold text-foreground">{props.name}</h3>
              {props.verified && <BadgeCheckIcon className="size-6 text-primary" />}
            </div>
            <StarsDisplayer average={average} />
          </div>
          <UserAvatar user={props} size="lg" />
        </div>
        <div>
          <div className="-mt-px flex divide-x divide-muted">
            <div className="relative flex w-0 flex-1">
              <button
                onClick={() => setIsModalOpen(true)}
                className="group relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 font-semibold hover:bg-primary hover:text-rg-100 disabled:opacity-20 disabled:hover:cursor-not-allowed dark:hover:bg-primary dark:hover:text-primary-foreground"
              >
                <MessagesSquareIcon
                  className="size-5 text-primary group-hover:text-rg-100 dark:text-primary dark:group-hover:text-primary-foreground"
                  aria-hidden="true"
                />
                Contacter
              </button>
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
              <Button onClick={handleContact} disabled={isLoading || !message.trim()}>
                {isLoading ? 'Envoi...' : 'Envoyer'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default UserCard;
