import { env } from '$/env';
import Stripe from 'stripe';

import { getURL } from './getURL';

export const stripe = new Stripe(env.STRIPE_SECRET_KEY ?? '', {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: '2025-02-24.acacia',
  // Register this as an official Stripe plugin.
  // https://stripe.com/docs/building-plugins#setappinfo
  appInfo: {
    name: 'airsoft-market.store/next-api',
    version: '0.0.0',
  },
  typescript: true,
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

  // await prisma.user.update({
  //   where: { email: customer_email ?? undefined },
  //   data: { stripeId: customer as string, sub: (lineItems?.data[0].description.toUpperCase() as SubScription) ?? 'FREE' },
  // });
};

export const customerSubscriptionCreated = async (event: Stripe.Event) => {
  const { customer, id } = event.data.object as Stripe.Subscription;
  const subscription = await stripe.subscriptions.retrieve(id);

  const [product, _customer] = await Promise.all([
    stripe.products.retrieve(subscription.items.data[0].plan.product as string),
    getStripeCustomer(subscription.customer as string),
  ]);

  if (_customer.deleted) {
    throw new Error('Customer deleted');
  }

  // await prisma.user.update({
  //   where: { email: _customer.email ?? undefined },
  //   data: { stripeId: customer as string, sub: (product.name.toUpperCase() as SubScription) ?? 'FREE' },
  // });
};

export const customerSubscriptionUpdated = async (event: Stripe.Event) => {
  const { customer, id } = event.data.object as Stripe.Subscription;
  const subscription = await stripe.subscriptions.retrieve(id);

  const [product, _customer] = await Promise.all([
    stripe.products.retrieve(subscription.items.data[0].plan.product as string),
    getStripeCustomer(subscription.customer as string),
  ]);

  if (_customer.deleted) {
    throw new Error('Customer deleted');
  }

  // await prisma.user.update({
  //   where: { email: _customer.email ?? undefined },
  //   data: { stripeId: customer as string, sub: (product.name.toUpperCase() as SubScription) ?? 'FREE' },
  // });
};

export const customerSubscriptionDeleted = async (event: Stripe.Event) => {
  const { customer } = event.data.object as Stripe.Subscription;
  const _customer = await getStripeCustomer(customer as string);

  if (_customer.deleted) {
    throw new Error('Customer deleted');
  }

  // await prisma.user.update({
  //   where: { email: _customer.email ?? undefined },
  //   data: { stripeId: undefined, sub: 'FREE' },
  // });
};
