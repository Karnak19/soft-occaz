import { PathChecker } from './ClientSideChat';
import { getClerkUserFromDb } from '$/utils/getClerkUserFromDb';

export default async function ChatsPage() {
  const user = await getClerkUserFromDb();

  return (
    <div className="h-full flex flex-col">
      <PathChecker user={user} />
    </div>
  );
}
