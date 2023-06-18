import { auth } from '@clerk/nextjs';
import type { Type } from '@prisma/client';
import { NextResponse } from 'next/server';

import { db } from '$/utils/db';

export const revalidate = 60;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const author = searchParams.get('author');

  const listings = await db.listing.findMany({
    where: {
      ...(author ? { author } : {}),
    },
  });

  return NextResponse.json(listings);
}

export async function POST(req: Request) {
  const { userId } = auth();
  if (!userId) {
    throw new Error('Unauthorized');
  }

  const body = await req.json();

  const created = await db.listing.create({
    data: {
      author: userId,
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
    redirect: `/annonces/${created.id}`,
  });
}
