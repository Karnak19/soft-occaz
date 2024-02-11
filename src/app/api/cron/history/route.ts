import { NextResponse } from 'next/server';

import { checkSecret } from '$/utils/check-secret';
import { prisma } from '$/utils/db';

export const revalidate = 0;

export async function GET(request: Request) {
  try {
    const secret = new URL(request.url).searchParams.get('secret');
    checkSecret(secret);
  } catch (error) {
    return new Response('Unauthorized', { status: 401 });
  }

  const listings = await prisma.listing.findMany({
    where: { sold: false },
  });

  await prisma.history.createMany({
    data: listings.map((listing) => ({
      listingId: listing.id,
      seenCount: listing.seenCount,
    })),
    skipDuplicates: true,
  });

  return NextResponse.json({ ok: true });
}
