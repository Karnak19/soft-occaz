import { TypedPocketBase } from './pocketbase/pocketbase-types';

export const calculateListingHistory = async (pb: TypedPocketBase, id: string) => {
  const history = await pb.collection('users_seen_listings').getFullList({
    filter: `listing = "${id}"`,
    orderBy: 'created',
  });

  const groupedHistory = Object.groupBy(history, (item) => {
    return new Date(item.created).toLocaleDateString();
  });

  const data = Object.entries(groupedHistory).map(([date, items]) => {
    return {
      date: new Date(date).toLocaleDateString(),
      value: items?.length ?? 0,
    };
  });

  const total = data.reduce((acc, item) => acc + item.value, 0);

  return { history: data, total };
};
