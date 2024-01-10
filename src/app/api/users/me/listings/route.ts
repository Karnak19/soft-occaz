import { getMyListings } from '$/utils/getMyListings';
import { NextResponse } from 'next/server';

export async function GET() {
  const listings = await getMyListings();

  return NextResponse.json(listings, {
    headers: {
      'cache-control': 'no-cache',
      'content-type': 'application/json',
    },
  });
}
