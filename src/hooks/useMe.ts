import { User } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import type Stripe from 'stripe';

type UserWithSubscriptions = User & {
  subscriptions: Stripe.Subscription[];
  products: Stripe.Product[];
};

export function useMe() {
  return useQuery(['me'], async () => {
    const response = await fetch('/api/users/me');
    return response.json() as Promise<UserWithSubscriptions>;
  });
}
