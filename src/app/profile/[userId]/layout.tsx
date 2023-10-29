import Sidebar from '../../annonces/Sidebar';

function Layout({ children }: { children: React.ReactNode }) {
  return <Sidebar>{children}</Sidebar>;
}

export default Layout;
