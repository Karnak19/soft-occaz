import PocketBase from 'pocketbase';

import 'server-only';

import { env } from '$/env';

import { TypedPocketBase } from './pocketbase-types';

export async function createStaticClient() {
  const pb = new PocketBase(env.NEXT_PUBLIC_POCKETBASE_URL) as TypedPocketBase;

  await pb.collection('_superusers').authWithPassword(env.POCKETBASE_ADMIN_EMAIL, env.POCKETBASE_ADMIN_PASSWORD);

  return pb;
}
