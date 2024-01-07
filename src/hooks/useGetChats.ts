import { useQuery } from '@tanstack/react-query';

import { ChatsResponse, UsersResponse } from '$/utils/pocketbase-types';
import { useEffect } from 'react';

type ChatsResponseWithOtherUser = ChatsResponse<{ users: UsersResponse[] }> & {
  otherUser: UsersResponse | undefined;
};

export function useGetChats(onSuccess?: (data: any) => void) {
  // const { user } = usePocket();

  const query = useQuery({
    queryKey: ['chats', {}],
    queryFn: () => console.log('queryFn'),

    // queryFn: () =>
    //   pb.collection(Collections.Chats).getList<ChatsResponse<{ users: UsersResponse[] }>>(1, 5, {
    //     sort: '-created',
    //     expand: 'users',
    //   }),
  });

  useEffect(() => {
    if (query.status === 'success' && onSuccess) {
      onSuccess(query.data);
    }
  }, [query.status, onSuccess, query.data]);

  return query;
}
