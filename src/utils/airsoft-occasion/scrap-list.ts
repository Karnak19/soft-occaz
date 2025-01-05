import { load } from "cheerio";

export async function scrapAirsoftOccasionListingsList(): Promise<string[]> {
  const url = 'https://www.airsoft-occasion.fr/annonces/offres';

  const html = await fetch(url).then((res) => res.text());
  const $ = load(html);


  const urls = $('a[href].background-ads-listing.flex-container').map((_, element) => $(element).attr('href')).get();

  return urls;
}
