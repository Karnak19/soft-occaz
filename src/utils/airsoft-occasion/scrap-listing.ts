import { load } from 'cheerio';

export async function scrapAirsoftOccasionListing(url: string) {
  const html = await fetch(url).then((res) => res.text());

  const $ = load(html);

  const title = $('body > div:nth-child(3) > div > div.ad-page-bloc-title.flex-container > h1').text().trim();

  const price = $(
    'body > div:nth-child(3) > div > div.ad-page-parent-container.flex-container > div.ad-page-large-container > div:nth-child(3) > p.price',
  )
    .text()
    .trim();

  const description = $(
    'body > div:nth-child(3) > div > div.ad-page-parent-container.flex-container > div.ad-page-large-container > div:nth-child(4) > p:nth-child(2)',
  ).html();

  const imagesUL = $('.ad-page-bloc-thumbnail-list');

  const MAX_IMAGES = 3;

  const images = imagesUL
    .find('img')
    .slice(0, MAX_IMAGES)
    .map((i, el) => {
      return $(el).attr('src');
    })
    .get();

  const type = $('body > div:nth-child(3) > div > div.ad-page-bloc-title.flex-container > ul > li:nth-child(3) > a')
    .text()
    .trim();

  const goodType = (() => {
    switch (true) {
      case type.includes('AEG'):
        return 'aeg';
      case type.includes('HPA'):
        return 'hpa';
      case type.includes('Gaz Blowback'):
        return 'gbbr';
      case type.includes('Snipes'):
        return 'sniper';
      case type.includes('Poing'):
        return 'gbb';
      case type.includes('AEP'):
        return 'aep';
      case type.includes('Vêtements'):
        return 'gear';
      default:
        return 'unknown';
    }
  })();

  return {
    title,
    price: Number(price.slice(0, -2).replace(',', '.')) || 1,
    description,
    images,
    type: goodType,
  };
}
