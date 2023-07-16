'use client';

import React from 'react';

import { useMe } from '$/hooks/useMe';

import MyPlan from './MyPlan';
import PricingTable from './PricingTable';

function Page() {
  const { data: user, isLoading } = useMe();

  if (!user || isLoading) {
    return <div>Loading...</div>;
  }

  if (!user.stripeId) {
    return <PricingTable {...user} />;
  }

  return <MyPlan {...user} />;
}

export default Page;
