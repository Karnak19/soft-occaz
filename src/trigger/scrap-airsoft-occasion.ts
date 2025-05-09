import { env } from '$/env';
import { schedules } from '@trigger.dev/sdk/v3';
import PocketBase from 'pocketbase';

import { scrapAirsoftOccasionListingsList } from '$/utils/airsoft-occasion/scrap-list';
import { scrapAirsoftOccasionListing } from '$/utils/airsoft-occasion/scrap-listing';
import type { ListingsResponse } from '$/utils/pocketbase/pocketbase-types';
import type { TypedPocketBase } from '$/utils/pocketbase/pocketbase-types';

export async function createStaticClient() {
  const pb = new PocketBase(env.NEXT_PUBLIC_POCKETBASE_URL) as TypedPocketBase;
  await pb.collection('_superusers').authWithPassword(env.POCKETBASE_ADMIN_EMAIL, env.POCKETBASE_ADMIN_PASSWORD);
  return pb;
}

export const scrapAirsoftOccasion = schedules.task({
  id: 'scrap-airsoft-occasion',
  cron: '0 */2 * * *',
  run: async () => {
    const urls = await scrapAirsoftOccasionListingsList();
    const userId = 'v163jc234126c64'; // User ID for the scraped listings
    const pb = await createStaticClient();

    const last30Listings = await pb.collection('listings').getList<ListingsResponse>(1, 30, {
      filter: `user = "${userId}"`,
      sort: '-created',
    });
    const existingTitles = new Set(last30Listings.items.map((item) => item.title));

    // Process each URL concurrently
    const listingProcessingPromises = urls.map(async (url: string) => {
      try {
        const listing = await scrapAirsoftOccasionListing(url);

        console.log('Processing listing:', listing.title);

        if (listing.type === 'unknown') {
          console.log('--- Type unknown, skipping');
          return null;
        }
        if (listing.images.length === 0) {
          console.log('--- No images found, skipping');
          return null;
        }

        // Check against recently fetched listings from DB
        if (existingTitles.has(listing.title)) {
          console.log('--- Listing already exists in DB, skipping');
          return null;
        }

        // Return data needed for batch creation
        return {
          ...listing,
          originalUrl: url, // Keep original URL for the description link
        };
      } catch (error) {
        console.error(`Error processing URL ${url}:`, error);
        return null; // Skip this URL on error
      }
    });

    // Wait for all listings to be processed
    const results = await Promise.all(listingProcessingPromises);

    // Filter out null results (skipped or failed listings)
    const validListingsData = results.filter((data) => data !== null);

    // Deduplicate listings processed in *this run* before adding to batch
    const uniqueNewListings = new Map<string, any>(); // TODO: change the any
    for (const listingData of validListingsData) {
      if (!uniqueNewListings.has(listingData.title)) {
        // Simple title-based deduplication for this batch
        uniqueNewListings.set(listingData.title, listingData);
      }
    }

    if (uniqueNewListings.size === 0) {
      console.log('No new valid listings found to add.');
      return; // Nothing to add to the batch
    }

    // Create and send the batch
    const batch = pb.createBatch();
    console.log(`Adding ${uniqueNewListings.size} unique new listings to the batch...`);

    uniqueNewListings.forEach((listingData) => {
      const { originalUrl, ...dataToCreate } = listingData;
      batch.collection('listings').create({
        ...dataToCreate,
        description: `
        <h2>⚠️ Cette annonce provient de Airsoft-occasion ⚠️</h2>
        <a href="${originalUrl}" target="_blank" rel="noopener noreferrer">Voir l'annonce originale sur Airsoft-occasion</a>
        <br /><br />

        ${dataToCreate.description}
        `,
        user: userId,
      });
    });

    try {
      await batch.send();
      console.log(`Successfully sent batch with ${uniqueNewListings.size} new listings.`);
    } catch (err) {
      console.error('Error sending batch', err);
      if (
        err &&
        typeof err === 'object' &&
        'originalError' in err &&
        err.originalError &&
        typeof err.originalError === 'object'
      ) {
        console.error('PocketBase Error Details:', JSON.stringify(err.originalError, null, 2));
        if ('data' in err.originalError && err.originalError.data) {
          console.error('PocketBase Data:', JSON.stringify(err.originalError.data, null, 2));
        }
      } else {
        console.dir(err, { depth: 10 });
      }
    }
  },
});
