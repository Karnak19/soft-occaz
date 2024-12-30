import { createServerActionProcedure, ZSAError } from 'zsa';

import { auth, createServerClient } from './pocketbase/server';

export const authedProcedure = createServerActionProcedure().handler(async () => {
  const { isValid, user } = await auth();
  const pb = await createServerClient();

  if (!isValid) {
    throw new ZSAError('NOT_AUTHORIZED', "Vous n'êtes pas autorisé à faire cette action");
  }

  return { pb, user };
});
