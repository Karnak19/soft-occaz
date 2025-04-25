import { scrapeFranceAirsoft } from '$/utils/france-airsoft/scrap-listing';
import { groq } from '@ai-sdk/groq';
import { generateObject } from 'ai';
import { z } from 'zod';

/**
 * Generates listings from France-Airsoft content
 * @param url - The URL of the France-Airsoft listing
 */
export const generateListings = async (url: string) => {
  const annonceFA = await scrapeFranceAirsoft(url);

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
    model: groq('llama-3.1-8b-instant'),
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
