import { NewRatingEmailTemplate } from '$/components/emails/Template';
import { env } from '$/env';
import { Resend } from 'resend';

import NewPM from '../../transactional/emails/new-chat';
import { ListingWithUser } from './db';
import { getClerkUserFromDb } from './getClerkUserFromDb';

const resend = new Resend(env.RESEND_API_KEY);

type Args = {
  user: Awaited<ReturnType<typeof getClerkUserFromDb>>;
  listing: ListingWithUser;
};

const newRating = (rating: string, { user, listing }: Args) => {
  if (env.VERCEL_ENV !== 'production') {
    return;
  }

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
  from?: { avatar?: string; username: string };
};

const newPrivateMessage = ({ user, from }: NewPmArgs) => {
  if (env.VERCEL_ENV !== 'production') {
    return;
  }

  return resend.emails.send({
    from: 'Airsoft-Market <no-reply@mailing.airsoft-market.store>',
    to: user.email,
    subject: 'Vous avez reçu un nouveau message privé',
    react: NewPM({ username: user.username ?? user.firstName, from }),
  });
};

export const sendEmails = { newRating, newPrivateMessage };
