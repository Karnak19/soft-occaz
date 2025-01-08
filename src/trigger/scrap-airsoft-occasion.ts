import { env } from '$/env';
import { schedules } from '@trigger.dev/sdk/v3';
import PocketBase, { ClientResponseError } from 'pocketbase';

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
    console.log('Scraping airsoft occasion');
    const urls = await scrapAirsoftOccasionListingsList();

    const userId = 'v163jc234126c64';
    const pb = await createStaticClient();

    for (const url of urls) {
      const listing = await scrapAirsoftOccasionListing(url);

      console.log('Found listing', listing.title, 'with type', listing.type);

      if (listing.type === 'unknown') {
        continue;
      }

      const existingListing = await pb
        .collection('listings')
        .getFirstListItem(`title = "${listing.title}"`)
        .catch(() => null);

      if (existingListing) {
        console.log('Listing already exists', existingListing.id);
        continue;
      }

      console.log('Creating listing', listing.title);

      await pb
        .collection('listings')
        .create({
          ...listing,
          description: `
          <h2>⚠️ Cette annonce provient de Airsoft-occasion ⚠️</h2>
          <a href="${url}" target="_blank">Voir l'annonce sur Airsoft-occasion</a> 
          <br /><br />

          ${listing.description}
          `,
          user: userId,
        })
        .catch((err) => {
          const error = err as ClientResponseError;
          console.error('Error creating listing', error.response);
        });
    }
  },
});
