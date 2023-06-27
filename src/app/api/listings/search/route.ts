import { Type } from '@prisma/client';
import { NextResponse } from 'next/server';

import { prisma } from '$/utils/db';

export const runtime = process.env.VERCEL_ENV === 'production' ? 'edge' : 'nodejs';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = url.searchParams.get('q');

  if (!q) {
    return NextResponse.json([]);
  }

  const words = q.split(' ');

  const typesArray = Object.values(Type);

  const types = words
    .filter((word) => typesArray.map((type) => type.toLowerCase()).includes(word.toLowerCase()))
    .map((word) => {
      return Object.entries(Type).find(([_key, value]) => value.toLowerCase() === word.toLowerCase())?.[0];
    });

  const wordsWithoutTypes = words.filter((word) => !typesArray.map((type) => type.toLowerCase()).includes(word.toLowerCase()));

  const listings = await prisma.listing.findMany({
    where: {
      ...(wordsWithoutTypes.length > 0
        ? {
            OR: [
              ...wordsWithoutTypes.map((word) => {
                return { title: { contains: word, mode: 'insensitive' } } as const;
              }),
              ...wordsWithoutTypes.map((word) => {
                return { description: { contains: word, mode: 'insensitive' } } as const;
              }),
            ],
          }
        : {}),
      ...(types.length > 0 ? { AND: types.map((type) => ({ type: { equals: type as Type } })) } : {}),
    },
  });

  return NextResponse.json(listings);
}
