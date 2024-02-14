'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs';

import { prisma } from '$/utils/db';
import { sendEmails } from '$/utils/emails';

type Args = {
  listingId: string;
  recipientId: string;
};

export const sellListingAction = async ({ listingId, recipientId }: Args) => {
  const { userId } = auth();

  if (!userId) {
    throw new Error('User not authenticated');
  }

  const [target, recipient] = await Promise.all([
    prisma.user.findUniqueOrThrow({ where: { clerkId: userId } }),
    prisma.user.findUniqueOrThrow({ where: { id: recipientId } }),
    prisma.listing.update({ data: { sold: true }, where: { id: listingId } }),
  ]);

  const { id } = await prisma.ratingCreatorSession.create({
    data: { userId: recipientId, targetId: target.id },
  });

  // send email to ask for rating
  await sendEmails.createRating({ user: recipient, from: target, ratingSessionId: id });

  revalidatePath(`/annonces/details/${listingId}`);
};
