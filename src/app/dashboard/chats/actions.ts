'use server';

import { z } from 'zod';

import { authedProcedure } from '$/utils/zsa';

export const updateChatAnnouncementSeen = authedProcedure
  .createServerAction()
  .input(z.object({}))
  .handler(async ({ ctx }) => {
    const { user, pb } = ctx;

    try {
      const existingPrefs = await pb.collection('user_preferences').getFirstListItem(`user = "${user.id}"`);
      await pb.collection('user_preferences').update(existingPrefs.id, {
        has_seen_chat_announcement: true,
      });
    } catch {
      await pb.collection('user_preferences').create({
        user: user.id,
        has_seen_chat_announcement: true,
      });
    }

    return true;
  });
