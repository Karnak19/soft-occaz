import { Resend } from 'resend';
import { env } from '$/env';
import { NewRatingEmailTemplate } from '$/components/emails/Template';
import NewPM from '../../transactional/emails/new-chat';
import { getClerkUserFromDb } from './getClerkUserFromDb';
import { ListingWithUser } from './db';

const resend = new Resend(env.RESEND_API_KEY);

type Args = {
  user: Awaited<ReturnType<typeof getClerkUserFromDb>>;
  listing: ListingWithUser;
};

const newRating = (rating: string, { user, listing }: Args) => {
  if (!listing.user.email) {
    return;
  }

  return resend.emails.send({
    from: 'Airsoft-Market <no-reply@mailing.airsoft-market.store>',
    to: listing.user.email,
    subject: 'Votre annonce a été notée',
    react: NewRatingEmailTemplate({
      title: listing.title,
      rating: Number(rating),
      from: { avatar: user.avatar, username: user.username },
    }),
  });
};

type NewPmArgs = {
  user: {
    username?: string;
    firstName: string;
    email: string;
  };
  from: { avatar?: string; username: string };
};

const newPrivateMessage = ({ user, from }: NewPmArgs) => {
  return resend.emails.send({
    from: 'Airsoft-Market <no-reply@mailing.airsoft-market.store>',
    to: user.email,
    subject: 'Vous avez reçu un nouveau message privé',
    react: NewPM({
      username: user.username ?? user.firstName,
      from: { avatar: from.avatar ?? undefined, username: from.username },
    }),
  });
};

export const sendEmails = { newRating, newPrivateMessage };
