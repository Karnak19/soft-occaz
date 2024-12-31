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

    const batch = pb.createBatch();

    batch.collection('rating_sessions').create({
      listing: input.listingId,
      user: user.id,
      target: input.recipientId,
    });

    batch.collection('rating_sessions').create({
      listing: input.listingId,
      user: input.recipientId,
      target: user.id,
    });

    await batch.send();

    return listing;
  });
