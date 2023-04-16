import DashboardFooter from './DashboardFooter';
import DashboardHeader from './DashboardHeader';
import DashboardProfileSection from './DashboardProfileSection';
import DashboardRecentChats from './DashboardRecentChats';

export default function Dashboard({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <div className="min-h-full">
        <DashboardHeader />
        <main className="-mt-24 pb-8">
          <div className="container mx-auto ">
            <h1 className="sr-only">Profile</h1>
            <div className="grid grid-cols-5 items-start gap-4 lg:gap-8">
              <div className="col-span-full grid grid-cols-1 gap-4 lg:col-span-4">
                <DashboardProfileSection />
              </div>

              <div className="col-span-full lg:col-span-4">{children}</div>

              <div className="col-span-full grid grid-cols-1 gap-4 lg:col-span-1 lg:col-start-5 lg:row-span-2 lg:row-start-1">
                <DashboardRecentChats />
              </div>
            </div>
          </div>
        </main>
        <DashboardFooter />
      </div>
    </>
  );
}
