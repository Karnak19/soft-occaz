import { z } from 'zod';

import { zStars, zTextarea } from '$/components/Form/core/unique-fields';

export const ratingSchema = z.object({
  rating: zStars.describe('Note'),
  comment: zTextarea.describe('Commentaire'),
});

export const ratingSchemaWithSession = ratingSchema.extend({
  sessionId: z.string(),
});
