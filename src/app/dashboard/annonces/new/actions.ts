'use server';

import { revalidatePath } from 'next/cache';
import { Type } from '@prisma/client';
import { z } from 'zod';
import { createServerAction } from 'zsa';
import Imagekit from 'imagekit';
import { prisma } from '$/utils/db';
import { getClerkUserFromDb } from '$/utils/getClerkUserFromDb';
import { listingCreationCheck } from '$/utils/listingCreationCheck';
import { env } from '$/env';

const createListingSchema = z.object({
  title: z.string().min(3).max(50),
  price: z.number().min(1).max(1000000),
  type: z.string(),
  description: z.string(),
  images: z.array(z.union([z.string(), z.instanceof(File)])),
});

const typeSchema = z.enum([Type.AEG, Type.GBB, Type.GBBR, Type.AEP, Type.HPA, Type.Sniper, Type.PTW, Type.Other, Type.GEAR]);

const outputSchema = z.string();

export const createListingAction = createServerAction()
  .input(createListingSchema, {
    type: 'formData'
  })
  .output(outputSchema)
  .handler(async ({ input }) => {
    const user = await getClerkUserFromDb();
    await listingCreationCheck(user);

    const imagekit = new Imagekit({
      publicKey: env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
      privateKey: env.IMAGEKIT_PRIVATE_KEY,
      urlEndpoint: 'https://ik.imagekit.io/e40qgenad/',
    });

    const isPayingUser = ['hobby', 'premium', 'geardo'].includes(user.sub?.toLowerCase() ?? '');
    const isPremium = ['premium'].includes(user.sub?.toLowerCase() ?? '');
    
    const maxImages = !isPayingUser ? 3 : isPremium ? 7 : 5;

    const allowedImages = input.images.slice(0, maxImages);

    const foundListing = await prisma.listing.findFirst({
      where: { title: input.title, userId: user.id },
    });

    let listingId: string;

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
      listingId = id;
    } else {
      const { id } = await prisma.listing.create({
        data: {
          title: input.title,
          price: input.price,
          type: typeSchema.parse(input.type),
          description: input.description,
          userId: user.id,
        },
      });
      listingId = id;
    }

    const newImages = await Promise.all(
      allowedImages
        .filter((e): e is File => e instanceof File)
        .map(async (file) => {
          const buffer = Buffer.from(await file.arrayBuffer());
          const uploadResponse = await imagekit.upload({
            file: buffer,
            fileName: `${listingId}-${file.name}`,
            folder: user.id,
            tags: ['listing'],
          });
          return uploadResponse.url;
        })
    );

    const imagesUrls = [
      ...allowedImages.filter((e): e is string => typeof e === 'string'),
      ...newImages
    ];

    await prisma.listing.update({
      data: { images: { set: imagesUrls } },
      where: { id: listingId },
    });

    revalidatePath(`/annonces/details/${listingId}`);
    revalidatePath(`/dashboard/annonces/${listingId}`);

    return listingId;
  });
