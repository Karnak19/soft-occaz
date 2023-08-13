import { prisma } from '$/utils/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request, context: { params: { id: string } }) {
  const { id } = context.params;

  const ratings = await prisma.rating.findMany({ where: { userId: id } });

  return NextResponse.json(ratings);
}
