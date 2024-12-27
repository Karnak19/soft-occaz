'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckBadgeIcon, EnvelopeOpenIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { Rating, User } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';

import { cn } from '$/utils/cn';
import { pb } from '$/utils/pocketbase/client';
import { Collections } from '$/utils/pocketbase/pocketbase-types';
import { useMe } from '$/hooks/useMe';
import { usePocketbaseAuth } from '$/hooks/usePocketbaseAuth';

import Avatar from './Avatar';
import StarsDisplayer from './StarsDisplayer';
import SubLink from './SubLink';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Textarea } from './ui/textarea';

function UserCard(props: User & { listingTitle: string }) {
  const router = useRouter();
  const { data: me } = useMe();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isAuthenticated = usePocketbaseAuth();

  const { data: ratings = [] } = useQuery({
    queryKey: ['user', props.id, 'ratings'],
    queryFn: () => fetch(`/api/users/${props.id}/ratings`).then((res) => res.json()) as Promise<Rating[]>,
    enabled: !!props.id,
  });

  const average = ratings?.reduce((acc, rating) => acc + rating.rating, 0) / ratings?.length;

  const handleContact = async () => {
    if (!message.trim() || !me) return;

    setIsLoading(true);
    try {
      // Ensure user is authenticated to PocketBase
      if (!isAuthenticated) {
        throw new Error('Not authenticated to PocketBase');
      }

      const otherUser = await pb.collection(Collections.Users).getFirstListItem(`clerkId="${props.clerkId}"`);

      // Create a new conversation
      const conversation = await pb.collection(Collections.Conversations).create({
        participants: [pb.authStore.record?.id, otherUser.id],
        name: `${me.username} - ${props.username}`,
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
      <Card
        className={cn('col-span-1 divide-y divide-muted', {
          'ring-1 ring-teal-400': props.sub === 'HOBBY',
          'ring-1 ring-violet-400': props.sub === 'GEARDO',
          'ring-1 ring-amber-400': props.sub === 'PREMIUM',
        })}
      >
        <div
          className={cn('flex w-full items-center justify-between space-x-6 p-6', {
            'bg-gradient-to-b from-teal-100/30': props.sub === 'HOBBY',
            'bg-gradient-to-b from-violet-100/30': props.sub === 'GEARDO',
            'bg-gradient-to-b from-amber-100/30': props.sub === 'PREMIUM',
          })}
        >
          <div className="flex-1 truncate">
            <div className={'flex items-center space-x-3'}>
              <h3 className="truncate font-bold text-rg-900 dark:text-foreground">{props.username}</h3>
              <CheckBadgeIcon
                className={cn('size-6 text-white', {
                  'text-teal-500': props.sub === 'HOBBY',
                  'text-violet-500': props.sub === 'GEARDO',
                  'text-amber-500': props.sub === 'PREMIUM',
                })}
              />
              <SubLink sub={props.sub ?? 'FREE'} />
            </div>
            <StarsDisplayer average={average} />
          </div>
          <Avatar
            src={props.avatar}
            className={cn('size-10 shrink-0 rounded-full border-2 border-primary bg-muted', {
              'border-amber-500': props.sub === 'PREMIUM',
              'border-violet-500': props.sub === 'GEARDO',
            })}
          />
        </div>
        <div>
          <div className="-mt-px flex divide-x divide-muted">
            <div className="relative flex w-0 flex-1">
              <button
                onClick={() => setIsModalOpen(true)}
                className="group relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 font-semibold hover:bg-primary hover:text-rg-100 disabled:opacity-20 disabled:hover:cursor-not-allowed dark:hover:bg-primary dark:hover:text-primary-foreground"
              >
                <EnvelopeOpenIcon
                  className={cn(
                    'size-5 text-primary group-hover:text-rg-100 dark:text-primary dark:group-hover:text-primary-foreground',
                    {
                      'text-amber-500': props.sub === 'PREMIUM',
                      'text-violet-500': props.sub === 'GEARDO',
                    },
                  )}
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
                <MagnifyingGlassIcon
                  className={cn(
                    'size-5 text-primary group-hover:text-rg-100 dark:text-primary dark:group-hover:text-primary-foreground',
                    {
                      'text-amber-500': props.sub === 'PREMIUM',
                      'text-violet-500': props.sub === 'GEARDO',
                    },
                  )}
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
