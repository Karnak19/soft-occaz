import { env } from '$/env';
import { Resend } from 'resend';

import CreateRating from '../../emails/create-rating';
import NewPM from '../../emails/new-chat';
import ReceivedRating from '../../emails/received-rating';
import type { UsersResponse } from './pocketbase/pocketbase-types';

type NewPmArgs = {
  user: {
    username?: string;
    firstName: string;
    email: string;
  };
  from?: { avatar?: string; username: string };
};

type ReceivedRatingArgs = {
  user: {
    email: string;
    username?: string;
    name?: string;
  };
  rating: number;
  comment: string;
  from: {
    avatar?: string;
    username: string;
  };
};

type NewRatingArgs = {
  user: UsersResponse;
  from: UsersResponse;
  ratingSessionId: string;
};
class EmailService {
  private resend: Resend;
  private readonly sender = 'Airsoft-Market <no-reply@mailing.airsoft-market.store>';

  constructor() {
    this.resend = new Resend(env.RESEND_API_KEY);
  }

  private shouldSendEmail(): boolean {
    if (env.VERCEL_ENV !== 'production') {
      console.log('Skipping email send - not in production environment');
      return false;
    }
    return true;
  }

  async newPrivateMessage({ user, from }: NewPmArgs) {
    if (!this.shouldSendEmail()) {
      console.log('Would have sent new PM email to:', user.email);
      return;
    }

    return this.resend.emails.send({
      from: this.sender,
      to: user.email,
      subject: 'Vous avez reçu un nouveau message privé',
      react: <NewPM username={user.username ?? user.firstName} from={from} />,
    });
  }

  async receivedRating({ user, rating, comment, from }: ReceivedRatingArgs) {
    if (!this.shouldSendEmail()) {
      console.log('Would have sent rating received email to:', user.email);
      return;
    }

    return this.resend.emails.send({
      from: this.sender,
      to: user.email,
      subject: 'Vous avez reçu une nouvelle note',
      react: <ReceivedRating username={user.name ?? user.username ?? ''} rating={rating} comment={comment} from={from} />,
    });
  }

  async createRating({ user, from, ratingSessionId }: NewRatingArgs) {
    if (!this.shouldSendEmail()) {
      console.log('Would have sent create rating email to:', user.email);
      return;
    }

    if (!user.email) {
      return;
    }

    return this.resend.emails.send({
      from: this.sender,
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
  }
}

export const sendEmails = new EmailService();
