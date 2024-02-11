import { User } from '@prisma/client';

import { Card, CardContent } from '$/components/ui/card';

function MyPlan(user: User) {
  if (!user.stripeId) {
    return null;
  }

  return (
    <Card>
      <CardContent className="p-12 text-center text-4xl">
        <p className="text-foreground">COMING SOON</p>
      </CardContent>
    </Card>
  );
}

export default MyPlan;
