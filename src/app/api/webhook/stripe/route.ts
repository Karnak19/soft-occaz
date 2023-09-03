/* eslint-disable no-console */
import { headers } from 'next/headers';
import Stripe from 'stripe';

import { env } from '$/env';
import { customerSubscriptionCreated, customerSubscriptionDeleted, customerSubscriptionUpdated, stripe } from '$/utils/stripe';

const relevantEvents = new Set([
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted',
]);

export async function POST(req: Request) {
  const body = await req.text();
  const sig = headers().get('Stripe-Signature') as string;
  const webhookSecret = env.STRIPE_WEBHOOK_SECRET;
  let event: Stripe.Event;

  try {
    if (!sig || !webhookSecret) return;

    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    console.log(`❌ Error message: ${err.message}`);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (relevantEvents.has(event.type)) {
    console.log(`🔔  Received event: ${event.type}`);

    try {
      switch (event.type) {
        case 'customer.subscription.created':
          await customerSubscriptionCreated(event);
          break;

        case 'customer.subscription.updated':
          await customerSubscriptionUpdated(event);
          break;

        case 'customer.subscription.deleted':
          await customerSubscriptionDeleted(event);
          break;

        default:
          throw new Error(`Unhandled relevant event! ${event.type}`);
      }
    } catch (error) {
      console.log(error);
      return new Response('Webhook handler failed. View your nextjs function logs.', {
        status: 400,
      });
    }
  }
  return new Response(JSON.stringify({ received: true }));
}
