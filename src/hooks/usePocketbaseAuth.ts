import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';

import { pb } from '$/utils/pocketbase/client';
import { Collections } from '$/utils/pocketbase/pocketbase-types';

export function usePocketbaseAuth() {
  const { userId } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (!userId) {
      setIsAuthenticated(false);
      return;
    }

    const authenticate = async () => {
      try {
        // Try to authenticate with PocketBase using clerkId as both username and password
        try {
          await pb.collection(Collections.Users).authWithPassword(userId, userId);
          setIsAuthenticated(true);
        } catch (error) {
          // If authentication fails, user might not exist yet
          if (error instanceof Error && error.message.includes('Failed to authenticate')) {
            // Create the user in PocketBase
            const response = await fetch('/api/auth/pocketbase', {
              method: 'POST',
            });

            if (!response.ok) {
              throw new Error('Failed to create PocketBase user');
            }

            // Try to authenticate again
            await pb.collection(Collections.Users).authWithPassword(userId, userId);
            setIsAuthenticated(true);
          } else {
            throw error;
          }
        }
      } catch (error) {
        console.error('Failed to authenticate with PocketBase:', error);
        setIsAuthenticated(false);
      }
    };

    authenticate();

    // Cleanup
    return () => {
      pb.authStore.clear();
    };
  }, [userId]);

  return isAuthenticated;
}
