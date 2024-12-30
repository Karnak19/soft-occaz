'use client';

import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';

type ChartData = {
  date: string;
  value: number;
}[];

export default function OwnerAreaChart({ data }: { data?: ChartData }) {
  if (!data) return null;

  return (
    <ChartContainer
      className="mt-4 h-72 w-full"
      config={{
        value: {
          label: 'Clics',
        },
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 8,
            right: 28,
            bottom: 8,
          }}
        >
          <XAxis dataKey="date" fontSize={12} tickMargin={8} stroke="hsl(var(--muted-foreground))" tickLine={false} />
          <YAxis fontSize={12} tickMargin={8} stroke="hsl(var(--muted-foreground))" tickLine={false} />
          <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.2} />
          <ChartTooltip content={<ChartTooltipContent />} />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
