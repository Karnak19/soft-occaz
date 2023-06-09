import { currentUser } from '@clerk/nextjs';
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
      ...(author
        ? {
            OR: [{ user: { clerkId: { contains: author } } }, { userId: { contains: author } }],
          }
        : {}),
    },
    orderBy: { createdAt: 'desc' },
    take: limit ? parseInt(limit) : undefined,
  });

  return NextResponse.json(listings);
}

export async function POST(req: Request) {
  const user = await currentUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  const body = await req.json();

  let _user = await prisma.user.findUnique({ where: { clerkId: user.id } });

  if (!_user) {
    _user = await prisma.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        firstName: user.firstName ?? '',
        lastName: user.lastName ?? '',
        username: user.username ?? '',
        avatar: user.profileImageUrl ?? '',
      },
    });
  }

  const created = await prisma.listing.create({
    data: {
      userId: _user.id,
      price: body.price,
      title: body.title,
      description: body.description,
      images: [body.mainImage, ...(body.imageTwo ? [body.imageTwo] : []), ...(body.imageThree ? [body.imageThree] : [])],
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
