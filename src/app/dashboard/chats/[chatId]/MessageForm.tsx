'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { HandshakeIcon, Loader2, SendHorizontal } from 'lucide-react';

import { pb } from '$/utils/pocketbase/client';
import { Collections } from '$/utils/pocketbase/pocketbase-types';
import { Button } from '$/components/ui/button';
import { Input } from '$/components/ui/input';
import { useToast } from '$/components/ui/use-toast';

import { SellModal } from '../../annonces/SellModal';

type MessageFormProps = {
  chatId: string;
  recipientClerkId?: string;
};

async function sendMessage({ chatId, content }: { chatId: string; content: string }) {
  const id = pb.authStore.record?.id;

  if (!id) {
    throw new Error('User not authenticated');
  }

  return pb.collection(Collections.Messages).create({
    conversation: chatId,
    content,
    sender: id,
    status: 'sent',
  });
}

export function MessageForm({ chatId, recipientClerkId }: MessageFormProps) {
  const { toast } = useToast();
  const [content, setContent] = useState('');

  const sendMessageMutation = useMutation({
    mutationFn: sendMessage,
    onSuccess: () => {
      setContent('');
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to send message. Please try again.',
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    sendMessageMutation.mutate({ chatId, content: content.trim() });
  };

  return (
    <form className="flex items-end gap-2 border-t p-4" onSubmit={handleSubmit}>
      <Input
        placeholder="Type a message..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
          }
        }}
      />
      <Button type="submit" size="icon" disabled={!content.trim() || sendMessageMutation.isPending}>
        {sendMessageMutation.isPending ? <Loader2 className="size-4 animate-spin" /> : <SendHorizontal className="size-4" />}
      </Button>
      {recipientClerkId && <SellModal recipientClerkId={recipientClerkId} />}
    </form>
  );
}
