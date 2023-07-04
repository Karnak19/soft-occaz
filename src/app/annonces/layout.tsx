import Navbar from '$/components/Navbar';

function Layout({ children, modal }: { children: React.ReactNode; modal?: React.ReactNode }) {
  return (
    <>
      <div className="mb-10 bg-rg-dark">
        <Navbar />
      </div>
      <div>{modal}</div>
      <div className="container mx-auto">{children}</div>
    </>
  );
}

export default Layout;
