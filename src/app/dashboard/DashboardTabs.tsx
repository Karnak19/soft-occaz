'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { dashboardNav } from '$/utils/dashboardNav';
import { ScrollArea, ScrollBar } from '$/components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger } from '$/components/ui/tabs';

export default function DashboardTabs() {
  const pathname = usePathname();

  return (
    <ScrollArea className="w-[308px] sm:w-max">
      <Tabs defaultValue={pathname} className="w-max">
        <TabsList className="h-16 sm:h-10">
          {dashboardNav.map((tab) => (
            <TabsTrigger key={tab.name} value={tab.href} asChild className="h-full">
              <Link href={tab.href}>{tab.name}</Link>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
