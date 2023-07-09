import { auth } from '@clerk/nextjs';
import { load } from 'cheerio';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { userId } = auth();
  if (!userId) {
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

  const images = imagesUL
    .find('img')
    .slice(0, 3)
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
