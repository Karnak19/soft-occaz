import { EyeIcon } from 'lucide-react';
import Link from 'next/link';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$/components/ui/card';

import { Button } from '../ui/button';

interface DashboardCardProps {
  title: string;
  href: string;
  count: number;
  description: string;
  children: React.ReactNode;
}

export function DashboardCard({ title, href, count, description, children }: DashboardCardProps) {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <div className="flex items-center gap-3">
          <div className="space-y-1">
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
        <Button variant="ghost" className="text-primary" size="sm" asChild>
          <Link href={href}>
            <EyeIcon className="mr-1 size-4" />
            Voir tout
          </Link>
        </Button>
      </CardHeader>

      <CardContent>
        <p className="mb-4 text-xl font-bold">{count} total</p>
        {children}
      </CardContent>
    </Card>
  );
}
