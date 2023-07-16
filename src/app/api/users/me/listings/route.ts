import { prisma } from '$/utils/db';
import { currentUser } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function GET() {
  const _user = await currentUser();

  if (!_user) {
    throw new Error('Unauthorized');
  }

  const listings = await prisma.listing.findMany({
    where: { user: { clerkId: _user.id } },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(listings, {
    headers: {
      'cache-control': 'no-cache',
      'content-type': 'application/json',
    },
  });
}
