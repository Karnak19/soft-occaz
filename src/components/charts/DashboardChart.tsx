'use client';

import { useQuery } from '@tanstack/react-query';
import { differenceInDays, format } from 'date-fns';
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
    queryFn: () =>
      pb.collection('users_seen_listings').getFullList({
        filter: `listing.user = "${user?.id}"`,
        sort: 'created',
      }),
    enabled: !!user,
    select: (data) => {
      const dates = data.map((item) => new Date(item.created));
      const minDate = new Date(Math.min(...dates.map((d) => d.getTime())));
      const maxDate = new Date(Math.max(...dates.map((d) => d.getTime())));
      const daysDiff = Math.ceil(differenceInDays(maxDate, minDate));

      let formatString;
      switch (true) {
        case daysDiff > 30 * 12: // More than 12 months
          formatString = 'LLL y';
          break;
        case daysDiff > 30: // More than 30 days
          formatString = 'wo/y';
          break;
        default:
          formatString = 'dd/MM';
      }

      const groupedByDate = Object.groupBy(data, (item) => {
        return format(new Date(item.created), formatString);
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
            <XAxis dataKey="date" tickLine={false} tickMargin={10} axisLine={false} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="value" fill="hsl(var(--primary))" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
