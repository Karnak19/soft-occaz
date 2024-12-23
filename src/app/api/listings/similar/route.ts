import { NextResponse } from 'next/server';
import { Type } from '@prisma/client';

import { prisma } from '$/utils/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') as Type;
  const excludeId = searchParams.get('exclude');

  if (!type || !excludeId) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
  }

  const similarListings = await prisma.listing.findMany({
    where: {
      type,
      id: { not: excludeId },
      sold: false,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 4,
  });

  return NextResponse.json(similarListings);
}
