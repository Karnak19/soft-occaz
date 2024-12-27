'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs';
import { z } from 'zod';

import { prisma } from '$/utils/db';
import { sendEmails } from '$/utils/emails';
import { action } from '$/utils/safe-action';

const schema = z.object({
  listingId: z.string(),
  recipientClerkId: z.string(),
});

export const sellListingAction = action(schema, async ({ listingId, recipientClerkId }) => {
  const { userId } = auth();

  if (!userId) {
    throw new Error('User not authenticated');
  }

  const [target, recipient] = await prisma.$transaction([
    prisma.user.findUniqueOrThrow({ where: { clerkId: userId } }),
    prisma.user.findUniqueOrThrow({ where: { clerkId: recipientClerkId } }),
    prisma.listing.update({ data: { sold: true }, where: { id: listingId } }),
  ]);

  const { id } = await prisma.ratingCreatorSession.create({
    data: { userId: recipient.id, targetId: target.id },
  });

  // send email to ask for rating
  await sendEmails.createRating({ user: recipient, from: target, ratingSessionId: id });

  revalidatePath(`/annonces/details/${listingId}`);

  return { success: true };
});
