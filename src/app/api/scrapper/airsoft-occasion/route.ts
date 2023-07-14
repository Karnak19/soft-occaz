import { load } from 'cheerio';
import { NextResponse } from 'next/server';

import { getClerkUserFromDb } from '$/utils/getClerkUserFromDb';

export async function POST(req: Request) {
  const user = await getClerkUserFromDb();

  if (!user) {
    throw new Error('Unauthorized');
  }

  if (user.sub?.toLowerCase() === 'free') {
    throw new Error('Unauthorized');
  }

  const body = await req.json();

  const listing = await fetch(body.url).then((res) => res.text());

  const $ = load(listing);

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

  const imagesCount = user.sub?.toLowerCase() === 'premium' ? 7 : user.sub?.toLowerCase() !== 'free' ? 5 : 3;

  const images = imagesUL
    .find('img')
    .slice(0, imagesCount)
    .map((i, el) => {
      return $(el).attr('src');
    })
    .get();

  return NextResponse.json({
    title,
    price,
    description,
    images,
  });
}
