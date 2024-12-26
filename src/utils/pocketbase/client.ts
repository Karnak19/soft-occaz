import PocketBase from 'pocketbase';

import type { TypedPocketBase } from './pocketbase-types';

export const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL) as TypedPocketBase;
