import * as cheerio from 'cheerio';

/**
 * Scrape the list of France Airsoft listings
 */
export async function scrapFranceAirsoftListingsList(): Promise<string[]> {
  console.log('📋 Scraping the list of France Airsoft listings...');
  // France Airsoft uses a different URL structure than Airsoft Occasion
  const url = `https://www.france-airsoft.fr/occasions/index.php?showforum=48`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.error(`❌ Failed to fetch France Airsoft listings: ${response.status} ${response.statusText}`);
      return [];
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const selector = 'td.row1 a';
    const urls = $(selector)
      .map((_, element) => $(element).attr('href'))
      .get()
      .filter(Boolean) as string[];

    const uniqueUrls = Array.from(new Set(urls)); // Remove duplicates
    console.log(`✅ Successfully scraped ${uniqueUrls.length} unique France Airsoft listings URLs`);
    return uniqueUrls;
  } catch (error) {
    console.error(`❌ Error scraping France Airsoft listings:`, error);
    return [];
  }
}
