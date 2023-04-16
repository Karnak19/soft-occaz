import Dashboard from '$/components/dashboard/Dashboard';

function Layout(props: { children?: React.ReactNode }) {
  return <Dashboard {...props} />;
}

export default Layout;
