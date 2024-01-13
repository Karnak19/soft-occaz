import {
  AdjustmentsVerticalIcon,
  ChatBubbleLeftRightIcon,
  ComputerDesktopIcon,
  DocumentPlusIcon,
  ListBulletIcon,
} from '@heroicons/react/24/outline';

export const dashboardNav = [
  { name: 'Dashboard', href: '/dashboard', Icon: ComputerDesktopIcon },
  { name: 'Mes annonces', href: '/dashboard/annonces', Icon: ListBulletIcon },
  { name: 'Créer une annonce', href: '/dashboard/annonces/new', Icon: DocumentPlusIcon },
  { name: 'Messages', href: '/dashboard/chats', Icon: ChatBubbleLeftRightIcon },
  { name: 'Settings', href: '/dashboard/settings', Icon: AdjustmentsVerticalIcon },
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
