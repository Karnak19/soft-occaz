'use server';

import { z } from 'zod';

import { sendEmails } from '$/utils/emails';
import { RatingSessionsResponse } from '$/utils/pocketbase/pocketbase-types';
import { authedProcedure } from '$/utils/zsa';

export const sellListingAction = authedProcedure
  .createServerAction()
  .input(
    z.object({
      listingId: z.string(),
      recipientId: z.string(),
    }),
  )
  .handler(async ({ input, ctx }) => {
    const { pb, user } = ctx;

    const listing = await pb.collection('listings').update(input.listingId, {
      sold_to: input.recipientId,
    });

    // Create rating sessions
    const [sellerSession, buyerSession] = await Promise.all([
      // Seller rates buyer
      pb.collection('rating_sessions').create<RatingSessionsResponse>({
        listing: input.listingId,
        user: user.id,
        target: input.recipientId,
      }),
      // Buyer rates seller
      pb.collection('rating_sessions').create<RatingSessionsResponse>({
        listing: input.listingId,
        user: input.recipientId,
        target: user.id,
      }),
    ]);

    // Get both users' data
    let [buyer, seller] = await Promise.all([
      pb.collection('users').getOne(input.recipientId),
      pb.collection('users').getOne(user.id),
    ]);

    buyer = {
      ...buyer,
      avatar: pb.files.getURL(buyer, buyer.avatar, { thumb: '100x100' }),
    };

    seller = {
      ...seller,
      avatar: pb.files.getURL(seller, seller.avatar, { thumb: '100x100' }),
    };

    // Send rating request emails to both users
    await Promise.all([
      // Send email to seller to rate the buyer
      sendEmails.createRating({ user: seller, from: buyer, ratingSessionId: sellerSession.id }),
      // Send email to buyer to rate the seller
      sendEmails.createRating({ user: buyer, from: seller, ratingSessionId: buyerSession.id }),
    ]);

    return listing;
  });
