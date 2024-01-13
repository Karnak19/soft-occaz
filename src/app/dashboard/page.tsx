import { Card, CardContent, CardHeader, CardTitle } from '$/components/ui/card';

async function Page() {
  // return <Charts />;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Coming soon</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Cette page est en cours de développement</p>
        <p>Restez à l&apos;écoute !</p>
      </CardContent>
    </Card>
  );
}

export default Page;
