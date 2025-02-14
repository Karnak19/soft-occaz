import 'server-only';
import { cookies } from 'next/headers';
import PocketBase, { AsyncAuthStore } from 'pocketbase';

import { env } from '$/env';

import type { TypedPocketBase, UsersResponse } from './pocketbase-types';

export const COOKIE_NAME = 'pb_auth';

export async function createServerClient() {
  const cookieStore = await cookies();

  const client = new PocketBase(
    env.NEXT_PUBLIC_POCKETBASE_URL,
    new AsyncAuthStore({
      save: async (serializedPayload) => {
        try {
          cookieStore.set(COOKIE_NAME, serializedPayload);
        } catch {
          // This method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
      clear: async () => {
        try {
          cookieStore.delete(COOKIE_NAME);
        } catch {
          // This method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
      initial: cookieStore.get(COOKIE_NAME)?.value,
    }),
  ) as TypedPocketBase;

  return client;
}

export async function auth() {
  const pb = await createServerClient();
  return {
    isValid: pb.authStore.isValid,
    user: pb.authStore.record as UsersResponse,
    userId: pb.authStore.record?.id,
  };
}
