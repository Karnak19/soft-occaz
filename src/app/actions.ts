'use server';

import { generatePocketbaseFilter } from '$/ai/client'; // Import the AI function
import { authedProcedure } from '$/utils/zsa';
import { z } from 'zod';
import { ZSAError } from 'zsa';

// Schema is defined here for the server action's use but NOT exported.
// The client form will use an identical schema.
const aiSearchActionSchema = z.object({
  prompt: z.string({ required_error: 'Veuillez saisir une recherche.' }).min(1, 'Veuillez saisir une recherche.'),
});

export const generatePocketbaseFilterAction = authedProcedure
  .createServerAction()
  .input(aiSearchActionSchema)
  .handler(async ({ input }) => {
    try {
      console.log('🚀 ~ .handler ~ input.prompt:', input.prompt);
      const generatedFilter = await generatePocketbaseFilter(input.prompt);
      console.log('🚀 ~ .handler ~ generatedFilter:', generatedFilter);
      return { generatedFilter };
    } catch (_error) {
      throw new ZSAError('ERROR', 'Une erreur est survenue lors de la génération de la recherche');
    }
  });
