import { currentUser } from '@clerk/nextjs';

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
            <div className="grid grid-cols-5 items-start gap-2 lg:gap-3">
              <DashboardProfileSection user={user} verified={isUserVerified} />
              <Cards user={_user} />
              <div className="col-span-full grid grid-cols-1 gap-2">{props.children}</div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Layout;
