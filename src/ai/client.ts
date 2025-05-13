import { env } from '$/env';
import { scrapeFranceAirsoft } from '$/utils/france-airsoft/scrap-listing';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { generateText } from 'ai';
import { z } from 'zod';

const listings = z.array(
  z.object({
    title: z.string().describe("Le titre de l'annonce"),
    description: z.string().describe("La description détaillée de l'annonce"),
    price: z.number().default(1).describe('Le prix en euros'),
    images: z.array(z.string()).describe("Les URLs des images de l'annonce"),
    type: z
      .enum(['aeg', 'aep', 'gbbr', 'gbb', 'hpa', 'sniper', 'shotgun', 'gear', 'other'])
      .describe('Le type de réplique ou accessoire'),
  }),
);

// const schema = z.object({ listings });

const buildPrompt = (listing: string | null) => `
  Voici le contenu d'une annonce France-Airsoft. ATTENTION : une annonce France-Airsoft peut contenir plusieurs annonces distinctes pour AirsoftMarket.

  Votre tâche :
  1. Identifier et extraire CHAQUE annonce distincte destinée à AirsoftMarket, même si elles sont regroupées dans cette unique publication France-Airsoft.
  2. Retourner un tableau d'objets, un objet par annonce AirsoftMarket extraite.
  3. La description ne doit pas inclure les images. Elles seront dans un array à part.
  4. Pour le champ "type", catégorisez chaque annonce selon l'une des catégories ci-dessous :
  5. Des fois, l'auteur de l'annonce ajoute une liste de règles de vente. Il faut les inclure dans chaque annonce générée.

  Catégories autorisées :
  - aeg : Répliques électriques (AEG)
  - aep : Pistolets électriques (AEP)
  - gbbr : Fusils à gaz blowback (GBBR)
  - gbb : Pistolets à gaz (GBB)
  - hpa : Systèmes HPA
  - sniper : Fusils sniper ou DMR
  - shotgun : Fusils à pompe ou répliques à pompe
  - gear : Equipements, vêtements, gilets, etc.
  - other : Accessoires, batteries, pièces, etc.

  Format de sortie attendu, un tableau d'objets : z.array(
    z.object({
      title: z.string().describe("Le titre de l'annonce"),
      description: z.string().describe("La description détaillée de l'annonce"),
      price: z.number().default(1).describe('Le prix en euros'),
      images: z.array(z.string()).describe("Les URLs des images de l'annonce"),
      type: z
        .enum(['aeg', 'aep', 'gbbr', 'gbb', 'hpa', 'sniper', 'shotgun', 'gear', 'other'])
        .describe('Le type de réplique ou accessoire'),
    }),
  ).
  JUST RETURN THE JSON ARRAY, NOTHING ELSE.

  ${listing}
`;

const openrouter = createOpenRouter({
  apiKey: env.OPENROUTER_API_KEY,
});

// Shared filter for valid listings
const filterValidListings = (listings: any[]) =>
  listings.filter((listing) => listing.images.length > 0 && listing.images.every((img: string) => img.startsWith('https')));

interface GenerateListingsPayload {
  url: string;
}

export const generateListings = async (payload: GenerateListingsPayload) => {
  const annonceFA = await scrapeFranceAirsoft(payload.url);
  const { text } = await generateText({
    model: openrouter('qwen/qwen3-32b:free'),
    prompt: buildPrompt(annonceFA),
  });

  console.log('🚀 ~ generateListings ~ text:', text);

  const object = listings.parse(JSON.parse(text));

  console.log('🚀 ~ generateListings ~ object:', object);

  // const { object } = await generateObject({
  //   schema,
  //   model: openrouter('mistralai/mistral-small-3.1-24b-instruct:free'),
  //   prompt: buildPrompt(annonceFA),
  // });
  return { listings: filterValidListings(object) };
};
