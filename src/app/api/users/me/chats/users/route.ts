import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs';
import { prisma } from '$/utils/db';

export async function GET() {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: 'You must be logged in to view your chats' }, { status: 401 });
  }

  const chats = await prisma.usersChat.findMany({
    where: {
      users: { some: { clerkId: user.id } },
    },
    include: { users: true },
  });

  const usersOnly = chats.map((chat) => chat.users.filter((u) => u.clerkId !== user.id)[0]);

  return NextResponse.json(usersOnly);
}
