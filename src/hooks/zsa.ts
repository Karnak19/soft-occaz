import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { setupServerActionHooks } from 'zsa-react-query';

const { useServerActionMutation } = setupServerActionHooks({
  hooks: {
    useMutation: useMutation,
    useQuery: useQuery,
    useInfiniteQuery: useInfiniteQuery,
  },
});

export { useServerActionMutation };
