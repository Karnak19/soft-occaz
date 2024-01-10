'use client';

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, useTheme } from 'next-themes';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import NextTopLoader from 'nextjs-toploader';

export default function Providers({ children }: { children: React.ReactNode }) {
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
      <ThemedClerkProvider>
        <QueryClientProvider client={queryClient}>
          {children}

          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ThemedClerkProvider>
    </ThemeProvider>
  );
}

function ThemedClerkProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  return (
    <>
      <NextTopLoader color={theme === 'dark' ? 'hsl( var(--primary) )' : '#323d36'} />
      <ClerkProvider
        appearance={{
          baseTheme: theme === 'dark' ? dark : undefined,
        }}
      >
        {children}
      </ClerkProvider>
    </>
  );
}
