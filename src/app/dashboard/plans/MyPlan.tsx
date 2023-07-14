import { User } from '@prisma/client';

import { useSubscriptions } from '$/hooks/useSubscriptions';

function MyPlan(user: User) {
  const { data, isLoading } = useSubscriptions();

  if (!user.stripeId) {
    return null;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // const productsIds = z.array(z.string()).parse(subs.data.flatMap((sub) => sub.items.data.map((item) => item.plan.product)));

  // const products = await Promise.all(productsIds.map((productId) => getStripeProduct(productId)));

  return (
    <div className="bg-white rounded shadow p-4">
      <pre>{JSON.stringify(data?.products, null, 2)}</pre>
    </div>
  );
}

export default MyPlan;
