'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from 'next-themes';
import { AuthRecord } from 'pocketbase';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';
import { useEffect, useState } from 'react';

import { SidebarProvider } from '$/components/ui/sidebar';

import { env } from '$/env';
import { PocketBaseProvider } from './pocketbase-provider';

export default function Providers({
  initialToken,
  initialUser,
  children,
}: {
  initialToken: string;
  initialUser: AuthRecord;
  children: React.ReactNode;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60,
          },
        },
      }),
  );

  useEffect(() => {
    if (env.NEXT_PUBLIC_POSTHOG_KEY) {
      posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host: env.NEXT_PUBLIC_POSTHOG_HOST,
        person_profiles: 'identified_only',
        capture_pageview: false,
      });
    }
  }, []);

  return (
    <PostHogProvider client={posthog}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <QueryClientProvider client={queryClient}>
          <PocketBaseProvider initialToken={initialToken} initialUser={initialUser}>
            <SidebarProvider>
              {children}
              <ReactQueryDevtools initialIsOpen={false} />
            </SidebarProvider>
          </PocketBaseProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </PostHogProvider>
  );
}
