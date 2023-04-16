import { Type } from '@prisma/client';
import { z } from 'zod';

import { pb } from '$/utils/pocketbase';
import { AnnoncesResponse, Collections, UsersResponse } from '$/utils/pocketbase-types';

import { authedProcedure, createTRPCRouter, publicProcedure } from '../trpc';

export const listingRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => ctx.prisma.listing.findMany()),

  legacyGetAll: publicProcedure.query(() =>
    pb.collection(Collections.Annonces).getList<AnnoncesResponse<{ user: UsersResponse }>>(1, 4, {
      sort: '-created',
      expand: 'user',
    }),
  ),

  getOne: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(({ ctx, input }) => ctx.prisma.listing.findUnique({ where: { id: input.id } })),

  search: publicProcedure.input(z.object({ query: z.string() })).query(({ ctx, input }) => {
    const type = findType(input.query);

    return ctx.prisma.listing.findMany({
      where: {
        OR: [{ title: { contains: input.query } }, { description: { contains: input.query } }],
        type: type ? { equals: type } : undefined,
      },
    });
  }),

  create: authedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        price: z.number(),
        images: z.array(z.string()),
        type: z.nativeEnum(Type),
        // type: z.enum(Object.keys(Type)),
      }),
    )
    .mutation(({ ctx, input }) => {
      const { userId } = ctx.auth;

      return ctx.prisma.listing.create({
        data: {
          title: input.title,
          description: input.description,
          price: input.price,
          images: input.images,
          type: input.type,
          userId,
        },
      });
    }),
});

function findType(query: string) {
  const types = Object.values(Type);

  for (const type of types) {
    if (query.includes(type)) {
      return type;
    }
  }
}
