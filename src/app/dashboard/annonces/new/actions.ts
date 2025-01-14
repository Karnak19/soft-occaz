'use server';

import { revalidatePath } from 'next/dist/server/web/spec-extension/revalidate';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { ZSAError } from 'zsa';

import { ListingsTypeOptions } from '$/utils/pocketbase/pocketbase-types';
import { authedProcedure } from '$/utils/zsa';

const createListingSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3).max(50),
  price: z.coerce.number().min(1).max(1000000),
  type: z.nativeEnum(ListingsTypeOptions),
  description: z.string(),
  images: z.array(z.string()),
});

export const createListingAction = authedProcedure
  .createServerAction()
  .input(createListingSchema, { type: 'formData' })
  .handler(async ({ input, ctx }) => {
    const { pb, user } = ctx;

    const MAX_IMAGES = 3;

    const allowedImages = input.images.slice(0, MAX_IMAGES);

    if (!input.id) {
      // Creating new listing
      const { id } = await pb
        .collection('listings')
        .create({
          title: input.title,
          price: input.price,
          type: input.type,
          description: input.description,
          user: user.id,
          images: allowedImages,
        })
        .catch((error) => {
          console.error('Error creating listing:', error);
          throw new ZSAError('INTERNAL_SERVER_ERROR', "Erreur lors de la création de l'annonce");
        });

      revalidatePath(`/dashboard/annonces/${id}`);
      revalidatePath(`/annonces/details/${id}`);
    } else {
      // Editing existing listing
      const foundListing = await pb.collection('listings').getOne(input.id);

      if (!foundListing) {
        throw new Error('Listing not found');
      }

      await pb
        .collection('listings')
        .update(input.id, {
          title: input.title,
          price: input.price,
          type: input.type,
          description: input.description,
          images: { set: allowedImages },
        })
        .catch((error) => {
          console.error('Error updating listing:', error);
          throw new ZSAError('INTERNAL_SERVER_ERROR', "Erreur lors de la mise à jour de l'annonce");
        });

      revalidatePath(`/dashboard/annonces/${foundListing.id}`);
      revalidatePath(`/annonces/details/${foundListing.id}`);
    }

    redirect(`/dashboard/annonces`);
  });
