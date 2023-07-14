import DashboardFooter from './DashboardFooter';
import DashboardHeader from './DashboardHeader';
import DashboardProfileSection from './DashboardProfileSection';
import DashboardRecentChats from './DashboardRecentChats';

async function Layout(props: { children?: React.ReactNode }) {
  return (
    <>
      <div className="min-h-full">
        <DashboardHeader />
        <main className="pb-8 -mt-24">
          <div className="container mx-auto ">
            <h1 className="sr-only">Profile</h1>
            <div className="grid items-start grid-cols-5 gap-4 lg:gap-8">
              <div className="grid grid-cols-1 gap-4 col-span-full lg:col-span-4">
                <DashboardProfileSection />
              </div>

              <div className="col-span-full lg:col-span-4 grid grid-cols-1 gap-2">{props.children}</div>

              <div className="grid grid-cols-1 gap-4 col-span-full lg:col-start-5 lg:row-start-1 lg:row-span-2 lg:col-span-1">
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

export default Layout;
