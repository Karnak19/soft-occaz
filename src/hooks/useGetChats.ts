import { useQuery } from '@tanstack/react-query';
import { ListResult } from 'pocketbase';

import { pb } from '$/utils/pocketbase';
import { ChatsResponse, Collections, UsersResponse } from '$/utils/pocketbase-types';

type ChatsResponseWithOtherUser = ChatsResponse<{ users: UsersResponse[] }> & {
  otherUser: UsersResponse | undefined;
};

export function useGetChats(onSuccess?: (data: ListResult<ChatsResponseWithOtherUser>) => void) {
  // const { user } = usePocket();

  return useQuery({
    queryKey: ['chats', {}],
    queryFn: () =>
      pb.collection(Collections.Chats).getList<ChatsResponse<{ users: UsersResponse[] }>>(1, 5, {
        sort: '-created',
        expand: 'users',
      }),
    onSuccess,
    select: ({ page, perPage, totalItems, totalPages, items }) => {
      return {
        page,
        perPage,
        totalItems,
        totalPages,
        items: items.map((chat) => {
          const otherUser = chat.expand!.users!.find((u) => u.id !== '');

          return {
            ...chat,
            otherUser,
          };
        }),
      };
    },
  });
}
