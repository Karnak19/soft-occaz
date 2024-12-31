'use server';

import { z } from 'zod';
import { ZSAError } from 'zsa';

import { authedProcedure } from '$/utils/zsa';

export const createRatingAction = authedProcedure
  .createServerAction()
  .input(
    z.object({
      rating: z.number().min(1).max(5),
      comment: z.string().optional(),
      sessionId: z.string(),
    }),
  )
  .handler(async ({ input, ctx }) => {
    const { rating, comment, sessionId } = input;
    const { pb, user } = ctx;
    const session = await pb.collection('rating_sessions').getOne(sessionId);

    if (!session || session.rating) {
      throw new ZSAError('NOT_FOUND', "La session n'existe pas/plus");
    }

    const createdRating = await pb.collection('ratings').create({
      rating,
      comment,
      session: sessionId,
      from: user.id,
      user: session.target,
      listing: session.listing,
    });

    await pb.collection('rating_sessions').update(sessionId, {
      rating: createdRating.id,
    });

    return createdRating;
  });
