import { NextResponse } from 'next/server';

import { auth } from '$/utils/pocketbase/server';
import { scrapAirsoftOccasionListing } from '$/utils/airsoft-occasion/scrap-listing';

export async function POST(req: Request) {
  const { isValid } = await auth();

  if (!isValid) {
    return NextResponse.json({ error: 'You need to be a premium user to use this feature.' }, { status: 403 });
  }

  const body = await req.json();

  const listing = await scrapAirsoftOccasionListing(body.url);

  return NextResponse.json(listing);
}
