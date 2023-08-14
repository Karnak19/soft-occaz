import Navbar from '$/components/Navbar';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="mb-10 bg-rg-700">
        <Navbar />
      </div>
      <div className="container mx-auto">{children}</div>
    </>
  );
}

export default Layout;
