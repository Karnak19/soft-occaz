import { Card } from '$/components/ui/card';
import { getMyListings } from '$/utils/getMyListings';

import EmptyList from './EmptyList';
import ListItem from './ListItem';

export default async function Page() {
  const data = await getMyListings();

  return (
    <Card className="overflow-hidden">
      {data?.length ? (
        <ul className="divide-y divide-muted">{data?.map((annonce) => <ListItem key={annonce.id} {...annonce} />)}</ul>
      ) : (
        <EmptyList />
      )}
    </Card>
  );
}
