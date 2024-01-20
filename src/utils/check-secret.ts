import { env } from '$/env';

export function checkSecret(secret?: string | null) {
  const isOk = secret === env.WEBHOOK_SECRET;
  if (!isOk) {
    throw new Error('Invalid secret');
  }
}
