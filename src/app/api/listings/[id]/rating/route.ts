import { prisma } from '$/utils/db';
import { sendEmails } from '$/utils/emails';
import { getClerkUserFromDb } from '$/utils/getClerkUserFromDb';
import { revalidatePath } from 'next/cache';

export const POST = async (request: Request, { params }: { params: { id: string } }) => {
  const _user = await getClerkUserFromDb();

  const body = await request.json();

  try {
    const listing = await prisma.listing.findUniqueOrThrow({
      where: { id: params.id },
      include: { rating: true, user: true },
    });

    if (listing.userId === _user.id) {
      throw new Error('Vous ne pouvez pas noter votre propre annonce');
    }

    if (listing.rating) {
      throw new Error('Cette annonce a déjà été notée');
    }

    await prisma.listing.update({
      where: { id: listing.id },
      data: {
        sold: true,
        rating: {
          create: { userId: listing.userId, rating: body.rating, text: body.text, fromId: _user.id },
        },
      },
    });

    await sendEmails.newRating(body.rating, { user: _user, listing });

    revalidatePath(`/annonces/details/${params.id}`);

    return new Response(JSON.stringify({ created: true }), {
      status: 201,
    });
  } catch (error) {
    return new Response(JSON.stringify({ created: false, error: (error as Error).message }), {
      status: 403,
      headers: {
        'content-type': 'application/json',
      },
    });
  }
};
