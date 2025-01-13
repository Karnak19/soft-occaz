import { usePocketbase, useUser } from '$/app/pocketbase-provider';
import { Collections } from '$/utils/pocketbase/pocketbase-types';
import { useMutation, useQuery } from '@tanstack/react-query';

export function useCreateChat({ onSuccess }: { onSuccess: (conversation: any) => void }) {
  const { pb } = usePocketbase();
  const user = useUser();

  const { data: conversations } = useQuery({
    queryKey: ['conversations', user?.id],
    queryFn: () => pb.collection(Collections.Conversations).getFullList({ filter: `participants ?= "${user?.id}"` }),
    enabled: !!user?.id,
  });

  return useMutation({
    mutationFn: async ({ recipientId, initialMessage }: { recipientId: string; initialMessage?: string }) => {
      let conversation = conversations?.find((conv) => conv.participants.includes(recipientId));
      console.log('🚀 ~ mutationFn: ~ conversation:', conversation);

      if (!conversation) {
        conversation = await pb.collection(Collections.Conversations).create({
          participants: [user?.id, recipientId],
          createdBy: user?.id,
        });
      }

      if (initialMessage) {
        await pb.collection(Collections.Messages).create({
          content: initialMessage,
          conversation: conversation!.id,
          sender: user?.id,
          status: 'sent',
        });
      }

      return conversation;
    },
    onSuccess,
  });
}
