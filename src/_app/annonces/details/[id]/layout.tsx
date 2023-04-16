async function layout({ children }: { children: React.ReactNode; params: { id: string } }) {
  return <div>{children}</div>;
}

export default layout;
