import { env } from '$/env';
import PocketBase from 'pocketbase';

import { TypedPocketBase } from './pocketbase-types';

export const pocketbase = new PocketBase(env.NEXT_PUBLIC_POCKETBASE_URL) as TypedPocketBase;

export function createBrowserClient() {
  const client = new PocketBase(env.NEXT_PUBLIC_POCKETBASE_URL) as TypedPocketBase;

  if (typeof document !== 'undefined') {
    client.authStore.loadFromCookie(document.cookie);
    client.authStore.onChange(() => {
      document.cookie = client.authStore.exportToCookie({
        httpOnly: false,
        maxAge: 60 * 60 * 24 * 30,
      });
    });
  }

  return client;
}
