'use client';

import { Loader2Icon, MessagesSquareIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useUser } from '$/app/pocketbase-provider';
import { Button } from '$/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '$/components/ui/dialog';
import { Textarea } from '$/components/ui/textarea';
import { useCreateChat } from '$/hooks/use-create-chat';
import type { UsersResponse } from '$/utils/pocketbase/pocketbase-types';

interface ContactButtonProps {
  user: UsersResponse;
}

export default function ContactButton({ user }: ContactButtonProps) {
  const router = useRouter();
  const me = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState('');

  const isAuthenticated = !!me;

  const { mutate, isPending } = useCreateChat({
    onSuccess: (conversation) => {
      setIsModalOpen(false);
      router.push(`/dashboard/chats/${conversation.id}`);
    },
  });

  const handleContact = async () => {
    if (!message.trim() || !me) return;
    mutate({ recipientId: user.id, initialMessage: message });
  };

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)} disabled={!isAuthenticated || isPending} className="flex items-center gap-2">
        {isPending ? <Loader2Icon className="size-5 animate-spin" /> : <MessagesSquareIcon className="size-5" />}
        Contacter
      </Button>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Envoyer un message à {user.name}</DialogTitle>
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
