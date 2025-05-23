import { env } from '$/env';
import { scrapeFranceAirsoft } from '$/utils/france-airsoft/scrap-listing';
import { google } from '@ai-sdk/google';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { generateObject, generateText } from 'ai';
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
  - gbb : Pistolets à gaz ou Co2 (GBB)
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
    model: google('qwen/qwen3-32b:free'),
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

export const generatePocketbaseFilter = async (userPrompt: string) => {
  const { object } = await generateObject({
    model: google('gemini-2.5-flash-preview-04-17'),

    schema: z.object({ filter: z.string().describe('The Pocketbase filter') }),
    system: `You are an assistant whose job is to generate a Pocketbase filter based on a user prompt.
    You have a deep knowledge of airsoft and firearms brands and models.
    This is your ONLY job.
    Do not accept any other task than generating the filter. The filter must be a valid Pocketbase filter.

    Here are the TS types of the Pocketbase collection "listings":

    type ListingsRecord<Timages = string[]> = {
      created?: IsoDateString
      description?: HTMLString
      external_id?: string
      fees?: ListingsFeesOptions[]
      id: string
      images?: null | Timages
      price: number
      sold_to?: RecordIdString
      title: string
      type: ListingsTypeOptions
      updated?: IsoDateString
      user: RecordIdString
    }

    enum ListingsTypeOptions {
      "aeg" = "aeg", // Répliques électriques (AEG)
      "aep" = "aep", // Pistolets électriques (AEP)
      "gbb" = "gbb", // Pistolets à gaz ou Co2 (GBB)
      "gbbr" = "gbbr", // Fusils à gaz blowback (GBBR)
      "hpa" = "hpa", // Systèmes HPA
      "ptw" = "ptw", // Pistolets à tiroir (PTW)
      "gear" = "gear", // Equipements, vêtements, gilets, etc.
      "sniper" = "sniper", // Fusils sniper ou DMR
      "shotgun" = "shotgun", // Fusils à pompe ou répliques à pompe
      "other" = "other", // Accessoires, batteries, pièces, etc.
    }

    enum ListingsFeesOptions {
      "paypal_in" = "paypal_in",
      "shipping_in" = "shipping_in",
    }

    Here is the documentation for Pocketbase filters:
    # API rules and filters
    ## Filters syntax

    The syntax basically follows the format
    OPERAND OPERATOR OPERAND, where:

    - OPERAND - could be any field literal, string (single or double quoted),
      number, null, true, false
    - OPERATOR - is one of:
      - = Equal
      - != NOT equal
      - > Greater than
      - >= Greater than or equal
      - < Less than
      - <= Less than or equal
      - ~ Like/Contains (if not specified auto wraps the right string OPERAND in a "%" for wildcard
        match)
      - !~ NOT Like/Contains (if not specified auto wraps the right string OPERAND in a "%" for
        wildcard match)
      - ?= Any/At least one of Equal
      - ?!= Any/At least one of NOT equal
      - ?> Any/At least one of Greater than
      - ?=> Any/At least one of Greater than or equal
      - ?< Any/At least one of Less than
      - ?<= Any/At least one of Less than or equal
      - ?~ Any/At least one of Like/Contains (if not specified auto wraps the right string OPERAND in a "%" for wildcard
        match)
      - ?!~ Any/At least one of NOT Like/Contains (if not specified auto wraps the right string OPERAND in a "%" for
        wildcard match)

    To group and combine several expressions you can use parenthesis
    (...), && (AND) and || (OR) tokens.

    ## Special identifiers and modifiers
    ### @ macros

    The following datetime macros are available and can be used as part of the filter expression:

    all macros are UTC based

    | Macro       | Description                                       |
    | ----------- | ------------------------------------------------- |
    | @now        | the current datetime as string                    |
    | @second     | @now second number (0-59)                         |
    | @minute     | @now minute number (0-59)                         |
    | @hour       | @now hour number (0-23)                           |
    | @weekday    | @now weekday number (0-6)                         |
    | @day        | @now day number                                   |
    | @month      | @now month number                                 |
    | @year       | @now year number                                  |
    | @yesterday  | the yesterday datetime relative to @now as string |
    | @tomorrow   | the tomorrow datetime relative to @now as string  |
    | @todayStart | beginning of the current day as datetime string   |
    | @todayEnd   | end of the current day as datetime string         |
    | @monthStart | beginning of the current month as datetime string |
    | @monthEnd   | end of the current month as datetime string       |
    | @yearStart  | beginning of the current year as datetime string  |
    | @yearEnd    | end of the current year as datetime string        |

    
    ## Examples

    ### Examples of valid filters ✅
    created >= @now
    created >= '2025-05-15'
    title ~ "%mp5%" && price > 100 && created >= @monthStart 
    @request.auth.id != ""

    ### Examples of invalid filters ❌
    created >= @now - 1 day // (cannot calculate relative to now)
    created >= @now - 1d // (cannot calculate relative to now)
    created >= @todayStart - 7*24*60*60 // (cannot calculate relative to now)

    You should search within the listing title and description, aswell as the listing type and price if you can determine it.
    Do not return any other text than the filter. return a single string containing the filter. nothing else. no md block, no code block, no html, no markdown, no nothing.

    RETURN ONLY THE FILTER, NOTHING ELSE.
`,

    // prompt: userPrompt,
    messages: [
      {
        role: 'system',
        content: `Today is: ${new Date().toISOString()}`,
      },
      {
        role: 'user',
        content: userPrompt,
      },
    ],
  }).catch((err) => {
    console.log('🚀 ~ generatePocketbaseFilter ~ err:', err);
    return { object: { filter: '' } };
  });

  console.log('🚀 ~ generatePocketbaseFilter ~ object:', object);

  return encodeURIComponent(object.filter);
};
