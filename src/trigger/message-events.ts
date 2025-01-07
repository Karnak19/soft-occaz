import { tasks } from '@trigger.dev/sdk/v3';

import type { ConversationsResponse, MessagesResponse } from '$/utils/pocketbase/pocketbase-types';

import type { notifyUnreadMessages } from './notify-unread-messages';

type MessageCreatedEvent = {
  record: MessagesResponse;
  expand?: {
    conversation?: ConversationsResponse;
  };
};

// Trigger when a new message is created
export async function handleMessageCreated(event: MessageCreatedEvent) {
  const message = event.record;
  const conversation = event.expand?.conversation;

  if (!conversation?.participants) {
    console.log('No conversation or participants found');
    return;
  }

  // Find the recipient (participant who is not the sender)
  const recipientId = conversation.participants.find((id: string) => id !== message.sender);
  if (!recipientId) {
    console.log('No recipient found');
    return;
  }

  // Start the notification task with debouncing using concurrencyKey
  await tasks.trigger<typeof notifyUnreadMessages>(
    'notify-unread-messages',
    {
      recipientId,
      conversationId: message.conversation,
    },
    {
      // Use concurrencyKey to ensure we debounce per recipient
      concurrencyKey: recipientId,
      // The queue ensures we only process one notification per recipient at a time
      queue: {
        name: 'notifications',
        concurrencyLimit: 1,
      },
    },
  );
}
