import { Card, CardHeader, CardTitle } from '$/components/ui/card';

export default function Loading() {
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl">Chargement...</CardTitle>
      </CardHeader>
    </Card>
  );
}
