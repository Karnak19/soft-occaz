/* eslint-disable no-console */
/* eslint-disable no-fallthrough */
import { headers } from 'next/headers';
import Stripe from 'stripe';

import { env } from '$/env';
import { checkoutSessionCompleted, stripe } from '$/utils/stripe';

const relevantEvents = new Set([
  'checkout.session.completed',
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
    try {
      switch (event.type) {
        case 'checkout.session.completed':
          // eslint-disable-next-line no-case-declarations
          checkoutSessionCompleted(event);
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