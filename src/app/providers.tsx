'use client';

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from 'next-themes';
import { AuthRecord } from 'pocketbase';

import { SidebarProvider } from '$/components/ui/sidebar';

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

  return (
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
  );
}
