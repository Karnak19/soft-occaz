import { load } from 'cheerio';

export async function scrapAirsoftOccasionListingsList(page: number = 1): Promise<string[]> {
  const url = `https://www.airsoft-occasion.fr/annonces/offres?page=${page}`;

  const html = await fetch(url).then((res) => res.text());
  const $ = load(html);

  const urls = $('a[href].background-ads-listing.flex-container')
    .map((_, element) => $(element).attr('href'))
    .get();

  return urls;
}
