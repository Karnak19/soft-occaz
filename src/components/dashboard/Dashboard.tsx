'use client';

import DashboardFooter from './DashboardFooter';
import DashboardHeader from './DashboardHeader';
import DashboardProfileSection from './DashboardProfileSection';
import DashboardRecentChats from './DashboardRecentChats';

export default function Dashboard({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <div className="min-h-full">
        <DashboardHeader />
        <main className="pb-8 -mt-24">
          <div className="container mx-auto ">
            <h1 className="sr-only">Profile</h1>
            <div className="grid items-start grid-cols-3 gap-4 lg:gap-8">
              <div className="grid grid-cols-1 gap-4 col-span-full lg:col-span-2">
                <DashboardProfileSection />
              </div>
              <div className="grid grid-cols-1 row-start-3 gap-4 col-span-full lg:row-start-1 lg:col-start-3">
                <DashboardRecentChats />
              </div>

              <div className="col-span-full">{children}</div>
            </div>
          </div>
        </main>
        <DashboardFooter />
      </div>
    </>
  );
}
