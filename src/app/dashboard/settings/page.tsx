import { auth } from '$/utils/pocketbase/server';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$/components/ui/card';

import { SettingsForm } from './SettingsForm';

export default async function Page() {
  const { user } = await auth();

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Paramètres du profil</CardTitle>
          <CardDescription>Gérez vos informations personnelles</CardDescription>
        </CardHeader>
        <CardContent>
          <SettingsForm user={user} />
        </CardContent>
      </Card>
    </div>
  );
}
