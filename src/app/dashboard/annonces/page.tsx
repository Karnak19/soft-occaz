import { Card } from '$/components/ui/card';
import { ListingsResponse } from '$/utils/pocketbase/pocketbase-types';
import { auth, createServerClient } from '$/utils/pocketbase/server';

import EmptyList from './EmptyList';
import ListItem from './ListItem';

export default async function Page() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const pb = await createServerClient();

  const data = await pb.collection('listings').getFullList<ListingsResponse<string[]>>({
    filter: `user = "${userId}"`,
    sort: '-created',
  });

  return (
    <Card className="overflow-hidden">
      {data?.length ? (
        <ul className="divide-y divide-muted">
          {data?.map((annonce) => (
            <ListItem key={annonce.id} {...annonce} />
          ))}
        </ul>
      ) : (
        <EmptyList />
      )}
    </Card>
  );
}
