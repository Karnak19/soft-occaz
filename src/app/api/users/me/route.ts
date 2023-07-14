import { NextResponse } from 'next/server';

import { getClerkUserFromDb } from '$/utils/getClerkUserFromDb';
import { getStripeCustomerSubscriptions, getStripeProduct } from '$/utils/stripe';

export async function GET() {
  const user = await getClerkUserFromDb();

  if (!user.stripeId) {
    return NextResponse.json(
      { ...user, subscriptions: [], products: [] },
      {
        headers: {
          'cache-control': 'private, max-age=120',
          'content-type': 'application/json',
        },
      },
    );
  }

  const subs = await getStripeCustomerSubscriptions(user.stripeId);

  const products = await Promise.all(
    subs.data.flatMap((s) => s.items.data.map((i) => getStripeProduct(i.plan.product as string))),
  );

  return NextResponse.json(
    { ...user, subscriptions: subs.data, products: products },
    {
      headers: {
        'cache-control': 'private, max-age=120',
        'content-type': 'application/json',
      },
    },
  );
}
