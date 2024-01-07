import { type User } from '@prisma/client';
import Script from 'next/script';

import { env } from '$/env';

declare global {
  // eslint-disable-next-line unused-imports/no-unused-vars
  namespace JSX {
    // eslint-disable-next-line unused-imports/no-unused-vars
    interface IntrinsicElements {
      'stripe-pricing-table': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

function PricingTable(user: User) {
  return (
    <>
      <Script async src="https://js.stripe.com/v3/pricing-table.js"></Script>
      <stripe-pricing-table
        pricing-table-id={env.NEXT_PUBLIC_PRICING_TABLE_ID}
        publishable-key={env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
        client-reference-id={user.stripeId}
        customer-email={user.email}
      ></stripe-pricing-table>
    </>
  );
}

export default PricingTable;
