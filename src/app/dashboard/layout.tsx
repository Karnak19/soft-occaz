import { auth, createServerClient } from '$/utils/pocketbase/server';
import { DashboardLayoutHeader } from '$/components/dashboard/dashboard-layout-header';

export const metadata = {
  title: 'Dashboard',
};

async function Layout(props: { children?: React.ReactNode }) {
  const { user } = await auth();

  if (!user) {
    throw new Error('Unauthorized');
  }

  const pb = await createServerClient();

  return (
    <main className="mt-8 min-h-full space-y-2 px-2 pb-8">
      <DashboardLayoutHeader pb={pb} user={user} />
      <div className="grid grid-cols-5 items-start gap-2 lg:gap-3">
        <div className="col-span-full grid grid-cols-1 gap-2">{props.children}</div>
      </div>
    </main>
  );
}

export default Layout;
