import { NextResponse } from 'next/server';

import { prisma } from '$/utils/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const listingId = searchParams.get('listingId');

  if (!listingId) {
    return NextResponse.json({ error: 'Missing listingId parameter' }, { status: 400 });
  }

  const count = await prisma.report.count({
    where: {
      listingId,
    },
  });

  return NextResponse.json({ count });
}
