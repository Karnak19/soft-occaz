import { NextResponse } from 'next/server';

import { prisma } from '$/utils/db';

export const revalidate = 60;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const author = searchParams.get('author');
  const limit = searchParams.get('limit');

  const listings = await prisma.listing.findMany({
    where: {
      ...(author
        ? {
            OR: [{ user: { clerkId: { contains: author } } }, { userId: { contains: author } }],
          }
        : {}),
    },
    orderBy: { createdAt: 'desc' },
    take: limit ? parseInt(limit) : undefined,
  });

  return NextResponse.json(listings, {
    headers: {
      'cache-control': 'public, max-age=300',
      'content-type': 'application/json',
    },
  });
}
