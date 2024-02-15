'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs';
import { z } from 'zod';

import { prisma } from '$/utils/db';
import { action } from '$/utils/safe-action';

const ratingSchemaWithSession = z.object({
  rating: z.number(),
  comment: z.string(),
  sessionId: z.string(),
});

type Args = {
  rating: number;
  comment: string;
  sessionId: string;
};

export const createRatingAction = action(ratingSchemaWithSession, async ({ rating, comment, sessionId }: Args) => {
  const { userId } = auth();

  if (!userId) {
    throw new Error('User not authenticated');
  }

  const session = await prisma.ratingCreatorSession.findUnique({
    where: { id: sessionId },
    include: { user: true, target: true },
  });

  if (!session) {
    throw new Error('Rating session not found');
  }

  const r = await prisma.rating.create({
    data: { rating, text: comment, fromId: session.userId, userId: session.targetId, sessionId: session.id },
  });

  // send email to announce rating has been created

  revalidatePath(`/dashboard/ratings`);

  return {
    success: true,
  };
});
