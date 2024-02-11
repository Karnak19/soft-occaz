import React from 'react';
import { currentUser } from '@clerk/nextjs';
import { AreaChart, Card } from '@tremor/react';

import { prisma } from '$/utils/db';

async function Charts() {
  const user = await currentUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  const data = await prisma.history.findMany({
    where: {
      listing: {
        user: { clerkId: user.id },
      },
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  const viewsPerDay = data.reduce(
    (acc, curr) => {
      const date = new Date(curr.createdAt).toLocaleDateString();

      if (acc[date]) {
        acc[date] += curr.seenCount;
      } else {
        acc[date] = 0 + curr.seenCount;
      }

      return acc;
    },
    {} as Record<string, number>,
  );

  return (
    <Card>
      <AreaChart
        data={Object.entries(viewsPerDay).map(([date, seenCount]) => ({
          date,
          seenCount,
        }))}
        index="date"
        categories={['seenCount']}
        className="h-96"
        color="primary"
        // x="date"
        // y="seenCount"
        // margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      />
    </Card>
  );
}

export default Charts;
