import { NextResponse } from 'next/server';
import { load } from 'cheerio';

import { auth } from '$/utils/pocketbase/server';

export async function POST(req: Request) {
  const { isValid } = await auth();

  if (!isValid) {
    return NextResponse.json({ error: 'You need to be a premium user to use this feature.' }, { status: 403 });
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

  const MAX_IMAGES = 3;

  const images = imagesUL
    .find('img')
    .slice(0, MAX_IMAGES)
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
