import * as cheerio from 'cheerio';

/**
 * Scrapes content from a France-Airsoft URL
 */
export async function scrapeFranceAirsoft(url: string) {
  try {
    const response = await fetch(url);

    const $ = cheerio.load(await response.text());

    // Extract the main content from the page
    const content = $('div.postcolor');

    return content.html();
  } catch (error) {
    console.error('Error scraping website:', error);
    throw new Error('Failed to scrape the website');
  }
}
