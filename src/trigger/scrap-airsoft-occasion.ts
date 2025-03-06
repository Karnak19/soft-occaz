import { env } from '$/env';
import { schedules } from '@trigger.dev/sdk/v3';
import PocketBase from 'pocketbase';

import { scrapAirsoftOccasionListingsList } from '$/utils/airsoft-occasion/scrap-list';
import { scrapAirsoftOccasionListing } from '$/utils/airsoft-occasion/scrap-listing';
import type { TypedPocketBase } from '$/utils/pocketbase/pocketbase-types';

export async function createStaticClient() {
  const pb = new PocketBase(env.NEXT_PUBLIC_POCKETBASE_URL) as TypedPocketBase;

  await pb.collection('_superusers').authWithPassword(env.POCKETBASE_ADMIN_EMAIL, env.POCKETBASE_ADMIN_PASSWORD);

  return pb;
}

export const scrapAirsoftOccasion = schedules.task({
  id: 'scrap-airsoft-occasion',
  // every 2 hours
  cron: '0 */2 * * *',
  run: async () => {
    const urls = await scrapAirsoftOccasionListingsList();

    const userId = 'v163jc234126c64';
    const pb = await createStaticClient();

    const batch = pb.createBatch();

    const last30Listings = await pb.collection('listings').getList(1, 30, {
      filter: 'user = "v163jc234126c64"',
      sort: '-created',
    });

    const listings: { title: string; user: string }[] = [];

    await Promise.all(
      urls.map(async (url) => {
        const listing = await scrapAirsoftOccasionListing(url);

        console.log('Found listing', listing.title, 'with type', listing.type);

        if (listing.type === 'unknown') {
          return;
        }
        if (listing.images.length === 0) {
          console.log('--- No images found, skipping');
          return;
        }

        const existingListing = last30Listings.items.find((item) => item.title === listing.title);

        if (existingListing) {
          console.log('--- Listing already exists, skipping');
          return;
        }

        if (listings.find((item) => item.title === listing.title && item.user === listing.user)) {
          console.log('--- Listing is duplicate, skipping');
          return;
        }

        console.log('--- Adding listing to batch', listing.title);

        batch.collection('listings').create({
          ...listing,
          description: `
          <h2>⚠️ Cette annonce provient de Airsoft-occasion ⚠️</h2>
          <a href="${url}" target="_blank">Voir l'annonce sur Airsoft-occasion</a> 
          <br /><br />

          ${listing.description}
          `,
          user: userId,
        });

        listings.push({ title: listing.title, user: listing.user });
      }),
    );

    await batch.send().catch((err) => {
      console.error('Error sending batch', err);
      console.dir(err, { depth: 10 });
    });
  },
});
