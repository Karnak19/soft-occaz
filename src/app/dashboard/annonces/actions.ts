'use server';

import { z } from 'zod';

import { authedProcedure } from '$/utils/zsa';

export const sellListingAction = authedProcedure
  .createServerAction()
  .input(
    z.object({
      listingId: z.string(),
      recipientId: z.string(),
    }),
  )
  .handler(async ({ input, ctx }) => {
    const { pb, user } = ctx;

    const listing = await pb.collection('listings').update(input.listingId, {
      sold_to: input.recipientId,
    });

    await pb.collection('rating_sessions').create({
      listing: input.listingId,
      user: user.id,
      recipient: input.recipientId,
    });

    return listing;
  });
