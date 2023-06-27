import { auth } from '@clerk/nextjs';
import type { Type } from '@prisma/client';
import { NextResponse } from 'next/server';

import { prisma } from '$/utils/db';

export const revalidate = 60;

export const runtime = process.env.VERCEL_ENV === 'production' ? 'edge' : 'nodejs';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const author = searchParams.get('author');
  const limit = searchParams.get('limit');

  const listings = await prisma.listing.findMany({
    where: {
      ...(author ? { userId: author } : {}),
    },
    orderBy: { createdAt: 'desc' },
    take: limit ? parseInt(limit) : undefined,
  });

  return NextResponse.json(listings);
}

export async function POST(req: Request) {
  const { userId } = auth();
  if (!userId) {
    throw new Error('Unauthorized');
  }

  const body = await req.json();

  const user = await prisma.user.findUniqueOrThrow({ where: { id: userId } });

  const created = await prisma.listing.create({
    data: {
      userId: user.id,
      price: body.price,
      title: body.title,
      description: body.description,
      images: [body.mainImage, ...(body.imageTwo ? [body.imageTwo] : []), ...(body.imageThree ? [body.imageThree] : [])],
      type: body.type as Type,
      delivery: true,
    },
  });

  return NextResponse.json({
    created: true,
    listing: created,
    redirect: `/annonces/details/${created.id}`,
  });
}
