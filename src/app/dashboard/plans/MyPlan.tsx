import { User } from '@prisma/client';

function MyPlan(user: User) {
  if (!user.stripeId) {
    return null;
  }

  return (
    <div className="bg-white rounded shadow p-4 py-10">
      <div className="flex items-center justify-center text-4xl">
        <p className="text-gray-500">COMING SOON</p>
      </div>
    </div>
  );
}

export default MyPlan;
