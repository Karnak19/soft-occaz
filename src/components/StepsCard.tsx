import { ArrowRightIcon } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$/components/ui/card';

type Step = {
  title: string;
  description: string;
  icon: LucideIcon;
};

type StepsCardProps = {
  title: string;
  description: string;
  steps: readonly Step[];
};

export default function StepsCard({ title, description, steps }: StepsCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="border-b">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="relative p-0">
        <div className="grid divide-y md:grid-cols-3 md:divide-x md:divide-y-0">
          {steps.map((step, index) => (
            <div key={step.title} className="relative p-6">
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="rounded-full bg-primary/10 p-3 text-primary">
                  <step.icon className="size-6" />
                </div>
                <div>
                  <h3 className="font-medium">{step.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 md:block">
                  <div className="rounded-full bg-background p-1 shadow-sm ring-1 ring-border">
                    <ArrowRightIcon className="size-5 text-muted-foreground" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
