'use client';

import { Area, AreaChart, ResponsiveContainer } from 'recharts';

import { ChartContainer } from '../ui/chart';

type ChartData = {
  date: string;
  value: number;
}[];

export default function ListingSparkChart({ data }: { data: ChartData }) {
  return (
    <ChartContainer
      className="h-10 w-20"
      config={{
        value: {
          label: 'Vues',
        },
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
          <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.2} />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
