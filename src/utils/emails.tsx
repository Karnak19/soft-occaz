import { env } from '$/env';
import { Resend } from 'resend';

import { NewRatingEmailTemplate } from '$/components/emails/Template';

import CreateRating from '../../emails/create-rating';
import NewPM from '../../emails/new-chat';
import { ListingsResponse, UsersResponse } from './pocketbase/pocketbase-types';

const resend = new Resend(env.RESEND_API_KEY);

type Args = {
  user: UsersResponse;
  listing: ListingsResponse<string[], { user: UsersResponse }>;
};

const newRating = (rating: string, { user, listing }: Args) => {
  if (env.VERCEL_ENV !== 'production') {
    return;
  }

  if (!listing.expand?.user?.email) {
    return;
  }

  return resend.emails.send({
    from: 'Airsoft-Market <no-reply@mailing.airsoft-market.store>',
    to: listing.expand?.user?.email,
    subject: 'Votre annonce a été notée',
    react: (
      <NewRatingEmailTemplate
        title={listing.title}
        rating={Number(rating)}
        from={{ avatar: user.avatar, username: user.username }}
      />
    ),
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
    react: <NewPM username={user.username ?? user.firstName} from={from} />,
  });
};

type NewRatingArgs = { user: UsersResponse; from: UsersResponse; ratingSessionId: string };

const createRating = ({ user, from, ratingSessionId }: NewRatingArgs) => {
  if (env.VERCEL_ENV !== 'production') {
    console.log('Send email skipped: ', {
      from: 'Airsoft-Market <no-reply@mailing.airsoft-market.store>',
      to: user.email,
      subject: 'Nouvelle évaluation à donner',
      emailRecipient: user.email,
      userToEvaluate: from,
    });

    return;
  }

  if (!user.email) {
    return;
  }

  return resend.emails.send({
    from: 'Airsoft-Market <no-reply@mailing.airsoft-market.store>',
    to: user.email,
    subject: 'Nouvelle évaluation à donner',
    react: (
      <CreateRating
        ratingSessionId={ratingSessionId}
        username={user.name ?? user.username}
        avatar={user.avatar}
        from={{
          avatar: from?.avatar,
          username: from?.username ?? 'Anonyme',
        }}
      />
    ),
  });
};

export const sendEmails = { newRating, newPrivateMessage, createRating };
