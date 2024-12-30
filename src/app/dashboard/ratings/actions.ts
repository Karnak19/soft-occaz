'use server';

import { z } from 'zod';
import { createServerAction, ZSAError } from 'zsa';

import { auth, createServerClient } from '$/utils/pocketbase/server';

export const createRatingAction = createServerAction()
  .input(
    z.object({
      rating: z.number().min(1).max(5),
      comment: z.string().optional(),
      sessionId: z.string(),
    }),
  )
  .handler(async ({ input }) => {
    const pb = await createServerClient();
    const { rating, comment, sessionId } = input;
    const { userId } = await auth();
    const session = await pb.collection('rating_sessions').getOne(sessionId);

    if (!session || session.rating) {
      throw new ZSAError('NOT_FOUND', "La session n'existe pas/plus");
    }

    const createdRating = await pb.collection('ratings').create({
      rating,
      comment,
      session: sessionId,
      from: userId,
      user: session.target,
    });

    await pb.collection('rating_sessions').update(sessionId, {
      rating: createdRating.id,
    });

    return createdRating;
  });
