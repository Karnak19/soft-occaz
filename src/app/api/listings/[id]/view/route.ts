import { prisma } from '$/utils/db';
export async function POST(_req: Request, { params }: { params: { id: string } }) {
  // increment this listing's view count

  await prisma.listing.update({
    where: { id: params.id },
    data: { seenCount: { increment: 1 } },
  });

  return new Response(null, { status: 204 });
}
