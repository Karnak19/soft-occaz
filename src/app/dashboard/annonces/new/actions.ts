'use server';

import { revalidatePath } from 'next/cache';
import { Type } from '@prisma/client';
import { z } from 'zod';
import { createServerAction } from 'zsa';

import { prisma } from '$/utils/db';
import { getClerkUserFromDb } from '$/utils/getClerkUserFromDb';
import { listingCreationCheck } from '$/utils/listingCreationCheck';

const createListingSchema = z.object({
  title: z.string().min(3).max(50),
  price: z.number().min(1).max(1000000),
  type: z.string(),
  description: z.string(),
});

const typeSchema = z.enum([Type.AEG, Type.GBB, Type.GBBR, Type.AEP, Type.HPA, Type.Sniper, Type.PTW, Type.Other, Type.GEAR]);

const outputSchema = z.string();

export const createListingAction = createServerAction()
  .input(createListingSchema)
  .output(outputSchema)
  .handler(async ({ input }) => {
    const user = await getClerkUserFromDb();
    await listingCreationCheck(user);

    const foundListing = await prisma.listing.findFirst({
      where: { title: input.title, userId: user.id },
    });

    if (foundListing) {
      const { id } = await prisma.listing.update({
        data: {
          title: input.title,
          price: input.price,
          type: typeSchema.parse(input.type),
          description: input.description,
        },
        where: { id: foundListing.id },
      });

      revalidatePath(`/annonces/details/${id}`);
      revalidatePath(`/dashboard/annonces/${id}`);

      return id;
    }

    const { id } = await prisma.listing.create({
      data: {
        title: input.title,
        price: input.price,
        type: typeSchema.parse(input.type),
        description: input.description,
        userId: user.id,
      },
    });

    return id;
  });

const imageSchema = z.object({ listingId: z.string(), images: z.array(z.string()) });
export const addImageToListingAction = createServerAction()
  .input(imageSchema)
  .output(z.object({ success: z.boolean() }))
  .handler(async ({ input }) => {
    const user = await getClerkUserFromDb();
    await listingCreationCheck(user);

    const isPayingUser = ['hobby', 'premium', 'geardo'].includes(user.sub?.toLowerCase() ?? '');

    const isPremium = ['premium'].includes(user.sub?.toLowerCase() ?? '');

    const slicedImages = input.images.slice(0, !isPayingUser ? 3 : isPremium ? 7 : 5);

    const listing = await prisma.listing.findUnique({ where: { id: input.listingId } });
    if (!listing) throw new Error('Listing not found');

    if (listing.userId !== user.id) throw new Error('You are not the owner of this listing');

    await prisma.listing.update({
      data: { images: { set: slicedImages } },
      where: { id: input.listingId },
    });

    revalidatePath('/dashboard/*');

    return { success: true };
  });
