'use client';

import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import { usePocketbase, useUser } from '$/app/pocketbase-provider';

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';
import { Skeleton } from '../ui/skeleton';

export function DashboardChart() {
  const { pb } = usePocketbase();
  const user = useUser();
  const { data, isLoading } = useQuery({
    queryKey: ['dashboard-chart', user?.id],
    queryFn: () => pb.collection('users_seen_listings').getFullList(),
    enabled: !!user,
    select: (data) => {
      const groupedByDate = Object.groupBy(data, (item) => {
        // day-month
        return format(new Date(item.created), 'dd-MM');
      });

      return Object.entries(groupedByDate).map(([date, items]) => ({
        date,
        value: items?.length ?? 0,
      }));
    },
  });

  if (isLoading) {
    return <Skeleton className="size-full rounded-xl border border-border bg-card" />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vues</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          className="min-h-[200px]"
          config={{
            value: {
              label: 'Vues',
            },
          }}
        >
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="value" fill="hsl(var(--primary))" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
