import type { Type } from '@prisma/client';
import { NextResponse } from 'next/server';

import { env } from '$/env';
import { prisma } from '$/utils/db';
import { getClerkUserFromDb } from '$/utils/getClerkUserFromDb';
import { listingCreationCheck } from '$/utils/listingCreationCheck';

export const revalidate = 60;

export const runtime = env.VERCEL_ENV === 'production' ? 'edge' : 'nodejs';

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

export async function POST(req: Request) {
  const _user = await getClerkUserFromDb();

  listingCreationCheck(_user);

  const isPayingUser = ['hobby', 'premium', 'geardo'].includes(_user.sub?.toLowerCase() ?? '');

  const isPremium = ['premium'].includes(_user.sub?.toLowerCase() ?? '');

  const body = await req.json();

  const created = await prisma.listing.create({
    data: {
      userId: _user.id,
      price: body.price,
      title: body.title,
      description: body.description,
      images: [
        body.mainImage,
        ...(body.imageTwo ? [body.imageTwo] : []),
        ...(body.imageThree ? [body.imageThree] : []),
        ...(body.imageFour && isPayingUser ? [body.imageFour] : []),
        ...(body.imageFive && isPayingUser ? [body.imageFive] : []),
        ...(body.imageSix && isPremium ? [body.imageSix] : []),
        ...(body.imageSeven && isPremium ? [body.imageSeven] : []),
      ],
      type: body.type as Type,
      sold: false,
    },
  });

  return NextResponse.json({
    created: true,
    listing: created,
    redirect: `/annonces/details/${created.id}`,
  });
}
