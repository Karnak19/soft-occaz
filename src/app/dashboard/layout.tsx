import { Toaster } from 'react-hot-toast';
import DashboardProfileSection from './DashboardProfileSection';

async function Layout(props: { children?: React.ReactNode }) {
  return (
    <>
      <div className="min-h-full px-2">
        <main className="pb-8 mt-8 ">
          <div className="container mx-auto ">
            <h1 className="sr-only">Profile</h1>
            <div className="grid items-start grid-cols-5 gap-4 lg:gap-8">
              <div className="grid grid-cols-1 gap-4 col-span-full">
                <DashboardProfileSection />
              </div>

              <div className="col-span-full grid grid-cols-1 gap-2">{props.children}</div>
            </div>
          </div>
        </main>
      </div>
      <Toaster position="bottom-center" />
    </>
  );
}

export default Layout;
