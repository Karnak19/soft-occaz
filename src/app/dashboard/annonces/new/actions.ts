'use server';

import { Type } from '@prisma/client';
import { z } from 'zod';
import { createServerAction } from 'zsa';
import Imagekit from 'imagekit';
import { prisma } from '$/utils/db';
import { getClerkUserFromDb } from '$/utils/getClerkUserFromDb';
import { listingCreationCheck } from '$/utils/listingCreationCheck';
import { env } from '$/env';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/dist/server/web/spec-extension/revalidate';

const createListingSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3).max(50),
  price: z.coerce.number().min(1).max(1000000),
  type: z.string(),
  description: z.string(),

  images: z.array(
    z
      .instanceof(File)
      .refine((file) => file.size > 0, 'Image is required')
      .or(z.string()),
  ),
});

const typeSchema = z.enum([Type.AEG, Type.GBB, Type.GBBR, Type.AEP, Type.HPA, Type.Sniper, Type.PTW, Type.Other, Type.GEAR]);

export const createListingAction = createServerAction()
  .input(createListingSchema, { type: 'formData' })
  .handler(async ({ input }) => {
    console.log('🚀 ~ .handler ~ input:', input);

    const user = await getClerkUserFromDb();
    await listingCreationCheck(user);

    const isPayingUser = ['hobby', 'premium', 'geardo'].includes(user.sub?.toLowerCase() ?? '');
    const isPremium = ['premium'].includes(user.sub?.toLowerCase() ?? '');

    const maxImages = !isPayingUser ? 3 : isPremium ? 7 : 5;

    const allowedImages = Array.from(input.images).slice(0, maxImages);

    const foundListing = await prisma.listing.findFirst({
      where: { id: input.id, userId: user.id },
    });

    const imagesToUpload = allowedImages.filter((image) => image instanceof File);
    const previousImages = allowedImages.filter((image) => typeof image === 'string');

    if (!foundListing) {
      await prisma.$transaction(async (tx) => {
        const { id } = await prisma.listing.create({
          data: {
            title: input.title,
            price: input.price,
            type: typeSchema.parse(input.type),
            description: input.description,
            userId: user.id,
          },
        });

        const newImages = await uploadImages(imagesToUpload, id, user.id);

        await tx.listing.update({
          data: { images: { set: newImages } },
          where: { id },
        });

        revalidatePath(`/dashboard/annonces/${id}`);
        revalidatePath(`/annonces/details/${id}`);
      });
    } else {
      const newImages = await uploadImages(imagesToUpload, foundListing?.id, user.id);

      await prisma.listing.update({
        data: {
          title: input.title,
          price: input.price,
          type: typeSchema.parse(input.type),
          description: input.description,
          images: { set: [...previousImages, ...newImages] },
        },
        where: { id: foundListing.id },
      });

      revalidatePath(`/dashboard/annonces/${foundListing.id}`);
      revalidatePath(`/annonces/details/${foundListing.id}`);
    }

    redirect(`/dashboard/annonces`);
  });

const uploadImages = async (images: File[], listingId: string, userId: string) => {
  const imagekit = new Imagekit({
    publicKey: env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
    privateKey: env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: 'https://ik.imagekit.io/e40qgenad/',
  });

  console.log('🚀 ~ uploadImages ~ images:', images);
  console.log('🚀 ~ uploadImages ~ listingId:', listingId);
  console.log('🚀 ~ uploadImages ~ userId:', userId);

  const newImages = await Promise.all(
    images.map(async (file) => {
      const buffer = Buffer.from(await file.arrayBuffer());
      const uploadResponse = await imagekit.upload({
        file: buffer,
        fileName: `${listingId}-${file.name}`,
        folder: userId,
        tags: ['listing'],
      });
      return uploadResponse.url;
    }),
  );

  console.log('🚀 ~ uploadImages ~ newImages:', newImages);

  return newImages;
};
