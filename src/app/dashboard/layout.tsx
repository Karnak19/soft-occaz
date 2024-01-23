import { currentUser } from '@clerk/nextjs';
import Link from 'next/link';

import { Toaster } from '$/components/ui/toaster';
import { Tabs, TabsList, TabsTrigger } from '$/components/ui/tabs';
import { dashboardNav } from '$/utils/dashboardNav';
import { ScrollArea, ScrollBar } from '$/components/ui/scroll-area';
import { getClerkUserFromDb } from '$/utils/getClerkUserFromDb';

import { Cards } from './Cards';
import DashboardProfileSection from './DashboardProfileSection';

export const metadata = {
  title: 'Dashboard',
};

async function Layout(props: { children?: React.ReactNode }) {
  const _user = await currentUser();
  const user = await getClerkUserFromDb(_user);

  if (!_user) {
    throw new Error('Unauthorized');
  }

  const isUserVerified =
    _user.externalAccounts.every((account) => account.verification?.status === 'verified') ||
    _user.emailAddresses.every((email) => email.verification?.status === 'verified');

  return (
    <>
      <div className="min-h-full px-2">
        <main className="mt-8 pb-8 ">
          <div className="container mx-auto ">
            <h1 className="sr-only">Profile</h1>
            <div className="grid grid-cols-5 items-start gap-4 lg:gap-6">
              <DashboardProfileSection user={user} verified={isUserVerified} />

              <Cards user={_user} />
              <ScrollArea className="w-[308px] sm:w-max">
                <Tabs defaultValue="/dashboard" className="w-max">
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

              <div className="col-span-full grid grid-cols-1 gap-2">{props.children}</div>
            </div>
          </div>
        </main>
      </div>
      <Toaster />
    </>
  );
}

export default Layout;
