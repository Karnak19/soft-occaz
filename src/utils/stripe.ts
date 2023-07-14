import { SubScription } from '@prisma/client';
import Stripe from 'stripe';

import { env } from '$/env';

import { prisma } from './db';
import { getURL } from './getURL';

export const stripe = new Stripe(env.STRIPE_SECRET_KEY ?? '', {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: '2022-11-15',
  // Register this as an official Stripe plugin.
  // https://stripe.com/docs/building-plugins#setappinfo
  appInfo: {
    name: 'airsoft-market.store/next-api',
    version: '0.0.0',
  },
});

export const getStripeCustomer = async (customerId: string) => {
  return stripe.customers.retrieve(customerId);
};

export const getStripeCustomerSubscriptions = async (customerId: string) => {
  return stripe.subscriptions.list({ customer: customerId, status: 'active' });
};

export const getStripeCustomerPortal = async (customerId: string) => {
  return stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${getURL()}/dashboard`,
  });
};

export const getStripeProduct = async (productId: string) => {
  return stripe.products.retrieve(productId);
};

export const checkoutSessionCompleted = async (event: Stripe.Event) => {
  const { customer_email, customer, id } = event.data.object as Stripe.Checkout.Session;
  const sessionWithLineItems = await stripe.checkout.sessions.retrieve(id, {
    expand: ['line_items'],
  });
  const lineItems = sessionWithLineItems.line_items;

  await prisma.user.update({
    where: { email: customer_email ?? undefined },
    data: { stripeId: customer as string, sub: (lineItems?.data[0].description.toUpperCase() as SubScription) ?? 'FREE' },
  });
};
