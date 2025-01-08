import {
  AdjustmentsVerticalIcon,
  ChatBubbleLeftRightIcon,
  ComputerDesktopIcon,
  DocumentPlusIcon,
  HeartIcon,
  InformationCircleIcon,
  ListBulletIcon,
  TrophyIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import { useQueries, useQuery } from '@tanstack/react-query';

import { ExpandedConversation, usePocketbase, useUser } from '$/app/pocketbase-provider';
import { MessagesResponse, UsersResponse } from '$/utils/pocketbase/pocketbase-types';

export function useDashboardNav() {
  const { pb } = usePocketbase();
  const user = useUser();

  const { data: conversations = [] } = useQuery({
    queryKey: ['conversations', user?.id],
    queryFn: async () => {
      const records = await pb.collection('conversations').getList<ExpandedConversation>(1, 50, {
        sort: '-updated',
        expand: 'participants',
      });
      return records.items;
    },
    enabled: !!user?.id,
    refetchInterval: 10 * 1000,
  });

  const unreadMessages = useQueries({
    queries:
      conversations?.map((conversation) => ({
        queryKey: ['messages', conversation.id, 'unread'],
        queryFn: () =>
          pb.collection('messages').getList<MessagesResponse<{ sender: UsersResponse }>>(1, 50, {
            filter: `conversation="${conversation.id}" && deletedAt = null && status = "sent" && sender != "${user?.id}"`,
            expand: 'sender',
          }),
        select: (data: { items: MessagesResponse<{ sender: UsersResponse }>[] }) => {
          return [conversation.id, data?.items?.length] as const;
        },
        enabled: !!user?.id,
        refetchInterval: 10 * 1000,
      })) ?? [],
  });

  const { data: waitingRatingSessions = 0 } = useQuery({
    queryKey: ['rating-sessions'],
    queryFn: () =>
      pb.collection('rating_sessions').getFullList({
        filter: 'rating = null',
      }),
    enabled: !!user?.id,
    select: (data) => data.length,
    refetchInterval: 30 * 1000,
  });

  const totalUnreadMessages = unreadMessages.reduce((acc, m) => acc + (m.data?.[1] ?? 0), 0);

  const dashboardNav = [
    { name: 'Dashboard', href: '/dashboard', Icon: ComputerDesktopIcon },
    { name: 'Mes annonces', href: '/dashboard/annonces', Icon: ListBulletIcon },
    { name: 'Créer une annonce', href: '/dashboard/annonces/new', Icon: DocumentPlusIcon },
    { name: 'Mes favoris', href: '/dashboard/favorites', Icon: HeartIcon },
    { name: 'Messages', href: '/dashboard/chats', Icon: ChatBubbleLeftRightIcon, badge: totalUnreadMessages },
    { name: 'Évaluations', href: '/dashboard/ratings', Icon: UsersIcon, badge: waitingRatingSessions },
    { name: 'Settings', href: '/dashboard/settings', Icon: AdjustmentsVerticalIcon },
  ] satisfies {
    name: string;
    href: string;
    badge?: number;
    Icon?: React.ForwardRefExoticComponent<
      React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & {
        title?: string;
        titleId?: string;
      } & React.RefAttributes<SVGSVGElement>
    >;
  }[];

  const otherNav = [
    { name: 'Leaderboard', href: '/leaderboard', Icon: TrophyIcon },
    { name: 'A propos', href: '/about', Icon: InformationCircleIcon },
  ] satisfies {
    name: string;
    href: string;
    Icon?: React.ForwardRefExoticComponent<
      React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & {
        title?: string;
        titleId?: string;
      } & React.RefAttributes<SVGSVGElement>
    >;
  }[];

  return {
    dashboardNav,
    otherNav,
    notificationsCount: totalUnreadMessages + waitingRatingSessions,
  };
}
