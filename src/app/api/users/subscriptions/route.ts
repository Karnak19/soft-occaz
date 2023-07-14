import { SubScription } from '@prisma/client';
import { NextResponse } from 'next/server';

import { prisma } from '$/utils/db';
import { getClerkUserFromDb } from '$/utils/getClerkUserFromDb';
import { getStripeCustomerSubscriptions, getStripeProduct } from '$/utils/stripe';

export async function GET() {
  const user = await getClerkUserFromDb();

  if (!user.stripeId) {
    return NextResponse.json([]);
  }

  const subs = await getStripeCustomerSubscriptions(user.stripeId);

  const products = await Promise.all(
    subs.data.flatMap((s) => s.items.data.map((i) => getStripeProduct(i.plan.product as string))),
  );

  if (user.sub?.toLowerCase() !== products[0].name.toLowerCase()) {
    await prisma.user.update({
      where: { stripeId: user.stripeId },
      data: { sub: products[0].name.toUpperCase() as SubScription },
    });
  }

  return NextResponse.json({ subscriptions: subs.data, products: products });
}
