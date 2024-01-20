'use server';

import { env } from '$/env';

export function checkSecret(secret?: string | null) {
  const isOk = secret === env.CLERK_SECRET_KEY;
  if (!isOk) {
    throw new Error('Invalid secret');
  }
}
