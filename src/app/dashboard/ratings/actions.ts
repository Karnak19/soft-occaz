'use server';

import { z } from 'zod';
import { ZSAError } from 'zsa';

import { sendEmails } from '$/utils/emails';
import { RatingSessionsResponse, UsersResponse } from '$/utils/pocketbase/pocketbase-types';
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
    const session = await pb.collection('rating_sessions').getOne<RatingSessionsResponse<{ target: UsersResponse }>>(sessionId, {
      expand: 'target',
    });

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

    // Send email notification to the rated user
    if (session.expand?.target) {
      await sendEmails.receivedRating({
        user: {
          email: session.expand.target.email,
          username: session.expand.target.username,
          name: session.expand.target.name,
        },
        rating,
        comment: comment || 'Pas de commentaire',
        from: {
          avatar: user.avatar,
          username: user.username,
        },
      });
    }

    return createdRating;
  });
