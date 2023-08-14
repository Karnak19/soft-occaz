import Sidebar from './Sidebar';

function Layout({ children }: { children: React.ReactNode }) {
  return <Sidebar>{children}</Sidebar>;
}

export default Layout;
