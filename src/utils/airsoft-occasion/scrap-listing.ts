import { env } from '$/env';
import { ResizeIt } from '@karnak19/resize-it-sdk';
import { load } from 'cheerio';

const resizeIt = new ResizeIt({
  baseUrl: 'https://resize-it.airsoftmarket.fr',
  apiKey: env.RESIZE_IT_API_KEY,
});

export async function scrapAirsoftOccasionListing(url: string) {
  const html = await fetch(url).then((res) => res.text());

  const $ = load(html);

  const title = $('h1[itemprop=name]').text().trim();

  const price = $('.ad-page-bloc-infos .price .value').text().trim();

  const description = $('p[itemprop=text]').html();

  const imagesUL = $('.ad-page-bloc-thumbnail-list');

  const MAX_IMAGES = 3;

  const user = $('p.name-contact')
    .text()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  const rawImages = imagesUL
    .find('li img')
    .slice(0, MAX_IMAGES)
    .map((_i, el) => {
      const thumbSrc = $(el).attr('src');
      if (!thumbSrc) return null;

      return thumbSrc.replace('/upload/thumbnails', '/upload/photos').replace('_thumb.webp', '.webp');
    })
    .get()
    .filter(Boolean);

  // Process images through resize-it
  const images = await Promise.all(
    rawImages.map(async (imageUrl) => {
      try {
        const response = await fetch(imageUrl);
        const buffer = Buffer.from(await response.arrayBuffer());
        const resizedImage = await resizeIt.uploadImage(buffer, {
          path: `${user}/${new Date().getTime()}-${imageUrl.split('.').pop()}`,
          contentType: 'image/webp',
        });
        return resizedImage.url;
      } catch (error) {
        console.error('Failed to process image:', error);
        return imageUrl; // Fallback to original URL if processing fails
      }
    }),
  );

  const type = $('.ad-page-bloc-title ul li:last-child a').text().trim();

  const goodType = (() => {
    switch (true) {
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
      default:
        return 'unknown';
    }
  })();

  const numericPrice = price ? Number(price.replace(/[^\d,]/g, '').replace(',', '.')) || 1 : 1;

  return {
    title,
    price: numericPrice,
    description,
    images,
    type: goodType,
    user,
  };
}
