import { scrapeFranceAirsoft } from '$/utils/france-airsoft/scrap-listing';
import { groq } from '@ai-sdk/groq';
import { generateObject } from 'ai';
import { z } from 'zod';

export type GroqModelId = Parameters<typeof groq>[0];

// List of GROQ models with good token throughput
export const GROQ_MODELS = [
  'gemma2-9b-it',
  'llama-guard-3-8b',
  'llama-3.3-70b-versatile',
  'llama3-70b-8192',
  'llama-3.1-8b-instant',
  'llama3-8b-8192',
  'meta-llama/llama-4-scout-17b-16e-instruct',
] satisfies GroqModelId[];

/**
 * Generates listings from France-Airsoft content
 * @param url - The URL of the France-Airsoft listing
 * @param modelId - The GROQ model ID to use (optional)
 */
export const generateListings = async (url: string, modelId?: GroqModelId) => {
  const annonceFA = await scrapeFranceAirsoft(url);

  // Use provided model or default to the first in the list
  const selectedModel = modelId || GROQ_MODELS[0];
  console.log(`🤖 Using GROQ model: ${selectedModel}`);

  // Define the schema for listings
  const listingSchema = z.object({
    listings: z.array(
      z.object({
        title: z.string().describe("Le titre de l'annonce"),
        description: z.string().describe("La description détaillée de l'annonce"),
        price: z.number().default(1).describe('Le prix en euros'),
        images: z.array(z.string()).describe("Les URLs des images de l'annonce"),
        type: z
          .enum(['aeg', 'aep', 'gbbr', 'gbb', 'hpa', 'sniper', 'shotgun', 'gear', 'other'])
          .describe('Le type de réplique ou accessoire'),
      }),
    ),
  });

  // Generate the listings using the AI model
  const { object } = await generateObject({
    model: groq(selectedModel),
    schema: listingSchema,
    prompt: `
      Here is the content of a France-Airsoft listing. It can contain multiple listings.
      Your job is to extract each listing and return them as an array of objects.
      The description might be an html rich text, but still a string. IT SHOULDN'T INCLUDE THE IMAGES.
      
      For the "type" field, you must categorize each listing into one of these categories:
      - aeg: Electric airsoft replicas (AEG)
      - aep: Electric airsoft pistols (AEP)
      - gbbr: Gas Blow Back Rifles (GBBR)
      - gbb: Gas pistols or handguns (GBB)
      - hpa: HPA systems
      - sniper: Sniper rifles or DMRs
      - shotgun: Shotguns or pump action replicas
      - gear: Equipment, clothing, vests, etc.
      - other: Accessories, batteries, parts, etc.
      
      ${annonceFA}
    `,
  });

  return {
    listings: object.listings.filter(
      (listing) => listing.images.length > 0 && listing.images.every((img) => img.startsWith('https')),
    ),
  };
};
