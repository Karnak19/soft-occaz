import {
  AdjustmentsVerticalIcon,
  ChatBubbleLeftRightIcon,
  ComputerDesktopIcon,
  DocumentPlusIcon,
  HeartIcon,
  ListBulletIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';

import { useConversations } from './useConversations';
import { usePocketbaseAuth } from './usePocketbaseAuth';

export function useDashboardNav() {
  usePocketbaseAuth();

  const { totalUnreadMessages } = useConversations();

  const dashboardNav = [
    { name: 'Dashboard', href: '/dashboard', Icon: ComputerDesktopIcon },
    { name: 'Mes annonces', href: '/dashboard/annonces', Icon: ListBulletIcon },
    { name: 'Créer une annonce', href: '/dashboard/annonces/new', Icon: DocumentPlusIcon },
    { name: 'Mes favoris', href: '/dashboard/favorites', Icon: HeartIcon },
    { name: 'Messages', href: '/dashboard/chats', Icon: ChatBubbleLeftRightIcon, badge: totalUnreadMessages },
    { name: 'Évaluations', href: '/dashboard/ratings', Icon: UsersIcon },
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

  return {
    dashboardNav,
    totalUnreadMessages,
  };
}
