import { load } from 'cheerio';

export async function scrapAirsoftOccasionListing(url: string) {
  const html = await fetch(url).then((res) => res.text());

  const $ = load(html);

  const title = $('h1[itemprop=name]').text().trim();

  const price = $('p.price').text().trim();

  const description = $('p[itemprop=text]').html();

  const imagesUL = $('.ad-page-bloc-thumbnail-list');

  const MAX_IMAGES = 3;

  const user = $('p.name-contact').text().trim();

  const images = imagesUL
    .find('img')
    .slice(0, MAX_IMAGES)
    .map((_i, el) => {
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
      case type.includes('AEP'):
        return 'aep';
      case type.includes('Gaz Blowback'):
        return 'gbbr';
      case type.includes('Snipes'):
        return 'sniper';
      case type.includes('Poing'):
        return 'gbb';
      case type.includes('Vêtements'):
        return 'gear';
      case type.includes('Pompes'):
        return 'shotgun';
      case type.includes('Grenades'):
      case type.includes('Lunettes'):
      case type.includes('Divers'):
      case type.includes('Red Dot'):
      case type.includes('Garde Main'):
      case type.includes('Chargeurs'):
      case type.includes('Grenades'):
      case type.includes('Laser'):
      case type.includes('Lampe'):
      case type.includes('Rail'):
      case type.includes('Silencieux'):
      case type.includes('Poignée'):
      case type.includes('Batterie'):
        return 'other';
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
    user,
  };
}
