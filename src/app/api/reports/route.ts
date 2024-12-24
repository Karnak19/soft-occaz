import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import { prisma } from '$/utils/db';

export async function POST(request: Request) {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { listingId, reason } = await request.json();

  if (!listingId || !reason) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const report = await prisma.report.create({
    data: {
      reason,
      user: { connect: { id: user.id } },
      listing: { connect: { id: listingId } },
    },
  });

  return NextResponse.json({ success: true, report });
}
