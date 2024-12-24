import React from 'react';
import { currentUser } from '@clerk/nextjs';

import { prisma } from '$/utils/db';
import DashboardChart from '$/components/charts/DashboardChart';

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

  const chartData = Object.entries(viewsPerDay).map(([date, seenCount]) => ({
    date,
    seenCount,
  }));

  return <DashboardChart data={chartData} />;
}

export default Charts;
