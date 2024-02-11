import { NextResponse } from 'next/server';

import { prisma } from '$/utils/db';
import { getClerkUserFromDb } from '$/utils/getClerkUserFromDb';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const user = await getClerkUserFromDb();

    await prisma.listing.findUniqueOrThrow({
      where: { id: params.id, userId: user.id },
    });

    const history = await prisma.history.findMany({
      where: { listingId: params.id },
      orderBy: { createdAt: 'asc' },
    });

    return NextResponse.json(history);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 401 });
  }
}
