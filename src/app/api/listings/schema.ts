import { z } from 'zod';

import { Type } from '@prisma/client';

export const listingSchema = z.object({
  images: z.array(z.string()),
  price: z.number().min(0),
  title: z.string().min(3).max(100),
  description: z.string(),
  type: z.enum([Type.AEG, Type.GBB, Type.GBBR, Type.AEP, Type.HPA, Type.Sniper, Type.PTW, Type.Other, Type.GEAR]),
  sold: z.boolean(),
});

export const createListingSchema = listingSchema.extend({
  userId: z.string(),
});
