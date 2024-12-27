import 'server-only';

import { env } from '$/env';
import PocketBase from 'pocketbase';

import type { TypedPocketBase } from './pocketbase-types';

export const pb = new PocketBase(env.NEXT_PUBLIC_POCKETBASE_URL) as TypedPocketBase;

export const getAdminPb = async () => {
  const pb = new PocketBase(env.NEXT_PUBLIC_POCKETBASE_URL) as TypedPocketBase;
  await pb.collection('_superusers').authWithPassword(env.POCKETBASE_ADMIN_EMAIL, env.POCKETBASE_ADMIN_PASSWORD);
  pb.autoCancellation(false);
  return pb;
};
