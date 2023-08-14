import { EmailTemplate } from '$/components/emails/Template';
import { env } from '$/env';
import { prisma } from '$/utils/db';
import { getClerkUserFromDb } from '$/utils/getClerkUserFromDb';
import { revalidatePath } from 'next/cache';
import { Resend } from 'resend';

const resend = new Resend(env.RESEND_API_KEY);

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

    if (listing.user.email) {
      await resend.emails.send({
        from: 'Airsoft-Market <no-reply@mailing.airsoft-market.store>',
        to: listing.user.email,
        subject: 'Votre annonce a été notée',
        react: EmailTemplate({
          title: listing.title,
          rating: Number(body.rating),
          from: { avatar: _user.avatar, username: _user.username },
        }),
      });
    }

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
