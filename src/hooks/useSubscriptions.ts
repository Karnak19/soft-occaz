import { useQuery } from '@tanstack/react-query';
import type Stripe from 'stripe';

export function useSubscriptions() {
  return useQuery(['subscriptions'], async () => {
    const response = await fetch('/api/users/subscriptions');
    return response.json() as Promise<{ subscriptions: Stripe.Subscription[]; products: Stripe.Product[] }>;
  });
}
