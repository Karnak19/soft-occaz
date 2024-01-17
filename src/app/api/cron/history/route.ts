import { prisma } from '$/utils/db';
import { NextResponse } from 'next/server';

export const revalidate = 0;

export async function GET() {
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
