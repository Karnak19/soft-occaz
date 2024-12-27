import { createClerkClient } from '@clerk/backend';
import dotenv from 'dotenv';
import PocketBase from 'pocketbase';

import { Collections, TypedPocketBase } from '$/utils/pocketbase/pocketbase-types';

// Load environment variables
dotenv.config();

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

async function main() {
  console.log('🔄 Starting user synchronization...');

  // Get all users from Clerk
  const clerkUsers = await clerkClient.users.getUserList({ limit: 500 });
  console.log(`📋 Found ${clerkUsers.totalCount} users in Clerk`);

  if (!process.env.NEXT_PUBLIC_POCKETBASE_URL) {
    throw new Error('NEXT_PUBLIC_POCKETBASE_URL must be set');
  }
  if (!process.env.POCKETBASE_ADMIN_EMAIL || !process.env.POCKETBASE_ADMIN_PASSWORD) {
    throw new Error('POCKETBASE_ADMIN_EMAIL and POCKETBASE_ADMIN_PASSWORD must be set');
  }

  const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL) as TypedPocketBase;
  await pb.collection('_superusers').authWithPassword(process.env.POCKETBASE_ADMIN_EMAIL, process.env.POCKETBASE_ADMIN_PASSWORD);

  for (const clerkUser of clerkUsers.data) {
    try {
      console.log(`Processing user: ${clerkUser.id}`);

      // Check if user already exists in PocketBase
      const existingUser = await pb
        .collection(Collections.Users)
        .getFirstListItem(`clerkId="${clerkUser.id}"`)
        .catch(() => null);

      // Get the primary email
      const primaryEmail = clerkUser.emailAddresses.find((email) => email.id === clerkUser.primaryEmailAddressId)?.emailAddress;

      // Download profile image
      const image = await fetch(clerkUser.imageUrl).then((res) => res.blob());

      if (!existingUser) {
        // Create new user
        await pb.collection(Collections.Users).create({
          clerkId: clerkUser.id,
          firstName: clerkUser.firstName || '',
          lastName: clerkUser.lastName || '',
          email: primaryEmail,
          username: clerkUser.username,
          name: clerkUser.username,
          avatar: image,
          password: clerkUser.id,
          passwordConfirm: clerkUser.id,
        });
        console.log(`✅ Created user: ${clerkUser.id}`);
      } else {
        // Update existing user
        await pb.collection(Collections.Users).update(existingUser.id, {
          firstName: clerkUser.firstName || '',
          lastName: clerkUser.lastName || '',
          email: primaryEmail,
          username: clerkUser.username,
          name: clerkUser.username,
          avatar: image,
        });
        console.log(`✅ Updated user: ${clerkUser.id}`);
      }
    } catch (error) {
      console.error(`❌ Error processing user ${clerkUser.id}:`, error);
    }
  }

  console.log('✨ Synchronization complete!');
}

main().catch(console.error);
