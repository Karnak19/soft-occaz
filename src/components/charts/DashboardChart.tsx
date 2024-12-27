'use client';

import { Area, AreaChart, XAxis, YAxis } from 'recharts';

import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';

type ChartData = {
  date: string;
  seenCount: number;
}[];

export default function DashboardChart({ data }: { data: ChartData }) {
  return (
    <ChartContainer
      className="min-h-[200px]"
      config={{
        seenCount: {
          label: 'Vues',
        },
      }}
    >
      <AreaChart
        data={data}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <XAxis dataKey="date" />
        <YAxis />
        <Area type="monotone" dataKey="seenCount" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.2} />
        <ChartTooltip content={<ChartTooltipContent />} />
      </AreaChart>
    </ChartContainer>
  );
}
