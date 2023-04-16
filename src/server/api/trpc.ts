import { getAuth } from '@clerk/nextjs/server';
import { initTRPC, TRPCError } from '@trpc/server';
import { type CreateNextContextOptions } from '@trpc/server/adapters/next';
import superjson from 'superjson';
import { ZodError } from 'zod';

import { prisma } from '$/server/db';

export const createTRPCContext = (opts: CreateNextContextOptions) => {
  return {
    auth: getAuth(opts.req),
    prisma,
  };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

const isAuthedMiddleware = t.middleware(({ next, ctx }) => {
  if (!ctx.auth.userId) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  return next({ ctx: { auth: ctx.auth } });
});

export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure;
export const authedProcedure = t.procedure.use(isAuthedMiddleware);
