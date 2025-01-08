import { env } from '$/env';
import { task, wait } from '@trigger.dev/sdk/v3';
import PocketBase from 'pocketbase';

import { sendEmails } from '$/utils/emails';
import type { MessagesResponse, TypedPocketBase, UsersResponse } from '$/utils/pocketbase/pocketbase-types';

export async function createStaticClient() {
  const pb = new PocketBase(env.NEXT_PUBLIC_POCKETBASE_URL) as TypedPocketBase;

  await pb.collection('_superusers').authWithPassword(env.POCKETBASE_ADMIN_EMAIL, env.POCKETBASE_ADMIN_PASSWORD);

  return pb;
}

type NotifyUnreadMessagesPayload = {
  recipientId: string;
  conversationId: string;
};

export const NOTIFY_UNREAD_MESSAGES_KEY = 'notify-unread-messages' as const;

const NOTIFICATION_DELAY = 5 * 60 * 1000; // 5 minutes

export const notifyUnreadMessages = task({
  id: NOTIFY_UNREAD_MESSAGES_KEY,
  run: async (payload: NotifyUnreadMessagesPayload) => {
    console.log('Starting notification task for recipient', payload.recipientId);
    const pb = await createStaticClient();

    // Wait 5 minutes before sending the notification (debounce)
    await wait.for({ minutes: NOTIFICATION_DELAY });

    // Check if the user has logged in since the message was sent
    const user = await pb.collection('users').getOne(payload.recipientId);
    const now = new Date();
    const lastOnline = user.lastOnline ? new Date(user.lastOnline) : null;

    // If the user has been online in the last 5 minutes, don't send notification
    if (lastOnline && now.getTime() - lastOnline.getTime() < NOTIFICATION_DELAY) {
      console.log('User was recently online, skipping notification');
      return;
    }

    // Get all conversations with unread messages for this user
    const unreadConversations = await pb.collection('unread_messages').getFullList({
      filter: `unreadCount > 0 && participants ?~ "${payload.recipientId}"`,
    });

    if (unreadConversations.length === 0) {
      console.log('No unread messages, skipping notification');
      return;
    }

    // Group messages by sender
    const fromUsers = new Set<string>();

    for (const conversation of unreadConversations) {
      try {
        // Get the last message to know who sent it
        const lastMessage = await pb
          .collection('messages')
          .getFirstListItem<MessagesResponse<{ sender: UsersResponse }>>(
            `conversation = "${conversation.conversationId}" && status != "read"`,
            {
              sort: '-created',
              expand: 'sender',
            },
          );

        const sender = lastMessage.expand?.sender;
        if (!sender) continue;

        fromUsers.add(sender.username);
      } catch (error) {
        console.error('Error processing conversation:', conversation.id, error);
        continue;
      }
    }

    if (fromUsers.size === 0) {
      console.log('No senders found, skipping notification');
      return;
    }

    // Send email notification
    console.log(`Sending email to ${user.email} about messages from ${fromUsers.size} users`);
    await sendEmails.newPrivateMessage({
      user: {
        username: user.username,
        firstName: user.name || user.username,
        email: user.email,
      },
      from: {
        username: `${fromUsers.size} ${fromUsers.size > 1 ? 'utilisateurs' : 'utilisateur'}`,
      },
    });
  },
});
