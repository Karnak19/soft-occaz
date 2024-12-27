'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Loader2, SendHorizontal, X } from 'lucide-react';

import { pb } from '$/utils/pocketbase/client';
import { Collections, type MessagesResponse } from '$/utils/pocketbase/pocketbase-types';
import { Button } from '$/components/ui/button';
import { Input } from '$/components/ui/input';
import { useToast } from '$/components/ui/use-toast';

import { SellModal } from '../../annonces/SellModal';

type MessageFormProps = {
  chatId: string;
  recipientClerkId?: string;
  replyTo?: MessagesResponse;
  onCancelReply?: () => void;
};

async function sendMessage({ chatId, content, replyTo }: { chatId: string; content: string; replyTo?: string }) {
  const id = pb.authStore.record?.id;

  if (!id) {
    throw new Error('User not authenticated');
  }

  return pb.collection(Collections.Messages).create({
    conversation: chatId,
    content,
    sender: id,
    status: 'sent',
    replyTo,
  });
}

export function MessageForm({ chatId, recipientClerkId, replyTo, onCancelReply }: MessageFormProps) {
  const { toast } = useToast();
  const [content, setContent] = useState('');

  const sendMessageMutation = useMutation({
    mutationFn: sendMessage,
    onSuccess: () => {
      setContent('');
      if (onCancelReply) onCancelReply();
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

    sendMessageMutation.mutate({ chatId, content: content.trim(), replyTo: replyTo?.id });
  };

  return (
    <form className="flex flex-col gap-2 border-t p-4" onSubmit={handleSubmit}>
      {replyTo && (
        <div className="flex items-center gap-2 rounded-lg bg-muted p-2 text-sm">
          <div className="flex-1 truncate">
            <span className="text-muted-foreground">Replying to: </span>
            {replyTo.content}
          </div>
          <Button type="button" variant="ghost" size="icon" className="size-6 shrink-0" onClick={onCancelReply}>
            <X className="size-4" />
          </Button>
        </div>
      )}
      <div className="flex items-end gap-2">
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
      </div>
    </form>
  );
}
