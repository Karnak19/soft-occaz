import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$/components/ui/card';
import { auth } from '$/utils/pocketbase/server';

import { ReferralCard } from './ReferralCard';
import { SettingsForm } from './SettingsForm';

export default async function Page() {
  const { user } = await auth();

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto grid grid-cols-1 gap-6 py-10 md:grid-cols-3">
      <ReferralCard user={user} />
      <Card className="col-span-1 md:col-span-2">
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
