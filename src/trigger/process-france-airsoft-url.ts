import { generateListings } from '$/ai/client';
import { env } from '$/env';
import type { ListingsResponse, TypedPocketBase } from '$/utils/pocketbase/pocketbase-types';
import { task } from '@trigger.dev/sdk/v3';
import PocketBase from 'pocketbase';

async function createStaticClient() {
  const pb = new PocketBase(env.NEXT_PUBLIC_POCKETBASE_URL) as TypedPocketBase;
  await pb.collection('_superusers').authWithPassword(env.POCKETBASE_ADMIN_EMAIL, env.POCKETBASE_ADMIN_PASSWORD);
  return pb;
}

// Type for the task payload
type ProcessUrlPayload = {
  url: string;
};

// Type for the task output
type ProcessUrlOutput = {
  success: boolean;
  url: string;
  skipped?: boolean;
  listingsCount?: number;
};

// Child task to process a single France Airsoft URL
export const processFranceAirsoftUrl = task({
  id: 'process-france-airsoft-url',
  queue: { concurrencyLimit: 1 },
  retry: { maxAttempts: 1 },
  run: async (payload: ProcessUrlPayload): Promise<ProcessUrlOutput> => {
    const { url } = payload;
    const userId = 'v163jc234126c64'; // User ID for the scraped listings

    try {
      const pb = await createStaticClient();

      // Check if this URL was already processed
      const existingListing = await pb.collection('listings').getList<ListingsResponse>(1, 1, {
        filter: `user = "${userId}" && external_id = "${url}"`,
      });

      if (existingListing.items.length > 0) {
        console.log(`⏭️ URL already processed, skipping: ${url}`);
        return { success: true, skipped: true, url };
      }

      console.log(`🤖 Generating listings with AI for URL: ${url}`);
      const { listings } = await generateListings(url);
      console.log(`✅ Successfully generated ${listings.length} listings from URL`);

      const predescription = `
      <h2>⚠️ Cette annonce provient de France Airsoft ⚠️</h2>
      <p><i>Cette annonce a été générée automatiquement par une intelligence artificielle à partir du contenu de l'annonce originale. Il est possible que certaines informations soient incorrectes ou manquantes.</i></p>
      <br />
      <a href="${url}" target="_blank" rel="noopener noreferrer">Voir l'annonce originale sur France Airsoft</a>
      <br /><br />
      `;

      const batch = pb.createBatch();
      console.log(env.NEXT_PUBLIC_POCKETBASE_URL, env.POCKETBASE_ADMIN_EMAIL, env.POCKETBASE_ADMIN_PASSWORD);

      for (let j = 0; j < listings.length; j++) {
        const listing = listings[j];

        const payload = {
          ...listing,
          user: userId,
          description: predescription + listing.description,
          external_id: url,
        };
        console.log('🚀 ~ run: ~ payload:', payload);

        console.log(`📝 Preparing listing ${j + 1}/${listings.length}: ${listing.title}`);
        batch.collection('listings').create(payload);
      }

      console.log(`💾 Sending batch with ${listings.length} listings to PocketBase...`);
      await batch.send();
      console.log(`✅ Successfully saved ${listings.length} listings to database`);

      return {
        success: true,
        url,
        listingsCount: listings.length,
      };
    } catch (error) {
      console.error(`❌ Error processing URL ${url}:`, error);
      throw error; // Rethrow so Trigger.dev can retry
    }
  },
});
