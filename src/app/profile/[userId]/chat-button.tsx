'use client';

import { useUser } from '$/app/pocketbase-provider';
import { Button } from '$/components/ui/button';
import { useCreateChat } from '$/hooks/use-create-chat';
import { MessagesSquareIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
export default function ChatButton({ recipientId }: { recipientId: string }) {
  const router = useRouter();
  const user = useUser();

  const { mutate, isPending } = useCreateChat({
    onSuccess: (conversation) => router.push(`/dashboard/chats/${conversation.id}`),
  });

  return (
    <Button onClick={() => mutate({ recipientId })} disabled={!user?.id || isPending}>
      <MessagesSquareIcon className="size-5" aria-hidden="true" />
      Chat
    </Button>
  );
}
