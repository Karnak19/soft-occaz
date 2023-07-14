import { NextResponse } from 'next/server';

import { getClerkUserFromDb } from '$/utils/getClerkUserFromDb';
import { getStripeCustomerPortal } from '$/utils/stripe';

export async function POST() {
  const user = await getClerkUserFromDb();

  if (!user.stripeId) {
    throw new Error('Unauthorized');
  }

  const { url } = await getStripeCustomerPortal(user.stripeId);

  return NextResponse.json({ url });
}
