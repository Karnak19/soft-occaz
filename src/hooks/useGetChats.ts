import { useQuery } from '@tanstack/react-query';
import { ListResult } from 'pocketbase';

import { ChatsResponse, UsersResponse } from '$/utils/pocketbase-types';

type ChatsResponseWithOtherUser = ChatsResponse<{ users: UsersResponse[] }> & {
  otherUser: UsersResponse | undefined;
};

export function useGetChats(onSuccess?: (data: ListResult<ChatsResponseWithOtherUser>) => void) {
  // const { user } = usePocket();

  return useQuery({
    queryKey: ['chats', {}],
    queryFn: () => console.log('queryFn'),

    // queryFn: () =>
    //   pb.collection(Collections.Chats).getList<ChatsResponse<{ users: UsersResponse[] }>>(1, 5, {
    //     sort: '-created',
    //     expand: 'users',
    //   }),
    onSuccess,
  });
}
