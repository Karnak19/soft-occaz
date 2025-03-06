import { load } from 'cheerio';

export async function scrapAirsoftOccasionListingsList(page: number = 1): Promise<string[]> {
  const url = `https://www.airsoft-occasion.fr/annonces/offres?page=${page}`;

  const html = await fetch(url).then((res) => res.text());
  const $ = load(html);

  // The new structure uses a different class structure for listings
  // Each listing is now in a div.background-ads-listing-container with links inside
  const urls = $('.background-ads-listing-container .background-ads-listing a[href]')
    .filter(function () {
      // Filter to only get the content links, not the image links or heart/favorite links
      const href = $(this).attr('href');
      return href !== undefined && href.includes('/annonce/');
    })
    .map((_, element) => $(element).attr('href'))
    .get();

  // Remove duplicates as each listing has multiple links to the same URL
  return Array.from(new Set(urls));
}
