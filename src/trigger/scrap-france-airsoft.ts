import { GROQ_MODELS, type GroqModelId } from '$/ai/client';
import { env } from '$/env';
import { queue, schedules } from '@trigger.dev/sdk/v3';
import PocketBase from 'pocketbase';

import { scrapFranceAirsoftListingsList } from '$/utils/france-airsoft/scrap-list';
import type { ListingsResponse } from '$/utils/pocketbase/pocketbase-types';
import type { TypedPocketBase } from '$/utils/pocketbase/pocketbase-types';
import { processFranceAirsoftUrl } from './process-france-airsoft-url';

async function createStaticClient() {
  const pb = new PocketBase(env.NEXT_PUBLIC_POCKETBASE_URL) as TypedPocketBase;
  await pb.collection('_superusers').authWithPassword(env.POCKETBASE_ADMIN_EMAIL, env.POCKETBASE_ADMIN_PASSWORD);
  return pb;
}

// Define a rate-limited queue for AI operations
export const aiRateLimitedQueue = queue({
  name: 'ai-rate-limited-queue',
  concurrencyLimit: 1, // Only allow 1 concurrent AI operation
});

/**
 * Simple round-robin model distribution
 */
function distributeModelsToUrls(urls: string[]): { url: string; model: GroqModelId }[] {
  return urls.map((url, index) => ({
    url,
    model: GROQ_MODELS[index % GROQ_MODELS.length],
  }));
}

export const scrapFranceAirsoft = schedules.task({
  id: 'scrap-france-airsoft',
  cron: '0 */3 * * *', // Run every 3 hours
  run: async () => {
    console.log('🚀 Starting France Airsoft scraper task');

    try {
      console.log('🔍 Fetching listings URLs from France Airsoft...');
      const urls = await scrapFranceAirsoftListingsList();

      if (urls.length === 0) {
        console.warn('⚠️ No URLs found to process, ending task');
        return;
      }

      console.log(`📊 Found ${urls.length} total URLs to process`);

      const userId = 'v163jc234126c64'; // User ID for the scraped listings - using the same one as Airsoft Occasion
      console.log(`👤 Using user ID: ${userId} for scraped listings`);

      console.log('🔑 Connecting to PocketBase...');
      const pb = await createStaticClient();
      console.log('✅ Successfully connected to PocketBase');

      // Get recent listings to check for duplicates
      console.log('🔄 Fetching recent listings to check for duplicates...');
      const last500Listings = await pb.collection('listings').getList<ListingsResponse>(1, 500, {
        filter: `user = "${userId}"`,
        sort: '-created',
      });
      console.log(`📝 Found ${last500Listings.items.length} recent listings for duplicate check`);

      const filteredUrls = urls
        .filter((url) => {
          return !last500Listings.items.some((listing) => listing.external_id === url);
        })
        .filter((url) => !url.endsWith('showtopic=2'));

      console.log(`🔎 After filtering: ${filteredUrls.length} new listings to process out of ${urls.length} total`);
      console.log(`🔄 Skipping ${urls.length - filteredUrls.length} existing listings`);

      if (filteredUrls.length === 0) {
        console.log('✅ No new listings found, task completed');
        return;
      }

      console.log(`🧩 Spawning child tasks for ${filteredUrls.length} URLs with proper concurrency controls...`);

      // Distribute models to URLs using simple round-robin
      const urlsWithModels = distributeModelsToUrls(filteredUrls);

      // Log model distribution statistics
      console.log('📊 Model distribution:');
      const modelCount = GROQ_MODELS.reduce(
        (acc, model) => {
          acc[model] = urlsWithModels.filter((item) => item.model === model).length;
          return acc;
        },
        {} as Record<GroqModelId, number>,
      );

      Object.entries(modelCount).forEach(([model, count]) => {
        console.log(`  - ${model}: ${count} URLs`);
      });

      // Trigger a processing task for each URL with assigned model
      console.log(`🚀 Triggering ${urlsWithModels.length} processing tasks...`);

      // Prepare all payloads with assigned models
      const allTaskPayloads = urlsWithModels.map(({ url, model }) => ({
        payload: { url, model },
      }));

      // Just trigger all tasks - no waiting - the queue will handle concurrency
      processFranceAirsoftUrl.batchTrigger(allTaskPayloads);

      console.log(`✅ All ${urlsWithModels.length} processing tasks have been triggered`);
      console.log(
        `🏁 The queue "${aiRateLimitedQueue.name}" with concurrency limit of ${aiRateLimitedQueue.concurrencyLimit} will process these tasks`,
      );
      console.log('\n✅ France Airsoft scraper scheduler task completed successfully');
    } catch (error) {
      console.error('❌ France Airsoft scraper scheduler task failed:', error);
      throw error; // Re-throw to let Trigger.dev handle the error
    }
  },
});
