'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { ZSAError } from 'zsa';

import { errorMonitor } from '$/services/error-monitor';
import { authedProcedure } from '$/utils/zsa';

const createListingSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3).max(50),
  price: z.coerce.number().min(1).max(1000000),
  type: z.string(),
  fees: z.array(z.string()).optional(),
  description: z.string(),
  images: z.array(z.string()),
});

export const createListingAction = authedProcedure
  .createServerAction()
  .input(createListingSchema)
  .handler(async ({ input, ctx }) => {
    const { pb, user } = ctx;

    const [referrals, listingsCount] = await Promise.all([
      pb.collection('referral_tiers').getOne(user.id),
      pb.collection('listings').getList(1, 1, {
        filter: `user = "${user.id}"`,
      }),
    ]);

    let MAX_IMAGES: number;

    if (referrals.tier === 'master') {
      MAX_IMAGES = 9;
    } else if (referrals.tier === 'gold') {
      MAX_IMAGES = 7;
    } else if (referrals.tier === 'silver') {
      MAX_IMAGES = 5;
    } else if (referrals.tier === 'bronze') {
      MAX_IMAGES = 4;
    } else {
      MAX_IMAGES = 3;
    }

    if (user.referrer && listingsCount.items.length === 0) {
      MAX_IMAGES = 5;
    }

    const allowedImages = input.images.slice(0, MAX_IMAGES);

    if (!input.id) {
      // Creating new listing
      await pb
        .collection('listings')
        .create({
          title: input.title,
          price: input.price,
          type: input.type,
          description: input.description,
          user: user.id,
          images: allowedImages,
          fees: input.fees,
        })
        .catch(async (error) => {
          console.error('Error creating listing:', error);
          await errorMonitor.userFailedToCreateListing({
            error,
            listingData: input,
            userId: user.id,
          });
          throw new ZSAError('INTERNAL_SERVER_ERROR', "Erreur lors de la création de l'annonce");
        });
    } else {
      // Editing existing listing
      const foundListing = await pb
        .collection('listings')
        .getOne(input.id)
        .catch(() => {
          throw new ZSAError('NOT_FOUND', 'Annonce non trouvée');
        });

      await pb
        .collection('listings')
        .update(input.id, {
          title: input.title,
          price: input.price,
          type: input.type,
          description: input.description,
          images: allowedImages,
          fees: input.fees,
        })
        .catch(async (error) => {
          console.error('Error updating listing:', error);
          await errorMonitor.userFailedToUpdateListing({
            error,
            listingId: input.id as string,
            listingData: input,
            userId: user.id,
          });
          throw new ZSAError('INTERNAL_SERVER_ERROR', "Erreur lors de la mise à jour de l'annonce");
        });

      revalidatePath(`/dashboard/annonces`);
      revalidatePath(`/dashboard/annonces/${foundListing.id}`);
    }

    redirect(`/dashboard/annonces/`);
  });
