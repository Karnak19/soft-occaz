import { NextResponse } from 'next/server';

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

  return NextResponse.json({ subscriptions: subs.data, products: products });
}
