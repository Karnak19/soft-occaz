import Link from 'next/link';

import type { ConversationsResponse, TypedPocketBase, UsersResponse } from '$/utils/pocketbase/pocketbase-types';
import { Table, TableBody, TableCell, TableRow } from '$/components/ui/table';

import { DashboardCard } from './DashboardCard';

export async function MessagesCard({ userId, pb }: { userId: string; pb: TypedPocketBase }) {
  const recentItems = await pb.collection('conversations').getList<
    ConversationsResponse<{
      participants: UsersResponse[];
    }>
  >(1, 5, {
    filter: `participants ~ "${userId}"`,
    sort: '-updated',
    fields: 'id,name,created,lastMessage,updated',
    expand: 'participants',
  });

  return (
    <DashboardCard title="Chats" href="/dashboard/chats" count={recentItems.totalItems} description="Voir vos conversations">
      <Table>
        <TableBody>
          {recentItems.items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <Link href={`/dashboard/chats/${item.id}`} className="block hover:text-primary">
                  {item.name || item.expand?.participants.map((p) => p.name).join(', ') || 'N/A'}
                </Link>
              </TableCell>
              <TableCell className="text-right">
                <span className="text-xs text-muted-foreground">
                  {new Date(item.updated || item.created).toLocaleDateString()}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </DashboardCard>
  );
}
