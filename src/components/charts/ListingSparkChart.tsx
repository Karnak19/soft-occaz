'use client';

import { Bar, BarChart, ResponsiveContainer } from 'recharts';

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
        <BarChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
          <Bar dataKey="value" fill="hsl(var(--primary))" radius={2} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
